import { STATS } from "../../consts";

/** Bare metrics band: hairline separators, no card wrapper. */
export function Stats() {
    return (
        <section
            aria-label="أرقام المنصة"
            className="reveal border-y border-line bg-surface"
        >
            <div className="mx-auto grid max-w-280 grid-cols-2 gap-y-10 px-4 py-12 sm:grid-cols-4 sm:divide-x sm:divide-line sm:px-6">
                {STATS.map((stat) => (
                    <div key={stat.label} className="px-2 text-center sm:px-6">
                        <p
                            dir="ltr"
                            className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl"
                        >
                            {stat.value}
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-ink-soft">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
