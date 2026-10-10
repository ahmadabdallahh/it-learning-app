import Link from "next/link";
import { VALUE_CARDS } from "../../consts";

export function Hero() {
    return (
        <section className="mx-auto max-w-280 px-4 pb-16 pt-12 text-center sm:px-6">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#5046E5]/15 bg-[#EEF0FF] px-4 py-1.5 text-xs font-semibold text-[#5046E5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5046E5]"></span>
                <span>موثوقة من دفعة أولى IT كاملة</span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-[1.2] tracking-tight text-[#111827] sm:text-5xl lg:text-[56px]">
                منصة مذاكرة أسرع <span className="text-[#5046E5]">10×</span> لدفعتك
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-sm font-normal leading-relaxed text-[#6B7280] sm:text-base">
                ستايل SaaS فاتح ونظيف: بطاقات بيضاء ناعمة، ظلال خفيفة، وأزرار واضحة
                لضمان أعلى تحويل وتجربة مستخدم مذهلة.
            </p>

            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                    href="/register"
                    className="w-full rounded-xl bg-[#5046E5] px-7 py-3.5 font-semibold text-white shadow-md shadow-[#5046E5]/20 transition-all hover:bg-[#4338CA] sm:w-auto"
                >
                    استعرض المواد مجاناً
                </Link>
                <a
                    href="#materials"
                    className="w-full rounded-xl border border-[#E5E7EB] bg-white px-7 py-3.5 font-semibold text-[#111827] shadow-sm transition-all hover:bg-slate-50 sm:w-auto"
                >
                    شاهد الديمو
                </a>
            </div>

            <div className="grid grid-cols-1 gap-4 text-right sm:grid-cols-2 lg:grid-cols-4">
                {VALUE_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.title}
                            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_20px_rgba(80,70,229,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(80,70,229,0.08)]"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-xl text-[#5046E5]">
                                <Icon size={20} aria-hidden="true" />
                            </div>
                            <h3 className="mb-1 text-base font-bold text-[#111827] sm:text-lg">
                                {card.title}
                            </h3>
                            <p className="text-xs font-medium text-[#6B7280] sm:text-sm">
                                {card.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
