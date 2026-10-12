"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { isApiError, registerUser } from "../lib/auth";
import {
    Alert,
    AuthBrandHeader,
    AuthFooterLink,
    AuthShell,
    Field,
    SubmitButton,
} from "../_components/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = useMutation({
        mutationFn: registerUser,
        onSuccess: (_data, variables) =>
            router.push(
                `/verify-otp?email=${encodeURIComponent(variables.email)}`,
            ),
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (register.isPending) return;
        register.mutate({ username, email, password });
    }

    const errorMessage = register.isError ? register.error.message : null;
    // Email already registered: bridge to verification instead of
    // stranding the user (re-registering can never succeed).
    const emailTaken =
        isApiError(register.error) &&
        (register.error.code === "DUPLICATE_EMAIL" ||
            register.error.status === 409);

    return (
        <AuthShell>
            <AuthBrandHeader
                title="انضم لدفعتك الآن"
                subtitle="أنشئ حساباً جديداً للوصول الكامل لكل المواد"
            />

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {emailTaken ? (
                    <Alert>
                        هذا البريد مسجل بالفعل.{" "}
                        <Link
                            href={`/verify-otp?email=${encodeURIComponent(email.trim())}`}
                            className="font-bold hover:underline"
                        >
                            أدخل كود التحقق
                        </Link>
                    </Alert>
                ) : errorMessage ? (
                    <Alert>{errorMessage}</Alert>
                ) : null}
                <Field
                    label="اسم المستخدم"
                    name="username"
                    type="text"
                    placeholder="ahmad_IT"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <Field
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <SubmitButton disabled={register.isPending}>
                    {register.isPending
                        ? "جاري إنشاء الحساب..."
                        : "متابعة وإنشاء الحساب"}
                </SubmitButton>
            </form>

            <AuthFooterLink
                text="لديك حساب بالفعل؟"
                linkText="سجل دخولك"
                href="/login"
            />
        </AuthShell>
    );
}
