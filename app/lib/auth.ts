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
};

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
        throw new Error(
            data?.message ?? "حدث خطأ غير متوقع، حاول مرة أخرى.",
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
        throw new Error("انتهت الجلسة، سجل الدخول مرة أخرى.");
    }
    if (!response.ok) {
        const data = (await response
            .json()
            .catch(() => null)) as ApiErrorPayload | null;
        throw new Error(
            data?.message ?? "حدث خطأ غير متوقع، حاول مرة أخرى.",
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
export function getCurrentUser(): Promise<{ user: User }> {
    return getJson<{ user: User }>("/api/v1/auth/me");
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
