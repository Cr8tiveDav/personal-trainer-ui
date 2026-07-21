'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const DEFAULT_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'hotmail.com',
]

export interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  domains?: string[]
  onSelectSuggestion?: (email: string) => void
}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      className,
      domains = DEFAULT_DOMAINS,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onSelectSuggestion,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState<string>(
      (value as string) ?? (defaultValue as string) ?? '',
    )
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Sync controlled value if passed
    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(String(value))
      }
    }, [value])

    // Parse email prefix and domain input
    const atIndex = inputValue.indexOf('@')
    const hasAt = atIndex !== -1
    const prefix = hasAt ? inputValue.slice(0, atIndex) : inputValue
    const domainQuery = hasAt ? inputValue.slice(atIndex + 1).toLowerCase() : ''

    // Compute domain suggestions
    const suggestions = React.useMemo(() => {
      if (!hasAt || !prefix.trim()) return []

      const matching = domains.filter((d) =>
        d.toLowerCase().startsWith(domainQuery),
      )

      // Hide suggestions if exact full match is already typed
      if (matching.length === 1 && matching[0].toLowerCase() === domainQuery) {
        return []
      }

      return matching
    }, [hasAt, prefix, domainQuery, domains])

    const showDropdown = isOpen && suggestions.length > 0 && !disabled

    // Reset selected index when suggestions list changes
    React.useEffect(() => {
      setSelectedIndex(0)
    }, [suggestions])

    // Close when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const applySuggestion = (domain: string) => {
      const fullEmail = `${prefix}@${domain}`
      setInputValue(fullEmail)
      setIsOpen(false)

      if (onSelectSuggestion) {
        onSelectSuggestion(fullEmail)
      }

      // Trigger synthetic onChange for react-hook-form / controlled inputs
      if (onChange) {
        const syntheticEvent = {
          target: { value: fullEmail, name: props.name },
          currentTarget: { value: fullEmail, name: props.name },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      setIsOpen(true)
      if (onChange) {
        onChange(e)
      }
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsOpen(true)
      if (onFocus) {
        onFocus(e)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (showDropdown) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % suggestions.length)
          return
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(
            (prev) => (prev - 1 + suggestions.length) % suggestions.length,
          )
          return
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          if (suggestions[selectedIndex]) {
            e.preventDefault()
            applySuggestion(suggestions[selectedIndex])
            return
          }
        }
        if (e.key === 'Escape') {
          setIsOpen(false)
          return
        }
      }

      if (onKeyDown) {
        onKeyDown(e)
      }
    }

    return (
      <div ref={containerRef} className="relative w-full">
        <input
          ref={ref}
          type="email"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
          className={className}
          {...props}
        />

        {showDropdown && (
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-48 overflow-y-auto rounded-[16px] border border-gray-200 bg-white p-1.5 shadow-lg transition-all"
          >
            {suggestions.map((domain, index) => {
              const isSelected = index === selectedIndex
              return (
                <li
                  key={domain}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    applySuggestion(domain)
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-2 min-w-0 rounded-[12px] px-3.5 py-2 text-sm transition-colors',
                    isSelected
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  <div className="flex min-w-0 flex-1 items-center overflow-hidden">
                    <span className="truncate min-w-0">{prefix}</span>
                    <span className="shrink-0 font-semibold text-primary">
                      @{domain}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    Suggestion
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  },
)

EmailInput.displayName = 'EmailInput'
