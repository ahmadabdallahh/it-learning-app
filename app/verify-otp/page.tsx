import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "../_components/auth";
import { VerifyOtpForm } from "./verify-form";

export const metadata: Metadata = {
    title: "التحقق من الكود - IT Academy",
};

export default function VerifyOtpPage() {
    return (
        <Suspense
            fallback={
                <AuthShell cardClassName="text-center">
                    <p className="text-xs text-[#6B7280]">جاري التحميل...</p>
                </AuthShell>
            }
        >
            <VerifyOtpForm />
        </Suspense>
    );
}
