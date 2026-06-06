import {
  isValidPhoneNumber,
  isSupportedCountry,
  parsePhoneNumber,
  type CountryCode as Country,
} from 'libphonenumber-js'

export const PHONE_NUMBER_ERROR = 'Enter a valid phone number.'
export const DEFAULT_PHONE_COUNTRY: Country = 'NG'

export function isStrongPhoneNumber(
  value: string | null | undefined,
  defaultCountry: Country = DEFAULT_PHONE_COUNTRY,
) {
  const trimmed = value?.trim()
  if (!trimmed) return false

  return isValidPhoneNumber(trimmed, defaultCountry)
}

export function normalizePhoneNumber(
  value: string | null | undefined,
  defaultCountry: Country = DEFAULT_PHONE_COUNTRY,
) {
  const trimmed = value?.trim()
  if (!trimmed) return null

  try {
    const phoneNumber = parsePhoneNumber(trimmed, {
      defaultCountry,
      extract: false,
    })

    if (!phoneNumber?.isValid()) return null

    return phoneNumber.number
  } catch {
    return null
  }
}

export function toPhoneCountry(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return DEFAULT_PHONE_COUNTRY

  const country = value.trim().toUpperCase()
  if (!isSupportedCountry(country)) return DEFAULT_PHONE_COUNTRY

  return country as Country
}
