# FitCall Frontend — Architecture Overview

## Overview

FitCall is a **Next.js 16 App Router** frontend for a personal training platform. It connects clients with dedicated personal trainers who guide sessions. It serves three distinct user groups through separate route trees:

- **Public visitors** — marketing/landing pages and ad funnel pages
- **Trainers** — authenticated dashboard for sessions, clients, availability, and settings
- **Admins** — back-office dashboard for platform management

---

## Tech Stack

| Layer                  | Technology                                    |
| ---------------------- | --------------------------------------------- |
| Framework              | Next.js 16.2.6 (App Router)                   |
| UI Library             | React 19.2.6                                  |
| Language               | TypeScript (`strict: true`)                   |
| Styling                | Tailwind CSS v4 (`globals.css`)               |
| Component primitives   | shadcn/ui + Radix UI (`radix-maia` fork)      |
| Icons                  | Lucide React                                  |
| Data fetching (client) | TanStack Query v5                             |
| HTTP client (browser)  | Axios (`src/lib/http.ts`)                     |
| HTTP client (server)   | native `fetch` (`src/lib/http/server.ts`)     |
| Form validation        | React Hook Form + Zod                         |
| Auth                   | Custom cookie-based auth (mixed cookie model) |
| Package manager        | pnpm                                          |

---

## Route Architecture

All routes live under `src/app/` following Next.js App Router conventions. Route groups in parentheses are invisible in URLs.

```
src/app/
├── (main)/
│   ├── (landing-routes)/     # Public marketing pages (/, /features, /pricing, …)
│   ├── (auth-routes)/        # Login & forgot-password for admin and trainer
│   └── trainer/              # Authenticated trainer dashboard (/trainer/*)
├── (ads)/                    # Standalone ad funnel pages (no shared shell)
│   ├── us/                   # US squeeze page
│   ├── thank-you/            # Shared post-submission thank-you page
│   ├── get-fit/
│   ├── lose-weight/
│   └── …
├── admin/                    # Authenticated admin dashboard (/admin/*)
├── trainers/                 # Public trainer deep-link routes (/trainers/login, set-password)
└── api/                      # API route handlers (/api/health)
```

### Route Groups Explained

| Group              | URL prefix                       | Shell                             |
| ------------------ | -------------------------------- | --------------------------------- |
| `(landing-routes)` | `/`                              | Public navbar + footer            |
| `(auth-routes)`    | `/admin/login`, `/trainer/login` | Suspense only                     |
| `(ads)`            | `/us`, `/thank-you`, etc.        | None — fully standalone           |
| `trainer/`         | `/trainer/*`                     | `TrainerShell` (sidebar + header) |
| `admin/`           | `/admin/*`                       | `AdminShell` (sidebar + header)   |

---

## Auth & Routing Guard

```
Browser request
      │
      ▼
 src/proxy.ts  (Next.js middleware)
      │
      ├── /admin/* without admin cookies → redirect /admin/login
      ├── /trainer/* without trainer cookies → redirect /trainer/login
      ├── /trainer/login when already authed → redirect /trainer/dashboard
      └── All others → pass through (+ security headers + x-request-id)
```

- Cookie names are centralised in `src/config/site.ts`.
- Token helpers: `src/lib/get-token.ts` (browser), `src/lib/services/auth-session.ts` (server).
- `TrainerAuthGuard` adds a secondary client-side check inside the trainer shell.
- Login actions write `httpOnly` session/refresh token cookies via `src/actions/auth.ts`.
- `src/lib/http.ts` automatically refreshes expired access tokens for all browser Axios requests.

---

## Data Flow

```
Client Component
      │
      │  TanStack Query hook  (src/api/*.ts)
      │  ── getRequest / postRequest / patchRequest  (src/lib/http.ts)
      │  ── Axios instance with auto token-refresh
      ▼
  Backend API  (NEXT_PUBLIC_API_URL/api/v1/…)


Server Component / Server Action
      │
      │  src/lib/http/server.ts   or   src/lib/services/*
      │  ── native fetch with httpOnly cookie access
      ▼
  Backend API  (API_URL/api/v1/…)
```

- All API endpoint paths are catalogued in `src/api/api-endpoints.ts`.
- API base URL resolution: `src/lib/api/config.ts` (server) and `src/lib/api-base-url.ts` (browser).
- Domain-specific data mappers live in `src/lib/<domain>/` (trainer, client, session, availability, dashboard).

---

## Component Architecture

```
src/components/
├── ui/               # shadcn/Radix base primitives (Button, Input, Dialog, …)
├── icons/            # Custom SVG icon components
├── homepage/         # Public landing page sections (Hero, Cta, HeroBottom, …)
├── features/         # Feature-specific landing sections
├── legal/            # Legal page content components
├── auth/             # Shared login/auth form components
├── admin/            # Admin dashboard components (sidebar, tables, forms)
├── trainer/          # Trainer dashboard components (sidebar, session views, …)
├── squeeze/          # Ad funnel components
│   ├── WaitListForm  # Shared waitlist form (used across all squeeze pages)
│   └── us/           # US-specific squeeze page sections (Hero, Testimonial, …)
└── availability/     # Availability schedule UI
```

### Key Conventions

- Use `cn()` from `src/lib/utils.ts` for conditional class merging.
- Prefer `src/components/ui/*` shadcn components over custom implementations.
- Dashboard shells are fixed full-screen layouts — avoid wrapping pages in extra scroll containers.
- Server components fetch via `src/lib/http/server.ts`; client components use TanStack Query hooks.

---

## State Management

| Concern                     | Tool                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------- |
| Server data (async, cached) | TanStack Query (`useQuery`, `useMutation`)                                         |
| Form state                  | React Hook Form + Zod schemas (`src/schemas/`)                                     |
| Auth session                | Mixed cookie model — `refresh_token` and `session_token` are `httpOnly` (server-only); `access_token` is a regular cookie readable by client-side Axios via `src/lib/get-token.ts` |
| Local UI state              | React `useState` / `useReducer`                                                    |
| Cross-page signals          | `sessionStorage` (e.g. waitlist submission guard for `/thank-you`)                 |
| Notifications               | WebSocket hook in `src/hooks/` (toggled via `NEXT_PUBLIC_ENABLE_NOTIFICATIONS_WS`) |

---

## Key Environment Variables

| Variable                              | Used by                       |
| ------------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_API_URL`                 | Browser + server API base URL |
| `API_URL`                             | Server-only fallback API base |
| `NEXT_PUBLIC_APP_URL`                 | Metadata, robots.txt, sitemap |
| `NEXT_PUBLIC_ENABLE_NOTIFICATIONS_WS` | Toggle notification websocket |
| `NEXT_PUBLIC_NOTIFICATION_WS_URL`     | WebSocket URL override        |

See `.env.example` for the full inventory.

---

## Security

- All protected routes are guarded at the middleware level (`src/proxy.ts`) before any page renders.
- `refresh_token` and `session_token` are `httpOnly` — inaccessible to JavaScript. `access_token` is a regular cookie intentionally readable by client-side Axios for bearer auth headers.
- Axios interceptor auto-refreshes access tokens and signs users out when refresh is unusable.
- `next.config.ts` limits remote image hosts to `i.pravatar.cc`, `api.staging.fitcall.me`, and `api.fitcall.me`.
- Server Action body size is capped at `10mb`.

---

## Development Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server (localhost:3000)
pnpm build         # Production build
pnpm start         # Serve production build
pnpm lint          # ESLint
pnpm typecheck     # TypeScript type check
```
