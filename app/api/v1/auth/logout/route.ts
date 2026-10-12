import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { forwardSetCookies, proxyToBackend } from "@/app/lib/backend";

export async function POST() {
    const cookieHeader = (await headers()).get("cookie");

    let backendResponse: Response;
    try {
        backendResponse = await proxyToBackend("auth/logout", {
            method: "POST",
            body: {},
            cookieHeader,
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

    const headersOut = new Headers();
    forwardSetCookies(backendResponse, headersOut);
    return NextResponse.json(
        { ok: backendResponse.ok },
        { status: backendResponse.status, headers: headersOut },
    );
}
