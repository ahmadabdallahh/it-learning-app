import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { MATERIALS } from "../../consts";

export function Materials() {
    return (
        <section id="materials" className="reveal mx-auto max-w-280 px-4 py-20 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="text-start">
                    <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        المواد الدراسية المتاحة
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">
                        اختر المادة وابدأ المذاكرة فوراً. كل مواد الترم الثاني
                        مرتبة في مكان واحد.
                    </p>
                </div>
                <Link
                    href="/register"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                    تصفح كل المواد
                    <ArrowLeft size={16} aria-hidden="true" />
                </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {MATERIALS.map((material) => {
                    const Icon = material.icon;
                    return (
                        <article
                            key={material.title}
                            className="flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow duration-200 hover:shadow-lift"
                        >
                            <div className="relative aspect-[16/10] w-full bg-surface-muted">
                                <Image
                                    src={material.image}
                                    alt=""
                                    fill
                                    sizes="(min-width: 640px) 33vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <span className="flex size-10 items-center justify-center rounded-control bg-primary-soft text-primary">
                                    <Icon size={20} aria-hidden="true" />
                                </span>
                                <h3 className="mt-5 text-lg font-bold text-ink">
                                    {material.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                                    شامل المحاضرات والسكاشن وشيتات الامتحانات
                                    وأسئلة السنين السابقة.
                                </p>
                                <Link
                                    href="/login"
                                    className="mt-6 inline-flex items-center justify-center rounded-control bg-ink px-4 py-3 text-sm font-bold text-canvas transition-colors duration-200 hover:bg-primary active:translate-y-px"
                                >
                                    افتح المادة
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
