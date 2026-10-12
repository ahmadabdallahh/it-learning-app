---
name: IT Academy
description: The whole IT cohort's study hall — calm, warm, Arabic-first.
colors:
  study-hall-indigo: "#5046E5"
  study-hall-indigo-deep: "#4338CA"
  study-hall-indigo-soft: "#EEF0FF"
  lavender-canvas: "#F7F7FF"
  surface-white: "#FFFFFF"
  surface-muted: "#F4F4F8"
  lilac-tint: "#E8E9FF"
  ink-navy: "#111827"
  ink-soft: "#6B7280"
  ink-faint: "#9CA3AF"
  hairline: "#E5E7EB"
  hairline-strong: "#D1D5DB"
  success-green: "#16A34A"
  error-red: "#DC2626"
  rating-gold: "#FBBF24"
typography:
  display:
    fontFamily: "Cairo, ui-sans-serif, system-ui, 'Segoe UI', Tahoma, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Cairo, ui-sans-serif, system-ui, 'Segoe UI', Tahoma, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cairo, ui-sans-serif, system-ui, 'Segoe UI', Tahoma, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Cairo, ui-sans-serif, system-ui, 'Segoe UI', Tahoma, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Cairo, ui-sans-serif, system-ui, 'Segoe UI', Tahoma, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  card: "16px"
  control: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "#5046E5"
    textColor: "#FFFFFF"
    rounded: "12px"
    padding: "14px 28px"
    typography: "600 0.875rem/1.4 Cairo"
  button-dark:
    backgroundColor: "#111827"
    textColor: "#F7F7FF"
    rounded: "12px"
    padding: "12px 16px"
    typography: "700 0.875rem/1.4 Cairo"
  button-secondary:
    backgroundColor: "#FFFFFF"
    textColor: "#111827"
    rounded: "12px"
    padding: "14px 28px"
    typography: "600 0.875rem/1.4 Cairo"
  card:
    backgroundColor: "#FFFFFF"
    rounded: "16px"
    padding: "24px"
  chip:
    backgroundColor: "#EEF0FF"
    textColor: "#5046E5"
    rounded: "999px"
    padding: "4px 12px"
    typography: "600 0.75rem/1.4 Cairo"
  toggle:
    backgroundColor: "#111827"
    textColor: "#FFFFFF"
    rounded: "999px"
    padding: "6px"
  input:
    backgroundColor: "#F7F7FF"
    textColor: "#111827"
    rounded: "12px"
    padding: "12px 16px"
    typography: "400 0.875rem/1.4 Cairo"
---

# Design System: IT Academy

## Overview

**The Cohort Study Hall.** The whole batch's curriculum in one calm, organized room — lavender-white walls, paper-white cards resting on hairlines, and a single Study-Hall Indigo accent that quietly marks the one thing to do in each section. The voice is warm and student-first; the components are refined and restrained. Cairo carries everything, right-to-left, numerals flowing LTR inline ("149 جنية").

- The accent is Indigo; the material is paper; the tone is a study hall at 10pm before the exam — alert, not anxious.
- The indigo is used like a highlighter: tints (`indigo-soft`) edge the icons and chips, solid indigo paints the featured plan and one primary action per section.
- Depth answers to the hand: flat at rest, lifting only on hover, focus, or the featured plan.

## Named Rules

- **One Accent Rule.** Study-Hall Indigo is the only brand accent. Green is reserved for success status chips, gold for star ratings, red for errors. No gradients, no third accent, anywhere.
- **The Indigo Highlighter.** Indigo tints edges (icons, chips, step markers sit on `indigo-soft`); solid indigo is spent on the single primary CTA of each section and the featured PRO plan. Weight, not coverage.
- **The 16 / 12 / Full Rule.** Cards are 16px, controls and icon tiles are 12px, chips and avatars are full circles. If a corner isn't one of these three, it doesn't belong to this system.
- **The Flat Baseline Rule.** Cards rest flat on a 1px hairline with a whisper of ambient shadow. `shadow-lift` is only earned: hover on interactive cards, the featured plan, the hero image.
- **The Hairline Rule.** Group content with hairlines, not extra cards — the stats band divides by `line`, bands separate with `border-y`, never a box-on-box on box.
- **One Family, One Axis.** Cairo only, 400–900, one weight jump separates labels (600) from titles (700) from headlines (800). No second family, no italic, no serif flourishes.

## Typography

**One self-hosted family, many weights.** Cairo (400–900, loaded in `app/layout.tsx`) renders every screen, Arabic and Latin alike, on `dir="rtl"` pages. Hierarchy is a weight-and-size ladder, not a family change.

- **Display** — hero headline. `text-4xl sm:text-5xl` extrabold (800), tight leading, `tracking-tight`. Used once per page, in the hero.
- **Headline** — section headers (`text-2xl sm:text-3xl` bold 700) with a soft-ink lead sentence underneath; never uppercase, never slanted.
- **Title** — card and step titles at 1.125rem bold (700), one line where possible.
- **Body** — text-sm/base (0.875–1rem) in `ink-soft` over `ink-navy` headings; `ink-faint` only for footnotes and meta.
- **Label** — eyebrow pills and chips at 0.75rem semibold; tiny badges may drop to 10–11px bold.
- Numerals and prices render `dir="ltr"` inline inside the RTL flow so "149 جنية" and "+2000" read correctly.

## Layout

**One column, one desk width.** Everything rides a `max-w-280` (70rem / 1120px) container with `px-4 sm:px-6`, padding from the touch-safe edges, English announces itself only in code — layout flexes RTL-first via logical props (`start`/`end`).

- The page is a stack of full-width sections at `py-20` on the canvas, with alternating bands (`border-y border-line bg-surface`) for testimonials and hats on the footer and nav.
- Grids, not masonry: 4-up value strip and stats band, 3-up steps and materials, 2-up testimonials, a 2-column bento for features, an asymmetric hero split.
- Sections mount in a strict order: hero → values → how it works → stats → features → materials → testimonials → pricing → footer.
- Scroll reveals are opacity + 20px translate over `--ease-fluid` (0.7s), driven by one IntersectionObserver leaf — disabled entirely under `prefers-reduced-motion` and `scripting: none` fallbacks.

## Elevation

**Flat by default, lift on hover.** The mind's-eye of the system is paper on a desk: a 1px hairline border and a barely-there ambient shadow at rest, and one indigo-tinted lift for the moments that matter.

- `shadow-card` — hairline + soft ambient (`0 1px 2px … / 0.04` + `0 12px 32px -16px …/ 0.10`). The rest state for every standalone card and the nav shell.
- `shadow-lift` — the same hairline plus an indigo-tinted float (`0 20px 44px -20px rgb(80 70 229 / 0.28)`). Earned by: hover on material/feature cards (`hover:shadow-lift`), the hero image, the featured PRO plan (which also floats `-translate-y-4` on desktop).
- Interactive controls translate `1px` down on `:active`; dark mode deepens both shadows with black-tinted offsets (values live in the dark override block in `globals.css`).

## Shapes

**One radius scale, three stops.** Corners are 16px (cards and nav shell), 12px (buttons, inputs, icon tiles), or fully round (chips, avatars, step markers, the billing toggle). Borders are 1px hairlines in `line`/`line-strong`.

- Images are cropped to fixed ratios in `overflow-hidden` frames: `4/3` hero, `16/10` bento and material covers, with `rounded-card` clipping.
- Icon tiles are `size-10/11/12` (40–48px) squares on `indigo-soft` with indigo glyphs; step markers are `size-12` circles with a `ring-4 ring-canvas` separation and a hairline connector between steps.
- Avatars are full circles tumbling through a fixed set of muted tones; star ratings are five gold glyphs.

## Color

**Lavender-white paper, deep-navy ink, one indigo accent.** Soft, cool whites keep the room calm; near-black navy keeps text authoritative; indigo means "act here."

- **Accent** — `indigo #5046E5`, deepened to `#4338CA` on hover; the soft tint `#EEF0FF` backs every icon tile and chip. White text on solid indigo passes contrast.
- **Surfaces** — canvas `#F7F7FF`, white `#FFFFFF`, muted `#F4F4F8` (image placeholders), lilac tint `#E8E9FF` (recessed accents).
- **Ink** — `#111827` for headings and dark CTAs, `#6B7280` for body/secondary text, `#9CA3AF` for faint meta. Hairlines `#E5E7EB` and `#D1D5DB` structure without shouting.
- **Semantic** — `success #16A34A` for positive status chips ("متاح"), `error #DC2626` for problems, `#FBBF24` gold strictly for star ratings.
- The palette is delta-tuned in an `html.dark` override block: tokens swap (canvas `#0B0B13`, surfaces `#14141E`, primary brightens to `#6A60EE`) while light stays the default identity. The header theme toggle adds the `.dark` class and persists the choice in localStorage (`it-academy-theme`); a pre-hydration script in `layout.tsx` restores a stored dark choice without a flash of light.
- All surfaces sit on the __tokens__, not raw hex — retune the palette from `:root` and the `@theme inline` block in one place.

## Components

**Refined, restrained controls on paper cards.** Buttons are 12px with a 1px active dip; cards are 16px hairline frames that lift on hover; chips are soft indigo pills; the whole page repeats this grammar.

- **Buttons.** Primary = solid indigo, `14px 28px`, `hover:bg-primary-strong`, `shadow-lift` in the hero. Secondary = white with a `line-strong` border, fills `surface-muted` on hover. Dark CTA = `bg-ink text-canvas`, turning primary on hover (used as card actions: "تصفح المواد", "ابدأ مجاناً"). Every button dips 1px on `:active` and wears the global indigo `:focus-visible` ring.
- **Cards.** Standard: `rounded-card`, `border-line`, `bg-surface`, `shadow-card`; `hover:shadow-lift` on interactive ones. Editorial: `p-7`–`p-8` with an image band on top (`Material`, `Feature`). Featured: the indigo PRO plan — `bg-primary` solid, white badge pill, `shadow-lift`, floating 16px above its neighbors on desktop.
- **Chips / eyebrows.** Full pill, `indigo-soft` fill, indigo 600-weight text at 12px — section eyebrows ("الدفعة كاملة في مكان واحد"), the "متاح هذا الترم" status, and the featured-plan badge.
- **Stats band.** Bare, no card: 2×2 → 4-up with hairline dividers, numbers in heavy Cairo with soft-ink labels.
- **Steps.** Three icon circles joined by a hairline, 600-weight Arabic action labels ("جهّز حسابك" → "شوف المحتوى" → "ذاكر وخلص").
- **Billing toggle.** One pill switch (`bg-ink`, `p-1.5`) with two full segments; the pressed segment turns solid indigo with white text, `aria-pressed` per segment — billed as "شهري / سنوي".
- **Inputs.** Text fields and OTP digit boxes sit on `bg-canvas/50` over the white card with a hairline border; the indigo border marks focus. Radius is `rounded-control` (12px), padding `12px 16px`.
- **Alerts.** One inline status block shared by the auth helpers: error (red hairline/tint/text) or success (green), with `role="alert"` / `role="status"` assigned by variant.
- **Navigation.** A floating glass shell — `rounded-card`, `bg-surface/80`, `backdrop-blur-md`, `shadow-card`, sticky at top — with soft-ink links that turn indigo on hover and a compact dark "دخول" pill.
- **Theme toggle.** A `size-10` icon button (`rounded-control`, hairline border) in the glass nav swaps the page light/dark via the `html.dark` class; light is the default and the choice persists in localStorage.
- **Signature moments.** The indigo featured plan floating in a row of white cards, and the glass nav pill. Two indigo surfaces per page, max — the hero CTA and the PRO card.

## Do's and Don'ts

- **Do** use Cairo everywhere, from headlines to tiny badges; it is the whole voice.
- **Do** keep RTL-first layout with logical properties; route numerals and prices LTR inline.
- **Do** spend solid indigo only on the one primary CTA per section and the featured plan; tint everything else with `indigo-soft`.
- **Do** rest cards on hairlines and reserve `shadow-lift` for hover, focus, the hero image, and the featured plan.
- **Do** keep corners to 16px / 12px / full, and images in `4/3` and `16/10` frames.
- **Don't** add a second accent, a gradient, or a drop shadow to normal text — the antiseptic gray-blue SaaS gradient is banned on principle.
- **Don't** animate layout properties; reveal and hover only use `opacity`/`transform`, always honor `prefers-reduced-motion`.
- **Don't** hardcode hex or components outside the tokens; edit `globals.css` `:root` and the `@theme inline` block to retune the palette.
- **Don't** use `h-screen` full-viewport sections, auto-sliding carousels, or type smaller than 10px.
- **Don't** put Latin/English trademarks on Arabic keystrokes, and never set the page to `dir="ltr"`.
- **Don't** drift: keep every surface — landing and auth (Shell, Fields, OTP boxes, Alerts) — on these tokens; no raw hex outside `globals.css`. The auth monogram stays solid indigo like any icon tile, and inputs render `bg-canvas/50` over the white card.