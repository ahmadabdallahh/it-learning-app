import { cookies } from "next/headers";
import { proxyToBackend } from "./backend";
import { extractSessionUser, type User } from "./auth";

/* Server-only: resolve the signed-in user from the HTTP-only session
   cookie. Returns null when there is no session (never throws), so
   layouts and pages can redirect to /login. */

export async function getSessionUser(): Promise<User | null> {
    const cookieHeader = (await cookies()).toString();
    if (!cookieHeader) return null;

    let response: Response;
    try {
        response = await proxyToBackend("auth/me", {
            cookieHeader,
        });
    } catch {
        return null;
    }
    if (!response.ok) return null;

    const data = await response.json().catch(() => null);
    return extractSessionUser(data);
}
