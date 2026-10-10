import { MATERIALS } from "../../consts";

export function Materials() {
    return (
        <section id="materials" className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6">
            <div className="mb-12 flex items-end justify-between">
                <div>
                    <span className="text-xs bg-[#EEF0FF] text-[#5046E5] font-semibold px-3 py-1 rounded-full mb-3 inline-block">المحتوى الدراسي</span>
                    <h2 className="text-2xl font-black tracking-tight text-[#111827] sm:text-3xl">
                        المواد الدراسية المتاحة
                    </h2>
                    <p className="text-sm text-[#6B7280] sm:text-base mt-1">
                        اختر المادة وابدأ المذاكرة فوراً بكل سهولة
                    </p>
                </div>
                <a
                    href="#"
                    className="text-sm font-semibold text-[#5046E5] hover:underline flex items-center gap-1"
                >
                    عرض كل المواد ←
                </a>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {MATERIALS.map((material) => {
                    const Icon = material.icon;
                    return (
                        <div
                            key={material.title}
                            className="flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-white p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="rounded-md bg-[#EEF0FF] px-3 py-1 text-xs font-bold text-[#5046E5]">
                                        ترم ثاني
                                    </span>
                                    <div className="w-11 h-11 rounded-2xl bg-[#EEF0FF] flex items-center justify-center">
                                        <Icon size={24} className="text-[#5046E5]" aria-hidden="true" />
                                    </div>
                                </div>

                                <h3 className="mb-3 text-base sm:text-lg font-bold text-[#111827]">
                                    {material.title}
                                </h3>
                                <p className="mb-8 text-xs text-[#6B7280] font-medium leading-relaxed">
                                    شامل المحاضرات والسكاشن وشيتات الامتحانات وأسئلة السنين السابقة.
                                </p>
                            </div>

                            <a
                                href="/login"
                                className="w-full rounded-xl bg-[#111827] py-3 text-center text-sm font-bold text-white transition-all hover:bg-[#5046E5] shadow-sm"
                            >
                                دخول للمادة
                            </a>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
