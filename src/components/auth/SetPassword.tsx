'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff, Asterisk } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { cn } from '~/utils'
import FramerButton from '../ui/framer-button'
import { ResetPasswordSchema } from '~/schemas'
import { PASSWORD_HINT } from '~/schemas/password'
import { PasswordRequirements } from './PasswordRequirements'
import { useSetPassword } from '@/api/trainers'
import { displayError } from '~/lib/utils'

interface SetPasswordProps {
  token: string
}

export function SetPassword({ token }: SetPasswordProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { mutate: setPassword, isPending } = useSetPassword()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setPassword(
      { token, new_password: values.password },
      {
        onSuccess() {
          toast.success('Password set successfully! Please log in.')
          router.push('/trainer/login')
        },
        onError(error) {
          displayError(
            error,
            'Invalid or expired setup token. Please contact your admin.',
          )
        },
      }
    )
  }

  return (
    <section className='min-h-screen bg-secondary flex items-center py-6 sm:py-8'>
      <div className='container px-4 sm:px-6'>
        <div className='mx-auto grid max-w-[1201px] md:grid-cols-2'>
          <article className='relative hidden w-full min-h-[678px] md:block'>
            <Image
              src='/images/trainer/login-image.png'
              fill
              alt='Set Password'
              className='object-cover object-center rounded-[4px]'
            />
          </article>

          <article className='relative z-30 right-[20px] bg-white flex flex-col justify-center px-5 py-8 rounded-[16px] sm:px-8 sm:py-10 md:px-10 lg:px-12'>
            <Image
              src='/images/trainer/logo.svg'
              alt='Logo'
              width={173}
              height={32}
              className='mb-8 w-[130px] sm:w-[150px] md:mb-16 lg:mb-20'
            />

            <h2 className='mb-2 text-xl font-medium'>Set your password</h2>
            <p className='mb-8 text-sm text-gray-500'>
              Create a strong password to activate your trainer account.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center text-sm text-neutralColor-dark-2 sm:text-base'>
                        New Password
                        <Asterisk
                          strokeWidth={2}
                          className='relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3'
                        />
                      </FormLabel>
                      <p className='-mt-1 text-xs text-gray-500'>{PASSWORD_HINT}</p>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='new-password'
                            placeholder='Enter new password'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              if (form.getValues('confirmPassword')) {
                                void form.trigger('confirmPassword')
                              }
                            }}
                            className={cn(
                              'login-input pr-10 h-[44px] text-sm sm:text-base',
                              form.formState.errors.password && 'login-input--error'
                            )}
                          />
                        </FormControl>
                        <button
                          type='button'
                          onClick={() => setShowPassword((p) => !p)}
                          className='absolute inset-y-0 right-0 flex items-center pr-3'
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <Eye className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                          ) : (
                            <EyeOff className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                          )}
                        </button>
                      </div>
                      <PasswordRequirements password={field.value} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center text-sm text-neutralColor-dark-2 sm:text-base'>
                        Confirm Password
                        <Asterisk
                          strokeWidth={2}
                          className='relative -top-1 h-2.5 w-2.5 text-red-800 sm:h-3 sm:w-3'
                        />
                      </FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            type={showConfirm ? 'text' : 'password'}
                            autoComplete='new-password'
                            placeholder='Confirm your password'
                            {...field}
                            className={cn(
                              'login-input pr-10 h-[44px] text-sm sm:text-base',
                              form.formState.errors.confirmPassword && 'login-input--error'
                            )}
                          />
                        </FormControl>
                        <button
                          type='button'
                          onClick={() => setShowConfirm((p) => !p)}
                          className='absolute inset-y-0 right-0 flex items-center pr-3'
                          aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                        >
                          {showConfirm ? (
                            <Eye className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                          ) : (
                            <EyeOff className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FramerButton
                  isLoading={isPending}
                  disabled={isPending || !form.formState.isValid}
                  text='Set Password'
                  className='bg-primary text-sm sm:text-base'
                />
              </form>
            </Form>
          </article>
        </div>
      </div>
    </section>
  )
}
