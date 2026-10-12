import { redirect } from "next/navigation";
import { dashboardPathForRole } from "../lib/auth";
import { getSessionUser } from "../lib/session";

/* /dashboard resolves the signed-in role and lands on the matching home.
   It also catches the login fallback when /me is momentarily unreadable. */
export default async function DashboardIndexPage() {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    redirect(dashboardPathForRole(user.role));
}
