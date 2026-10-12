import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { proxyToBackend } from "@/app/lib/backend";

export async function GET() {
    const cookieHeader = (await headers()).get("cookie");
    if (!cookieHeader) {
        return NextResponse.json(
            { message: "سجل الدخول أولاً للمتابعة." },
            { status: 401 },
        );
    }

    let backendResponse: Response;
    try {
        backendResponse = await proxyToBackend("auth/me", { cookieHeader });
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
