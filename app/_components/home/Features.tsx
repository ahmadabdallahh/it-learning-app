import { FEATURES } from "../../consts";

export function Features() {
    return (
        <section id="features" className="border-t border-[#E5E7EB] bg-white py-20">
            <div className="mx-auto max-w-280 px-4 text-center sm:px-6">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                    مميزات المنصة الدراسية
                </h2>
                <p className="mx-auto mb-12 max-w-xl text-sm text-[#6B7280] sm:text-base">
                    كل ما تحتاجه لتتفوق في سنين الكلية وتوفر وقتك الضائع في البحث
                    العشوائي.
                </p>
                <div className="grid grid-cols-1 gap-6 text-right md:grid-cols-3">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.step}
                            className="rounded-2xl border border-[#E5E7EB] bg-[#F7F7FF] p-6"
                        >
                            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[#5046E5] text-sm font-bold text-white">
                                {feature.step}
                            </div>
                            <h3 className="mb-2 text-base font-bold text-[#111827] sm:text-lg">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-[#6B7280]">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
