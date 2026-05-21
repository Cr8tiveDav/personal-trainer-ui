/**
 * Base URL for the FitCall API including the /api/v1 prefix.
 * Example: https://api.staging.fitcall.me/api/v1
 */
export function getApiBaseUrl(): string {
  const base = process.env.API_URL?.replace(/\/$/, '')
  if (!base) {
    throw new Error('API_URL is not configured')
  }
  return base
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}${normalized}`
}
