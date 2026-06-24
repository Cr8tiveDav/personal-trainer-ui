import { cn } from '@/utils'
import Image from 'next/image'

interface IntegrationsBarProps {
  className?: string
}

const IntegrationsBar = ({ className }: IntegrationsBarProps) => {
  const tools = [
    '/images/zoom.svg',
    '/images/whatsapp.svg',
    '/images/meet.svg',
    '/images/facebook-logo.svg',
  ]

  return (
    <section className={cn('mb-10 border-y border-gray-100 py-4', className)}>
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="shrink-0 text-lg text-muted">
          Works with the tools you already use
        </p>

        <div className="hide_scrollbar w-full overflow-x-auto md:w-auto">
          <div className="flex min-w-max items-center gap-8 pb-2 md:gap-10 md:pb-0">
            {tools.map((tool) => (
              <span
                key={tool}
                className="cursor-default whitespace-nowrap text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <Image
                  src={tool}
                  alt="Integration tool"
                  width={100}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationsBar
