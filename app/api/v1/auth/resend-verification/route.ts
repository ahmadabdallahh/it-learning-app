import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    let payload: { email?: unknown };
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

    if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json(
            { message: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا." },
            { status: 400 },
        );
    }

    // TODO: trigger the OTP resend via the platform API
    // (POST /api/v1/auth/resend-verification). Stub response until then.
    return NextResponse.json({ sent: true });
}
