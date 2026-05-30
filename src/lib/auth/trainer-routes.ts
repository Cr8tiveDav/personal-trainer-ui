/** Trainer app pages under /trainer/* (require auth). */
export const TRAINER_APP_ROUTES = [
  '/trainer/dashboard',
  '/trainer/clients',
  '/trainer/sessions',
  '/trainer/availability',
  '/trainer/messages',
  '/trainer/reviews',
  '/trainer/settings',
] as const

const RESERVED_TRAINER_SEGMENTS = new Set(
  TRAINER_APP_ROUTES.map((route) => route.replace('/trainer/', '')),
)

export function isTrainerAppRoute(pathname: string): boolean {
  return TRAINER_APP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )
}

/** Public login via /trainer/{secretPath} (not a reserved app segment). */
export function isTrainerSecretLoginRoute(pathname: string): boolean {
  const match = pathname.match(/^\/trainer\/([^/]+)$/)
  if (!match) return false
  return !RESERVED_TRAINER_SEGMENTS.has(match[1])
}

export const TRAINER_LOGIN_PATH = '/trainer/login'
