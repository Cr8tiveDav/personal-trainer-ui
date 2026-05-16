type ContactFormValues = {
  email: string
  subject: string
  fullName: string
  message: string
}

export async function submitContactForm(values: ContactFormValues) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Submission failed')
  }

  return data
}
