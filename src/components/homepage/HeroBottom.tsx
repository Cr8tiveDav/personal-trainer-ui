import { cn } from '@/utils'
import Image from 'next/image'

interface IntegrationsBarProps {
  className?: string
}

const IntegrationsBar = ({ className }: IntegrationsBarProps) => {
  const tools = [
    { src: '/images/zoom.svg', name: 'Zoom' },
    { src: '/images/whatsapp.svg', name: 'WhatsApp' },
    { src: '/images/meet.svg', name: 'Google Meet' },
    { src: '/images/facebook-logo.svg', name: 'Facebook' },
  ]

  return (
    <section
      className={cn('mb-10 border-y px-4 border-gray-100 py-4', className)}
    >
      <div className="container flex flex-col items-center justify-between gap-6 lg:flex-row">
        <p className="shrink-0 text-lg text-muted">
          Works with the tools you already use
        </p>

        <div className="hide_scrollbar w-full overflow-x-auto md:w-auto">
          <div className="flex min-w-max items-center gap-8 pb-2 md:gap-10 md:pb-0">
            {tools.map((tool) => (
              <span
                key={tool.src}
                className="cursor-default whitespace-nowrap text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <Image
                  src={tool.src}
                  alt={tool.name}
                  width={80}
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
