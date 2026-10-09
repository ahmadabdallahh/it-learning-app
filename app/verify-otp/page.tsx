import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AuthIconHeader, AuthShell, SubmitButton } from "../_components/auth";

export const metadata: Metadata = {
  title: "التحقق من الكود - IT Academy",
};

const OTP_BOX_CLASS =
  "h-14 w-14 rounded-xl border border-[#E5E7EB] bg-[#F7F7FF]/50 text-center text-xl font-bold focus:border-[#5046E5] focus:outline-none";

export default function VerifyOtpPage() {
  return (
    <AuthShell cardClassName="text-center">
      <AuthIconHeader
        icon={<ShieldCheck size={22} aria-hidden="true" />}
        title="أدخل كود التحقق"
        subtitle="تم إرسال كود مكون من 4 أرقام إلى بريدك الإلكتروني"
      />

      <form className="space-y-6">
        <div className="flex justify-center gap-3" dir="ltr">
          <input type="text" maxLength={1} className={OTP_BOX_CLASS} />
          <input type="text" maxLength={1} className={OTP_BOX_CLASS} />
          <input type="text" maxLength={1} className={OTP_BOX_CLASS} />
          <input type="text" maxLength={1} className={OTP_BOX_CLASS} />
        </div>

        <SubmitButton>تحقق وتفعيل الحساب</SubmitButton>
      </form>

      <p className="mt-6 text-xs text-[#6B7280]">
        لم تستلم الكود؟{" "}
        <a href="#" className="font-bold text-[#5046E5] hover:underline">
          إعادة إرسال
        </a>
      </p>
    </AuthShell>
  );
}
