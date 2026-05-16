/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { submitContactForm } from '@/lib/services/contact'

export async function contactAction(prevState: any, formData: FormData) {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    await submitContactForm({ name: fullName, email, subject, message })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}