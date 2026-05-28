'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils'

const COUNTRIES = [
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria', dial: '234' },
  { code: 'US', flag: '🇺🇸', name: 'United States', dial: '1' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dial: '44' },
  { code: 'GH', flag: '🇬🇭', name: 'Ghana', dial: '233' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya', dial: '254' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa', dial: '27' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', dial: '1' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', dial: '61' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany', dial: '49' },
  { code: 'FR', flag: '🇫🇷', name: 'France', dial: '33' },
  { code: 'IN', flag: '🇮🇳', name: 'India', dial: '91' },
  { code: 'AE', flag: '🇦🇪', name: 'UAE', dial: '971' },
]

interface PhoneInputProps {
  value?: string
  onChange: (e164: string) => void
  onBlur?: () => void
  hasError?: boolean
  disabled?: boolean
  name?: string
}

/**
 * Splits an E.164 string back into { dialCode, local }.
 * e.g. "+2349131404048" → { dialCode: "234", local: "9131404048" }
 */
function parseE164(value: string): { dialCode: string; local: string } {
  if (!value) return { dialCode: '234', local: '' }
  const stripped = value.startsWith('+') ? value.slice(1) : value
  const match = COUNTRIES.find((c) => stripped.startsWith(c.dial))
  if (match) {
    return { dialCode: match.dial, local: stripped.slice(match.dial.length) }
  }
  return { dialCode: '234', local: stripped }
}

export function PhoneInputField({
  value = '',
  onChange,
  onBlur,
  hasError,
  disabled,
  name,
}: PhoneInputProps) {
  const parsed = parseE164(value)
  const [dialCode, setDialCode] = useState(parsed.dialCode)
  const [local, setLocal] = useState(parsed.local)

  // Sync internal state when parent passes a new value (e.g. back navigation restoring data)
  useEffect(() => {
    const { dialCode: newDial, local: newLocal } = parseE164(value)
    setDialCode(newDial)
    setLocal(newLocal)
  }, [value])

  const selected = COUNTRIES.find((c) => c.dial === dialCode) ?? COUNTRIES[0]

  const emit = (newDial: string, newLocal: string) => {
    const digits = newLocal.replace(/\D/g, '')
    onChange(digits ? `+${newDial}${digits}` : '')
  }

  const handleDialChange = (code: string) => {
    const country = COUNTRIES.find((c) => c.code === code)
    if (!country) return
    setDialCode(country.dial)
    emit(country.dial, local)
  }

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '')
    setLocal(digits)
    emit(dialCode, digits)
  }

  return (
    <div className={cn('flex rounded-md border bg-white transition-colors overflow-hidden',
      hasError ? 'border-destructive' : 'border-input',
      'focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary'
    )}>
      {/* Country code selector */}
      <Select
        value={selected.code}
        onValueChange={handleDialChange}
        disabled={disabled}
      >
        <SelectTrigger className='w-fit shrink-0 border-0 border-r rounded-none shadow-none focus:ring-0 bg-gray-50 px-3 gap-1'>
          <SelectValue>
            <span className='flex items-center gap-1.5 text-sm'>
              <span>{selected.flag}</span>
              <span className='text-muted-foreground'>+{selected.dial}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              <span className='flex items-center gap-2'>
                <span>{c.flag}</span>
                <span>{c.name}</span>
                <span className='text-muted-foreground'>+{c.dial}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Local number input */}
      <Input
        type='tel'
        name={name}
        value={local}
        onChange={handleLocalChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder='8012345678'
        className='border-0 rounded-none shadow-none focus-visible:ring-0 flex-1 min-w-0 placeholder:text-gray-400'
      />
    </div>
  )
}
