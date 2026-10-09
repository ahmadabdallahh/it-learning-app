import type { Metadata } from "next";
import {
  AuthBrandHeader,
  AuthFooterLink,
  AuthShell,
  Field,
  SubmitButton,
} from "../_components/auth";

export const metadata: Metadata = {
  title: "تسجيل الدخول - IT Academy",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <AuthBrandHeader
        title="مرحباً بك مجدداً"
        subtitle="سجل الدخول للمتابعة إلى منصة المذاكرة"
      />

      <form className="space-y-4">
        <Field
          label="البريد الإلكتروني أو كود الدفعة"
          type="text"
          placeholder="name@example.com"
        />
        <Field
          label="كلمة المرور"
          type="password"
          placeholder="••••••••"
          aside={
            <a
              href="/forget-password"
              className="text-xs text-[#5046E5] hover:underline"
            >
              نسيت كلمة المرور؟
            </a>
          }
        />
        <SubmitButton>تسجيل الدخول</SubmitButton>
      </form>

      <AuthFooterLink
        text="ليس لديك حساب؟"
        linkText="انشئ حساباً الآن"
        href="/register"
      />
    </AuthShell>
  );
}
