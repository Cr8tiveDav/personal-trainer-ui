import { API_ENDPOINTS } from '@/api/api-endpoints'
import type { LoginPayload, LoginResponse } from '@/api/types/auth'
import { apiUrl, getApiBaseUrl } from '@/lib/api/config'

export async function authenticateUser(
  data: LoginPayload,
  endpoint: string
): Promise<LoginResponse> {
  const res = await fetch(apiUrl(endpoint), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Login failed')
  }

  return res.json()
}

export async function adminLogin(data: LoginPayload) {
  getApiBaseUrl()
  return authenticateUser(data, API_ENDPOINTS.AUTH.ADMIN_LOGIN)
}

export async function trainerLogin(data: LoginPayload) {
  getApiBaseUrl()
  return authenticateUser(data, API_ENDPOINTS.AUTH.TRAINER_LOGIN)
}
