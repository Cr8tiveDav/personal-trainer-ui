'use client'

import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { waitlistAction } from '@/actions/waitlist'
import { PhoneInputField } from '@/components/ui/phone-input'
import {
  PHONE_NUMBER_ERROR,
  isStrongPhoneNumber,
  normalizePhoneNumber,
} from '@/lib/phone-number'

const waitlistSchema = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Please enter a valid email address.' }).max(254, { message: 'Email address is too long.' }),
  phone_number: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .refine((value) => isStrongPhoneNumber(value), {
      message: PHONE_NUMBER_ERROR,
    }),
  location: z.string().min(2, { message: 'Location is required.' }),
})

type WaitlistValues = z.infer<typeof waitlistSchema>

const inputStyles =
  'min-h-12 w-full rounded-[6px] border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-muted outline-none focus:border-primary transition-all'

const errorStyles = 'mt-1 text-xs text-red-500'

type WaitlistFormProps = {
  ctaLabel?: string
}

export const WaitlistForm = ({ ctaLabel = 'Join the Waitlist' }: WaitlistFormProps) => {
  const [isSubmitting, startTransition] = useTransition()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { name: '', email: '', phone_number: '', location: '' },
  })

  function onSubmit(values: WaitlistValues) {
    const formData = new FormData()
    const phoneNumber = normalizePhoneNumber(values.phone_number)

    if (!phoneNumber) {
      toast.error(PHONE_NUMBER_ERROR)
      return
    }

    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone_number', phoneNumber)
    formData.append('location', values.location)

    startTransition(async () => {
      const result = await waitlistAction(null, formData)

      if (result?.success) {
        if (result.alreadyExists) {
          toast.info("You're already on our waitlist! We'll be in touch soon.")
        } else {
          toast.success("You're on the list! We'll be in touch soon.")
          reset()
        }
      } else {
        toast.error(result?.error || 'Something went wrong. Please try again.')
      }
    })
  }

  return (
    <div className='relative w-full max-w-lg'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-3'
      >
        <div>
          <input
            type='text'
            placeholder='Full name'
            {...register('name')}
            className={inputStyles}
            disabled={isSubmitting}
          />
          {errors.name && <p className={errorStyles}>{errors.name.message}</p>}
        </div>

        <div>
          <input
            type='email'
            placeholder='johndoe@example.com'
            {...register('email')}
            className={inputStyles}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className={errorStyles}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Controller
            name='phone_number'
            control={control}
            render={({ field }) => (
              <PhoneInputField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                hasError={!!errors.phone_number}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.phone_number && (
            <p className={errorStyles}>{errors.phone_number.message}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            placeholder='Location (e.g. California, USA)'
            {...register('location')}
            className={inputStyles}
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className={errorStyles}>{errors.location.message}</p>
          )}
        </div>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : ctaLabel}
        </Button>
      </form>
    </div>
  )
}
