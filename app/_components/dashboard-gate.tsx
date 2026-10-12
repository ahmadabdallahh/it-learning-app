import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DashboardShell } from "./dashboard";
import { getSessionUser } from "../lib/session";

/* Request-time gate for the whole /dashboard/* subtree. It deliberately
   lives behind Suspense: the shell streams a skeleton during prerender
   and the session resolves per request, so no route here is ever
   statically prerendered. No session means /login. */
export async function DashboardGate({
    children,
}: {
    children: ReactNode;
}) {
    const user = await getSessionUser();
    if (!user) redirect("/login");
    return <DashboardShell user={user}>{children}</DashboardShell>;
}

/** Static skeleton streamed while the gate resolves the session. */
export function DashboardGateFallback() {
    return (
        <div
            aria-hidden="true"
            className="flex min-h-screen bg-canvas text-ink"
        >
            <div className="hidden w-64 shrink-0 border-e border-line bg-surface md:block" />
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="border-b border-line bg-surface/80 py-6" />
                <div className="mx-auto w-full max-w-5xl flex-1 space-y-8 p-4 sm:p-8">
                    <div className="h-9 w-48 rounded-control bg-surface-muted" />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="h-44 rounded-card border border-line bg-surface" />
                        <div className="h-44 rounded-card border border-line bg-surface" />
                        <div className="h-44 rounded-card border border-line bg-surface" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DashboardSuspense({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<DashboardGateFallback />}>
            {children}
        </Suspense>
    );
}
