import type { Metadata } from "next";
import "./globals.css";
// Self-hosted Cairo via Fontsource. (next/font/google downloads font
// binaries from fonts.gstatic.com at build time, which is unreachable
// from this environment, so the font is bundled locally instead.
// Subsets + weights mirror the previous next/font configuration.)
import "@fontsource/cairo/arabic-400.css";
import "@fontsource/cairo/arabic-500.css";
import "@fontsource/cairo/arabic-600.css";
import "@fontsource/cairo/arabic-700.css";
import "@fontsource/cairo/arabic-800.css";
import "@fontsource/cairo/arabic-900.css";
import "@fontsource/cairo/latin-400.css";
import "@fontsource/cairo/latin-500.css";
import "@fontsource/cairo/latin-600.css";
import "@fontsource/cairo/latin-700.css";
import "@fontsource/cairo/latin-800.css";
import "@fontsource/cairo/latin-900.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "IT Academy - منصة مذاكرة أسرع 10× لدفعتك",
    description:
        "مذكرات، ملخصات، شرح فيديو، بنك أسئلة، وشهادات PDF. كل منهج كلية IT في مكان واحد.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="ar" dir="rtl" className="h-full antialiased">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{var t=localStorage.getItem("it-academy-theme");if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`,
                    }}
                />
            </head>
            <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
        </html>
    );
}
