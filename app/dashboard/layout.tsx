import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { DashboardShell } from "../_components/dashboard";
import { getSessionUser } from "../lib/session";

export const metadata: Metadata = {
    title: "لوحة التحكم - IT Academy",
};

/* Every /dashboard/* page renders inside this guard: no session means
   /login, and role pages bounce visitors to their own role home. */
export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    // Session-guarded subtree: opt out of prerendering and always
    // resolve the user from the request cookies at request time.
    await connection();
    const user = await getSessionUser();
    if (!user) redirect("/login");
    return <DashboardShell user={user}>{children}</DashboardShell>;
}
