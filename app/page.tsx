import type { Metadata } from "next";
import { SiteHeader } from "./_components/home/SiteHeader";
import { Hero } from "./_components/home/Hero";
import { HowItWorks } from "./_components/home/HowItWorks";
import { Stats } from "./_components/home/Stats";
import { Features } from "./_components/home/Features";
import { Materials } from "./_components/home/Materials";
import { Testimonials } from "./_components/home/Testimonials";
import { Pricing } from "./_components/home/Pricing";
import { SiteFooter } from "./_components/home/SiteFooter";

export const metadata: Metadata = {
    title: "IT Academy",
    description:
        "منصة مذاكرة أسرع 10× لدفعتك — مذكرات، فيديوهات شرح، بنك أسئلة، وشهادات PDF.",
};

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
