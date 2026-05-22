import 'server-only'

import { cookies } from 'next/headers'
import { Session } from '@/components/adminSessions/session'
import { mapBackendSessionsResponse } from './mapper'

export class AdminSessionsFetchError extends Error {
  status: number
  url?: string
  body?: string

  constructor(message: string, status: number, url?: string, body?: string) {
    super(message)
    this.name = 'AdminSessionsFetchError'
    this.status = status
    this.url = url
    this.body = body
  }
}

const getBaseUrls = () => {
  const urls = [
    process.env.NEXT_PUBLIC_API_URL,
    process.env.API_URL,
    process.env.BASEURL,
    process.env.BASE_URL,
  ].filter(Boolean) as string[]

  return Array.from(new Set(urls.map((url) => url.replace(/\/$/, ''))))
}

const buildUrl = (baseUrl: string, path: string, page: number, limit: number) => {
  const normalizedBase = baseUrl.replace(/\/$/, '')
  const normalizedPath = path.replace(/^\//, '')
  return `${normalizedBase}/${normalizedPath}?page=${page}&limit=${limit}`
}

const getAdminSessionsUrls = (page: number, limit: number) =>
  getBaseUrls().flatMap((baseUrl) => {
    const paths = baseUrl.endsWith('/api/v1')
      ? ['admin/sessions']
      : ['admin/sessions', 'api/v1/admin/sessions']

    return paths.map((path) => buildUrl(baseUrl, path, page, limit))
  })

const refreshSessionToken = async (refreshToken: string) => {
  const refreshUrls = getBaseUrls().flatMap((baseUrl) => {
    if (baseUrl.endsWith('/api/v1')) return [`${baseUrl}/auth/refresh`]
    return [`${baseUrl}/auth/refresh`, `${baseUrl}/api/v1/auth/refresh`]
  })

  for (const url of refreshUrls) {
    console.debug('[adminSessions] trying refresh URL:', url)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: 'no-store',
    })

    if (res.ok) return res.json()
  }

  return null
}

const storeSessionToken = (
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  token: string,
  maxAge = 600
) => {
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  })
}

const getAuthorizedSessionToken = async () => {
  const cookieStore = await cookies()
  let sessionToken = cookieStore.get('session_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (!sessionToken && refreshToken) {
    const refreshed = await refreshSessionToken(refreshToken)
    sessionToken = refreshed?.data?.access_token || refreshed?.access_token

    if (sessionToken) {
      storeSessionToken(cookieStore, sessionToken, refreshed?.data?.expires_in || refreshed?.expires_in || 600)
    }
  }

  if (!sessionToken) {
    throw new AdminSessionsFetchError('Unauthorized: Missing session token', 401)
  }

  return { cookieStore, sessionToken, refreshToken }
}

export async function fetchAdminSessionsFromBackend(page = 1, limit = 100): Promise<Session[]> {
  const auth = await getAuthorizedSessionToken()
  const { cookieStore, refreshToken } = auth
  let { sessionToken } = auth

  const fetchSessions = async (token: string) => {
    let lastResponse: Response | null = null

    for (const url of getAdminSessionsUrls(page, limit)) {
      console.debug('[adminSessions] trying sessions URL:', url)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })

      lastResponse = response
      if (response.ok || response.status !== 404) return response
    }

    return lastResponse
  }

  let res = await fetchSessions(sessionToken)

  if (res?.status === 401 && refreshToken) {
    const refreshed = await refreshSessionToken(refreshToken)

    if (refreshed) {
      sessionToken = refreshed.data?.access_token || refreshed.access_token

      if (sessionToken) {
        storeSessionToken(cookieStore, sessionToken, refreshed.data?.expires_in || refreshed.expires_in || 600)

        res = await fetchSessions(sessionToken)
      }
    }
  }

  if (!res || !res.ok) {
    try {
      const clone = res?.clone()
      const bodyText = clone ? await clone.text() : ''
      console.error('[adminSessions] fetch failed', {
        status: res?.status,
        url: res?.url,
        body: bodyText,
      })
    } catch (e) {
      console.error('[adminSessions] failed reading error body', e)
    }

    throw new AdminSessionsFetchError(
      `Failed to fetch admin sessions: ${res?.status ?? 'no response'}`,
      res?.status ?? 500,
      res?.url,
      res ? await res.clone().text().catch(() => '') : ''
    )
  }

  const data = await res.json()
  return mapBackendSessionsResponse(data)
}
