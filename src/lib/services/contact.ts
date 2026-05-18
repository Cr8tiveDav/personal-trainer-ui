type ContactPayload = {
  email: string
  subject: string
  name: string
  message: string
}

export async function submitContactForm(payload: ContactPayload) {
  const res = await fetch(`${process.env.API_URL}/contact-us`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Submission failed')

  return data
}