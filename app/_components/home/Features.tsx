import Image from "next/image";
import { FEATURES } from "../../consts";

/**
 * Bento: one large image-led tile + two compact tiles (3 items, 3 cells).
 * Distinct from the plain card grids used elsewhere on the page.
 */
export function Features() {
    const [lead, ...rest] = FEATURES;
    const LeadIcon = lead.icon;

    return (
        <section id="features" className="reveal py-20">
            <div className="mx-auto max-w-280 px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        مميزات المنصة الدراسية
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-ink-soft">
                        كل ما تحتاجه لتتفوق في سنين الكلية، وتوفر وقتك الضائع في
                        البحث العشوائي.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <article className="flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card lg:row-span-2">
                        <div className="relative aspect-[16/10] w-full bg-surface-muted">
                            <Image
                                src="https://picsum.photos/seed/it-academy-features/1200/750"
                                alt="طالب يتصفح محاضراته وملخصاته على المنصة"
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-7">
                            <span className="flex size-11 items-center justify-center rounded-control bg-primary-soft text-primary">
                                <LeadIcon size={22} aria-hidden="true" />
                            </span>
                            <h3 className="mt-4 text-xl font-bold text-ink">
                                {lead.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                                {lead.desc}
                            </p>
                        </div>
                    </article>

                    {rest.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <article
                                key={feature.title}
                                className="flex items-start gap-5 rounded-card border border-line bg-surface p-7 shadow-card"
                            >
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-primary-soft text-primary">
                                    <Icon size={22} aria-hidden="true" />
                                </span>
                                <div>
                                    <h3 className="text-lg font-bold text-ink">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                                        {feature.desc}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
