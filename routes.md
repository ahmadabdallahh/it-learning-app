# Platform API — Routes

Base URL: `/api/v1` (health check at `GET /health`)
Format: JSON
Auth: HTTP-only session cookie (see `SESSION_COOKIE_NAME`, default `session`). Send with `credentials: "include"`.

Source of truth: `app.js` + `src/routes/*.js` https://it-learniing-app.vercel.app/+ `src/validators/*.js`.
- IDs are PostgreSQL `BIGINT` and are always **strings** (e.g. `"12"`), in params, query, and bodies.
- Pagination: `?page=1&limit=20` (limit max 100). Paginated responses include `{ data, pagination: { page, limit, total, totalPages } }`.
- Success envelope: `{ status, success: true, data }`. Created resources return `201`.
- Error envelope: `{ status, success: false, error: { code, message, details? } }`.
- Global rate limit applies to `/api/*` (`RATE_LIMIT_*`); auth routes have a stricter limiter (`AUTH_RATE_LIMIT_*`, default 20 / 15 min).
- `402 Payment Required` is returned when enrolling in a paid course.

## Summary (36 API endpoints + health)

| # | Method | Path | Auth / Role |
|---|--------|------|-------------|
| 0 | GET | `/health` | Public |
| 1 | POST | `/api/v1/auth/register` | Public |
| 2 | POST | `/api/v1/auth/verify-email` | Public |
| 3 | POST | `/api/v1/auth/resend-verification` | Public |
| 4 | POST | `/api/v1/auth/login` | Public |
| 5 | POST | `/api/v1/auth/logout` | Optional (clears cookie if present) |
| 6 | GET | `/api/v1/auth/me` | Authenticated |
| 7 | GET | `/api/v1/users` | Admin |
| 8 | GET | `/api/v1/users/:id` | Self or Admin |
| 9 | PATCH | `/api/v1/users/:id` | Self or Admin |
| 10 | DELETE | `/api/v1/users/:id` | Admin |
| 11 | GET | `/api/v1/categories` | Public |
| 12 | GET | `/api/v1/categories/:categoryId` | Public |
| 13 | POST | `/api/v1/categories` | Admin |
| 14 | PATCH | `/api/v1/categories/:categoryId` | Admin |
| 15 | DELETE | `/api/v1/categories/:categoryId` | Admin |
| 16 | GET | `/api/v1/courses` | Optional auth (public sees `published`; instructor sees own; admin sees all) |
| 17 | GET | `/api/v1/courses/:courseId` | Optional auth (same visibility as list) |
| 18 | POST | `/api/v1/courses` | Instructor, Admin |
| 19 | PATCH | `/api/v1/courses/:courseId` | Owner instructor or Admin |
| 20 | DELETE | `/api/v1/courses/:courseId` | Owner instructor or Admin |
| 21 | GET | `/api/v1/courses/:courseId/sections` | Optional auth |
| 22 | POST | `/api/v1/courses/:courseId/sections` | Owner instructor or Admin |
| 23 | PATCH | `/api/v1/sections/:sectionId` | Owner instructor or Admin |
| 24 | DELETE | `/api/v1/sections/:sectionId` | Owner instructor or Admin |
| 25 | GET | `/api/v1/sections/:sectionId/lessons` | Optional auth |
| 26 | POST | `/api/v1/sections/:sectionId/lessons` | Owner instructor or Admin |
| 27 | GET | `/api/v1/lessons/:lessonId` | Optional auth (free preview public; otherwise enrolled) |
| 28 | PATCH | `/api/v1/lessons/:lessonId` | Owner instructor or Admin |
| 29 | DELETE | `/api/v1/lessons/:lessonId` | Owner instructor or Admin |
| 30 | POST | `/api/v1/courses/:courseId/enroll` | Authenticated |
| 31 | GET | `/api/v1/courses/:courseId/enrollment` | Authenticated (own enrollment) |
| 32 | GET | `/api/v1/me/courses` | Authenticated |
| 33 | GET | `/api/v1/courses/:courseId/progress` | Enrolled |
| 34 | GET | `/api/v1/lessons/:lessonId/progress` | Enrolled |
| 35 | PUT | `/api/v1/lessons/:lessonId/progress` | Enrolled |
| 36 | POST | `/api/v1/lessons/:lessonId/complete` | Enrolled |

---

## Health

### `GET /health`
Liveness check. No auth. No rate limit (not under `/api`).

Response `200`: `{ status: 200, success: true, message: "OK" }`.

---

## Auth — `/api/v1/auth`

Strict per-route rate limiter (`authLimiter`).

### `POST /api/v1/auth/register`
Register a new user (default role `student`).

Body:
```json
{ "username": "john_doe", "email": "john@mail.com", "password": "secret123" }
```
- `username`: 3–50 chars, `[a-zA-Z0-9_-]`
- `email`: valid email, lowercased/trimmed
- `password`: 8–128 chars

Success `201`. Sends verification OTP to email.

### `POST /api/v1/auth/verify-email`
Verify email with OTP code.

Body: `{ "email": "...", "code": "..." }` (`code`: 4–10 chars).

### `POST /api/v1/auth/resend-verification`
Resend OTP code.

Body: `{ "email": "..." }`.

### `POST /api/v1/auth/login`
Login, sets HTTP-only session cookie.

Body: `{ "email": "...", "password": "..." }`.

### `POST /api/v1/auth/logout`
Clears session cookie and revokes server session if present. No `requireAuth` middleware in `src/routes/auth.routes.js:31` — works with or without a valid cookie.

### `GET /api/v1/auth/me`
Current user profile. Requires auth (`requireAuth`).

Response: `{ status, success: true, data: { user } }`.

---

## Users — `/api/v1/users`

All routes use `requireAuth` (`src/routes/users.routes.js:14`).

### `GET /api/v1/users` — Admin only
Query: `?page=1&limit=20&search=keyword`.

### `GET /api/v1/users/:id` — Self or Admin
`:id` = BIGINT string.

### `PATCH /api/v1/users/:id` — Self or Admin
Body (all optional):
```json
{ "avatar_url": "https://.../avatar.png" }
```
- `avatar_url`: valid URL, max 255, nullable.

### `DELETE /api/v1/users/:id` — Admin only

---

## Categories — `/api/v1/categories`

### `GET /api/v1/categories` — Public
Query: `?page=1&limit=20`.

### `GET /api/v1/categories/:categoryId` — Public

### `POST /api/v1/categories` — Admin
Body:
```json
{ "name": "Programming", "slug": "programming", "description": "..." }
```
- `name`: 1–100, required
- `slug`: 1–120, `^[a-z0-9-]+$`, optional (auto-generated if omitted)
- `description`: max 1000, optional/nullable

Success `201`.

### `PATCH /api/v1/categories/:categoryId` — Admin
Same fields as create, all optional.

### `DELETE /api/v1/categories/:categoryId` — Admin

---

## Courses — `/api/v1/courses`

Mounted at `/api/v1/courses` (`app.js:87`). Uses `optionalAuth` for reads.

### `GET /api/v1/courses` — Optional auth
Query (`src/validators/courses.validators.js:43-66`):

| Param | Type | Notes |
|-------|------|-------|
| `search` | string ≤200 | title/description search |
| `category_id` | BIGINT string | filter by category |
| `instructor_id` | BIGINT string | filter by instructor |
| `level` | `beginner` \| `intermediate` \| `advanced` | |
| `language` | string ≤50 | |
| `status` | `draft` \| `published` \| `archived` | role-filtered |
| `page` | int ≥1 | default 1 |
| `limit` | int 1–100 | default 20 |

Visibility: public sees `published`; instructors additionally see own drafts; admin sees all.

### `GET /api/v1/courses/:courseId` — Optional auth
Same visibility as list.

### `POST /api/v1/courses` — Instructor, Admin
Body (`createCourseSchema`):
```json
{
  "title": "JS Basics",
  "description": "...",
  "category_id": "1",
  "thumbnail_url": "https://.../thumb.png",
  "price": 0,
  "currency": "USD",
  "level": "beginner",
  "language": "English",
  "status": "draft",
  "instructor_id": "5"
}
```
- `title`: 3–255, required
- `category_id` / `instructor_id`: BIGINT strings, optional/nullable (`instructor_id` is admin-only; instructors become owner automatically)
- `price`: number ≥ 0, default `0`
- `currency`: 3 chars, default `"USD"`
- `level`: default `"beginner"`; `status`: default `"draft"`

Success `201`.

### `PATCH /api/v1/courses/:courseId` — Owner instructor or Admin
Same fields as create, all optional (ownership enforced in service via `lesson → section → course → instructor_id`).

### `DELETE /api/v1/courses/:courseId` — Owner instructor or Admin

---

## Sections

Nested router (`src/routes/sections.routes.js`, `mergeParams: true`).

### `GET /api/v1/courses/:courseId/sections` — Optional auth
List sections of a course. Defined by `router.get("/")` under `/:courseId/sections` mount.

### `POST /api/v1/courses/:courseId/sections` — Owner instructor or Admin
Body (`createSectionSchema`):
```json
{ "title": "Intro", "description": "...", "position": 0 }
```
- `title`: 1–255, required
- `description`: max 2000, optional/nullable
- `position`: int ≥ 0, default `0`

Success `201`.

### `PATCH /api/v1/sections/:sectionId` — Owner instructor or Admin
Direct mount at `/api/v1/sections` (`app.js:90`). Same fields as create, all optional.

### `DELETE /api/v1/sections/:sectionId` — Owner instructor or Admin

> Note: the same `PATCH/DELETE /:sectionId` handlers are also reachable under the nested mount (`/api/v1/courses/:courseId/sections/:sectionId`) because the router is shared — use the direct `/api/v1/sections/:sectionId` form above.

---

## Lessons

Nested router (`src/routes/lessons.routes.js`, `mergeParams: true`).

### `GET /api/v1/sections/:sectionId/lessons` — Optional auth
List lessons in a section. Mounted via `sectionsRouter.use("/:sectionId/lessons", lessonsRouter)` (`src/routes/sections.routes.js:16`), reachable as `/api/v1/sections/:sectionId/lessons`.

### `POST /api/v1/sections/:sectionId/lessons` — Owner instructor or Admin
Body (`createLessonSchema`):
```json
{
  "title": "Variables",
  "description": "...",
  "video_url": "https://.../video.mp4",
  "duration_seconds": 300,
  "position": 0,
  "is_free_preview": false
}
```
- `title`: 1–255, required
- `video_url`: valid URL, optional/nullable
- `duration_seconds` / `position`: int ≥ 0, default `0`
- `is_free_preview`: boolean, default `false`

Success `201`.

### `GET /api/v1/lessons/:lessonId` — Optional auth
Direct mount at `/api/v1/lessons` (`app.js:93`). Free-preview lessons are public; locked lessons require auth + active enrollment.

### `PATCH /api/v1/lessons/:lessonId` — Owner instructor or Admin
Same fields as create, all optional.

### `DELETE /api/v1/lessons/:lessonId` — Owner instructor or Admin

---

## Enrollments

Nested under courses (`src/routes/courses.routes.js:21` → `src/routes/enrollments.routes.js`).

### `POST /api/v1/courses/:courseId/enroll` — Authenticated
Enroll current user. Free courses (`price = 0`) activate immediately; paid courses return `402 Payment Required`.

No body.

### `GET /api/v1/courses/:courseId/enrollment` — Authenticated
Current user's enrollment record for that course.

### `GET /api/v1/me/courses` — Authenticated
List enrolled courses of current user. Defined directly in `app.js:96` (`v1Router.get("/me/courses", requireAuth, getMyCourses)`).
Query: `?page=1&limit=20`.

> Note: `src/routes/enrollments.routes.js:19` also defines `router.get("/courses", ...)` which under the `/:courseId` mount would resolve to `/api/v1/courses/:courseId/courses` — dead route, not used (`enrollmentsRoutes` is never mounted directly in `app.js`). Use `/api/v1/me/courses`.

---

## Progress

### `GET /api/v1/courses/:courseId/progress` — Enrolled
Aggregate progress: total lessons, completed count, percentage, watched seconds. Served by `progressRouter.get("/")` mounted at `/:courseId/progress` (`src/routes/courses.routes.js:23`).

### `GET /api/v1/lessons/:lessonId/progress` — Enrolled
Single-lesson watch progress. Defined directly in `app.js:99`.

### `PUT /api/v1/lessons/:lessonId/progress` — Enrolled
Upsert watch progress (`app.js:100`, `upsertProgressSchema`):
```json
{ "watched_seconds": 120, "completed": false }
```
- `watched_seconds`: int ≥ 0, required
- `completed`: boolean, optional

### `POST /api/v1/lessons/:lessonId/complete` — Enrolled
Mark lesson complete; auto-completes the course enrollment when all lessons are done (`app.js:101`). No body.

> Note: `src/routes/progress.routes.js:19-21` defines `GET|PUT|POST /:lessonId/progress|complete`, but under the `/:courseId/progress` mount those resolve to non-canonical paths — the canonical lesson-progress routes are the direct ones in `app.js:99-101` listed above.

---

## Error codes (selection)

Standard `error.code` values: `VALIDATION_ERROR` (400, zod details in `error.details`), `UNAUTHORIZED` (401), `FORBIDDEN` (403), `NOT_FOUND` (404, incl. `Cannot METHOD path` fallback in `app.js:107`), `CONFLICT` (409), `PAYMENT_REQUIRED` (402, paid enroll), `TOO_MANY_REQUESTS` (429), `INTERNAL_ERROR` (500).
