'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useUpdateTrainer } from '@/api/trainers'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Trainer } from '../types'

// API canonical values — backend accepts 'approved' not 'active'
const ONBOARDING_STATUSES = ['pending', 'approved', 'suspended'] as const

const ONBOARDING_STATUS_LABELS: Record<(typeof ONBOARDING_STATUSES)[number], string> = {
  pending: 'Pending',
  approved: 'Active',
  suspended: 'Suspended',
}

const SPECIALIZATION_OPTIONS = [
  { value: 'yoga', label: 'Yoga' },
  { value: 'speed', label: 'Speed' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'endurance', label: 'Endurance' },
  { value: 'strength', label: 'Strength & Conditioning' },
]

const editSchema = z.object({
  specialization: z.string().min(1, 'Specialty is required'),
  bio: z.string().max(400).optional(),
  years_of_experience: z
    .number({ message: 'Must be a number' })
    .min(0, 'Must be 0 or more')
    .optional(),
  intro_video_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  onboarding_status: z.enum(ONBOARDING_STATUSES, { message: 'Status is required' }),
})

type EditFormValues = z.infer<typeof editSchema>

interface EditTrainerModalProps {
  open: boolean
  onClose: () => void
  trainer: Trainer
}

export function EditTrainerModal({ open, onClose, trainer }: EditTrainerModalProps) {
  const { mutateAsync, isPending } = useUpdateTrainer(trainer.id)

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      specialization: trainer.specializations?.[0] ?? trainer.specialty ?? '',
      bio: trainer.bio ?? '',
      years_of_experience: trainer.yearsOfExperience ?? undefined,
      intro_video_url: trainer.introVideoUrl ?? '',
      onboarding_status:
        (trainer.onboardingStatus?.toLowerCase() as (typeof ONBOARDING_STATUSES)[number]) ??
        'pending',
    },
  })

  // Re-sync form when trainer data changes (e.g. after a save)
  useEffect(() => {
    form.reset({
      specialization: trainer.specializations?.[0] ?? trainer.specialty ?? '',
      bio: trainer.bio ?? '',
      years_of_experience: trainer.yearsOfExperience ?? undefined,
      intro_video_url: trainer.introVideoUrl ?? '',
      onboarding_status:
        (trainer.onboardingStatus?.toLowerCase() as (typeof ONBOARDING_STATUSES)[number]) ??
        'pending',
    })
  }, [trainer, form])

  const isSubmitting = isPending

  async function onSubmit(values: EditFormValues) {
    try {
      await mutateAsync({
        specializations: [values.specialization],
        bio: values.bio || undefined,
        years_of_experience: values.years_of_experience,
        intro_video_url: values.intro_video_url || undefined,
        onboarding_status: values.onboarding_status,
      })
      // NOTE: toasts are handled by useUpdateTrainer's onSuccess/onError callbacks
      onClose()
    } catch {
      // error toast already fired by the hook's onError
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Edit Trainer</DialogTitle>
        </DialogHeader>

        {/* Read-only identity fields */}
        <div className='grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-4 text-sm'>
          <div>
            <p className='text-xs text-gray-400 mb-0.5'>Name</p>
            <p className='font-medium text-gray-700'>{trainer.name}</p>
          </div>
          <div>
            <p className='text-xs text-gray-400 mb-0.5'>Email</p>
            <p className='font-medium text-gray-700 truncate'>{trainer.email}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='specialization'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty <span className='text-red-500'>*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='login-input'>
                          <SelectValue placeholder='Select specialty' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SPECIALIZATION_OPTIONS.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='onboarding_status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status <span className='text-red-500'>*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='login-input capitalize'>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ONBOARDING_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {ONBOARDING_STATUS_LABELS[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='years_of_experience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      step={1}
                      placeholder='e.g. 3'
                      className='login-input'
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const raw = e.target.value
                        field.onChange(raw === '' ? undefined : Number(raw))
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='intro_video_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intro Video URL</FormLabel>
                  <FormControl>
                    <Input
                      type='url'
                      placeholder='https://...'
                      className='login-input'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center justify-between'>
                    Bio / About
                    <span className='text-xs text-muted-foreground'>
                      {(field.value ?? '').length}/400
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Short description of the trainer...'
                      maxLength={400}
                      className='login-input min-h-[100px] h-auto resize-none py-3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3 pt-2'>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
