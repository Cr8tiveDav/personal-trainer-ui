import { cn } from '~/utils'
import React, { forwardRef } from 'react'

export interface SVGProps extends React.SVGAttributes<SVGSVGElement> {
  children?: React.ReactNode
}

const PaymentIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('size-4', className)}
        ref={ref}
        {...props}
      >
        <path
          d="M13.75 0H1.25C0.918479 0 0.600537 0.131696 0.366116 0.366116C0.131696 0.600537 0 0.918479 0 1.25V13.75C0 14.0815 0.131696 14.3995 0.366116 14.6339C0.600537 14.8683 0.918479 15 1.25 15H13.75C14.0815 15 14.3995 14.8683 14.6339 14.6339C14.8683 14.3995 15 14.0815 15 13.75V1.25C15 0.918479 14.8683 0.600537 14.6339 0.366116C14.3995 0.131696 14.0815 0 13.75 0ZM13.75 13.75H1.25V1.25H13.75V13.75ZM10 4.375H5C4.83424 4.375 4.67527 4.44085 4.55806 4.55806C4.44085 4.67527 4.375 4.83424 4.375 5V10C4.375 10.1658 4.44085 10.3247 4.55806 10.4419C4.67527 10.5592 4.83424 10.625 5 10.625H10C10.1658 10.625 10.3247 10.5592 10.4419 10.4419C10.5592 10.3247 10.625 10.1658 10.625 10V5C10.625 4.83424 10.5592 4.67527 10.4419 4.55806C10.3247 4.44085 10.1658 4.375 10 4.375ZM9.375 9.375H5.625V5.625H9.375V9.375Z"
          fill={fill}
        />
      </svg>
    )
  }
)

PaymentIcon.displayName = 'PaymentIcon'
export default PaymentIcon
