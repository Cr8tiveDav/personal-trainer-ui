/* eslint-disable react-hooks/incompatible-library */
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type Resolver } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight } from 'lucide-react'

const SPECIALIZATIONS = ['yoga', 'speed', 'cardio', 'endurance', 'strength']
const GENDERS = ['Male', 'Female', 'Other']

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone_number: z.string().min(7, 'Phone number is required'),
  gender: z.string().min(1, 'Gender is required'),
  specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
  years_of_experience: z.coerce.number().min(0, 'Years of experience is required'),
  bio: z.string().max(400).optional(),
})

export type BasicInfoValues = z.infer<typeof schema>

interface Step1Props {
  defaultValues?: Partial<BasicInfoValues>
  onNext: (values: BasicInfoValues) => void
}

export function Step1BasicInfo({ defaultValues, onNext }: Step1Props) {
  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(schema) as Resolver<BasicInfoValues>,
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      gender: '',
      specializations: [],
      years_of_experience: 0,
      bio: '',
      ...defaultValues,
    },
  })

  const { isValid } = form.formState
  const bio = form.watch('bio') ?? ''

  return (
    <div className='rounded-lg bg-white p-6 '>
      <h2 className='text-base font-semibold text-gray-900'>Basic information</h2>
      <p className='mt-1 mb-6 text-sm text-muted-foreground'>This is what clients will see on the trainers public profile.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className='space-y-5'>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            
            {/* Full Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Full name <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='e.g Amara Johnson' 
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input 
                      type='email' 
                      placeholder='e.g joe@example.com' 
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Phone number <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input 
                      type='tel' 
                      placeholder='e.g +234 913 140 4048' 
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name='gender'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Gender <span className='text-red-500'>*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}>
                        <SelectValue placeholder='Female' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDERS.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Specialty */}
            <FormField
              control={form.control}
              name='specializations'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Specialty <span className='text-red-500'>*</span></FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange([val])}
                    value={field.value?.[0] ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}>
                        <SelectValue placeholder='e.g Strength & Conditioning' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SPECIALIZATIONS.map((s) => (
                        <SelectItem key={s} value={s} className='capitalize'>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Years of Experience */}
            <FormField
              control={form.control}
              name='years_of_experience'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Years of Experience <span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input 
                      type='number' 
                      min={0} 
                      placeholder='e.g 1' 
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Bio / About */}
          <FormField
            control={form.control}
            name='bio'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className='flex items-center justify-between'>
                  Bio / About
                  <span className='text-xs text-muted-foreground'>{bio.length}/400</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Short description & what the client should expect'
                    maxLength={400}
                    className={`login-input min-h-[120px] h-auto resize-none py-3 ${fieldState.error ? 'login-input--error' : ''}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end'>
            {/* The single point of change: disabled state governed by react-hook-form validation status */}
            <Button type='submit' disabled={!isValid} className='flex items-center gap-2'>
              Continue <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}