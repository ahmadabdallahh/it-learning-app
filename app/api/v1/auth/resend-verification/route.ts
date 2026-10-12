import { NextResponse } from "next/server";
import { proxyToBackend } from "@/app/lib/backend";

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
            { field: "email", message: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا." },
            { status: 400 },
        );
    }

    // Trigger the OTP resend via the platform API, which sends the email.
    let backendResponse: Response;
    try {
        backendResponse = await proxyToBackend("auth/resend-verification", {
            method: "POST",
            body: { email },
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
    return NextResponse.json(data ?? {}, { status: backendResponse.status });
}
