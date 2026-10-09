import type { Metadata } from "next";
import Link from "next/link";
import {
    BookOpen,
    GraduationCap,
    MessageCircle,
    MonitorPlay,
    Trophy,
    UserPlus,
} from "lucide-react";

export const metadata: Metadata = {
    title: "IT Academy",
    description:
        "منصة مذاكرة أسرع 10× لدفعتك — مذكرات، فيديوهات شرح، بنك أسئلة، وشهادات PDF.",
};

/* ------------------------------------------------------------------ */
/* Data (content copied verbatim from the approved home.html)          */
/* ------------------------------------------------------------------ */

const VALUE_CARDS = [
    { icon: MessageCircle, title: "دعم 24/7", desc: "واتساب الدفعة الفوري" },
    { icon: GraduationCap, title: "شهادة PDF", desc: "توليد فوري معتمد" },
    { icon: MonitorPlay, title: "شرح YouTube خاص", desc: "محتوى آمن للدفعة فقط" },
    { icon: BookOpen, title: "100% منهج الكلية", desc: "مذكرات + فيديوهات شرح" },
] as const;

const HOW_IT_WORKS = [
    {
        icon: UserPlus,
        step: "خطوة 1",
        title: "أنشئ حسابك",
        desc: "سجل بالإيميل الجامعي أو كود الدفعة في أقل من دقيقة.",
    },
    {
        icon: BookOpen,
        step: "خطوة 2",
        title: "اختر مادتك",
        desc: "افتح المادة وشوف المحاضرات والملخصات والشيتات.",
    },
    {
        icon: Trophy,
        step: "خطوة 3",
        title: "ذاكر وتفوق",
        desc: "حل بنك الأسئلة وولّد شهادتك بعد إتمام المادة.",
    },
] as const;

const STATS = [
    { value: "+2000", label: "طالب بيذاكر معانا" },
    { value: "+300", label: "فيديو شرح للدفعة" },
    { value: "+5000", label: "سؤال وإجابة نموذجية" },
    { value: "98%", label: "نسبة رضا الدفعة" },
] as const;

const FEATURES = [
    {
        step: "01",
        title: "سرعة فائقة وتصفح سلس",
        desc: "تصفح المحاضرات والملخصات بدون أي تقطيع أو إعلانات مزعجة.",
    },
    {
        step: "02",
        title: "تحديثات دقيقة أول بأول",
        desc: "المحتوى بيتحدث فوراً مع كل دكتور وكل تنبيه ينزل في السكشن.",
    },
    {
        step: "03",
        title: "بنك اسئلة الامتحانات السابقة",
        desc: "أسئلة سنين فاتت مرتبة ومنسقة مع إضافات حلول نموذجية.",
    },
] as const;

const MATERIALS = [
    { title: "الذكاء الاصطناعي وهياكل البيانات" },
    { title: "شبكات الحاسب المتقدمة" },
    { title: "تطوير الويب الحديث" },
] as const;

const TESTIMONIALS = [
    {
        quote:
            '"الموقع ريحنا خالص الترم ده، الشرح منظم والملخصات بتنزل في وقتها قبل الامتحانات بيومين."',
        name: "محمود أحمد",
        level: "فرقة ثالثة IT",
    },
    {
        quote:
            '"أفضل منصة استخدمتها في الكلية، الدعم سريع جداً وبتوفر وقت ضخم جداً في المذاكرة."',
        name: "سارة محمد",
        level: "فرقة تانية IT",
    },
] as const;

const FREE_FEATURES = [
    "✓ مواد الأسبوع الأول والثاني",
    "✓ دعم عام عبر جروب الدفعة",
] as const;

const FULL_FEATURES = [
    "✓ كل المهارات والمواد والملخصات",
    "✓ شهادات معتمدة فورية",
    "✓ دعم خاص 24/7",
] as const;

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

const NAV_LINKS = [
    { href: "#features", label: "المميزات" },
    { href: "#materials", label: "المواد" },
    { href: "#testimonials", label: "آراء الطلاب" },
    { href: "#pricing", label: "الأسعار" },
] as const;

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
        <section id="materials" className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6">
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
            className="border-t border-[#E5E7EB] bg-white py-20"
        >
            <div className="mx-auto max-w-[1120px] px-4 text-center sm:px-6">
                <h2 className="mb-12 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                    رأي دُفعتنا في المنصة
                </h2>
                <div className="grid grid-cols-1 gap-6 text-right md:grid-cols-2">
                    {TESTIMONIALS.map((item) => (
                        <div
                            key={item.name}
                            className="rounded-2xl border border-[#E5E7EB] bg-[#F7F7FF] p-6"
                        >
                            <p className="mb-4 text-sm leading-relaxed text-[#111827]">
                                {item.quote}
                            </p>
                            <span className="block text-sm font-bold text-[#111827]">
                                {item.name}
                            </span>
                            <span className="text-xs text-[#6B7280]">{item.level}</span>
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
        <section
            id="pricing"
            className="mx-auto max-w-[1120px] px-4 py-20 text-center sm:px-6"
        >
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                باقات الأسعار للدفعة
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-sm text-[#6B7280] sm:text-base">
                أسعار رمزية ومناسبة للجميع عشان الكل يتفوق
            </p>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-right md:grid-cols-2">
                <div className="flex flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                    <div>
                        <h3 className="mb-2 text-lg font-bold text-[#111827]">
                            الباقة المجانية
                        </h3>
                        <p className="mb-6 text-xs text-[#6B7280]">
                            تجربة محتوى أول أسبوعين
                        </p>
                        <div className="mb-6 text-3xl font-bold text-[#111827]">0 جنية</div>
                        <ul className="mb-8 space-y-3 text-sm text-[#6B7280]">
                            {FREE_FEATURES.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                    <Link
                        href="/register"
                        className="w-full rounded-xl bg-[#F7F7FF] py-3 text-center font-medium text-[#111827] transition-colors hover:bg-slate-100"
                    >
                        ابدأ مجاناً
                    </Link>
                </div>

                <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#111827] p-8 text-white shadow-xl">
                    <div className="absolute left-4 top-4 rounded-full bg-[#5046E5] px-2.5 py-1 text-[10px] font-bold text-white">
                        الأكثر طلباً
                    </div>
                    <div>
                        <h3 className="mb-2 text-lg font-bold">باقة الدفعة الكاملة</h3>
                        <p className="mb-6 text-xs text-slate-400">
                            وصول كامل لكل الترمات والمواد
                        </p>
                        <div className="mb-6 text-3xl font-bold text-[#5046E5]">
                            متاحة الآن
                        </div>
                        <ul className="mb-8 space-y-3 text-sm text-slate-300">
                            {FULL_FEATURES.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                    <Link
                        href="/register"
                        className="w-full rounded-xl bg-[#5046E5] py-3 text-center font-medium text-white transition-colors hover:bg-[#4338CA]"
                    >
                        اشترك الآن
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* 10. Footer                                                          */
/* ------------------------------------------------------------------ */

function SiteFooter() {
    return (
        <footer className="border-t border-[#E5E7EB] py-10 text-center text-xs text-[#6B7280]">
            <p>© 2026 IT Academy. جميع الحقوق محفوظة لدفعتك.</p>
        </footer>
    );
}
