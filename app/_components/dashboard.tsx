"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Home, Layers, LogOut } from "lucide-react";
import { logoutUser, type Role, type User } from "../lib/auth";

/* Authenticated shell for every /dashboard/* page. Sidebar navigation is
   role-aware (role home first), the top bar carries the account menu, and
   logout revokes the HTTP-only session before returning to /login. */

const ROLE_HOME: Record<Role, { href: string; label: string }> = {
    student: { href: "/dashboard/student", label: "لوحتي الدراسية" },
    instructor: { href: "/dashboard/instructor", label: "لوحة المحاضر" },
    admin: { href: "/dashboard/admin", label: "لوحة الإدارة" },
};

const ROLE_BADGE: Record<Role, string> = {
    student: "طالب",
    instructor: "محاضر",
    admin: "إدارة",
};

/** Page greeting: one focused headline plus a soft-ink lead line. */
export function DashboardHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
                {subtitle}
            </p>
        </div>
    );
}

/** Signed-in account summary, fed only by the real /me session data. */
export function AccountCard({ user }: { user: User }) {
    return (
        <section
            aria-label="بيانات الحساب"
            className="rounded-card border border-line bg-surface p-6 shadow-card"
        >
            <h2 className="text-lg font-bold">بيانات الحساب</h2>
            <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-soft">الاسم</dt>
                    <dd className="font-semibold">{user.username}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-soft">البريد الإلكتروني</dt>
                    <dd className="font-semibold" dir="ltr">
                        {user.email}
                    </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-soft">الدور</dt>
                    <dd>
                        <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                            {ROLE_BADGE[user.role]}
                        </span>
                    </dd>
                </div>
            </dl>
        </section>
    );
}

export function DashboardShell({
    user,
    children,
}: {
    user: User;
    children: ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [signingOut, setSigningOut] = useState(false);

    async function handleLogout() {
        if (signingOut) return;
        setSigningOut(true);
        try {
            await logoutUser();
        } catch {
            /* session already gone server-side: still leave the dashboard */
        }
        router.push("/login");
        router.refresh();
    }

    const home = ROLE_HOME[user.role];
    const links = [
        { href: home.href, label: home.label, icon: Layers },
        { href: "/#materials", label: "مواد الدفعة", icon: BookOpen },
        { href: "/", label: "الرئيسية", icon: Home },
    ];

    return (
        <div className="flex min-h-screen bg-canvas text-ink">
            <aside className="hidden w-64 shrink-0 flex-col border-e border-line bg-surface md:flex">
                <Link
                    href="/"
                    className="px-6 pb-5 pt-6 text-lg font-bold tracking-tight"
                >
                    IT Academy
                </Link>
                <nav aria-label="تنقل لوحة التحكم" className="flex-1 px-3">
                    <ul className="flex flex-col gap-1 text-sm font-medium text-ink-soft">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={`flex items-center gap-2.5 rounded-control px-3 py-2.5 transition-colors hover:bg-surface-muted hover:text-primary ${
                                            active
                                                ? "bg-primary-soft font-bold text-primary"
                                                : ""
                                        }`}
                                    >
                                        <Icon size={17} aria-hidden="true" />
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="border-t border-line p-4">
                    <p className="truncate text-sm font-bold">{user.username}</p>
                    <p className="mt-0.5 truncate text-xs text-ink-soft">
                        {user.email}
                    </p>
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={signingOut}
                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-control border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <LogOut size={16} aria-hidden="true" />
                        {signingOut ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
                    </button>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex items-center justify-between gap-3 border-b border-line bg-surface/80 px-4 py-3 backdrop-blur-md sm:px-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                        {ROLE_BADGE[user.role]}
                    </span>
                    <div className="flex min-w-0 items-center gap-3">
                        <p className="truncate text-sm font-semibold">
                            {user.username}
                        </p>
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={signingOut}
                            aria-label="تسجيل الخروج"
                            title="تسجيل الخروج"
                            className="flex size-10 shrink-0 items-center justify-center rounded-control border border-line transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-70 md:hidden"
                        >
                            <LogOut size={17} aria-hidden="true" />
                        </button>
                    </div>
                </header>
                <main className="mx-auto w-full max-w-5xl flex-1 p-4 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
