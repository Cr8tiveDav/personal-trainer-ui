'use client'

import { useMutation } from '@tanstack/react-query'
import { loginAction } from '@/actions/auth'
import type { AdminLoginPayload } from '@/api/types/auth'

type LoginActionResult = {
  success: boolean
  redirectTo?: string
  error?: string
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: async (payload: AdminLoginPayload) => {
      const formData = new FormData()
      formData.append('email', payload.email)
      formData.append('password', payload.password)
      formData.append('type', 'admin')

      const result = (await loginAction(null, formData)) as LoginActionResult

      if (!result.success) {
        throw new Error(result.error || 'Login failed')
      }

      return result
    },
    mutationKey: ['admin-login'],
  })
}
