"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../consts";

export function SiteHeader() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 mx-auto max-w-280 px-4 pt-3 sm:px-6">
            <div className="mx-auto rounded-card border border-line bg-surface/80 shadow-card backdrop-blur-md">
                <div className="flex items-center justify-between gap-4 px-5 py-2.5">
                    <Link
                        href="/"
                        className="text-lg font-bold tracking-tight text-ink"
                    >
                        IT Academy
                    </Link>

                    <nav
                        aria-label="التنقل الرئيسي"
                        className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="transition-colors hover:text-primary"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/login"
                            className="hidden px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:inline-block"
                        >
                            دخول
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-control bg-ink px-4 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-primary active:translate-y-px"
                        >
                            ابدأ مجاناً
                        </Link>
                        <button
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            aria-expanded={open}
                            aria-controls="mobile-nav"
                            className="flex size-10 items-center justify-center rounded-control border border-line text-ink transition-colors hover:bg-surface-muted md:hidden"
                        >
                            {open ? <X size={18} /> : <Menu size={18} />}
                            <span className="sr-only">
                                {open ? "إغلاق القائمة" : "فتح القائمة"}
                            </span>
                        </button>
                    </div>
                </div>

                {open && (
                    <nav
                        id="mobile-nav"
                        aria-label="التنقل على الجوّال"
                        className="border-t border-line px-3 py-3 md:hidden"
                    >
                        <ul className="flex flex-col gap-1 text-sm font-medium text-ink-soft">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-control px-3 py-2.5 transition-colors hover:bg-surface-muted hover:text-primary"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li className="sm:hidden">
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="block rounded-control px-3 py-2.5 transition-colors hover:bg-surface-muted hover:text-primary"
                                >
                                    دخول
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
