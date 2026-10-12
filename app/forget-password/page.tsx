import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import {
  AuthIconHeader,
  AuthShell,
  Field,
  SubmitButton,
} from "../_components/auth";

export const metadata: Metadata = {
  title: "استعادة كلمة المرور - IT Academy",
};

export default function ForgetPasswordPage() {
  return (
    <AuthShell>
      <AuthIconHeader
        icon={<KeyRound size={22} aria-hidden="true" />}
        title="نسيت كلمة المرور؟"
        subtitle="أدخل بريدك الإلكتروني وسنرسل لك تعليمات الاستعادة"
      />

      <form className="space-y-4">
        <Field
          label="البريد الإلكتروني"
          type="email"
          placeholder="name@example.com"
        />
        <SubmitButton>إرسال رابط الاستعادة</SubmitButton>
      </form>

      <p className="mt-6 text-center text-xs text-ink-soft">
        تذكرت كلمة المرور؟{" "}
        <a href="/login" className="font-bold text-primary hover:underline">
          العودة لتسجيل الدخول
        </a>
      </p>
    </AuthShell>
  );
}
