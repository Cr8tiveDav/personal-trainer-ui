import * as z from 'zod'
import { adminNewPasswordSchema, resetCodeSchema } from './password'

export const LoginSchema = z.object({
  password: z.string().min(8, {
    message: 'Password is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
  rememberMe: z.boolean().default(false).optional(),
})

export const RegisterSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required.' }).min(3, {
    message: 'First name must be at least 3 characters',
  }),
  last_name: z.string().min(1, { message: 'Last name is required.' }).min(3, {
    message: 'Last name must be at least 3 characters',
  }),
  email: z.string().min(1, { message: 'Field is required' }).email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password is required',
  }),
})

export const ResetPasswordSchema = z
  .object({
    password: adminNewPasswordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const ForgotPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
})

export const AdminResetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    code: resetCodeSchema,
    new_password: adminNewPasswordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
