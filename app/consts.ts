import {
    BookOpen,
    Cpu,
    Globe,
    GraduationCap,
    MessageCircle,
    MonitorPlay,
    Network,
    Trophy,
    UserPlus,
} from "lucide-react";
import type {
    Feature,
    HowItWorksStep,
    Material,
    NavLink,
    Stat,
    Testimonial,
    ValueCard,
} from "./types";

/* ------------------------------------------------------------------ */
/* Data (content copied verbatim from the approved home.html)          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS: NavLink[] = [
    { href: "#features", label: "المميزات" },
    { href: "#materials", label: "المواد" },
    { href: "#testimonials", label: "آراء الطلاب" },
    { href: "#pricing", label: "الأسعار" },
];

export const VALUE_CARDS: ValueCard[] = [
    { icon: MessageCircle, title: "دعم 24/7", desc: "واتساب الدفعة الفوري" },
    { icon: GraduationCap, title: "شهادة PDF", desc: "توليد فوري معتمد" },
    { icon: MonitorPlay, title: "شرح YouTube خاص", desc: "محتوى آمن للدفعة فقط" },
    { icon: BookOpen, title: "100% منهج الكلية", desc: "مذكرات + فيديوهات شرح" },
];

export const HOW_IT_WORKS: HowItWorksStep[] = [
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
];

export const STATS: Stat[] = [
    { value: "+2000", label: "طالب بيذاكر معانا" },
    { value: "+300", label: "فيديو شرح للدفعة" },
    { value: "+5000", label: "سؤال وإجابة نموذجية" },
    { value: "98%", label: "نسبة رضا الدفعة" },
];

export const FEATURES: Feature[] = [
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
];

export const MATERIALS: Material[] = [
    { title: "الذكاء الاصطناعي وهياكل البيانات", icon: Cpu },
    { title: "شبكات الحاسب المتقدمة", icon: Network },
    { title: "تطوير الويب الحديث", icon: Globe },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        name: "محمود أحمد",
        level: "فرقة ثالثة IT",
        quote:
            "الموقع ريحنا خالص الترم ده، الشرح منظم والملخصات بتنزل في وقتها قبل الامتحانات بيومين.",
        rating: 5,
    },
    {
        name: "سارة محمد",
        level: "فرقة تانية IT",
        quote:
            "أفضل منصة استخدمتها في الكلية، الدعم سريع جداً وبتوفر وقت ضخم جداً في المذاكرة والبحث.",
        rating: 5,
    },
];
