'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useUpdateTrainer } from '@/api/trainers'
import { useCategories } from '@/api/settings'
import { X } from 'lucide-react'
import { cn } from '@/utils'
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

const editSchema = z.object({
  specializations: z.array(z.string()).min(1, 'At least one specialty is required'),
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
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategories()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      specializations: trainer.specializations ?? [],
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
      specializations: trainer.specializations ?? [],
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
        specializations: values.specializations,
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
      <DialogContent className='sm:max-w-lg max-h-[90vh] overflow-y-auto'>
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
            </div>

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

            <FormField
              control={form.control}
              name="specializations"
              render={({ field }) => {
                const values = field.value || []
                const isDisabled = isCategoriesLoading || isCategoriesError
                const isSuccess = !isCategoriesLoading && !isCategoriesError && categories !== undefined
                const categoriesList = isSuccess && categories ? categories.map((c) => c.name) : []
                const filteredCategories = categoriesList.filter((cat) =>
                  cat.toLowerCase().includes(searchQuery.toLowerCase())
                )

                return (
                  <FormItem>
                    <FormLabel>Specialties <span className='text-red-500'>*</span></FormLabel>
                    <div className={cn(
                      "w-full border border-gray-200 rounded-[12px] bg-white transition-all overflow-hidden mt-1.5",
                      isOpen && !isDisabled ? "border-[#0b4d8d] shadow-sm" : "hover:border-gray-300",
                      isDisabled && "opacity-50 bg-gray-50/50 cursor-not-allowed pointer-events-none"
                    )}>
                      {/* Trigger / Header bar */}
                      <div className="flex items-center justify-between min-h-[44px] px-3 py-1.5 gap-2">
                        {/* Left Side: Pill Tags & Placeholder */}
                        <div
                          className="flex flex-wrap gap-1 items-center flex-1 cursor-pointer"
                          onClick={() => !isDisabled && setIsOpen(!isOpen)}
                          role='combobox'
                          aria-expanded={isOpen}
                          aria-controls="admin-categories-dropdown-panel"
                        >
                          {values.length === 0 ? (
                            <span className="text-sm text-gray-400 select-none">
                              {isCategoriesLoading
                                ? "Loading categories..."
                                : isCategoriesError
                                  ? "Failed to load categories"
                                  : "Select categories..."
                              }
                            </span>
                          ) : (
                            values.map((item) => (
                              <span
                                key={item}
                                className='inline-flex items-center gap-1 rounded-full bg-gray-100 border border-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700'
                              >
                                <span className="capitalize">{item}</span>
                                <button
                                  type="button"
                                  className='text-gray-450 hover:text-gray-600 focus:outline-none'
                                  disabled={isDisabled}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (isDisabled) return
                                    field.onChange(values.filter((v) => v !== item))
                                  }}
                                  aria-label={`Remove ${item}`}
                                >
                                  <X className='h-3 w-3' />
                                </button>
                              </span>
                            ))
                          )}
                        </div>

                        {/* Right Side Controls */}
                        <div className="flex items-center gap-2 shrink-0 border-l border-gray-200 pl-2">
                          {values.length > 0 && (
                            <>
                              <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#344054] px-1 text-[10px] font-bold text-white">
                                {values.length}
                              </div>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                disabled={isDisabled}
                                onClick={() => {
                                  if (isDisabled) return
                                  field.onChange([])
                                }}
                                aria-label="Clear all selections"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            className="text-gray-450 hover:text-gray-600 focus:outline-none disabled:opacity-50"
                            onClick={() => !isDisabled && setIsOpen(!isOpen)}
                            disabled={isDisabled}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                          >
                            <svg
                              className={cn("h-4 w-4 transition-transform duration-205", isOpen && "rotate-180")}
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin="round"
                                d='M19 9l-7 7-7-7'
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Dropdown Panel Content */}
                      {isOpen && (
                        <div id="admin-categories-dropdown-panel" className="border-t border-gray-200">
                          {/* Search Input */}
                          <div className="relative border-b border-gray-100 px-3 py-1.5 bg-gray-50/50">
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search..."
                              className="w-full h-8 bg-transparent text-sm placeholder:text-gray-400 text-gray-900 focus:outline-none pr-8"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Checklist */}
                          <div className="py-1 max-h-48 overflow-y-auto divide-y divide-gray-100">
                            {filteredCategories.map((cat) => {
                              const isChecked = values.some(
                                (v) => v.toLowerCase() === cat.toLowerCase()
                              )
                              return (
                                <div
                                  key={cat}
                                  onClick={() => {
                                    if (isChecked) {
                                      field.onChange(values.filter((v) => v.toLowerCase() !== cat.toLowerCase()))
                                    } else {
                                      field.onChange([...values, cat])
                                    }
                                  }}
                                  className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                                >
                                  <div className={cn(
                                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-205",
                                    isChecked
                                      ? "border-[#0b4d8d] bg-[#0b4d8d] text-white"
                                      : "border-gray-300 bg-white"
                                  )}>
                                    {isChecked && (
                                      <svg
                                        className="h-3 w-3 stroke-[3px]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin="round"
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <span>{cat}</span>
                                </div>
                              )
                            })}
                            {filteredCategories.length === 0 && (
                              <div className="px-3 py-3 text-sm text-gray-400 text-center">
                                No specialties found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                    {isCategoriesError && (
                      <p role='alert' aria-live='polite' className="text-xs text-red-500 mt-1.5 px-1 font-medium">
                        Failed to load categories. Please try refreshing the page.
                      </p>
                    )}
                  </FormItem>
                )
              }}
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
              <Button type='submit' disabled={!form.formState.isDirty || isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
