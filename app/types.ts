import type { LucideIcon } from "lucide-react";

/** Top navigation anchor link. */
export type NavLink = {
    href: string;
    label: string;
};

/** Hero value card (icon tile + title + supporting text). */
export type ValueCard = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

/** Single step in the "How it works" section. */
export type HowItWorksStep = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

/** Single entry in the stats band. */
export type Stat = {
    value: string;
    label: string;
};

/** Platform feature (icon tile + title + supporting text). */
export type Feature = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

/** Study material card. */
export type Material = {
    title: string;
    icon: LucideIcon;
    /** Cover image (placeholder photography until real course art exists). */
    image: string;
};

/** Student testimonial with a star rating. */
export type Testimonial = {
    name: string;
    level: string;
    quote: string;
    rating: number;
};
