import { NextResponse } from "next/server";
import { forwardSetCookies, proxyToBackend } from "@/app/lib/backend";

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

    // Verify the code against the platform API. A wrong/expired code
    // comes back as a backend 4xx, which the client surfaces as-is.
    let backendResponse: Response;
    try {
        backendResponse = await proxyToBackend("auth/verify-email", {
            method: "POST",
            body: { email, code },
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
