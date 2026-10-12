import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../consts";

const AVATAR_TONES = ["bg-primary text-primary-foreground", "bg-ink text-canvas"];

export function Testimonials() {
    return (
        <section
            id="testimonials"
            className="reveal border-y border-line bg-surface py-20"
        >
            <div className="mx-auto max-w-280 px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                        آراء الطلاب
                    </span>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        رأي دُفعتنا في المنصة
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">
                        قصص نجاح حقيقية من طلاب بيستفيدوا من المنصة كل يوم.
                    </p>
                </div>

                <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                    {TESTIMONIALS.map((item, index) => (
                        <figure
                            key={item.name}
                            className="flex flex-col justify-between rounded-card border border-line bg-canvas p-8 shadow-card"
                        >
                            <div>
                                <div
                                    className="flex gap-1 text-amber-400"
                                    role="img"
                                    aria-label={`${item.rating} من 5`}
                                >
                                    {Array.from({ length: item.rating }).map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                size={15}
                                                className="shrink-0 fill-amber-400 text-amber-400"
                                                aria-hidden="true"
                                            />
                                        ),
                                    )}
                                </div>

                                <blockquote className="mt-5 text-base font-medium leading-relaxed text-ink">
                                    {item.quote}
                                </blockquote>
                            </div>

                            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                                <span
                                    className={`flex size-10 items-center justify-center rounded-full text-sm font-bold ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
                                    aria-hidden="true"
                                >
                                    {item.name.charAt(0)}
                                </span>
                                <span>
                                    <span className="block text-sm font-bold text-ink">
                                        {item.name}
                                    </span>
                                    <span className="text-xs font-medium text-ink-soft">
                                        {item.level}
                                    </span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
