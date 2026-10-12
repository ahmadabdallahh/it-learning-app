"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
    AuthBrandHeader,
    AuthFooterLink,
    Alert,
    AuthShell,
    Field,
    SubmitButton,
} from "../_components/auth";
import {
    dashboardPathForRole,
    getCurrentUser,
    loginUser,
    type Role,
} from "../lib/auth";

const KNOWN_ROLES: Role[] = ["student", "instructor", "admin"];

export function LoginForm() {
    const router = useRouter();
    const justVerified = useSearchParams().get("verified") === "1";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            // The session cookie is HTTP-only: resolve the role through /me,
            // then land on the matching dashboard.
            try {
                const { user } = await getCurrentUser();
                const role: Role = KNOWN_ROLES.includes(user.role)
                    ? user.role
                    : "student";
                router.replace(dashboardPathForRole(role));
            } catch {
                router.replace("/dashboard");
            }
        },
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (login.isPending) return;
        login.mutate({ email: email.trim(), password });
    }

    const errorMessage = login.isError ? login.error.message : null;

    return (
        <AuthShell>
            <AuthBrandHeader
                title="مرحباً بك مجدداً"
                subtitle="سجل الدخول للمتابعة إلى منصة المذاكرة"
            />

            {justVerified ? (
                <Alert variant="success" className="mb-6">
                    تم تفعيل حسابك بنجاح، سجل الدخول للمتابعة إلى لوحتك.
                </Alert>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {errorMessage ? <Alert>{errorMessage}</Alert> : null}
                <Field
                    label="البريد الإلكتروني أو كود الدفعة"
                    name="email"
                    type="text"
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Field
                    label="كلمة المرور"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aside={
                        <a
                            href="/forget-password"
                            className="text-xs text-primary hover:underline"
                        >
                            نسيت كلمة المرور؟
                        </a>
                    }
                />
                <SubmitButton disabled={login.isPending}>
                    {login.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </SubmitButton>
            </form>

            <AuthFooterLink
                text="ليس لديك حساب؟"
                linkText="انشئ حساباً الآن"
                href="/register"
            />
        </AuthShell>
    );
}
