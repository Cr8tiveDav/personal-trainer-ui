'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { postRequest } from '~/lib/http'
import { displayError, showSuccessToast } from '~/lib/utils'
import { API_ENDPOINTS } from './api-endpoints'
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from './types/password-reset'

export const FORGOT_PASSWORD_SUCCESS_MESSAGE =
  'If an admin account exists for this email, a 6-digit reset code has been sent. Check your inbox.'

export const RESET_PASSWORD_SUCCESS_MESSAGE =
  'Your password has been reset. Sign in with your new password.'

export function useForgotPassword() {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (payload: ForgotPasswordPayload) =>
      postRequest<ForgotPasswordResponse, ForgotPasswordPayload>({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        payload,
      }),
    onSuccess() {
      showSuccessToast(FORGOT_PASSWORD_SUCCESS_MESSAGE)
    },
    onError(error) {
      displayError(
        error,
        'Unable to process your request. Please try again later.',
      )
    },
  })
}

export function useResetPassword() {
  const router = useRouter()

  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (payload: ResetPasswordPayload) =>
      postRequest<ResetPasswordResponse, ResetPasswordPayload>({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        payload,
      }),
    onSuccess() {
      showSuccessToast(RESET_PASSWORD_SUCCESS_MESSAGE)
      router.push('/admin/login')
    },
    onError(error) {
      displayError(
        error,
        'Unable to reset your password. Check the code and try again.',
      )
    },
  })
}
