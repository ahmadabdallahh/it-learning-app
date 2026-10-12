import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GraduationCap, Layers, Users } from "lucide-react";
import {
    AccountCard,
    DashboardHeader,
} from "../../_components/dashboard";
import { dashboardPathForRole } from "../../lib/auth";
import { getSessionUser } from "../../lib/session";

export const metadata: Metadata = {
    title: "لوحة الإدارة - IT Academy",
};

const QUICK_LINKS = [
    {
        href: "/#materials",
        icon: Layers,
        title: "محتوى المنصة",
        desc: "عاين المواد والتصنيفات المنشورة للدفعة.",
    },
    {
        href: "/register",
        icon: Users,
        title: "انضمام دفعة جديدة",
        desc: "رابط التسجيل اللي بتتبعت للطلاب الجدد.",
    },
    {
        href: "/#testimonials",
        icon: GraduationCap,
        title: "رضا الدفعة",
        desc: "آراء الطلاب ومؤشرات الثقة المعروضة على الموقع.",
    },
];

export default async function AdminDashboardPage() {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    if (user.role !== "admin") redirect(dashboardPathForRole(user.role));

    return (
        <div className="space-y-8">
            <DashboardHeader
                title={`أهلاً ${user.username}`}
                subtitle="دي لوحة الإدارة: نظرة سريعة على المنصة ووصول مباشر لأهم الأماكن."
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
