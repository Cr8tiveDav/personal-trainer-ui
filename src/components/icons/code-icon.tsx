import { cn } from '~/utils'
import React, { forwardRef } from 'react'

export interface SVGProps extends React.SVGAttributes<SVGSVGElement> {
  children?: React.ReactNode
}

const CodeIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, fill = 'currentColor', stroke = 'currentColor', ...props }, ref) => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('size-5', className)}
        ref={ref}
        {...props}
      >
        <path
          d="M15 13.3332L18.3333 9.99984L15 6.6665"
          stroke={stroke}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.00002 6.6665L1.66669 9.99984L5.00002 13.3332"
          stroke={stroke}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0834 3.3335L7.91669 16.6668"
          stroke={stroke}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

CodeIcon.displayName = 'CodeIcon'
export default CodeIcon
