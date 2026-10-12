export type RegisterPayload = {
    username: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    user: { id: string; username: string; email: string };
};

/** Platform roles. Register creates a student; staff roles are assigned
   out of band. Unknown values normalize to "student". */
export type Role = "student" | "instructor" | "admin";

export type User = {
    id: string;
    username: string;
    email: string;
    role: Role;
};

const KNOWN_ROLES: Role[] = ["student", "instructor", "admin"];

function normalizeRole(value: unknown): Role {
    return KNOWN_ROLES.includes(value as Role)
        ? (value as Role)
        : "student";
}

/**
 * Pull the session profile out of a /me payload regardless of envelope.
 * routes.txt pins the request shape but not the response envelope, and
 * the live backend wraps payloads ({ status, success, data | error }),
 * so accept a bare { user } as well as { data: { user } }.
 */
export function extractSessionUser(payload: unknown): User | null {
    if (typeof payload !== "object" || payload === null) return null;
    const record = payload as Record<string, unknown>;
    const raw =
        record.user ??
        (typeof record.data === "object" && record.data !== null
            ? (record.data as Record<string, unknown>).user
            : undefined);
    if (typeof raw !== "object" || raw === null) return null;
    const candidate = raw as Record<string, unknown>;
    if (typeof candidate.email !== "string") return null;
    return {
        id: String(candidate.id ?? ""),
        username:
            typeof candidate.username === "string" && candidate.username
                ? candidate.username
                : candidate.email,
        email: candidate.email,
        role: normalizeRole(candidate.role),
    };
}

export type LoginPayload = {
    email: string;
    password: string;
};

export type LoginResponse = {
    user: { id: string; username: string; email: string; role?: unknown };
};

/** Role home. Every authenticated user lands on their own dashboard. */
export function dashboardPathForRole(role: Role): string {
    switch (role) {
        case "admin":
            return "/dashboard/admin";
        case "instructor":
            return "/dashboard/instructor";
        case "student":
        default:
            return "/dashboard/student";
    }
}

export type VerifyEmailPayload = {
    email: string;
    code: string;
};

export type VerifyEmailResponse = {
    verified: boolean;
};

export type ResendVerificationPayload = {
    email: string;
};

export type ResendVerificationResponse = {
    sent: boolean;
};

type ApiErrorPayload = {
    field?: string;
    message?: string;
    /** The platform backend nests failures as { error: { code, message } }. */
    error?: { code?: string; message?: string };
};

/** Error carrying the backend's stable code + HTTP status so UI can
   branch on it (e.g. EMAIL_NOT_VERIFIED links back to verification).
   Plain object shape, no classes: attach the fields to an Error. */
export type ApiError = Error & { code?: string; status?: number };

export function toApiError(
    message: string,
    options?: { code?: string; status?: number },
): ApiError {
    const error = new Error(message) as ApiError;
    error.code = options?.code;
    error.status = options?.status;
    return error;
}

export function isApiError(value: unknown): value is ApiError {
    return (
        value instanceof Error && ("code" in value || "status" in value)
    );
}

/** Arabic copy for stable backend error codes (observed live).
   Unknown codes fall through to the backend message, then the fallback. */
const ERROR_CODE_MESSAGES: Record<string, string> = {
    INVALID_CODE: "كود التحقق غير صحيح، تأكد من الكود وحاول مرة أخرى.",
    EMAIL_NOT_VERIFIED:
        "لم يتم تفعيل بريدك بعد، أدخل كود التحقق المرسل إلى بريدك.",
    INVALID_CREDENTIALS: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    USER_NOT_FOUND: "لا يوجد حساب بهذا البريد، أنشئ حساباً جديداً.",
    DUPLICATE_EMAIL: "هذا البريد مسجل بالفعل.",
    VALIDATION_ERROR: "بيانات غير صالحة، راجع الحقول وحاول مرة أخرى.",
};

/** Prefer the backend's own message, whatever envelope it arrives in. */
function apiErrorMessage(
    data: ApiErrorPayload | null,
    fallback: string,
): string {
    const code = data?.error?.code;
    if (code && ERROR_CODE_MESSAGES[code]) return ERROR_CODE_MESSAGES[code];
    return data?.message ?? data?.error?.message ?? fallback;
}

/**
 * Shared POST helper for the same-origin /api/v1 JSON endpoints.
 * Throws an Error carrying the server's Arabic message on failure,
 * so TanStack Query's `mutation.error.message` is render-ready.
 */
async function postJson<T>(path: string, body: unknown): Promise<T> {
    let response: Response;
    try {
        response = await fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    } catch {
        throw new Error(
            "تعذّر الاتصال بالخادم، تحقق من الإنترنت وحاول مرة أخرى.",
        );
    }

    if (!response.ok) {
        const data = (await response
            .json()
            .catch(() => null)) as ApiErrorPayload | null;
        throw toApiError(
            apiErrorMessage(data, "حدث خطأ غير متوقع، حاول مرة أخرى."),
            { code: data?.error?.code, status: response.status },
        );
    }

    return (await response.json()) as T;
}

async function getJson<T>(path: string): Promise<T> {
    let response: Response;
    try {
        response = await fetch(path, { cache: "no-store" });
    } catch {
        throw new Error(
            "تعذّر الاتصال بالخادم، تحقق من الإنترنت وحاول مرة أخرى.",
        );
    }

    if (response.status === 401) {
        throw toApiError("انتهت الجلسة، سجل الدخول مرة أخرى.", {
            status: 401,
        });
    }
    if (!response.ok) {
        const data = (await response
            .json()
            .catch(() => null)) as ApiErrorPayload | null;
        throw toApiError(
            apiErrorMessage(data, "حدث خطأ غير متوقع، حاول مرة أخرى."),
            { code: data?.error?.code, status: response.status },
        );
    }

    return (await response.json()) as T;
}

export function registerUser(
    payload: RegisterPayload,
): Promise<RegisterResponse> {
    return postJson<RegisterResponse>("/api/v1/auth/register", payload);
}

export function loginUser(payload: LoginPayload): Promise<LoginResponse> {
    return postJson<LoginResponse>("/api/v1/auth/login", payload);
}

export function logoutUser(): Promise<{ ok: boolean }> {
    return postJson<{ ok: boolean }>("/api/v1/auth/logout", {});
}

/** Current session user (HTTP-only cookie). Throws on 401. */
export async function getCurrentUser(): Promise<{ user: User }> {
    const payload = await getJson<unknown>("/api/v1/auth/me");
    const user = extractSessionUser(payload);
    if (!user) throw new Error("تعذّر قراءة بيانات الجلسة، سجل الدخول مرة أخرى.");
    return { user };
}

export function verifyEmail(
    payload: VerifyEmailPayload,
): Promise<VerifyEmailResponse> {
    return postJson<VerifyEmailResponse>("/api/v1/auth/verify-email", payload);
}

export function resendVerification(
    payload: ResendVerificationPayload,
): Promise<ResendVerificationResponse> {
    return postJson<ResendVerificationResponse>(
        "/api/v1/auth/resend-verification",
        payload,
    );
}
