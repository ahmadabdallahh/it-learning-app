export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    user: { id: string; name: string; email: string };
};

type ApiErrorPayload = {
    field?: string;
    message?: string;
};

/**
 * Creates an account via POST /api/register.
 * Throws an Error carrying the server's Arabic message on failure,
 * so TanStack Query's `mutation.error.message` is render-ready.
 */
export async function registerUser(
    payload: RegisterPayload,
): Promise<RegisterResponse> {
    let response: Response;
    try {
        response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
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
            data?.message ?? "حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى.",
        );
    }

    return (await response.json()) as RegisterResponse;
}
