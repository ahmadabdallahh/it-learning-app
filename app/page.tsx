import type { Metadata } from "next";
import Link from "next/link";
import {
    FEATURES,
    HOW_IT_WORKS,
    MATERIALS,
    NAV_LINKS,
    STATS,
    TESTIMONIALS,
    VALUE_CARDS,
} from "./consts";

export const metadata: Metadata = {
    title: "IT Academy",
    description:
        "منصة مذاكرة أسرع 10× لدفعتك — مذكرات، فيديوهات شرح، بنك أسئلة، وشهادات PDF.",
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
    return (
        <div className="bg-[#F7F7FF] font-sans text-[#111827]">
            <SiteHeader />
            <main>
                <Hero />
                <HowItWorks />
                <Stats />
                <Features />
                <Materials />
                <Testimonials />
                <Pricing />
            </main>
            <SiteFooter />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* 1. Navigation                                                       */
/* ------------------------------------------------------------------ */

function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 mx-auto max-w-280 px-4 py-4 sm:px-6">
            <div className="mx-auto flex max-w-268 items-center justify-between rounded-2xl border border-[#E5E7EB]/80 bg-white/80 px-6 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-bold tracking-tight text-[#111827]">
                        IT Academy{" "}
                    </span>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-medium text-[#6B7280] md:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-[#5046E5]"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-3 py-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]"
                    >
                        دخول
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                    >
                        ابدا مجاناً
                    </Link>
                </div>
            </div>
        </header>
    );
}

/* ------------------------------------------------------------------ */
/* 2. Hero                                                             */
/* ------------------------------------------------------------------ */

function Hero() {
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

/* ------------------------------------------------------------------ */
/* 3. How it works                                                    */
/* ------------------------------------------------------------------ */

function HowItWorks() {
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

/* ------------------------------------------------------------------ */
/* 4. Stats                                                           */
/* ------------------------------------------------------------------ */

function Stats() {
    return (
        <section className="mx-auto max-w-280 px-4 pb-20 sm:px-6">
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm sm:grid-cols-4">
                {STATS.map((stat) => (
                    <div key={stat.label}>
                        <p
                            dir="ltr"
                            className="text-3xl font-extrabold tracking-tight text-[#5046E5]"
                        >
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#6B7280] sm:text-sm">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* 5. Features                                                         */
/* ------------------------------------------------------------------ */

function Features() {
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

/* ------------------------------------------------------------------ */
/* 6. Materials                                                        */
/* ------------------------------------------------------------------ */

function Materials() {
    return (
        <section id="materials" className="mx-auto max-w-280 px-4 py-20 sm:px-6">
            <div className="mb-12 flex items-end justify-between">
                <div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                        المواد الدراسية المتاحة
                    </h2>
                    <p className="text-sm text-[#6B7280] sm:text-base">
                        اختر المادة وابدأ المذاكرة فوراً
                    </p>
                </div>
                <a
                    href="#"
                    className="text-sm font-semibold text-[#5046E5] hover:underline"
                >
                    عرض كل المواد ←
                </a>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {MATERIALS.map((material) => (
                    <div
                        key={material.title}
                        className="flex flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
                    >
                        <div>
                            <span className="rounded-md bg-[#EEF0FF] px-2.5 py-1 text-xs font-semibold text-[#5046E5]">
                                ترم ثاني
                            </span>
                            <h3 className="mb-2 mt-4 text-base font-bold text-[#111827] sm:text-lg">
                                {material.title}
                            </h3>
                            <p className="mb-6 text-xs text-[#6B7280]">
                                شامل المحاضرات والسكاشن وشيتات الامتحانات.
                            </p>
                        </div>
                        <Link
                            href="/login"
                            className="w-full rounded-xl bg-[#111827] py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#5046E5]"
                        >
                            دخول للمادة
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* 7. Testimonials                                                     */
/* ------------------------------------------------------------------ */

function Testimonials() {
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
                                        <span key={i}>★</span>
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

/* ------------------------------------------------------------------ */
/* 8. Pricing                                                          */
/* ------------------------------------------------------------------ */

function Pricing() {
    return (
        <div className="max-w-6xl w-full mx-auto text-center py-12">

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
                            <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> كل مميزات PRO</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> جروب خاص بشلتك</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> تحدي أسبوعي + جوائز</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> متابعة ولي الأمر (اختياري)</li>
                        </ul>
                    </div>
                    <button className="w-full bg-[#111827] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-sm">
                        كون مجموعتك
                    </button>
                </div>

                {/* 2. الدفعة PRO (المنتصف - البارز والملون) */}
                <div className="bg-[#5046E5] text-white p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden transform lg:-translate-y-4 border border-indigo-400/30">
                    <div className="absolute top-4 left-4 bg-amber-400 text-slate-900 text-[10px] px-3 py-1 rounded-full font-black shadow-md">
                        الأكثر اشتراكاً ★
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
                            <li className="flex items-center gap-2"><span className="text-amber-300 font-bold">✓</span> كل المواد الـ 6 كاملة</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300 font-bold">✓</span> بنك 3,500+ سؤال بالشرح</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300 font-bold">✓</span> 20 امتحان تجريبي بتصحيح فوري</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300 font-bold">✓</span> مذكرات PDF + خطط مذاكرة</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300 font-bold">✓</span> جروب الدفعة + دعم ليلة الامتحان</li>
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
                            <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> 3 دروس من كل مادة</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> 100 سؤال بنك الأسئلة</li>
                            <li className="flex items-center gap-2"><span className="text-emerald-600 font-bold">✓</span> امتحان تجريبي واحد</li>
                            <li className="flex items-center gap-2 text-slate-300"><span className="text-slate-300">✕</span> ملخصات PDF للتحميل</li>
                            <li className="flex items-center gap-2 text-slate-300"><span className="text-slate-300">✕</span> خطط مذاكرة مخصصة</li>
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

/* ------------------------------------------------------------------ */
/* 10. Footer                                                          */
/* ------------------------------------------------------------------ */

function SiteFooter() {
    return (
        <footer className="border-t border-[#E5E7EB] py-10 text-center text-xs text-[#6B7280]">
            <p>© {new Date().getFullYear()} IT Academy. جميع الحقوق محفوظة لدفعتك.</p>
        </footer>
    );
}
