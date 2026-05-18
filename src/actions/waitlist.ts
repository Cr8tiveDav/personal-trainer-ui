/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { joinWaitlist } from '@/lib/services/waitlist'

export async function waitlistAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone_number = formData.get('phone_number') as string
  const location = formData.get('location') as string

  try {
    await joinWaitlist({ name, email, phone_number, location })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}