"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import { resendVerification, verifyEmail } from "../lib/auth";
import {
    Alert,
    AuthIconHeader,
    AuthShell,
    Field,
    SubmitButton,
} from "../_components/auth";

/** The platform API issues a 6-digit OTP code. */
const CODE_LENGTH = 6;

const OTP_BOX_CLASS =
    "size-12 rounded-control border border-line bg-canvas/50 text-center text-xl font-bold focus:border-primary focus:outline-none sm:size-14";

export function VerifyOtpForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // The address survives leaving the page: it starts from ?email= when
    // present, otherwise the user types it below to get a fresh code.
    const [email, setEmail] = useState(
        () => searchParams.get("email") ?? "",
    );
    const [emailDraft, setEmailDraft] = useState("");
    const [digits, setDigits] = useState<string[]>(() =>
        Array<string>(CODE_LENGTH).fill(""),
    );
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const verify = useMutation({
        mutationFn: verifyEmail,
        onSuccess: () => router.push("/login?verified=1"),
    });
    const resend = useMutation({ mutationFn: resendVerification });

    const code = digits.join("");
    const errorMessage = verify.isError ? verify.error.message : null;

    function setDigit(index: number, value: string) {
        const digit = value.replace(/\D/g, "").slice(-1);
        setDigits((previous) => {
            const next = [...previous];
            next[index] = digit;
            return next;
        });
        if (digit && index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Backspace" && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    }

    function handlePaste(index: number, value: string) {
        const pasted = value.replace(/\D/g, "").slice(0, CODE_LENGTH - index);
        if (!pasted) return;
        setDigits((previous) => {
            const next = [...previous];
            for (let i = 0; i < pasted.length; i += 1) {
                next[index + i] = pasted[i] ?? "";
            }
            return next;
        });
        inputsRef.current[
            Math.min(index + pasted.length, CODE_LENGTH - 1)
        ]?.focus();
    }

    function handleSendCode() {
        const address = emailDraft.trim();
        if (!address || resend.isPending) return;
        setEmail(address);
        resend.mutate({ email: address });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!email || verify.isPending) return;
        verify.mutate({ email, code });
    }

    return (
        <AuthShell cardClassName="text-center">
            <AuthIconHeader
                icon={<ShieldCheck size={22} aria-hidden="true" />}
                title="أدخل كود التحقق"
                subtitle="تم إرسال كود مكون من 6 أرقام إلى بريدك الإلكتروني"
            />

            {!email ? (
                <div className="space-y-4 text-start">
                    <p className="text-xs leading-relaxed text-ink-soft">
                        غادرت صفحة التحقق؟ أدخل بريدك وسنرسل لك كوداً جديداً
                        لتكمل التفعيل بدون تسجيل جديد.
                    </p>
                    <Field
                        label="البريد الإلكتروني"
                        name="recovery-email"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        value={emailDraft}
                        onChange={(event) =>
                            setEmailDraft(event.target.value)
                        }
                    />
                    <button
                        type="button"
                        onClick={handleSendCode}
                        disabled={!emailDraft.trim() || resend.isPending}
                        className="w-full rounded-control bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {resend.isPending
                            ? "جاري إرسال الكود..."
                            : "إرسال كود التحقق"}
                    </button>
                </div>
            ) : null}

            {email ? (
                <>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {errorMessage ? <Alert>{errorMessage}</Alert> : null}

                <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
                    {digits.map((digit, index) => (
                        <input
                            key={`otp-${index}`}
                            ref={(element) => {
                                inputsRef.current[index] = element;
                            }}
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={1}
                            aria-label={`الرقم ${index + 1} من كود التحقق`}
                            autoFocus={index === 0}
                            value={digit}
                            onChange={(event) =>
                                setDigit(index, event.target.value)
                            }
                            onKeyDown={(event) => handleKeyDown(index, event)}
                            onPaste={(event) =>
                                handlePaste(
                                    index,
                                    event.clipboardData.getData("text"),
                                )
                            }
                            className={OTP_BOX_CLASS}
                        />
                    ))}
                </div>

                <SubmitButton
                    disabled={
                        !email ||
                        verify.isPending ||
                        code.length < CODE_LENGTH
                    }
                >
                    {verify.isPending
                        ? "جاري التحقق..."
                        : "تحقق وتفعيل الحساب"}
                </SubmitButton>
            </form>

            <p className="mt-6 text-xs text-ink-soft">
                لم تستلم الكود؟{" "}
                <button
                    type="button"
                    disabled={!email || resend.isPending}
                    onClick={() => resend.mutate({ email })}
                    className="font-bold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {resend.isPending ? "جاري الإرسال..." : "إعادة إرسال"}
                </button>
            </p>
            </>
            ) : null}
            {resend.isSuccess ? (
                <Alert variant="success" className="mt-2">
                    تم إرسال كود جديد إلى بريدك الإلكتروني.
                </Alert>
            ) : null}
            {resend.isError ? (
                <Alert className="mt-2">{resend.error.message}</Alert>
            ) : null}
        </AuthShell>
    );
}
