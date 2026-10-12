import { HOW_IT_WORKS } from "../../consts";

export function HowItWorks() {
    return (
        <section className="reveal mx-auto max-w-280 px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    ابدأ المذاكرة في 3 خطوات
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    من التسجيل لأول ملخص في دقايق، من غير أي تعقيد.
                </p>
            </div>

            <ol className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
                {/* Connector line between the three step markers (desktop only). */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[16%] top-6 hidden h-px bg-line sm:block"
                />

                {HOW_IT_WORKS.map((step) => {
                    const Icon = step.icon;
                    return (
                        <li
                            key={step.title}
                            className="relative z-10 flex items-start gap-4 text-start sm:flex-col sm:items-center sm:text-center"
                        >
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary ring-4 ring-canvas">
                                <Icon size={22} aria-hidden="true" />
                            </span>
                            <div className="sm:mt-1">
                                <h3 className="text-lg font-bold text-ink">
                                    {step.title}
                                </h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                                    {step.desc}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
