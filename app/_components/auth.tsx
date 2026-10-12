import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* Shared shell + controls for the auth pages (login / register / verify-otp /
   forget-password). Class names mirror the approved HTML prototypes exactly. */

export function AuthShell({
  children,
  cardClassName = "",
}: {
  children: ReactNode;
  cardClassName?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F7FF] p-4 text-[#111827]">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] transition-colors hover:text-[#5046E5]"
        >
          <ArrowRight size={14} aria-hidden="true" />
          العودة إلى الرئيسية
        </Link>
        <div
          className={`w-full rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-[0_4px_20px_rgba(80,70,229,0.04)] ${cardClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthBrandHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5046E5] text-xl font-bold text-white shadow-md">
        IT
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-1 text-xs text-[#6B7280]">{subtitle}</p>
    </div>
  );
}

export function AuthIconHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0FF] text-xl font-bold text-[#5046E5]">
        {icon}
      </div>
      <h1 className="mb-1 text-2xl font-bold">{title}</h1>
      <p className="text-xs text-[#6B7280]">{subtitle}</p>
    </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** Rendered next to the label (e.g. the "forgot password" link). */
  aside?: ReactNode;
};

export function Field({ label, aside, ...inputProps }: FieldProps) {
  const fieldId = useId();
  return (
    <div>
      {aside ? (
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor={fieldId}
            className="block text-xs font-semibold text-[#111827]"
          >
            {label}
          </label>
          {aside}
        </div>
      ) : (
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-xs font-semibold text-[#111827]"
        >
          {label}
        </label>
      )}
      <input
        id={fieldId}
        {...inputProps}
        className="w-full rounded-xl border border-[#E5E7EB] bg-[#F7F7FF]/50 px-4 py-3 text-sm focus:border-[#5046E5] focus:outline-none"
      />
    </div>
  );
}

export function SubmitButton({
  children,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-2 w-full rounded-xl bg-[#5046E5] py-3 text-sm font-semibold text-white shadow-md shadow-[#5046E5]/20 transition-all hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {children}
    </button>
  );
}

export function AuthFooterLink({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="mt-6 text-center text-xs text-[#6B7280]">
      {text}{" "}
      <a
        href={href}
        className="font-bold text-[#5046E5] hover:underline"
      >
        {linkText}
      </a>
    </p>
  );
}
