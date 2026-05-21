import { API_ENDPOINTS } from '@/api/api-endpoints'
import { cookies } from 'next/headers'
import { apiUrl, getApiBaseUrl } from '@/lib/api/config'

async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  const res = await fetch(apiUrl(API_ENDPOINTS.AUTH.REFRESH), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!res.ok) return null

  const newTokens = await res.json()
  const sessionToken =
    newTokens.data?.access_token ?? newTokens.access_token ?? null

  if (!sessionToken) return null

  const cookieStore = await cookies()
  cookieStore.set('session_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: newTokens.data?.expires_in ?? newTokens.expires_in ?? 600,
  })

  return sessionToken
}

export async function getAccessToken(): Promise<string | null> {
  getApiBaseUrl()

  const cookieStore = await cookies()
  let sessionToken = cookieStore.get('session_token')?.value ?? null
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (sessionToken) return sessionToken

  if (!refreshToken) return null

  return refreshAccessToken(refreshToken)
}

export async function authenticatedFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  let token = await getAccessToken()

  const doFetch = () => {
    const headers = new Headers(init.headers)
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (!(init.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    return fetch(apiUrl(path), { ...init, headers })
  }

  let res = await doFetch()

  if (res.status === 401) {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value
    if (refreshToken) {
      token = await refreshAccessToken(refreshToken)
      if (token) res = await doFetch()
    }
  }

  return res
}
