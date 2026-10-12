import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "../_components/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
    title: "تسجيل الدخول - IT Academy",
};

export default function LoginPage() {
    return (
        <Suspense
            fallback={
                <AuthShell cardClassName="text-center">
                    <p className="text-xs text-ink-soft">جاري التحميل...</p>
                </AuthShell>
            }
        >
            <LoginForm />
        </Suspense>
    );
}
