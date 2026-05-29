'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { waitlistAction } from '@/actions/waitlist'

const waitlistSchema = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Please enter a valid email address.' }).max(254, { message: 'Email address is too long.' }),
  phone_number: z.string().min(7, { message: 'Please enter a valid phone number.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
})

type WaitlistValues = z.infer<typeof waitlistSchema>

const inputStyles =
  'min-h-12 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-muted outline-none focus:border-primary transition-all'

const errorStyles = 'mt-1 text-xs text-red-500'

export const WaitlistForm = () => {
  const [isSubmitting, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { name: '', email: '', phone_number: '', location: '' },
  })

  function onSubmit(values: WaitlistValues) {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone_number', values.phone_number)
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
    <div className="relative w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-3">
        <div>
          <input
            type="text"
            placeholder="Full name"
            {...register('name')}
            className={inputStyles}
            disabled={isSubmitting}
          />
          {errors.name && <p className={errorStyles}>{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="johndoe@example.com"
            {...register('email')}
            className={inputStyles}
            disabled={isSubmitting}
          />
          {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone number"
            {...register('phone_number')}
            className={inputStyles}
            disabled={isSubmitting}
          />
          {errors.phone_number && <p className={errorStyles}>{errors.phone_number.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Location (e.g. Lagos, Nigeria)"
            {...register('location')}
            className={inputStyles}
            disabled={isSubmitting}
          />
          {errors.location && <p className={errorStyles}>{errors.location.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Join the Waitlist'}
        </Button>
      </form>
    </div>
  )
}