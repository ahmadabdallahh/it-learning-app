import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
    variable: "--font-cairo",
    subsets: ["arabic", "latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "IT Academy — منصة مذاكرة أسرع 10× لدفعتك",
    description:
        "مذكرات، ملخصات، شرح فيديو، بنك أسئلة، وشهادات PDF — كل منهج كلية IT في مكان واحد.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col font-sans">{children}</body>
        </html>
    );
}
