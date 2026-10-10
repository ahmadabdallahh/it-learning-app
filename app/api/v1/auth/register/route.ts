import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

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

    if (!username) {
        return NextResponse.json(
            { field: "username", message: "من فضلك أدخل الاسم الكامل." },
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

    // TODO: create the user via the platform API (hash the password, then
    // send the 6-digit OTP email). Stub response until then.
    return NextResponse.json(
        { user: { id: crypto.randomUUID(), username, email } },
        { status: 201 },
    );
}
