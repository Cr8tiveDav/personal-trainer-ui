<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This repository uses Next.js 16.2.6. APIs, route conventions, and framework files may differ from older Next.js versions. Before changing framework behavior, read the relevant local guide in `node_modules/next/dist/docs/` when available and heed deprecation notices. In this checkout that docs directory may be absent, so prefer the installed package types, existing source patterns, and official Next.js 16 docs when confirmation is needed.
<!-- END:nextjs-agent-rules -->

# FitCall Personal Trainer UI

## Project Overview

FitCall is a Next.js App Router frontend for a personal training marketplace/platform. It contains:

- Public marketing and legal pages.
- Public ad funnel pages for campaign-specific landing experiences.
- Admin dashboards for trainers, clients, sessions, payments, media, waitlist, discovery slots, analytics, and settings.
- Trainer dashboards for sessions, clients, availability, reviews, settings, and profile workflows.
- Auth flows for admin and trainer login, forgot password, trainer setup password, and secret trainer login links.

## Stack

- Next.js `16.2.6` App Router and React `19.2.6`.
- TypeScript with `strict: true`, path aliases `@/*` and `~/*` to `src/*`.
- Tailwind CSS v4 via `src/app/globals.css`.
- shadcn components configured in `components.json` with `radix-maia`, Radix UI primitives, and Lucide icons.
- TanStack Query v5 for client data fetching and mutations.
- Axios for browser API requests in `src/lib/http.ts`.
- Server `fetch` wrappers in `src/lib/http/server.ts` and `src/lib/services/*`.
- NextAuth v4 config exists in `src/config/auth.config.ts`, but current admin/trainer login flows mainly use custom API auth plus cookies.
- pnpm is the package manager. Do not switch managers.

## Important Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Production build: `pnpm build`
- Production start after build: `pnpm start`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`

Use the smallest meaningful validation first. For docs-only changes, `git diff --check` and file review are usually enough.

## Repository Structure

- `src/app/`: App Router routes, route groups, layouts, metadata routes, and API route handlers.
- `src/app/(main)/(landing-routes)/`: Public site shell with navbar/footer.
- `src/app/(main)/(auth-routes)/`: Auth pages wrapped in Suspense.
- `src/app/(main)/trainer/`: Authenticated trainer dashboard routes.
- `src/app/admin/`: Authenticated admin dashboard routes.
- `src/app/(ads)/`: Standalone campaign landing pages without the main landing shell.
- `src/components/`: UI and feature components organized by domain.
- `src/components/ui/`: shadcn/Radix base components.
- `src/api/`: Client-side TanStack Query hooks, mutations, endpoint constants, and API response types.
- `src/actions/`: Server actions and legacy action helpers.
- `src/lib/`: Shared utilities, auth/session helpers, mappers, HTTP layers, and domain helpers.
- `src/config/`: Site, auth, and environment config objects.
- `src/hooks/`: Reusable hooks, including notification websocket and global browser helpers.
- `src/schemas/`: Zod validation schemas.
- `src/types/`: Shared type declarations.
- `public/`: Static assets used heavily by marketing, ad, admin, and trainer views.
- `scripts/`: Utility scripts, currently including forbidden-pattern scanning.

## Route Map

Route groups in parentheses do not appear in URLs.

### Public Landing Routes

- `/` -> `src/app/(main)/(landing-routes)/page.tsx`
- `/features` -> `src/app/(main)/(landing-routes)/(home)/features/page.tsx`
- `/pricing` -> `src/app/(main)/(landing-routes)/(home)/pricing/page.tsx`
- `/how-it-works` -> `src/app/(main)/(landing-routes)/(home)/how-it-works/page.tsx`
- `/trainers` -> `src/app/(main)/(landing-routes)/(home)/trainers/page.tsx`
- `/waitlist` -> `src/app/(main)/(landing-routes)/(home)/waitlist/page.tsx`
- `/about-us` -> `src/app/(main)/(landing-routes)/(home)/about-us/page.tsx`
- `/contact` -> `src/app/(main)/(landing-routes)/contact/page.tsx`
- `/help-centre` -> `src/app/(main)/(landing-routes)/help-centre/page.tsx`
- `/privacy-policy` -> `src/app/(main)/(landing-routes)/privacy-policy/page.tsx`
- `/terms-of-service` -> `src/app/(main)/(landing-routes)/terms-of-service/page.tsx`
- `/trainer-code-of-conduct` -> `src/app/(main)/(landing-routes)/trainer-code-of-conduct/page.tsx`
- `/account-deletion-policy` -> `src/app/(main)/(landing-routes)/account-deletion-policy/page.tsx`

These routes use `src/app/(main)/(landing-routes)/layout.tsx`, which renders the public navbar, footer, and go-to-top control.

### Ad Funnel Routes

- `/get-fit` -> `src/app/(ads)/get-fit/page.tsx`
- `/build-up` -> `src/app/(ads)/build-up/page.tsx`
- `/busy-professional` -> `src/app/(ads)/busy-professional/page.tsx`
- `/busy-professional/find-my-coach` -> `src/app/(ads)/busy-professional/find-my-coach/page.tsx`
- `/lose-weight` -> `src/app/(ads)/lose-weight/page.tsx`
- `/lose-weight/find-my-coach` -> `src/app/(ads)/lose-weight/find-my-coach/page.tsx`
- `/build-muscle` -> `src/app/(ads)/build-muscle/page.tsx`
- `/build-muscle/find-my-coach` -> `src/app/(ads)/build-muscle/find-my-coach/page.tsx`
- `/burn-out-professional` -> `src/app/(ads)/burn-out-professional/page.tsx`
- `/gym-shy` -> `src/app/(ads)/gym-shy/page.tsx`
- `/midlife-wellness` -> `src/app/(ads)/midlife-wellness/page.tsx`
- `/serial-restarter` -> `src/app/(ads)/serial-restarter/page.tsx`

These are standalone campaign pages and do not use the public landing shell.

### Auth Routes

- `/admin/login` -> `src/app/(main)/(auth-routes)/admin/login/page.tsx`
- `/admin/forgot-password` -> `src/app/(main)/(auth-routes)/admin/forgot-password/page.tsx`
- `/trainer/login` -> `src/app/(main)/(auth-routes)/trainer/login/page.tsx`
- `/trainer/forgot-password` -> `src/app/(main)/(auth-routes)/trainer/forgot-password/page.tsx`
- `/trainers/login` -> `src/app/trainers/login/page.tsx`
- `/trainers/set-password` -> `src/app/trainers/set-password/page.tsx`
- `/trainer/[secret]` -> handled by `src/proxy.ts` as a public trainer secret login route when the segment is not a reserved trainer app route.

Note the plural `/trainers/*` routes are separate from singular `/trainer/*` app/auth routes.

### Admin Routes

All protected admin pages use `src/app/admin/layout.tsx`, which reads profile cookies and renders `AdminShell`.

- `/admin/dashboard`
- `/admin/analytics`
- `/admin/trainers`
- `/admin/trainers/new`
- `/admin/trainers/[id]`
- `/admin/users`
- `/admin/users/[id]`
- `/admin/sessions`
- `/admin/discovery-slots`
- `/admin/waitlist`
- `/admin/payments`
- `/admin/media`
- `/admin/media/upload`
- `/admin/media/[id]`
- `/admin/settings`

Admin navigation is defined in `src/components/admin/sidebar.tsx`.

### Trainer Routes

All protected trainer pages use `src/app/(main)/trainer/layout.tsx`, which reads profile cookies, renders `TrainerAuthGuard`, and wraps pages in `TrainerShell`.

- `/trainer/dashboard`
- `/trainer/clients`
- `/trainer/sessions`
- `/trainer/availability`
- `/trainer/messages`
- `/trainer/reviews`
- `/trainer/settings`

Trainer app route constants and reserved secret-login segments live in `src/lib/auth/trainer-routes.ts`. Trainer navigation is defined in `src/components/trainer/sidebar.tsx`. The sidebar currently comments out the Messages link even though `/trainer/messages` exists.

### Framework and API Routes

- `/api/health` -> `src/app/api/health/route.ts`, dynamic liveness response.
- `/robots.txt` -> `src/app/robots.ts`.
- `/sitemap.xml` -> `src/app/sitemap.ts`.
- Root loading/error/not-found/forbidden/unauthorized conventions live in `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`, `src/app/forbidden.tsx`, and `src/app/unauthorized.tsx`.

There is also `src/app/unauthorized/page.tsx`; be careful not to confuse the URL page with the root framework convention file.

## Auth and Routing Guards

- `src/proxy.ts` is the main pre-route guard. It:
  - Redirects protected `/admin/*` pages to `/admin/login` unless `user_type=admin` and an access or refresh token cookie exists.
  - Redirects protected trainer routes to `/trainer/login?from=...` unless `user_type=trainer` and an access or refresh token cookie exists.
  - Redirects authenticated trainers away from `/trainer/login` to `/trainer/dashboard`.
  - Adds baseline security headers and an `x-request-id`.
- Cookie names are centralized in `src/config/site.ts`.
- Browser token/cookie helpers live in `src/lib/get-token.ts`.
- Server refresh/session helpers live in `src/lib/services/auth-session.ts`.
- `src/actions/auth.ts` sets httpOnly `session_token` and `refresh_token` cookies during login.
- `src/lib/http.ts` refreshes access tokens for browser Axios requests and logs users out when refresh is unusable.
- `TrainerAuthGuard` performs a client-side secondary trainer check and redirects unauthenticated trainers.

## API and Data Flow

- `src/api/api-endpoints.ts` is the primary API path catalog. Prefer adding endpoint constants there before wiring hooks.
- `src/lib/api/config.ts` builds server/browser API URLs from `NEXT_PUBLIC_API_URL` or `API_URL` and ensures `/api/v1`.
- `src/lib/api-base-url.ts` is a browser-oriented helper using `NEXT_PUBLIC_API_URL`.
- Client hooks in `src/api/*.ts` use `getRequest`, `postRequest`, `patchRequest`, `uploadRequest`, and related helpers from `src/lib/http.ts`.
- Server components and server actions should use `src/lib/http/server.ts` or `src/lib/services/*` when they need httpOnly cookie access.
- Domain mappers live in `src/lib/<domain>/`, for example trainer, client, session, availability, and dashboard data mapping.

## Environment Variables Seen in Source

Commonly used:

- `NEXT_PUBLIC_API_URL`: browser/server API base; normally the backend origin, with `/api/v1` appended if missing.
- `API_URL`: server fallback API base in `src/lib/api/config.ts`.
- `NEXT_PUBLIC_APP_URL`: app origin for metadata, robots, and sitemap.
- `BASEURL`: legacy/custom action and Axios base URL.
- `APP_URL`: used by Google auth helper in `src/actions/nextauth.ts`.
- `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: NextAuth config.
- `NEXT_PUBLIC_ENABLE_NOTIFICATIONS_WS`: set to `false` to disable notification websocket.
- `NEXT_PUBLIC_NOTIFICATION_WS_URL`: explicit websocket URL override.
- Several backend-specific vars are declared in `src/config/env.config.ts`: `GOLANG_BASE_URL`, `JAVA_BASE_URL`, `NESTJS_BASE_URL`, `PHP_BASE_URL`, `PYTHON_BASE_URL`, `CSHARP_BASE_URL`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`.

The README references `src/env/*`, but that directory is not present in this checkout. Use `.env.example` for the current env var inventory and treat the source files above as authoritative until the README is updated.

## UI Conventions

- Reuse `src/components/ui/*` shadcn components where possible.
- Use Lucide icons when available; custom icons are under `src/components/icons`.
- Shared class merging helper is `cn` from `src/lib/utils.ts` or `src/utils/index.ts` depending on local pattern.
- Global theme tokens, base styles, and helper classes live in `src/app/globals.css`.
- Dashboard shells are fixed full-screen layouts with their own scroll containers. Avoid wrapping dashboard pages in extra full-page scroll layouts unless required.
- Public landing pages rely heavily on assets in `public/images/*`; verify image paths when moving sections.

## Developer Gotchas

- This app has both `src/lib/http.ts` and `src/lib/http/`. Imports from `@/lib/http` or `~/lib/http` resolve to `src/lib/http.ts`, not the folder. Use explicit `@/lib/http/server` for server helpers.
- The route `/trainer/messages` exists but is not shown in the trainer sidebar.
- The app has both singular `/trainer/*` and plural `/trainers/*`; they are different flows.
- README appears to be from an earlier starter state and is partially stale, especially around env validation files.
- `next.config.ts` enables `experimental.authInterrupts` and sets Server Action body size to `10mb`.
- Remote image hosts are limited to `i.pravatar.cc`, `api.staging.fitcall.me`, and `api.fitcall.me` over HTTP/HTTPS.
- Existing code mixes single and double quotes. Prefer nearby file style over broad formatting churn.
- Do not edit generated or vendor directories such as `node_modules`, `.next`, `dist`, `build`, or `coverage`.

## Documentation State

- Durable Codex project state belongs under `.codex/`.
- Current handoff: `.codex/HANDOFF.md`.
- Durable repo memory: `.codex/memory.md`.
- Use `.codex/tasks/` only for real ongoing multi-session work.
