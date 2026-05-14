export interface WaitlistPayload {
  email: string
  phone_number: string
  location: string
  name: string
}

export const joinWaitlist = async (payload: WaitlistPayload) => {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong')
  }
  return data
}
