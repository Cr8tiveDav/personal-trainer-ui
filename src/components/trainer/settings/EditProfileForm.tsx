'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'
import { Pencil, Camera, X } from 'lucide-react'
import { useEditTrainerProfile, useTrainerMe } from '@/api/trainers'
import { useCategories } from '@/api/settings'
import { cn } from '@/utils'
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
import { Button } from '@/components/ui/button'
import { PhoneInputField } from '@/components/ui/phone-input'
import {
  PHONE_NUMBER_ERROR,
  isStrongPhoneNumber,
  normalizePhoneNumber,
} from '@/lib/phone-number'
import { displayError } from '@/lib/utils'

const PREDEFINED_CATEGORIES = [
  'Yoga',
  'Speed',
  'Cardio',
  'Endurance',
  'Strength',
]

const profileSchema = z.object({
  bio: z.string().max(400, 'Bio is too long').optional(),
  years_of_experience: z.number().min(0, 'Cannot be negative').optional(),
  specializations: z.array(z.string()).optional(),
  display_picture: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  phone_number: z.string().optional().refine(
    (val) => {
      if (!val) return true; // It's optional, so empty is fine
      return isStrongPhoneNumber(val);
    },
    PHONE_NUMBER_ERROR
  ),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function EditProfileForm() {
  const { data: response, isLoading: isLoadingProfile } = useTrainerMe()
  const { mutateAsync, isPending } = useEditTrainerProfile()
  const { data: categories = [] } = useCategories()

  const trainer = response?.data
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [localImage, setLocalImage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: '',
      years_of_experience: 0,
      specializations: [],
      display_picture: '',
      phone_number: '',
    },
  })

  useEffect(() => {
    if (trainer) {
      form.reset({
        bio: trainer.bio || '',
        years_of_experience: trainer.yearsOfExperience || 0,
        specializations: trainer.specializations || [],
        display_picture: trainer.displayPictureUrl || '',
        phone_number: trainer.phoneNumber || '',
      })
    }
  }, [trainer, form])

  async function onSubmit(values: ProfileFormValues) {
    try {
      await mutateAsync({
        bio: values.bio,
        years_of_experience: values.years_of_experience,
        specializations: values.specializations,
        display_picture: values.display_picture,
        phone_number: values.phone_number ? (normalizePhoneNumber(values.phone_number) ?? values.phone_number) : undefined,
      })
    } catch {
      // Error handled by mutation
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file)
    setLocalImage(objectUrl)

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      form.setValue('display_picture', base64String, { shouldDirty: true })
    }
    reader.onerror = () => {
      displayError('Failed to read file')
    }
    reader.readAsDataURL(file)
  }

  const watchedAvatar = useWatch({ control: form.control, name: 'display_picture' })

  if (isLoadingProfile) {
    return <div className="p-8 text-center text-sm text-gray-500 animate-pulse">Loading profile...</div>
  }

  const currentAvatar = localImage || watchedAvatar

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Settings</h1>
            <p className="text-gray-500 mt-1 text-[15px]">
              Configure your profile details, specialties, and contact information.
            </p>
          </div>
          <Button type='submit' disabled={!form.formState.isDirty || isPending} className="w-full sm:w-auto px-6 rounded-[8px] shrink-0 font-medium h-10">
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Profile Picture Section */}
          <div className="bg-white border border-gray-100 rounded-[12px] p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile Picture</h3>
            <p className="text-sm text-gray-500 mb-6">
              This will be displayed on your public profile and to your clients.
            </p>

            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="h-25 w-25 md:h-42.5 md:w-42.5 rounded-[9999px] overflow-hidden border-[3px] border-[#EBEBEB] bg-gray-200 flex items-center justify-center relative">
                  {currentAvatar ? (
                    <Image src={currentAvatar} alt="Avatar" fill className="object-cover object-top" />
                  ) : (
                    <Camera className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-transparent hover:text-primary hover:bg-gray-100 transition-colors shadow-sm"
                  aria-label="Upload picture"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="text-sm text-gray-500 max-w-xs">
                Image should not be more than 5mb.
              </div>
            </div>
            {/* Hidden field to keep form state bound */}
            <input type="hidden" {...form.register('display_picture')} />
          </div>

          {/* General Section */}
          <div className="bg-white border border-gray-100 rounded-[12px] p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">General</h3>
            <p className="text-sm text-gray-500 mb-6">
              Basic information about your experience and background.
            </p>

            <div className="space-y-8">
              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center justify-between text-gray-700'>
                      Bio
                      <span className='text-xs text-muted-foreground font-normal'>
                        {(field.value ?? '').length}/400
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell clients about yourself...'
                        maxLength={400}
                        className='min-h-[120px] placeholder:text-gray-400 resize-none border-gray-300 focus:border-[#0b4d8d] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[16px] bg-white px-4 py-3 text-sm text-gray-900 transition-colors'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name='years_of_experience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          className='h-12 border-gray-300 focus:border-[#0b4d8d] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[16px] bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 transition-colors'
                          value={field.value === 0 || field.value === undefined || field.value === null ? '' : field.value}
                          onChange={(e) => {
                            const val = e.target.value
                            field.onChange(val === '' ? 0 : Number(val))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phone_number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInputField
                          value={field.value}
                          onChange={field.onChange}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="bg-white border border-gray-100 rounded-[12px] p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Categories</h3>
            <p className="text-sm text-gray-500 mb-6">
              Select the specialized training categories you offer.
            </p>

            <FormField
              control={form.control}
              name="specializations"
              render={({ field }) => {
                const values = field.value || []
                const categoriesList = categories.length > 0 ? categories.map((c) => c.name) : PREDEFINED_CATEGORIES
                const filteredCategories = categoriesList.filter((cat) =>
                  cat.toLowerCase().includes(searchQuery.toLowerCase())
                )

                return (
                  <FormItem>
                    <div className={cn(
                      "w-full border border-gray-200 rounded-[16px] bg-white transition-all overflow-hidden mt-4",
                      isOpen ? "border-[#0b4d8d] shadow-sm" : "hover:border-gray-300"
                    )}>
                      {/* Trigger / Header bar */}
                      <div className="flex items-center justify-between min-h-[52px] px-4 py-2 gap-3">
                        {/* Left Side: Pill Tags & Placeholder */}
                        <div
                          className="flex flex-wrap gap-1.5 items-center flex-1 cursor-pointer"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {values.length === 0 ? (
                            <span className="text-sm text-gray-400 select-none">Select categories...</span>
                          ) : (
                            values.map((item) => (
                              <span
                                key={item}
                                className='inline-flex items-center gap-1 rounded-full bg-gray-100 border border-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700'
                              >
                                <span className="capitalize">{item}</span>
                                <button
                                  type="button"
                                  className='text-gray-450 hover:text-gray-600 focus:outline-none'
                                  onClick={(e) => {
                                    e.stopPropagation()
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
                        <div className="flex items-center gap-2.5 shrink-0 border-l border-gray-200 pl-3">
                          {values.length > 0 && (
                            <>
                              <div className="flex h-5.5 min-w-[22px] items-center justify-center rounded-full bg-[#344054] px-1.5 text-[11px] font-bold text-white">
                                {values.length}
                              </div>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={() => field.onChange([])}
                                aria-label="Clear all selections"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            className="text-gray-450 hover:text-gray-600 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
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
                        <div className="border-t border-gray-200">
                          {/* Search Input */}
                          <div className="relative border-b border-gray-100 px-4 py-2 bg-gray-50/50">
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search..."
                              className="w-full h-9 bg-transparent text-sm placeholder:text-gray-400 text-gray-900 focus:outline-none pr-8"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                          <div className="py-1 max-h-60 overflow-y-auto divide-y divide-gray-100">
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
                                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                                >
                                  <div className={cn(
                                    "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-205",
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
                              <div className="px-4 py-4 text-sm text-gray-400 text-center">
                                No specialties found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>

        </div>
      </form>
    </Form>
  )
}
