import {
    BookOpen,
    Cpu,
    Globe,
    GraduationCap,
    ListChecks,
    MessageCircle,
    MonitorPlay,
    Network,
    RefreshCw,
    Trophy,
    UserPlus,
    Zap,
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
        title: "أنشئ حسابك",
        desc: "سجل بالإيميل الجامعي أو كود الدفعة في أقل من دقيقة.",
    },
    {
        icon: BookOpen,
        title: "اختر مادتك",
        desc: "افتح المادة وشوف المحاضرات والملخصات والشيتات.",
    },
    {
        icon: Trophy,
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
        icon: Zap,
        title: "سرعة فائقة وتصفح سلس",
        desc: "تصفح المحاضرات والملخصات بدون أي تقطيع أو إعلانات مزعجة.",
    },
    {
        icon: RefreshCw,
        title: "تحديثات دقيقة أول بأول",
        desc: "المحتوى بيتحدث فوراً مع كل دكتور وكل تنبيه ينزل في السكشن.",
    },
    {
        icon: ListChecks,
        title: "بنك اسئلة الامتحانات السابقة",
        desc: "أسئلة سنين فاتت مرتبة ومنسقة مع إضافات حلول نموذجية.",
    },
];

export const MATERIALS: Material[] = [
    {
        title: "الذكاء الاصطناعي وهياكل البيانات",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "شبكات الحاسب المتقدمة",
        icon: Network,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "تطوير الويب الحديث",
        icon: Globe,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    },
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
