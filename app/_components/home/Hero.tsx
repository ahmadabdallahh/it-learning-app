import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function Hero() {
    return (
        <section className="mx-auto max-w-280 px-4 pb-16 pt-10 sm:px-6 lg:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="text-start lg:col-span-7">
                    <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl">
                        منصة مذاكرة أسرع{" "}
                        <span className="text-primary">10×</span> لدفعتك
                    </h1>

                    <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-soft">
                        مذكرات وملخصات وشرح فيديو وبنك أسئلة وشهادات PDF. كل منهج
                        قسم IT في مكان واحد ومرتب.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center rounded-control bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-200 hover:bg-primary-strong active:translate-y-px sm:text-base"
                        >
                            ابدأ مجاناً
                        </Link>
                        <a
                            href="#materials"
                            className="inline-flex items-center justify-center gap-1.5 rounded-control border border-line-strong bg-surface px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-surface-muted active:translate-y-px sm:text-base"
                        >
                            تصفح المواد
                            <ArrowLeft size={16} aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line bg-surface-muted shadow-lift">
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                            alt="طلاب قسم IT يذاكرون معاً على منصة IT Academy"
                            fill
                            priority
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
