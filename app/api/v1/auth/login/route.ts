import { NextResponse } from "next/server";
import { forwardSetCookies, proxyToBackend } from "@/app/lib/backend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    let payload: { email?: unknown; password?: unknown };
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
    const password =
        typeof payload.password === "string" ? payload.password : "";

    if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json(
            { field: "email", message: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا." },
            { status: 400 },
        );
    }
    if (!password) {
        return NextResponse.json(
            { field: "password", message: "من فضلك أدخل كلمة المرور." },
            { status: 400 },
        );
    }

    let backendResponse: Response;
    try {
        backendResponse = await proxyToBackend("auth/login", {
            method: "POST",
            body: { email, password },
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
