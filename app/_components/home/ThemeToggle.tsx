"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/* Theme toggle for the header. Light is the default; choosing dark adds
   the `.dark` class to <html>, which swaps the token overrides in
   globals.css. The choice persists in localStorage and is applied before
   hydration by the inline script in app/layout.tsx, so returning dark
   users never see a light flash.
   The toggle reads the theme through useSyncExternalStore so the first
   client render matches the server (light default) and the icons sync
   without a hydration-mismatch warning. */

const THEME_KEY = "it-academy-theme";

function getSnapshot(): boolean {
    return document.documentElement.classList.contains("dark");
}

/** Light is the default theme, so the server always renders light. */
function getServerSnapshot(): boolean {
    return false;
}

function subscribe(onChange: () => void): () => void {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
    return () => observer.disconnect();
}

export function ThemeToggle() {
    const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    function toggle() {
        const next = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem(THEME_KEY, next ? "dark" : "light");
        } catch {
            /* storage unavailable: the theme still applies for this visit */
        }
    }

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={dark}
            aria-label={dark ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
            title={dark ? "الوضع النهاري" : "الوضع الليلي"}
            className="flex size-10 shrink-0 items-center justify-center rounded-control border border-line text-ink transition-colors hover:bg-surface-muted"
        >
            {/* Both icons stay in the DOM so hydration never mismatches;
                visibility is driven by the current state only. */}
            <Sun size={18} aria-hidden="true" className={dark ? "hidden" : ""} />
            <Moon size={18} aria-hidden="true" className={dark ? "" : "hidden"} />
            <span className="sr-only">{dark ? "الوضع النهاري" : "الوضع الليلي"}</span>
        </button>
    );
}
