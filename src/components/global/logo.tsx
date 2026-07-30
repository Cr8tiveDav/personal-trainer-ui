import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Properties {
  size?: 'big' | 'small'
  className?: string
}

const Logo = ({ size = 'big', className }: Properties) => {
  const isSmall = size === 'small'

  return (
    <div className="flex items-center gap-2">
      <Image
        src={isSmall ? '/logo.svg' : '/logo.svg'}
        alt="FitCall logo"
        sizes="true"
        width={isSmall ? 40 : 57}
        height={isSmall ? 38 : 52}
        className="object-contain"
      />

      {!isSmall && (
        <span className={cn('text-xl font-bold leading-none', className)}>
          FitCall
        </span>
      )}
    </div>
  )
}

export default Logo
