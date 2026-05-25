import React, { forwardRef } from 'react'
import LoadingSpinner from '../miscellaneous/loading-spinner'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean
  disabled?: boolean
  text: string
  loadingText?: string
}

const FramerButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, isLoading, text, loadingText, disabled, ...props }, ref) => {
    return (
      // @ts-expect-error Next js error
      <motion.button
        initial={{ '--x': '100%', scale: 1 }}
        animate={{ '--x': '-100%' }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 1,
          type: 'spring',
          stiffness: 20,
          damping: 15,
          mass: 2,
          scale: {
            type: 'spring',
            stiffness: 10,
            damping: 5,
            mass: 0.1,
          },
        }}
        type="submit"
        disabled={isLoading || disabled}
        className={cn(
          'bg-primary relative flex w-full justify-center rounded-[6px] px-4 sm:px-6 py-2.5 sm:py-3 text-white',
          className
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-x-2 text-sm sm:text-base font-medium">
            {loadingText ? loadingText : 'Please wait'}...
            <LoadingSpinner stroke="#fff" className="size-4 sm:size-5 animate-spin" />
          </span>
        ) : (
          <>
            <span
              className={cn(
                'font-manrope relative block h-full w-full rounded-[inherit] text-sm sm:text-base md:text-lg font-medium tracking-wide text-white',
                disabled ? '' : 'linear-mask'
              )}
            >
              {text}
            </span>

            <span
              className={cn(
                'absolute inset-0 block rounded-[inherit] p-px',
                disabled ? '' : 'linear-overlay'
              )}
            />
          </>
        )}
      </motion.button>
    )
  }
)

FramerButton.displayName = 'FramerButton'

export default FramerButton