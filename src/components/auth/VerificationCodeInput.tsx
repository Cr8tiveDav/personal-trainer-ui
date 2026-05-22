'use client'

import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react'
import { cn } from '~/utils'

const CODE_LENGTH = 6

type VerificationCodeInputProps = {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  error?: boolean
}

function toDigits(value: string): string[] {
  const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH)
  return Array.from({ length: CODE_LENGTH }, (_, i) => digits[i] ?? '')
}

export function VerificationCodeInput({
  value,
  onChange,
  onBlur,
  disabled,
  error,
}: VerificationCodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const digits = toDigits(value)

  function commit(nextDigits: string[]) {
    onChange(nextDigits.join(''))
  }

  function focusAt(index: number) {
    const el = inputsRef.current[Math.min(index, CODE_LENGTH - 1)]
    el?.focus()
    el?.select()
  }

  function applyDigits(startIndex: number, incoming: string) {
    const next = [...digits]
    const chars = incoming.replace(/\D/g, '').slice(0, CODE_LENGTH - startIndex)

    if (chars.length === 0) {
      next[startIndex] = ''
      commit(next)
      return
    }

    chars.split('').forEach((char, offset) => {
      next[startIndex + offset] = char
    })
    commit(next)
    focusAt(Math.min(startIndex + chars.length, CODE_LENGTH - 1))
  }

  function handleChange(index: number, raw: string) {
    const cleaned = raw.replace(/\D/g, '')

    if (cleaned.length > 1) {
      applyDigits(index, cleaned)
      return
    }

    if (cleaned.length === 1) {
      applyDigits(index, cleaned)
      return
    }

    const next = [...digits]
    next[index] = ''
    commit(next)
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits]
        next[index] = ''
        commit(next)
        return
      }
      if (index > 0) {
        e.preventDefault()
        const next = [...digits]
        next[index - 1] = ''
        commit(next)
        focusAt(index - 1)
      }
      return
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      focusAt(index - 1)
    }

    if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      e.preventDefault()
      focusAt(index + 1)
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!pasted) return
    commit(toDigits(pasted))
    focusAt(Math.min(pasted.length, CODE_LENGTH - 1))
  }

  return (
    <div className='flex justify-center gap-2 sm:gap-3'>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
          maxLength={6}
          disabled={disabled}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onBlur={onBlur}
          onFocus={(e) => e.target.select()}
          className={cn(
            'login-input h-12 w-10 rounded-lg border text-center text-lg font-semibold tracking-normal sm:h-14 sm:w-12',
            error && 'login-input--error',
            disabled && 'cursor-not-allowed opacity-60',
          )}
        />
      ))}
    </div>
  )
}
