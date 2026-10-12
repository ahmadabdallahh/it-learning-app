/* Server-only helpers for proxying the same-origin /api/v1 route
   handlers to the real platform backend.
   NEXT_API_URL is server-only (no NEXT_PUBLIC_ prefix) and already ends
   with /api/v1/. The session travels as an HTTP-only cookie: browser ->
   Next proxy -> backend via the forwarded Cookie header, and backend
   Set-Cookie headers are passed straight back through. */

const BACKEND_BASE = (process.env.NEXT_API_URL ?? "").replace(/\/+$/, "");

export function backendUrl(path: string): string {
    return `${BACKEND_BASE}/${path.replace(/^\/+/, "")}`;
}

type ProxyInit = {
    method?: string;
    body?: unknown;
    cookieHeader?: string | null;
};

/**
 * Forward a request to the platform backend. Returns the raw Response so
 * callers can pass through status, JSON, and Set-Cookie headers as-is.
 * Throws a render-ready Arabic Error when the backend is unreachable.
 */
export async function proxyToBackend(
    path: string,
    init: ProxyInit = {},
): Promise<Response> {
    if (!BACKEND_BASE) {
        throw new Error("خدمة الحسابات غير مهيأة بعد، حاول لاحقًا.");
    }
    let response: Response;
    try {
        response = await fetch(backendUrl(path), {
            method: init.method ?? "GET",
            headers: {
                ...(init.body !== undefined
                    ? { "Content-Type": "application/json" }
                    : null),
                ...(init.cookieHeader
                    ? { Cookie: init.cookieHeader }
                    : null),
            },
            ...(init.body !== undefined
                ? { body: JSON.stringify(init.body) }
                : null),
            cache: "no-store",
        });
    } catch {
        throw new Error(
            "تعذّر الاتصال بالخادم، تحقق من الإنترنت وحاول مرة أخرى.",
        );
    }
    return response;
}

/**
 * Copy every Set-Cookie from a backend response onto outgoing Headers.
 * This is what carries the HTTP-only session cookie through the proxy.
 */
export function forwardSetCookies(
    backendResponse: Response,
    headers: Headers,
): void {
    const cookies =
        typeof backendResponse.headers.getSetCookie === "function"
            ? backendResponse.headers.getSetCookie()
            : [];
    for (const cookie of cookies) {
        headers.append("Set-Cookie", cookie);
    }
}
