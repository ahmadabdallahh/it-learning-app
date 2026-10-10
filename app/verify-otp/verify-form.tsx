"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { resendVerification, verifyEmail } from "../lib/auth";
import {
    AuthIconHeader,
    AuthShell,
    SubmitButton,
} from "../_components/auth";

/** The platform API issues a 6-digit OTP code. */
const CODE_LENGTH = 6;

const OTP_BOX_CLASS =
    "h-12 w-12 rounded-xl border border-[#E5E7EB] bg-[#F7F7FF]/50 text-center text-xl font-bold focus:border-[#5046E5] focus:outline-none sm:h-14 sm:w-14";

export function VerifyOtpForm() {
    const router = useRouter();
    const email = useSearchParams().get("email") ?? "";
    const [digits, setDigits] = useState<string[]>(() =>
        Array<string>(CODE_LENGTH).fill(""),
    );
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const verify = useMutation({
        mutationFn: verifyEmail,
        onSuccess: () => router.push("/login"),
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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!email || verify.isPending) return;
        verify.mutate({ email, code });
    }

    return (
        <AuthShell cardClassName="text-center">
            <AuthIconHeader
                icon="🔒"
                title="أدخل كود التحقق"
                subtitle="تم إرسال كود مكون من 6 أرقام إلى بريدك الإلكتروني"
            />

            {!email ? (
                <p
                    role="alert"
                    className="mb-6 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-xs font-semibold leading-relaxed text-error"
                >
                    تعذّر تحديد البريد الإلكتروني.{" "}
                    <Link href="/register" className="font-bold hover:underline">
                        أعد التسجيل
                    </Link>
                </p>
            ) : null}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {errorMessage ? (
                    <p
                        role="alert"
                        className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-xs font-semibold leading-relaxed text-error"
                    >
                        {errorMessage}
                    </p>
                ) : null}

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

            <p className="mt-6 text-xs text-[#6B7280]">
                لم تستلم الكود؟{" "}
                <button
                    type="button"
                    disabled={!email || resend.isPending}
                    onClick={() => resend.mutate({ email })}
                    className="font-bold text-[#5046E5] hover:underline disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {resend.isPending ? "جاري الإرسال..." : "إعادة إرسال"}
                </button>
            </p>
            {resend.isSuccess ? (
                <p
                    role="status"
                    className="mt-2 text-xs font-semibold text-success"
                >
                    تم إرسال كود جديد إلى بريدك الإلكتروني.
                </p>
            ) : null}
            {resend.isError ? (
                <p
                    role="alert"
                    className="mt-2 text-xs font-semibold text-error"
                >
                    {resend.error.message}
                </p>
            ) : null}
        </AuthShell>
    );
}
