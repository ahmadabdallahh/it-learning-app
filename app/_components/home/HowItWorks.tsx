import { HOW_IT_WORKS } from "../../consts";

export function HowItWorks() {
    return (
        <section className="mx-auto max-w-280 px-4 pb-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                    ابدأ المذاكرة في 3 خطوات
                </h2>
                <p className="mt-4 text-sm text-[#6B7280] sm:text-base">
                    من التسجيل لأول ملخص في دقايق، من غير أي تعقيد.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-4 text-right sm:grid-cols-3">
                {HOW_IT_WORKS.map((step) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={step.title}
                            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_20px_rgba(80,70,229,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(80,70,229,0.08)]"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-xl text-[#5046E5]">
                                <Icon size={20} aria-hidden="true" />
                            </div>
                            <span className="mb-2 inline-block rounded-md bg-[#EEF0FF] px-2 py-0.5 text-[11px] font-bold text-[#5046E5]">
                                {step.step}
                            </span>
                            <h3 className="mb-1 text-base font-bold text-[#111827] sm:text-lg">
                                {step.title}
                            </h3>
                            <p className="text-xs font-medium leading-relaxed text-[#6B7280] sm:text-sm">
                                {step.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
