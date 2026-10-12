"use client";

import { useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import {
    AuthFooterLink,
    Alert,
    AuthIconHeader,
    AuthShell,
    Field,
    SubmitButton,
} from "../_components/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Password reset is not offered by the platform API (no reset endpoint
   in routes.md: four likely paths probed, all 404). Until the backend
   ships one, this form validates the address and says so plainly —
   it never fakes a sent email. */
export function ForgetPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const address = email.trim();
        if (!EMAIL_PATTERN.test(address)) {
            setError("من فضلك أدخل بريدًا إلكترونيًا صحيحًا.");
            setSubmitted(false);
            return;
        }
        setError(null);
        setSubmitted(true);
    }

    return (
        <AuthShell>
            <AuthIconHeader
                icon={<KeyRound size={22} aria-hidden="true" />}
                title="نسيت كلمة المرور؟"
                subtitle="أدخل بريدك الإلكتروني وسنرسل لك تعليمات الاستعادة"
            />

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {error ? <Alert>{error}</Alert> : null}
                {submitted ? (
                    <p
                        role="status"
                        className="rounded-control border border-line bg-surface-muted px-4 py-3 text-xs font-semibold leading-relaxed text-ink-soft"
                    >
                        الاستعادة التلقائية غير متاحة حالياً: تواصل مع إدارة
                        الدفعة لمساعدتك في استعادة حسابك.
                    </p>
                ) : null}
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
                <SubmitButton>إرسال رابط الاستعادة</SubmitButton>
            </form>

            <AuthFooterLink
                text="تذكرت كلمة المرور؟"
                linkText="العودة لتسجيل الدخول"
                href="/login"
            />
        </AuthShell>
    );
}
