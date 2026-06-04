/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { joinWaitlist } from '@/lib/services/waitlist'
import {
  PHONE_NUMBER_ERROR,
  normalizePhoneNumber,
  toPhoneCountry,
} from '@/lib/phone-number'

export async function waitlistAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone_number = formData.get('phone_number') as string
  const phone_country = toPhoneCountry(formData.get('phone_country'))
  const location = formData.get('location') as string
  const normalizedPhoneNumber = normalizePhoneNumber(phone_number, phone_country)

  if (!normalizedPhoneNumber) {
    return { success: false, error: PHONE_NUMBER_ERROR }
  }

  try {
    const { alreadyExists } = await joinWaitlist({
      name,
      email,
      phone_number: normalizedPhoneNumber,
      location,
    })
    return { success: true, alreadyExists }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
