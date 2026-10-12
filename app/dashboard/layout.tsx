import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardGate, DashboardSuspense } from "../_components/dashboard-gate";

export const metadata: Metadata = {
    title: "لوحة التحكم - IT Academy",
};

/* Static shell: the session gate streams behind Suspense, so the guard
   redirects server-side per request without blocking prerender. */
export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <DashboardSuspense>
            <DashboardGate>{children}</DashboardGate>
        </DashboardSuspense>
    );
}
