"use client";

import { useRouter } from "next/navigation";
import {
  AuthBrandHeader,
  AuthFooterLink,
  AuthShell,
  Field,
  SubmitButton,
} from "../_components/auth";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <AuthShell>
      <AuthBrandHeader
        title="انضم لدفعتك الآن"
        subtitle="أنشئ حساباً جديداً للوصول الكامل لكل المواد"
      />

      {/* Mirrors the prototype's form action="verify-otp.html". */}
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/verify-otp");
        }}
      >
        <Field label="الاسم الكامل" type="text" placeholder="أحمد محمد" />
        <Field
          label="البريد الإلكتروني"
          type="email"
          placeholder="name@example.com"
        />
        <Field label="كلمة المرور" type="password" placeholder="••••••••" />
        <SubmitButton>متابعة وإنشاء الحساب</SubmitButton>
      </form>

      <AuthFooterLink
        text="لديك حساب بالفعل؟"
        linkText="سجل دخولك"
        href="/login"
      />
    </AuthShell>
  );
}
