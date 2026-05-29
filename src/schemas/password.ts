import * as z from 'zod'

export const PASSWORD_REQUIREMENTS_MESSAGE =
  'Password must contain upper case, lower case, and a digit'

export const PASSWORD_HINT = `At least 8 characters. ${PASSWORD_REQUIREMENTS_MESSAGE}.`

export function passwordMeetsMinLength(password: string): boolean {
  return password.length >= 8
}

export function passwordMeetsCharacterRules(password: string): boolean {
  return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)
}

export function passwordMeetsAllRequirements(password: string): boolean {
  return passwordMeetsMinLength(password) && passwordMeetsCharacterRules(password)
}

export const adminNewPasswordSchema = z
  .string()
  .min(1, { message: 'Password is required' })
  .min(8, { message: 'Password must be at least 8 characters' })
  .refine(passwordMeetsCharacterRules, {
    message: PASSWORD_REQUIREMENTS_MESSAGE,
  })

export const resetCodeSchema = z
  .string()
  .min(1, { message: 'Enter the 6-digit code' })
  .length(6, { message: 'Code must be exactly 6 digits' })
  .regex(/^\d{6}$/, { message: 'Code must be exactly 6 digits' })
