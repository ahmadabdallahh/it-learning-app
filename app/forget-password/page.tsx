import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "../_components/auth";
import { ForgetPasswordForm } from "./forget-password-form";

export const metadata: Metadata = {
    title: "استعادة كلمة المرور - IT Academy",
};

export default function ForgetPasswordPage() {
    return (
        <Suspense
            fallback={
                <AuthShell cardClassName="text-center">
                    <p className="text-xs text-ink-soft">جاري التحميل...</p>
                </AuthShell>
            }
        >
            <ForgetPasswordForm />
        </Suspense>
    );
}
