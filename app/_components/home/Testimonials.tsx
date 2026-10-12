import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../consts";

export function Testimonials() {
    return (
        <section
            id="testimonials"
            className="border-t border-[#E5E7EB] bg-white py-20 relative overflow-hidden"
        >
            <div className="mx-auto max-w-280 px-4 text-center sm:px-6">

                {/* Heading & Subtitle */}
                <div className="mb-14">
                    <span className="text-xs bg-[#EEF0FF] text-[#5046E5] font-semibold px-3 py-1 rounded-full mb-3 inline-block">آراء الطلاب</span>
                    <h2 className="text-2xl font-black tracking-tight text-[#111827] sm:text-3xl">
                        رأي دُفعتنا في المنصة
                    </h2>
                    <p className="text-sm text-[#6B7280] mt-2">قصص نجاح حقيقية من طلاب بيستفيدوا من المنصة كل يوم</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-8 text-right md:grid-cols-2">
                    {TESTIMONIALS.map((item) => (
                        <div
                            key={item.name}
                            className="relative rounded-3xl border border-[#E5E7EB] bg-[#F7F7FF] p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                        >
                            <div>
                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4 text-amber-400 text-sm">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="shrink-0 fill-amber-400 text-amber-400" aria-hidden="true" />
                                    ))}
                                </div>

                                <p className="mb-6 text-sm sm:text-base leading-relaxed text-[#111827] font-medium">
                                    &quot;{item.quote}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]/60">
                                <div className="w-10 h-10 rounded-full bg-[#5046E5] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <span className="block text-sm font-bold text-[#111827]">
                                        {item.name}
                                    </span>
                                    <span className="text-xs text-[#6B7280] font-medium">{item.level}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
