/**
 * Base URL for the FitCall API including the /api/v1 prefix.
 * Example: https://api.staging.fitcall.me/api/v1
 */
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
  const base = raw?.replace(/\/$/, '');
  if (!base) {
    throw new Error('Neither NEXT_PUBLIC_API_URL nor API_URL is configured');
  }
  if (base.endsWith('/api/v1')) {
    return base;
  }
  return `${base}/api/v1`;
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}${normalized}`
}
