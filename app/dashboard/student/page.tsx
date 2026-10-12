import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BookOpen, ListChecks, Trophy } from "lucide-react";
import {
    AccountCard,
    DashboardHeader,
} from "../../_components/dashboard";
import { DashboardGateFallback } from "../../_components/dashboard-gate";
import { dashboardPathForRole } from "../../lib/auth";
import { getSessionUser } from "../../lib/session";

export const metadata: Metadata = {
    title: "لوحتي الدراسية - IT Academy",
};

const QUICK_LINKS = [
    {
        href: "/#materials",
        icon: BookOpen,
        title: "أكمل المذاكرة",
        desc: "افتح مواد الدفعة: المحاضرات والملخصات والشيتات.",
    },
    {
        href: "/#features",
        icon: ListChecks,
        title: "بنك الأسئلة",
        desc: "أسئلة السنين اللي فاتت مرتبة مع الحلول النموذجية.",
    },
    {
        href: "/#pricing",
        icon: Trophy,
        title: "خطتك",
        desc: "قارن بين المجاني والمجموعات وPRO واختر خطتك.",
    },
];

export default function StudentDashboardPage() {
    return (
        <Suspense fallback={<DashboardGateFallback />}>
            <StudentContent />
        </Suspense>
    );
}

async function StudentContent() {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    if (user.role !== "student") redirect(dashboardPathForRole(user.role));

    return (
        <div className="space-y-8">
            <DashboardHeader
                title={`أهلاً ${user.username}`}
                subtitle="دي لوحتك الدراسية: كمّل من حيث وقفت، وكل مواد الدفعة قدامك في مكان واحد."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {QUICK_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-lift"
                        >
                            <span className="flex size-11 items-center justify-center rounded-control bg-primary-soft text-primary">
                                <Icon size={22} aria-hidden="true" />
                            </span>
                            <span className="mt-4 text-lg font-bold">
                                {link.title}
                            </span>
                            <span className="mt-2 text-sm leading-relaxed text-ink-soft">
                                {link.desc}
                            </span>
                        </Link>
                    );
                })}
            </div>

            <AccountCard user={user} />
        </div>
    );
}
