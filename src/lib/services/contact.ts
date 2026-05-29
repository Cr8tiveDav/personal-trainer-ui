import { API_ENDPOINTS } from '@/api/api-endpoints'
import { apiUrl } from '@/lib/api/config'

type ContactPayload = {
  email: string
  subject: string
  name: string
  message: string
}

export async function submitContactForm(payload: ContactPayload) {
  const res = await fetch(apiUrl(API_ENDPOINTS.CONTACT.SUBMIT), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Submission failed')

  return data
}
