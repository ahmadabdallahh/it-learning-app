import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BookOpen, MessagesSquare, MonitorPlay } from "lucide-react";
import {
    AccountCard,
    DashboardHeader,
} from "../../_components/dashboard";
import { DashboardGateFallback } from "../../_components/dashboard-gate";
import { dashboardPathForRole } from "../../lib/auth";
import { getSessionUser } from "../../lib/session";

export const metadata: Metadata = {
    title: "لوحة المحاضر - IT Academy",
};

const QUICK_LINKS = [
    {
        href: "/#materials",
        icon: BookOpen,
        title: "مواد الدفعة",
        desc: "عاين المواد والمحاضرات والملخصات زي ما الطالب بيشوفها.",
    },
    {
        href: "/#features",
        icon: MonitorPlay,
        title: "المحتوى المرئي",
        desc: "شرح الفيديو وبنك الأسئلة المتاحين للدفعة.",
    },
    {
        href: "/#testimonials",
        icon: MessagesSquare,
        title: "نبض الدفعة",
        desc: "آراء الطلاب ومستوى الرضا عن المحتوى.",
    },
];

export default function InstructorDashboardPage() {
    return (
        <Suspense fallback={<DashboardGateFallback />}>
            <InstructorContent />
        </Suspense>
    );
}

async function InstructorContent() {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    if (user.role !== "instructor")
        redirect(dashboardPathForRole(user.role));

    return (
        <div className="space-y-8">
            <DashboardHeader
                title={`أهلاً ${user.username}`}
                subtitle="دي لوحة المحاضر: تابع محتوى الدفعة وشوف تجربة الطالب بعينه."
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
