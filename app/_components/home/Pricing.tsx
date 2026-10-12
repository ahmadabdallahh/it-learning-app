import { PricingBilling } from "./PricingBilling";

const PAYMENT_METHODS = [
    "دفع آمن بـ فودافون كاش",
    "انستاباي",
    "بطاقات بنكية",
    "فاتورة رسمية للجامعة عند الطلب",
];

export function Pricing() {
    return (
        <section id="pricing" className="reveal mx-auto max-w-280 px-4 py-20 text-center sm:px-6">
            <div className="mx-auto max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    اختر الباقة اللي تناسبك
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    ابدأ مجاناً، وارتقِ وقت ما تحتاج. كل الباقات المدفوعة بضمان
                    استرداد 14 يوم.
                </p>
            </div>

            <div className="mt-10">
                <PricingBilling />
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-ink-soft">
                {PAYMENT_METHODS.map((method) => (
                    <span key={method}>{method}</span>
                ))}
            </div>
        </section>
    );
}
