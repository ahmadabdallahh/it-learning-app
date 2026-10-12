"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";

type Billing = "term" | "year";

/**
 * PRO is the only plan that advertises a term price and a full-year discount,
 * so the billing switch drives that card. The year figures are derived from the
 * -25% already advertised in the UI. TODO: replace with real annual pricing.
 */
const PRO_PRICING: Record<Billing, { now: string; was: string; unit: string }> =
    {
        term: { now: "149", was: "249", unit: "جنية / ترم" },
        year: { now: "224", was: "298", unit: "جنية / سنة" },
    };

const GROUP_FEATURES = [
    "كل مميزات PRO",
    "جروب خاص بشلتك",
    "تحدي أسبوعي + جوائز",
    "متابعة ولي الأمر (اختياري)",
];

const PRO_FEATURES = [
    "كل المواد الـ 6 كاملة",
    "بنك 3,500+ سؤال بالشرح",
    "20 امتحان تجريبي بتصحيح فوري",
    "مذكرات PDF + خطط مذاكرة",
    "جروب الدفعة + دعم ليلة الامتحان",
];

const FREE_INCLUDED = [
    "3 دروس من كل مادة",
    "100 سؤال بنك الأسئلة",
    "امتحان تجريبي واحد",
];

const FREE_EXCLUDED = ["ملخصات PDF للتحميل", "خطط مذاكرة مخصصة"];

const checkIcon = (
    <Check
        size={16}
        strokeWidth={3}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
    />
);

export function PricingBilling() {
    const [billing, setBilling] = useState<Billing>("term");
    const pro = PRO_PRICING[billing];

    return (
        <>
            <div
                role="group"
                aria-label="مدة اشتراك باقة PRO"
                className="inline-flex items-center rounded-full bg-ink p-1.5 shadow-card"
            >
                <button
                    type="button"
                    onClick={() => setBilling("term")}
                    aria-pressed={billing === "term"}
                    className={`rounded-full px-6 py-2 text-xs font-bold transition-colors sm:text-sm ${
                        billing === "term"
                            ? "bg-primary text-primary-foreground"
                            : "text-canvas/60 hover:text-canvas"
                    }`}
                >
                    ترم واحد
                </button>
                <button
                    type="button"
                    onClick={() => setBilling("year")}
                    aria-pressed={billing === "year"}
                    className={`flex items-center gap-1.5 rounded-full px-6 py-2 text-xs font-bold transition-colors sm:text-sm ${
                        billing === "year"
                            ? "bg-primary text-primary-foreground"
                            : "text-canvas/60 hover:text-canvas"
                    }`}
                >
                    السنة كاملة
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                        -25%
                    </span>
                </button>
            </div>

            <div className="mt-14 grid grid-cols-1 items-center gap-8 text-start lg:grid-cols-3">
                {/* Groups */}
                <article className="flex flex-col rounded-card border border-line bg-surface p-8 shadow-card">
                    <h3 className="text-lg font-bold text-ink">مجموعات</h3>
                    <p className="mt-1 text-xs font-medium text-ink-soft">
                        انت وصحابك، أوفر بكتير
                    </p>

                    <div className="mt-6 flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold tracking-tight text-ink">
                            99
                        </span>
                        <span className="text-xs font-bold text-ink-soft">
                            جنية / للفرد / ترم
                        </span>
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-ink-soft">
                        من 3 أفراد فأكثر
                    </p>

                    <ul className="mt-8 flex-1 space-y-3.5 text-sm font-medium text-ink">
                        {GROUP_FEATURES.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="text-success">{checkIcon}</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/register"
                        className="mt-8 inline-flex items-center justify-center rounded-control bg-ink px-4 py-3.5 text-sm font-bold text-canvas transition-colors hover:bg-primary active:translate-y-px"
                    >
                        كون مجموعتك
                    </Link>
                </article>

                {/* PRO (featured) */}
                <article className="relative flex flex-col overflow-hidden rounded-card bg-primary p-8 text-primary-foreground shadow-lift lg:-translate-y-4">
                    <span className="absolute end-4 top-4 rounded-full bg-surface px-3 py-1 text-[11px] font-bold text-primary">
                        الأكثر اشتراكاً
                    </span>

                    <h3 className="text-lg font-bold">الدفعة PRO</h3>
                    <p className="mt-1 text-xs font-medium text-primary-foreground/80">
                        كل حاجة + أولوية الدعم
                    </p>

                    <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold tracking-tight">
                            {pro.now}
                        </span>
                        <span className="text-start">
                            <span className="block text-xs font-medium line-through opacity-70">
                                {pro.was}
                            </span>
                            <span className="text-xs font-bold">
                                {pro.unit}
                            </span>
                        </span>
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-primary-foreground/80">
                        ضمان استرداد 14 يوم
                    </p>

                    <ul className="mt-8 flex-1 space-y-3.5 text-sm font-medium">
                        {PRO_FEATURES.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                {checkIcon}
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                        <Link
                            href="/register"
                            className="flex w-full items-center justify-center rounded-control bg-surface px-4 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-surface-muted active:translate-y-px"
                        >
                            اشترك في PRO
                        </Link>
                        <span className="mt-3 block text-[11px] font-medium text-primary-foreground/80">
                            انضم لـ 620 طالب PRO هذا الترم
                        </span>
                    </div>
                </article>

                {/* Free */}
                <article className="flex flex-col rounded-card border border-line bg-surface p-8 shadow-card">
                    <h3 className="text-lg font-bold text-ink">مجاني</h3>
                    <p className="mt-1 text-xs font-medium text-ink-soft">
                        جرب قبل ما تدفع
                    </p>

                    <div className="mt-6 flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold tracking-tight text-ink">
                            0
                        </span>
                        <span className="text-xs font-bold text-ink-soft">
                            جنية
                        </span>
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-ink-soft">
                        مجاني للأبد
                    </p>

                    <ul className="mt-8 flex-1 space-y-3.5 text-sm font-medium text-ink">
                        {FREE_INCLUDED.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="text-success">{checkIcon}</span>
                                {item}
                            </li>
                        ))}
                        {FREE_EXCLUDED.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-2 text-ink-faint"
                            >
                                <X
                                    size={16}
                                    strokeWidth={3}
                                    className="mt-0.5 shrink-0"
                                    aria-hidden="true"
                                />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/register"
                        className="mt-8 inline-flex items-center justify-center rounded-control border border-line-strong bg-surface px-4 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-surface-muted active:translate-y-px"
                    >
                        ابدأ مجاناً
                    </Link>
                </article>
            </div>
        </>
    );
}
