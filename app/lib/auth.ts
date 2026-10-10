export type RegisterPayload = {
    username: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    user: { id: string; username: string; email: string };
};

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

export function registerUser(
    payload: RegisterPayload,
): Promise<RegisterResponse> {
    return postJson<RegisterResponse>("/api/v1/auth/register", payload);
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
