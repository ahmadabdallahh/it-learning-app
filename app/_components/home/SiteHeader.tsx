import Link from "next/link";
import { NAV_LINKS } from "../../consts";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 mx-auto max-w-280 px-4 py-4 sm:px-6">
            <div className="mx-auto flex max-w-268 items-center justify-between rounded-2xl border border-[#E5E7EB]/80 bg-white/80 px-6 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-bold tracking-tight text-[#111827]">
                        IT Academy{" "}
                    </span>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-medium text-[#6B7280] md:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-[#5046E5]"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-3 py-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]"
                    >
                        دخول
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                    >
                        ابدا مجاناً
                    </Link>
                </div>
            </div>
        </header>
    );
}
