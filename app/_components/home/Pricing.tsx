import { Check, Star, X } from "lucide-react";

export function Pricing() {
    return (
        <div className="max-w-6xl w-full mx-auto text-center py-12" id="pricing">

            {/* Header & Subtitle */}
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">اختر الباقة اللي تناسبك</h2>
            <p className="text-sm sm:text-base text-[#6B7280] mb-8 font-medium">ابداً مجاناً، ورقي وقت ما تحتاج. كل الباقات المدفوعة بضمان استرداد 14 يوم.</p>

            {/* Toggle Switch (ترم واحد / السنة كاملة) */}
            <div className="inline-flex items-center bg-[#111827] p-1.5 rounded-full mb-16 shadow-md">
                <button className="bg-[#5046E5] text-white text-xs sm:text-sm font-bold px-6 py-2 rounded-full transition-all">
                    ترم واحد
                </button>
                <button className="text-slate-400 hover:text-white text-xs sm:text-sm font-bold px-6 py-2 rounded-full transition-all flex items-center gap-1.5">
                    السنة كاملة <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">-25%</span>
                </button>
            </div>

            {/* Pricing Cards Grid (3 Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center text-right">

                {/* 1. باقة المجموعات (اليسار) */}
                <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <h3 className="font-bold text-lg mb-1 text-[#111827]">مجموعات</h3>
                        <p className="text-xs text-[#6B7280] mb-6 font-medium">انت وصحابك — أوفر بكتير</p>

                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-black tracking-tight">99</span>
                            <span className="text-xs font-bold text-[#6B7280]">جنية / للفرد</span>
                        </div>
                        <p className="text-[11px] text-[#6B7280] mb-8 font-medium">من 3 أفراد فأكثر</p>

                        <ul className="text-xs sm:text-sm text-[#111827] space-y-3.5 mb-8 font-medium">
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-emerald-600" aria-hidden="true" /> كل مميزات PRO</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-emerald-600" aria-hidden="true" /> جروب خاص بشلتك</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-emerald-600" aria-hidden="true" /> تحدي أسبوعي + جوائز</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-emerald-600" aria-hidden="true" /> متابعة ولي الأمر (اختياري)</li>
                        </ul>
                    </div>
                    <button className="w-full bg-[#111827] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-sm">
                        كون مجموعتك
                    </button>
                </div>

                {/* 2. الدفعة PRO (المنتصف - البارز والملون) */}
                <div className="bg-[#5046E5] text-white p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden transform lg:-translate-y-4 border border-indigo-400/30">
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1 bg-amber-400 text-slate-900 text-[10px] px-3 py-1 rounded-full font-black shadow-md">
                        الأكثر اشتراكاً <Star size={10} className="shrink-0 fill-slate-900 text-slate-900" aria-hidden="true" />
                    </div>

                    <div className="pt-2">
                        <h3 className="font-bold text-lg mb-1 text-white">الدفعة PRO</h3>
                        <p className="text-xs text-indigo-100 mb-6 font-medium">كل حاجة + أولويـة الدعم</p>

                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-black tracking-tight">149</span>
                            <div className="text-right">
                                <span className="text-xs line-through text-indigo-200 block">249</span>
                                <span className="text-xs font-bold text-indigo-100">جنية / ترم</span>
                            </div>
                        </div>
                        <p className="text-[11px] text-indigo-200 mb-8 font-medium">أقل من 1 جنيه في اليوم • ضمان 14 يوم</p>

                        <ul className="text-xs sm:text-sm text-white space-y-3.5 mb-8 font-medium">
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-amber-300" aria-hidden="true" /> كل المواد الـ 6 كاملة</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-amber-300" aria-hidden="true" /> بنك 3,500+ سؤال بالشرح</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-amber-300" aria-hidden="true" /> 20 امتحان تجريبي بتصحيح فوري</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-amber-300" aria-hidden="true" /> مذكرات PDF + خطط مذاكرة</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-amber-300" aria-hidden="true" /> جروب الدفعة + دعم ليلة الامتحان</li>
                        </ul>
                    </div>

                    <div>
                        <button className="w-full bg-white hover:bg-slate-100 text-[#5046E5] font-black py-3.5 rounded-xl transition-all text-sm shadow-lg mb-3">
                            اشترك في PRO ←
                        </button>
                        <span className="text-[11px] text-indigo-200 block font-medium">انضم لـ 620 طالب PRO هذا الترم</span>
                    </div>
                </div>

                {/* 3. الباقة المجانية (اليمين) */}
                <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <h3 className="font-bold text-lg mb-1 text-[#111827]">مجاني</h3>
                        <p className="text-xs text-[#6B7280] mb-6 font-medium">جرب قبل ما تدفع</p>

                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-black tracking-tight">0</span>
                            <span className="text-xs font-bold text-[#6B7280]">جنية</span>
                        </div>
                        <p className="text-[11px] text-[#6B7280] mb-8 font-medium">مجاني للأبد</p>

                        <ul className="text-xs sm:text-sm text-[#111827] space-y-3.5 mb-8 font-medium">
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-emerald-600" aria-hidden="true" /> 3 دروس من كل مادة</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-emerald-600" aria-hidden="true" /> 100 سؤال بنك الأسئلة</li>
                            <li className="flex items-center gap-2"><Check size={15} strokeWidth={3} className="shrink-0 text-emerald-600" aria-hidden="true" /> امتحان تجريبي واحد</li>
                            <li className="flex items-center gap-2 text-slate-300"><X size={15} strokeWidth={3} className="shrink-0 text-slate-300" aria-hidden="true" /> ملخصات PDF للتحميل</li>
                            <li className="flex items-center gap-2 text-slate-300"><X size={15} strokeWidth={3} className="shrink-0 text-slate-300" aria-hidden="true" /> خطط مذاكرة مخصصة</li>
                        </ul>
                    </div>
                    <button className="w-full bg-white border border-[#E5E7EB] text-[#111827] hover:bg-slate-50 font-bold py-3.5 rounded-xl transition-colors text-sm shadow-sm">
                        ابدأ مجاناً
                    </button>
                </div>

            </div>

            {/* Footer Payment Methods Note */}
            <div className="mt-16 text-center text-xs text-[#6B7280] font-medium tracking-wide">
                <span>دفع آمن بـ فودافون كاش</span> • <span>انستاباي</span> • <span>بطاقات بنكية</span> • <span>فاتورة رسمية للجامعة عند الطلب</span>
            </div>

        </div>
    );
}
