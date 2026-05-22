import * as z from 'zod'

export const adminNewPasswordSchema = z
  .string()
  .min(1, { message: 'Password is required' })
  .min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[a-z]/, {
    message: 'Password must include at least one lowercase letter',
  })
  .regex(/[A-Z]/, {
    message: 'Password must include at least one uppercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must include at least one number' })

export const resetCodeSchema = z
  .string()
  .min(1, { message: 'Enter the 6-digit code' })
  .length(6, { message: 'Code must be exactly 6 digits' })
  .regex(/^\d{6}$/, { message: 'Code must be exactly 6 digits' })
