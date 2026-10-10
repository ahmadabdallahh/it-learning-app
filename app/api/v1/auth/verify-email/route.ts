import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_PATTERN = /^\d{6}$/;

export async function POST(request: Request) {
    let payload: { email?: unknown; code?: unknown };
    try {
        payload = (await request.json()) as typeof payload;
    } catch {
        return NextResponse.json(
            { message: "تعذّر قراءة البيانات المرسلة." },
            { status: 400 },
        );
    }

    const email =
        typeof payload.email === "string" ? payload.email.trim() : "";
    const code = typeof payload.code === "string" ? payload.code.trim() : "";

    if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json(
            { message: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا." },
            { status: 400 },
        );
    }
    if (!CODE_PATTERN.test(code)) {
        return NextResponse.json(
            { message: "كود التحقق يجب أن يكون 6 أرقام." },
            { status: 400 },
        );
    }

    // TODO: verify the code against the platform API
    // (POST /api/v1/auth/verify-email) and establish the session.
    // Stub response until then.
    return NextResponse.json({ verified: true });
}
