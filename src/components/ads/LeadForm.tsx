'use client'

import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'

type FormValues = {
  name: string
  email: string
  country: string
  phone: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type LeadFormProps = {
  formId: string
  className?: string
  compact?: boolean
  phonePlaceholder?: string
}

const initialFormValues: FormValues = {
  name: '',
  email: '',
  country: 'US',
  phone: '',
}

const validateForm = (values: FormValues) => {
  const errors: FormErrors = {}
  const trimmedName = values.name.trim()
  const trimmedEmail = values.email.trim()
  const phoneDigits = values.phone.replace(/\D/g, '')

  if (!trimmedName) {
    errors.name = 'Full name is required.'
  } else if (!/^[A-Za-z][A-Za-z\s'-]{1,}$/.test(trimmedName)) {
    errors.name = 'Enter a valid name.'
  }

  if (!trimmedEmail) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.country) {
    errors.country = 'Country code is required.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Enter a valid phone number.'
  }

  return errors
}

const LeadForm = ({
  formId,
  className,
  compact = false,
  phonePlaceholder = '(000) 000-0000',
}: LeadFormProps) => {
  const [values, setValues] = useState<FormValues>(initialFormValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors

      const nextErrors = { ...currentErrors }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setValues(initialFormValues)
    toast.success('Submission successful. We will be in touch soon.', {
      duration: 3500,
    })
  }

  const inputClassName = (hasError?: boolean) =>
    [
      compact ? 'h-8' : 'h-10',
      'w-full rounded-md border bg-[#F7F7F7] px-3 text-xs text-[#202124] outline-none transition focus:bg-white focus:ring-2',
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
        : 'border-[#E6E6E6] focus:border-[#0B4D8D] focus:ring-[#0B4D8D]/10',
    ].join(' ')

  return (
    <form
      className={['flex w-full flex-col gap-2', className]
        .filter(Boolean)
        .join(' ')}
      noValidate
      onSubmit={handleSubmit}
    >
      <div>
        <label className="sr-only" htmlFor={`${formId}-name`}>
          Full name
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          placeholder="Full name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          onChange={(event) => updateField('name', event.target.value)}
          className={inputClassName(Boolean(errors.name))}
        />
        {errors.name ? (
          <p
            id={`${formId}-name-error`}
            className="mt-1 text-[11px] leading-snug text-red-600"
          >
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label className="sr-only" htmlFor={`${formId}-email`}>
          Email address
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          placeholder={compact ? 'you@example.com' : 'johndoe@example.com'}
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          onChange={(event) => updateField('email', event.target.value)}
          className={inputClassName(Boolean(errors.email))}
        />
        {errors.email ? (
          <p
            id={`${formId}-email-error`}
            className="mt-1 text-[11px] leading-snug text-red-600"
          >
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <div
          className={[
            'grid overflow-hidden rounded-md border bg-[#F7F7F7] transition focus-within:bg-white focus-within:ring-2',
            compact ? 'h-8 grid-cols-[58px_1fr]' : 'h-10 grid-cols-[72px_1fr]',
            errors.phone || errors.country
              ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10'
              : 'border-[#E6E6E6] focus-within:border-[#0B4D8D] focus-within:ring-[#0B4D8D]/10',
          ].join(' ')}
        >
          <label className="sr-only" htmlFor={`${formId}-country`}>
            Country code
          </label>
          <select
            id={`${formId}-country`}
            value={values.country}
            aria-invalid={Boolean(errors.country)}
            onChange={(event) => updateField('country', event.target.value)}
            className="border-r border-[#E6E6E6] bg-transparent px-2 text-xs text-[#8B8B8B] outline-none"
          >
            <option value="US">US</option>
            <option value="NG">NG</option>
          </select>

          <label className="sr-only" htmlFor={`${formId}-phone`}>
            Phone number
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            placeholder={phonePlaceholder}
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone || errors.country
                ? `${formId}-phone-error`
                : undefined
            }
            onChange={(event) => updateField('phone', event.target.value)}
            className="min-w-0 bg-transparent px-3 text-xs text-[#202124] outline-none"
          />
        </div>
        {errors.phone || errors.country ? (
          <p
            id={`${formId}-phone-error`}
            className="mt-1 text-[11px] leading-snug text-red-600"
          >
            {errors.phone || errors.country}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className={[
          compact ? 'h-8' : 'h-9',
          'mt-0.5 rounded-md bg-[#064779] text-[11px] font-semibold text-white transition hover:bg-[#073f6b] focus:ring-2 focus:ring-[#064779]/25 focus:outline-none',
        ].join(' ')}
      >
        Submit
      </button>
    </form>
  )
}

export default LeadForm
