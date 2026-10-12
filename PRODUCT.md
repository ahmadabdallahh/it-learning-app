# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Students of one IT faculty cohort at one Egyptian university. They study semester-by-semester ("ترم") and need the faculty curriculum in one place: lecture materials (مذكرات/ملخصات), video explainers, past-exam question banks, mock exams with instant grading, and completion certificates. Success = passing exams while wasting less time searching for material.
- **Secondary (confirmed in product copy):** study groups (bundle plans for 3+ students, weekly challenges, optional "متابعة ولي الأمر"), and the admin/instructor side that manages content.
- **Roles in the documented API:** student, instructor, admin.

## Product Purpose

The cohort's IT curriculum previously lived scattered across files, links, and paid notes. IT Academy exists to put the whole batch's curriculum in one organized place. Success means the batch adopts it as its single study hub every term.

## Positioning

Whole-batch curriculum in one place: every subject of the cohort's IT program organized by term, with materials, video explainers, a graded question bank, mock exams, and PDF certificates. A neighboring alternative (scattered WhatsApp/Telegram files, paid notes) cannot truthfully copy that promise.

## Operating Context

- Egyptian university IT faculty, one cohort; semester ("ترم") rhythm; Egyptian-pound pricing; payment via Vodafone Cash, InstaPay, and bank cards; official invoice on request.
- RTL Arabic interface (`lang="ar" dir="rtl"`) with an Egyptian-Arabic voice and self-hosted Cairo typeface; students use mobile and desktop web.
- Batch-level support: 24/7 WhatsApp group, batch study group, 14-day money-back guarantee on paid plans.

## Capabilities and Constraints

Confirmed functionality (shipped landing copy + the API documented in `routes.md`):

- **Auth:** register (username/email/password), OTP email verification and resend, login/logout via HTTP-only session cookie, `GET /me`.
- **Role dashboards:** after login the session role routes each user to their own home (`/dashboard/student`, `/dashboard/instructor`, `/dashboard/admin`); `/dashboard` resolves the role server-side. Verified registration lands on login with a success notice.
- **Content:** categories, courses, sections, lessons with `video_url` and free previews; enrollment flow (free courses activate immediately, paid courses return 402 until paid).
- **Progress:** watched-seconds tracking per lesson, lesson completion, auto-completing course progress.
- **Roles:** student / instructor / admin; admin content management and user administration.
- **Plans:** free tier, groups (99 EGP per person, 3+), PRO (149 EGP/term, was 249, 14-day guarantee), full-year -25%.
- **Batch services (landing copy):** WhatsApp support, weekly study challenges on the groups plan, PDF certificate generation.

Technical constraints:

- Next.js 16 (App Router, server components; static landing + dynamic API routes), React Query on the client, Tailwind v4 token system, Bun.
- **Undecided / gaps (recorded, not hidden):** the landing shows only 3 sample materials; section imagery is real Unsplash photography (verified topical: group study, study notes, Python code, server racks, web-dev desk) standing in until real course art exists; the API is a general course platform (price default USD, level/language fields) while the landing positions a cohort-specific EGP study hub. How the platform data model maps to the cohort-plan/batch concepts is undecided. Certificate generation and question-bank/mock-exam endpoints do not exist in `routes.md` (36 endpoints + health, none cover them).

## Brand Commitments

- **Name:** "IT Academy" (English wordmark in the UI, Arabic interface).
- **Voice:** Egyptian Arabic, casual student register ("بتذاكر", "جنية", "دُفعتنا").
- **Cohort trust:** real testimonials from cohort students (محمود أحمد - فرقة ثالثة IT, سارة محمد - فرقة تانية IT); provenance of these quotes is with the user.
- Palette and typography are intentionally not recorded here; they belong to DESIGN.md as visual-world decisions.

## Evidence on Hand

- **User-confirmed real facts:** pricing (99 groups / 149 PRO per term / 0 free, 249 strikethrough, -25% year), stats (+2000 students, +300 videos, +5000 Q&A, 98% satisfaction), testimonials (two named cohort students above), and 3 sample materials (الذكاء الاصطناعي وهياكل البيانات, شبكات الحاسب المتقدمة, تطوير الويب الحديث).
- `routes.md` documents the full API surface (36 endpoints + health): auth, users, categories, courses, sections, lessons, enrollments, progress. The frontend currently consumes the 6 auth endpoints; the rest are unwired.
- **Absences that must not be fabricated:** the full material catalog (only 3 samples exist), real course artwork and photography, certificate/question-bank API endpoints, verified annual/group pricing beyond the advertised figures, and any user counts beyond the stats above.

## Product Principles

1. **Cohort-first:** organize around one batch's curriculum, semester rhythm, and shared study moments.
2. **Speed wins the day:** everything pre-organized, instant exam grading, minimal wasted time ("أسرع 10×").
3. **Trust through proof:** real student outcomes, completion certificates, cohort adoption, transparent refund.
4. **Arabic-first and low-friction:** Egyptian Arabic, RTL, mobile-friendly flows.
5. **Honest monetization:** clear per-term pricing, group discounts, no invented claims.

## Accessibility & Inclusion

Arabic RTL is a core product requirement, and the UI ships `lang="ar" dir="rtl"` with a self-hosted Arabic font. The codebase already respects reduced-motion preferences, visible keyboard focus, and semantic structure; keep those intact in all future work. No product-specific standard beyond that was established.