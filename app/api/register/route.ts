import { NextResponse } from "next/server";

type RegisterPayload = {
    name?: unknown;
    email?: unknown;
    password?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function badRequest(field: string, message: string) {
    return NextResponse.json({ field, message }, { status: 400 });
}

export async function POST(request: Request) {
    let payload: RegisterPayload;
    try {
        payload = (await request.json()) as RegisterPayload;
    } catch {
        return badRequest("body", "تعذّر قراءة البيانات المرسلة.");
    }

    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email =
        typeof payload.email === "string" ? payload.email.trim() : "";
    const password =
        typeof payload.password === "string" ? payload.password : "";

    if (!name) {
        return badRequest("name", "من فضلك أدخل الاسم الكامل.");
    }
    if (!EMAIL_PATTERN.test(email)) {
        return badRequest("email", "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.");
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        return badRequest(
            "password",
            `كلمة المرور يجب أن تكون ${MIN_PASSWORD_LENGTH} أحرف على الأقل.`,
        );
    }

    // TODO: persist the user in the database and trigger the OTP email,
    // then return the created user. Stub response until then.
    return NextResponse.json(
        { user: { id: crypto.randomUUID(), name, email } },
        { status: 201 },
    );
}
