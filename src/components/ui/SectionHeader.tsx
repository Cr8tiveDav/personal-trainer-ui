'use client'
import { cn } from '~/utils' // Adjust this path to your utility helper

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

const SectionHeader = ({
  badge,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col md:mb-16',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left',
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            'mb-4 inline-flex items-center rounded-full bg-primarybadge px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-primary',
            'border border-blue-100/50 shadow-sm'
          )}
        >
          {badge}
        </span>
      )}

      <h2
        className={cn(
          'text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]'
        )}
      >
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-sm leading-relaxed opacity-90 md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
