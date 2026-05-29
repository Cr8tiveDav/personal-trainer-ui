import type { ApiEnvelope } from './index'

export type ForgotPasswordPayload = {
  email: string
}

export type ResetPasswordPayload = {
  email: string
  code: string
  new_password: string
}

export type ForgotPasswordResponse = ApiEnvelope<null>
export type ResetPasswordResponse = ApiEnvelope<null>
