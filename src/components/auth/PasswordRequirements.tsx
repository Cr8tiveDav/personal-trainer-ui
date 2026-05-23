'use client'

import { Check, X } from 'lucide-react'
import { cn } from '@/utils'
import {
  PASSWORD_REQUIREMENTS_MESSAGE,
  passwordMeetsCharacterRules,
  passwordMeetsMinLength,
} from '~/schemas/password'

const RULES = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: passwordMeetsMinLength,
  },
  {
    id: 'chars',
    label: PASSWORD_REQUIREMENTS_MESSAGE,
    test: passwordMeetsCharacterRules,
  },
] as const

type PasswordRequirementsProps = {
  password: string
  className?: string
}

export function PasswordRequirements({
  password,
  className,
}: PasswordRequirementsProps) {
  const show = password.length > 0

  if (!show) return null

  return (
    <ul className={cn('mt-2 space-y-1', className)} aria-live='polite'>
      {RULES.map((rule) => {
        const passed = rule.test(password)
        return (
          <li
            key={rule.id}
            className={cn(
              'flex items-start gap-2 text-xs',
              passed ? 'text-emerald-700' : 'text-red-600',
            )}
          >
            {passed ? (
              <Check className='mt-0.5 h-3.5 w-3.5 shrink-0' aria-hidden />
            ) : (
              <X className='mt-0.5 h-3.5 w-3.5 shrink-0' aria-hidden />
            )}
            <span>{rule.label}</span>
          </li>
        )
      })}
    </ul>
  )
}
