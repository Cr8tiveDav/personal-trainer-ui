import axios from 'axios'
import { API_ENDPOINTS } from '@/api/api-endpoints'
import { getApiBaseUrl } from '@/lib/api-base-url'
import { siteConfig } from '@/config/site'
import { setAccessTokenExpiry, setToken } from './get-token'

type RefreshResponse = {
  data?: {
    access_token?: string
    refresh_token?: string
    expires_in?: number
  }
  access_token?: string
  refresh_token?: string
  expires_in?: number
}

/**
 * Exchange refresh token for a new access token (client-side).
 * Mirrors server refresh in auth-session.ts.
 */
export async function refreshAccessTokenClient(
  refreshToken: string,
  expiredAccessToken: string | null,
): Promise<string | null> {
  const response = await axios.post<RefreshResponse>(
    `${getApiBaseUrl()}${API_ENDPOINTS.AUTH.REFRESH}`,
    { access_token: expiredAccessToken ?? '' },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      // Plain axios — do not use the app instance (avoids interceptor loop).
      validateStatus: (status) => status < 500,
    },
  )

  if (response.status < 200 || response.status >= 300) return null

  const data = response.data
  const accessToken = data.data?.access_token ?? data.access_token ?? null
  const newRefreshToken = data.data?.refresh_token ?? data.refresh_token ?? null
  const expiresIn = data.data?.expires_in ?? data.expires_in ?? 3600

  if (!accessToken) return null

  setToken(
    siteConfig.cookieNames.access_token,
    accessToken,
    expiresIn,
  )
  setAccessTokenExpiry(expiresIn)

  if (newRefreshToken) {
    setToken(
      siteConfig.cookieNames.refresh_token,
      newRefreshToken,
      7 * 24 * 60 * 60,
    )
  }

  return accessToken
}
