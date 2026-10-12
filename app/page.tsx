import type { Metadata } from "next";
import { SiteHeader } from "./_components/home/SiteHeader";
import { Hero } from "./_components/home/Hero";
import { ValueStrip } from "./_components/home/ValueStrip";
import { HowItWorks } from "./_components/home/HowItWorks";
import { Stats } from "./_components/home/Stats";
import { Features } from "./_components/home/Features";
import { Materials } from "./_components/home/Materials";
import { Testimonials } from "./_components/home/Testimonials";
import { Pricing } from "./_components/home/Pricing";
import { SiteFooter } from "./_components/home/SiteFooter";
import { RevealOnScroll } from "./_components/home/RevealOnScroll";

export const metadata: Metadata = {
    title: "IT Academy",
    description:
        "منصة مذاكرة أسرع 10× لدفعتك. مذكرات وفيديوهات شرح وبنك أسئلة وشهادات PDF.",
};

export default function HomePage() {
    return (
        <div className="bg-canvas font-sans text-ink">
            <RevealOnScroll />
            <SiteHeader />
            <main>
                <Hero />
                <ValueStrip />
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
