import { cn } from '@/utils'
import Image from 'next/image'

interface IntegrationsBarProps {
  className?: string
}

const IntegrationsBar = ({ className }: IntegrationsBarProps) => {
  const tools = [
    { src: '/images/zoom.svg', name: 'Zoom', imgClass: 'h-6' },
    { src: '/images/whatsapp.svg', name: 'WhatsApp', imgClass: 'h-8' },
    { src: '/images/meet.svg', name: 'Google Meet', imgClass: 'h-6' },
    { src: '/images/facebook-logo.svg', name: 'Facebook', imgClass: 'h-6' },
  ]

  return (
    <section
      className={cn('mb-10 border-y px-4 border-gray-100 py-4', className)}
    >
      <div className="container flex flex-col items-center justify-between gap-6 lg:flex-row">
        <p className="shrink-0 text-lg text-muted">
          Work with the tools you already use
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
                  className={`${tool.imgClass} w-auto object-contain`}
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
