'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Asterisk, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import * as z from 'zod'
import {
  useForgotPassword,
  useResetPassword,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
} from '@/api/password-reset'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { AdminResetPasswordSchema, ForgotPasswordEmailSchema } from '~/schemas'
import FramerButton from '../ui/framer-button'
import { Input } from '../ui/input'
import { VerificationCodeInput } from './VerificationCodeInput'
import { PASSWORD_HINT } from '~/schemas/password'
import { PasswordRequirements } from './PasswordRequirements'
import { cn } from '~/utils'

type Step = 'request' | 'reset' | 'sent'

interface ForgotPasswordFlowProps {
  type: 'admin' | 'trainer'
}

export function ForgotPasswordFlow({ type }: ForgotPasswordFlowProps) {
  const [step, setStep] = useState<Step>('request')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const forgotPassword = useForgotPassword()
  const resetPassword = useResetPassword({ type })
  const backHref = type === 'admin' ? '/admin/login' : '/trainer/login'
  const emailForm = useForm<z.infer<typeof ForgotPasswordEmailSchema>>({
    resolver: zodResolver(ForgotPasswordEmailSchema),
    defaultValues: { email: '' },
  })

  const resetForm = useForm<z.infer<typeof AdminResetPasswordSchema>>({
    resolver: zodResolver(AdminResetPasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
      new_password: '',
      confirmPassword: '',
    },
  })

  function onRequestCode(values: z.infer<typeof ForgotPasswordEmailSchema>) {
    forgotPassword.mutate(
      { email: values.email },
      {
        onSuccess: () => {
          setEmail(values.email)
          resetForm.setValue('email', values.email)
          setStep('sent')
        },
      },
    )
  }

  function onResetPassword(values: z.infer<typeof AdminResetPasswordSchema>) {
    resetPassword.mutate({
      email: values.email,
      code: values.code,
      new_password: values.new_password,
    })
  }

  function goToResetStep() {
    resetForm.setValue('email', email)
    resetForm.setValue('code', '')
    setStep('reset')
  }

  function resendCode() {
    const targetEmail = resetForm.getValues('email') || email
    if (!targetEmail) {
      setStep('request')
      return
    }
    forgotPassword.mutate({ email: targetEmail })
  }

  return (
    <section className="min-h-screen bg-secondary flex items-center py-6 sm:py-8">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto grid max-w-[1201px] md:grid-cols-2">
          <article className="relative hidden w-full min-h-[678px] md:block">
            <Image
              src="/images/trainer/login-image.png"
              fill
              alt="Forgot password"
              className="object-cover object-center rounded-[4px]"
            />
          </article>

          <article className="relative z-30 md:right-[20px] bg-white flex flex-col justify-center px-5 py-8 rounded-[16px] sm:px-8 sm:py-10 md:px-10 lg:px-12">
            <Image
              src="/images/trainer/logo.svg"
              alt="Logo"
              width={173}
              height={32}
              className="mb-8 w-[130px] sm:w-[150px] md:mb-10"
            />

            <Link
              href={backHref}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#0b4d8d] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>

            {step === 'request' && (
              <>
                <h2 className="mb-2 text-xl font-medium text-gray-900">
                  Forgot password
                </h2>
                <p className="mb-8 text-sm text-gray-500">
                  Enter your admin email and we&apos;ll send a 6-digit reset
                  code if an account exists.
                </p>

                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(onRequestCode)}
                    className="space-y-5"
                  >
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm text-neutralColor-dark-2 sm:text-base">
                            Email
                            <Asterisk
                              strokeWidth={2}
                              className="relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3"
                            />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              autoComplete="email"
                              disabled={forgotPassword.isPending}
                              placeholder="admin@example.com"
                              {...field}
                              className={cn(
                                'login-input h-[44px] text-sm sm:text-base',
                                emailForm.formState.errors.email &&
                                  'login-input--error',
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FramerButton
                      isLoading={forgotPassword.isPending}
                      disabled={forgotPassword.isPending}
                      text="Send reset code"
                      className="bg-primary text-sm sm:text-base"
                    />
                  </form>
                </Form>
              </>
            )}

            {step === 'sent' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Check your email
                </h2>
                <p className="text-sm leading-relaxed text-gray-600">
                  {FORGOT_PASSWORD_SUCCESS_MESSAGE}
                </p>
                <p className="text-sm text-gray-500">
                  Sent to{' '}
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
                <button
                  type="button"
                  onClick={goToResetStep}
                  className="bg-primary relative flex w-full justify-center rounded-[6px] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#093e72] sm:px-6 sm:py-3 sm:text-base"
                >
                  Enter reset code
                </button>
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="w-full text-center text-sm font-medium text-gray-500 hover:text-[#0b4d8d]"
                >
                  Use a different email
                </button>
              </div>
            )}

            {step === 'reset' && (
              <>
                <h2 className="mb-2 text-xl font-medium text-gray-900">
                  Reset password
                </h2>
                <p className="mb-8 text-sm text-gray-500">
                  Enter the 6-digit code from your email and choose a new
                  password.
                </p>

                <Form {...resetForm}>
                  <form
                    onSubmit={resetForm.handleSubmit(onResetPassword)}
                    className="space-y-5"
                  >
                    <FormField
                      control={resetForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm text-neutralColor-dark-2 sm:text-base">
                            Email
                            <Asterisk
                              strokeWidth={2}
                              className="relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3"
                            />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              autoComplete="email"
                              disabled={resetPassword.isPending}
                              {...field}
                              className={cn(
                                'login-input h-[44px] text-sm sm:text-base',
                                resetForm.formState.errors.email &&
                                  'login-input--error',
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-center text-sm text-neutralColor-dark-2 sm:text-base">
                            Reset code
                            <Asterisk
                              strokeWidth={2}
                              className="relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3"
                            />
                          </FormLabel>
                          <FormControl>
                            <VerificationCodeInput
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              disabled={resetPassword.isPending}
                              error={!!resetForm.formState.errors.code}
                            />
                          </FormControl>
                          <FormMessage className="text-center" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="new_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm text-neutralColor-dark-2 sm:text-base">
                            New password
                            <Asterisk
                              strokeWidth={2}
                              className="relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3"
                            />
                          </FormLabel>
                          <p className="-mt-1 text-xs text-gray-500">
                            {PASSWORD_HINT}
                          </p>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                disabled={resetPassword.isPending}
                                placeholder="Enter new password"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  if (resetForm.getValues('confirmPassword')) {
                                    void resetForm.trigger('confirmPassword')
                                  }
                                }}
                                className={cn(
                                  'login-input h-[44px] pr-10 text-sm sm:text-base',
                                  resetForm.formState.errors.new_password &&
                                    'login-input--error',
                                )}
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => setShowPassword((p) => !p)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                              {showPassword ? (
                                <Eye className="h-4 w-4 text-gray-400" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <PasswordRequirements password={field.value} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resetForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm text-neutralColor-dark-2 sm:text-base">
                            Confirm password
                            <Asterisk
                              strokeWidth={2}
                              className="relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3"
                            />
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                disabled={resetPassword.isPending}
                                placeholder="Confirm new password"
                                {...field}
                                className={cn(
                                  'login-input h-[44px] pr-10 text-sm sm:text-base',
                                  resetForm.formState.errors.confirmPassword &&
                                    'login-input--error',
                                )}
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword((p) => !p)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                              {showConfirmPassword ? (
                                <Eye className="h-4 w-4 text-gray-400" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FramerButton
                      isLoading={resetPassword.isPending}
                      disabled={
                        resetPassword.isPending || !resetForm.formState.isValid
                      }
                      text="Reset password"
                      className="bg-primary text-sm sm:text-base"
                    />

                    <button
                      type="button"
                      disabled={forgotPassword.isPending}
                      onClick={resendCode}
                      className="w-full text-center text-sm font-medium text-gray-500 hover:text-[#0b4d8d] disabled:opacity-50"
                    >
                      {forgotPassword.isPending ? 'Sending…' : 'Resend code'}
                    </button>
                  </form>
                </Form>
              </>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
