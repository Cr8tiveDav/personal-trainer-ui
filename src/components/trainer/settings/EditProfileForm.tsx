'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'
import { Pencil, Camera, X, Plus } from 'lucide-react'
import { useEditTrainerProfile, useTrainerMe } from '@/api/trainers'
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

  const trainer = response?.data
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [localImage, setLocalImage] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState('')

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

  if (isLoadingProfile) {
    return <div className="p-8 text-center text-sm text-gray-500 animate-pulse">Loading profile...</div>
  }

  const currentAvatar = localImage || form.watch('display_picture')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Settings</h1>
            <p className="text-gray-500 mt-1 text-[15px]">
              Configure your profile details, specialties, and contact information.
            </p>
          </div>
          <Button type='submit' disabled={isPending} className="px-6 rounded-[8px] shrink-0 font-medium h-10">
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
                    <Image src={currentAvatar} alt="Avatar" fill className="object-cover" />
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
                        className='min-h-[100px] placeholder:text-muted resize-none border-gray-200 focus-visible:ring-primary/20 rounded-md'
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
                          className='border-gray-200 focus-visible:ring-primary/20 rounded-md'
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value
                            field.onChange(val === '' ? undefined : Number(val))
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

                const handleAdd = () => {
                  const val = newCategory.trim()
                  if (!val) return
                  // Prevent duplicates (case-insensitive)
                  if (!values.some(v => v.toLowerCase() === val.toLowerCase())) {
                    field.onChange([...values, val])
                  }
                  setNewCategory('')
                }

                return (
                  <FormItem>
                    <div className='mt-5 flex flex-wrap gap-2'>
                      {values.map((item) => (
                        <span
                          key={item}
                          className='flex items-center gap-1.5 rounded-[9999px] border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700'
                        >
                          <span className="capitalize">{item}</span>
                          <button
                            type="button"
                            className='text-gray-400 hover:text-gray-600'
                            onClick={() => field.onChange(values.filter((v) => v !== item))}
                            aria-label={`Remove ${item}`}
                          >
                            <X className='h-3.5 w-3.5' />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className='mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                      <input
                        type='text'
                        placeholder='Add a category...'
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAdd()
                          }
                        }}
                        className='flex-1 rounded-[8px] border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20'
                      />
                      <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!newCategory.trim()}
                        className='flex shrink-0 items-center justify-center gap-1.5 rounded-[8px] border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40'
                      >
                        <Plus className='h-4 w-4' />
                        Add category
                      </button>
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
