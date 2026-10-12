import { VALUE_CARDS } from "../../consts";

/**
 * Borderless "why us" strip directly under the hero. Deliberately NOT a card
 * grid (that family is used by Materials / Testimonials / Pricing) so the page
 * keeps a varied section rhythm.
 */
export function ValueStrip() {
    return (
        <section
            aria-label="لماذا IT Academy"
            className="reveal border-y border-line bg-surface"
        >
            <div className="mx-auto grid max-w-280 grid-cols-1 gap-x-6 gap-y-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
                {VALUE_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.title}
                            className="flex items-start gap-4 text-start"
                        >
                            <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-control bg-primary-soft text-primary">
                                <Icon size={22} aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="text-base font-bold text-ink">
                                    {card.title}
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
