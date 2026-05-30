import { API_ENDPOINTS } from '@/api/api-endpoints'
import { apiUrl } from '@/lib/api/config'

export interface WaitlistPayload {
  email: string
  phone_number: string
  location: string
  name: string
}

export async function joinWaitlist(payload: WaitlistPayload) {
  const res = await fetch(apiUrl(API_ENDPOINTS.WAITLIST.JOIN), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data?.message || 'Something went wrong')

  return { data, alreadyExists: res.status === 200 }
}
