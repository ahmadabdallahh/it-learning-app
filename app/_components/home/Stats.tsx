import { STATS } from "../../consts";

export function Stats() {
    return (
        <section className="mx-auto max-w-280 px-4 pb-20 sm:px-6">
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm sm:grid-cols-4">
                {STATS.map((stat) => (
                    <div key={stat.label}>
                        <p
                            dir="ltr"
                            className="text-3xl font-extrabold tracking-tight text-[#5046E5]"
                        >
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#6B7280] sm:text-sm">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
