'use client'

import { forwardRef } from 'react'
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input'
import type { Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils'

// Number input — uses our existing Input, no border/shadow so it blends in
const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <Input
      {...props}
      ref={ref}
      className='border-0 rounded-none shadow-none focus-visible:ring-0 flex-1 min-w-0 placeholder:text-gray-400'
    />
  )
)
CustomInput.displayName = 'CustomInput'

// Country select — native <select> hidden underneath, flag + dial code shown on top
interface CountrySelectProps {
  value?: Country
  onChange: (country: Country) => void
  options: Array<{ value: Country | undefined; label: string }>
  iconComponent: React.ComponentType<{ country: Country; label: string }>
  disabled?: boolean
}

function CountrySelectWithDialCode({
  value,
  onChange,
  options,
  iconComponent: FlagIcon,
  disabled,
}: CountrySelectProps) {
  const callingCode = value ? `+${getCountryCallingCode(value)}` : ''

  return (
    <div className='relative flex items-center gap-1.5 pl-3 pr-2 border-r border-input bg-gray-50 h-full shrink-0'>
      {/* Invisible native select — handles all country picking + keyboard nav */}
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value as Country)}
        disabled={disabled}
        aria-label='Phone number country'
        className='absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10'
      >
        {options.map((opt) => (
          <option key={opt.value ?? 'ZZ'} value={opt.value ?? ''}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Visual layer: flag + dial code + chevron */}
      <span className='pointer-events-none flex items-center gap-1.5 text-sm select-none'>
        {value && <FlagIcon country={value} label={value} />}
        <span className='text-muted-foreground'>{callingCode}</span>
        <svg
          className='h-3 w-3 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
        </svg>
      </span>
    </div>
  )
}

interface PhoneInputFieldProps {
  value?: string
  onChange: (value: string) => void
  onBlur?: () => void
  hasError?: boolean
  disabled?: boolean
  name?: string
}

export function PhoneInputField({
  value = '',
  onChange,
  onBlur,
  hasError,
  disabled,
  name,
}: PhoneInputFieldProps) {
  return (
    <div
      className={cn(
        'flex h-10 rounded-md border bg-white transition-colors overflow-hidden',
        hasError ? 'border-destructive' : 'border-input',
        'focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary',
        '[&_.PhoneInput]:flex [&_.PhoneInput]:w-full [&_.PhoneInput]:items-center [&_.PhoneInput]:h-full',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <PhoneInput
        defaultCountry='NG'
        value={value || undefined}
        onChange={(val) => onChange(val ?? '')}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
        inputComponent={CustomInput}
        countrySelectComponent={CountrySelectWithDialCode}
        addInternationalOption={false}
      />
    </div>
  )
}
