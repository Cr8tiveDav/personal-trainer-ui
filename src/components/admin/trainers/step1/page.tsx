/* eslint-disable react-hooks/incompatible-library */
'use client'
import { useForm, useFieldArray, type Resolver } from 'react-hook-form'
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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRight, Plus, X } from 'lucide-react'
import { useState, KeyboardEvent } from 'react'
import type { TrainerBenefitInput } from '../types'
import {
  TRAINER_ONBOARDING_STATUSES,
  TRAINER_SPECIALIZATIONS,
} from '@/api/types/trainers'

const SPECIALIZATIONS = TRAINER_SPECIALIZATIONS
const ONBOARDING_STATUSES = TRAINER_ONBOARDING_STATUSES

const singleWordTag = z
  .string()
  .trim()
  .min(1, 'Tag is required')
  .max(32)
  .regex(/^\S+$/, 'Single word only — no spaces')

const schema = z.object({
  name: z.string().min(2, 'Display name is required'),
  email: z.string().email('Valid email is required'),
  specializations: z
    .array(z.enum(SPECIALIZATIONS))
    .min(1, 'Select at least one specialization'),
  training_styles: z.array(singleWordTag).max(4, 'Up to 4 training styles'),
  benefits: z
    .array(
      z.object({
        title: z.string().min(1, 'Title is required'),
        subtext: z.string().min(1, 'Subtext is required'),
      })
    )
    .optional(),
  years_of_experience: z.coerce.number().min(0, 'Years of experience is required'),
  bio: z.string().max(400).optional(),
  onboarding_status: z.enum(ONBOARDING_STATUSES).default('pending'),
})

export type BasicInfoValues = z.infer<typeof schema>

interface Step1Props {
  defaultValues?: Partial<BasicInfoValues>
  onNext: (values: BasicInfoValues) => void
}

export function Step1BasicInfo({ defaultValues, onNext }: Step1Props) {
  const [styleInput, setStyleInput] = useState('')

  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(schema) as Resolver<BasicInfoValues>,
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      specializations: [],
      training_styles: [],
      benefits: [],
      years_of_experience: 0,
      bio: '',
      onboarding_status: 'pending',
      ...defaultValues,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'benefits',
  })

  const { isValid } = form.formState
  const bio = form.watch('bio') ?? ''
  const specializations = form.watch('specializations') ?? []
  const trainingStyles = form.watch('training_styles') ?? []

  const toggleSpecialization = (value: (typeof SPECIALIZATIONS)[number]) => {
    const current = form.getValues('specializations')
    const next = current.includes(value)
      ? current.filter((s) => s !== value)
      : [...current, value]
    form.setValue('specializations', next, { shouldValidate: true })
  }

  const addTrainingStyle = () => {
    const tag = styleInput.trim().toLowerCase()
    if (!tag || /\s/.test(tag)) return
    if (trainingStyles.length >= 4) return
    if (trainingStyles.includes(tag)) {
      setStyleInput('')
      return
    }
    form.setValue('training_styles', [...trainingStyles, tag], { shouldValidate: true })
    setStyleInput('')
  }

  const handleStyleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTrainingStyle()
    }
  }

  return (
    <div className='rounded-lg bg-white p-6'>
      <h2 className='text-base font-semibold text-gray-900'>Basic information</h2>
      <p className='mt-1 mb-6 text-sm text-muted-foreground'>
        Profile details for the trainer&apos;s public page. Login credentials are generated and emailed automatically.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className='space-y-5'>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Display name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. Amara Johnson'
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='e.g. trainer@example.com'
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='years_of_experience'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Years of experience <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      placeholder='e.g. 5'
                      className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='onboarding_status'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Onboarding status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={`login-input ${fieldState.error ? 'login-input--error' : ''}`}
                      >
                        <SelectValue placeholder='Pending' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ONBOARDING_STATUSES.map((status) => (
                        <SelectItem key={status} value={status} className='capitalize'>
                          {status}
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
            name='specializations'
            render={() => (
              <FormItem>
                <FormLabel>
                  Specializations <span className='text-red-500'>*</span>
                </FormLabel>
                <div className='flex flex-wrap gap-3'>
                  {SPECIALIZATIONS.map((spec) => (
                    <label
                      key={spec}
                      className='flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm capitalize hover:border-gray-300'
                    >
                      <Checkbox
                        checked={specializations.includes(spec)}
                        onCheckedChange={() => toggleSpecialization(spec)}
                      />
                      {spec}
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='training_styles'
            render={() => (
              <FormItem>
                <FormLabel>Training styles (optional, up to 4)</FormLabel>
                <p className='text-xs text-muted-foreground mb-2'>
                  Single-word tags — stored lowercase, no spaces.
                </p>
                <div className='flex gap-2'>
                  <Input
                    value={styleInput}
                    onChange={(e) => setStyleInput(e.target.value)}
                    onKeyDown={handleStyleKeyDown}
                    placeholder='e.g. hiit'
                    className='login-input'
                    disabled={trainingStyles.length >= 4}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    onClick={addTrainingStyle}
                    disabled={trainingStyles.length >= 4 || !styleInput.trim()}
                  >
                    Add
                  </Button>
                </div>
                {trainingStyles.length > 0 && (
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {trainingStyles.map((tag) => (
                      <span
                        key={tag}
                        className='inline-flex items-center gap-1 rounded-full bg-[#f4f9fd] px-3 py-1 text-sm text-[#0b4d8d]'
                      >
                        {tag}
                        <button
                          type='button'
                          onClick={() =>
                            form.setValue(
                              'training_styles',
                              trainingStyles.filter((t) => t !== tag),
                              { shouldValidate: true }
                            )
                          }
                          className='text-gray-400 hover:text-red-500'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className='mb-3 flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-900'>Benefits (optional)</p>
                <p className='text-xs text-muted-foreground'>
                  Marketing copy shown on the public profile. Order is preserved.
                </p>
              </div>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => append({ title: '', subtext: '' } as TrainerBenefitInput)}
                className='gap-1'
              >
                <Plus className='h-4 w-4' /> Add benefit
              </Button>
            </div>
            {fields.length === 0 ? (
              <p className='text-sm text-muted-foreground'>No benefits added yet.</p>
            ) : (
              <div className='space-y-4'>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className='rounded-lg border border-gray-100 p-4 space-y-3'
                  >
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-700'>Benefit {index + 1}</p>
                      <button
                        type='button'
                        onClick={() => remove(index)}
                        className='text-gray-400 hover:text-red-500'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                    <FormField
                      control={form.control}
                      name={`benefits.${index}.title`}
                      render={({ field: titleField }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g. Personalized plans' {...titleField} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`benefits.${index}.subtext`}
                      render={({ field: subtextField }) => (
                        <FormItem>
                          <FormLabel>Subtext</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='e.g. Tailored to your goals and schedule'
                              {...subtextField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name='bio'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className='flex items-center justify-between'>
                  Bio (optional)
                  <span className='text-xs text-muted-foreground'>{bio.length}/400</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Short introduction for the public profile'
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
            <Button type='submit' disabled={!isValid} className='flex items-center gap-2'>
              Continue <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
