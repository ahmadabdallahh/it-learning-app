import { redirect } from "next/navigation";
import { DashboardSuspense } from "../_components/dashboard-gate";
import { dashboardPathForRole } from "../lib/auth";
import { getSessionUser } from "../lib/session";

/* /dashboard resolves the signed-in role and lands on the matching home.
   It also catches the login fallback when /me is momentarily unreadable. */
async function DashboardResolver() {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    redirect(dashboardPathForRole(user.role));
    return null;
}

export default function DashboardIndexPage() {
    return (
        <DashboardSuspense>
            <DashboardResolver />
        </DashboardSuspense>
    );
}
