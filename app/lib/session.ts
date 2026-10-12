import { cookies } from "next/headers";
import { proxyToBackend } from "./backend";
import type { Role, User } from "./auth";

/* Server-only: resolve the signed-in user from the HTTP-only session
   cookie. Returns null when there is no session (never throws), so
   layouts and pages can redirect to /login. */

const KNOWN_ROLES: Role[] = ["student", "instructor", "admin"];

function normalizeRole(value: unknown): Role {
    return KNOWN_ROLES.includes(value as Role)
        ? (value as Role)
        : "student";
}

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

    const data = (await response.json().catch(() => null)) as {
        user?: {
            id?: unknown;
            username?: unknown;
            email?: unknown;
            role?: unknown;
        };
    } | null;
    const raw = data?.user;
    if (!raw || typeof raw.email !== "string") return null;

    return {
        id: String(raw.id ?? ""),
        username:
            typeof raw.username === "string" && raw.username
                ? raw.username
                : raw.email,
        email: raw.email,
        role: normalizeRole(raw.role),
    };
}
