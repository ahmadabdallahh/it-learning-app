"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

/* Shared shell + controls for the auth pages (login / register / verify-otp /
   forget-password). Every value consumes the design tokens from
   app/globals.css (bg-canvas, text-ink, bg-primary, rounded-card,
   rounded-control, shadow-card, ...) so the auth surfaces stay on-system
   with the landing page. */

export function AuthShell({
  children,
  cardClassName = "",
}: {
  children: ReactNode;
  cardClassName?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4 text-ink">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft transition-colors hover:text-primary"
        >
          <ArrowRight size={14} aria-hidden="true" />
          العودة إلى الرئيسية
        </Link>
        <div
          className={`w-full rounded-card border border-line bg-surface p-8 shadow-card ${cardClassName}`}
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
      <div className="mb-3 inline-flex size-12 items-center justify-center rounded-control bg-primary text-xl font-bold text-primary-foreground">
        IT
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-1 text-xs text-ink-soft">{subtitle}</p>
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
      <div className="mb-3 inline-flex size-12 items-center justify-center rounded-control bg-primary-soft text-xl font-bold text-primary">
        {icon}
      </div>
      <h1 className="mb-1 text-2xl font-bold">{title}</h1>
      <p className="text-xs text-ink-soft">{subtitle}</p>
    </div>
  );
}

/**
 * Inline status message. Renders with the semantic success/error treatment
 * and picks the right accessibility role automatically.
 */
export function Alert({
  variant = "error",
  className = "",
  children,
}: {
  /** "error" (role="alert") or "success" (role="status"). */
  variant?: "error" | "success";
  className?: string;
  children: ReactNode;
}) {
  const isError = variant === "error";
  return (
    <p
      role={isError ? "alert" : "status"}
      className={`rounded-control border px-4 py-3 text-xs font-semibold leading-relaxed ${
        isError
          ? "border-error/30 bg-error/5 text-error"
          : "border-success/30 bg-success/5 text-success"
      } ${className}`}
    >
      {children}
    </p>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** Rendered next to the label (e.g. the "forgot password" link). */
  aside?: ReactNode;
};

export function Field({ label, aside, type, ...inputProps }: FieldProps) {
  const fieldId = useId();
  const [visible, setVisible] = useState(false);
  // Password fields get a reveal toggle; anything else renders plain.
  const isPassword = type === "password";
  return (
    <div>
      {aside ? (
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor={fieldId}
            className="block text-xs font-semibold text-ink"
          >
            {label}
          </label>
          {aside}
        </div>
      ) : (
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-xs font-semibold text-ink"
        >
          {label}
        </label>
      )}
      <div className={isPassword ? "relative" : undefined}>
        <input
          id={fieldId}
          type={isPassword ? (visible ? "text" : "password") : type}
          {...inputProps}
          className={`w-full rounded-control border border-line bg-canvas/50 px-4 py-3 text-sm focus:border-primary focus:outline-none ${
            isPassword ? "pe-11" : ""
          }`}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-pressed={visible}
            aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            title={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-primary"
          >
            {visible ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
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
      className="mt-2 w-full rounded-control bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
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
    <p className="mt-6 text-center text-xs text-ink-soft">
      {text}{" "}
      <a href={href} className="font-bold text-primary hover:underline">
        {linkText}
      </a>
    </p>
  );
}