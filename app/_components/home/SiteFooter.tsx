import Link from "next/link";
import { NAV_LINKS } from "../../consts";

export function SiteFooter() {
    return (
        <footer className="border-t border-line bg-surface">
            <div className="mx-auto grid max-w-280 gap-10 px-4 py-12 text-start sm:px-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-2">
                    <span className="text-lg font-bold text-ink">
                        IT Academy
                    </span>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                        مذكرات وملخصات وشرح فيديو وبنك أسئلة لكل منهج قسم IT،
                        في مكان واحد مرتب.
                    </p>
                </div>

                <nav aria-label="روابط المنصة">
                    <p className="text-sm font-bold text-ink">المنصة</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav aria-label="روابط الحساب">
                    <p className="text-sm font-bold text-ink">الحساب</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                        <li>
                            <Link
                                href="/login"
                                className="transition-colors hover:text-primary"
                            >
                                دخول
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/register"
                                className="transition-colors hover:text-primary"
                            >
                                ابدأ مجاناً
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/forget-password"
                                className="transition-colors hover:text-primary"
                            >
                                استعادة كلمة السر
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="border-t border-line">
                <div className="mx-auto max-w-280 px-4 py-5 text-start text-xs text-ink-soft sm:px-6">
                    © 2026 IT Academy. جميع الحقوق محفوظة لدفعتك.
                </div>
            </div>
        </footer>
    );
}
