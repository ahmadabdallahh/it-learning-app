import { NextResponse } from "next/server";
import { forwardSetCookies, proxyToBackend } from "@/app/lib/backend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
/* Mirrors the backend validator (routes.md): 3-50 chars, латин letters,
   numbers, underscores, hyphens. Enforced locally so the user gets an
   Arabic message instead of a backend 400. */
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,50}$/;

export async function POST(request: Request) {
    let payload: { username?: unknown; email?: unknown; password?: unknown };
    try {
        payload = (await request.json()) as typeof payload;
    } catch {
        return NextResponse.json(
            { message: "تعذّر قراءة البيانات المرسلة." },
            { status: 400 },
        );
    }

    const username =
        typeof payload.username === "string" ? payload.username.trim() : "";
    const email =
        typeof payload.email === "string" ? payload.email.trim() : "";
    const password =
        typeof payload.password === "string" ? payload.password : "";

    if (!USERNAME_PATTERN.test(username)) {
        return NextResponse.json(
            {
                field: "username",
                message:
                    "اسم المستخدم من 3 إلى 50 حرفًا بالإنجليزية أو الأرقام أو _ أو - فقط.",
            },
            { status: 400 },
        );
    }
    if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json(
            { field: "email", message: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا." },
            { status: 400 },
        );
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        return NextResponse.json(
            {
                field: "password",
                message: `كلمة المرور يجب أن تكون ${MIN_PASSWORD_LENGTH} أحرف على الأقل.`,
            },
            { status: 400 },
        );
    }

    // Create the user via the platform API, which hashes the password
    // and sends the 6-digit OTP email.
    let backendResponse: Response;
    try {
        backendResponse = await proxyToBackend("auth/register", {
            method: "POST",
            body: { username, email, password },
        });
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "حدث خطأ غير متوقع، حاول مرة أخرى.",
            },
            { status: 502 },
        );
    }

    const data = (await backendResponse.json().catch(() => null)) as Record<
        string,
        unknown
    > | null;
    const headers = new Headers();
    forwardSetCookies(backendResponse, headers);
    return NextResponse.json(data ?? {}, {
        status: backendResponse.status,
        headers,
    });
}
