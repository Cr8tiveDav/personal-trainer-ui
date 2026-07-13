import { Play } from 'lucide-react'
import Image from 'next/image'

export function VideoSection() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mx-auto max-w-[936px] text-center">
          <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
            A fitness routine that respects your lifestyle
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted lg:text-lg">
            Match with world-class trainers who truly understand who and where
            you are.
          </p>
        </div>

        <div className="relative mt-6 aspect-video overflow-hidden rounded-[8px] bg-gray-100 lg:h-[741px] lg:aspect-auto">
          <Image
            src="/images/ads/spread_desk.png"
            alt="People training at home with an online trainer"
            fill
            sizes="(max-width: 1023px) 100vw, 1318px"
            className="object-cover"
          />
          <button
            type="button"
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg backdrop-blur"
          >
            <Play className="ml-1 size-9 fill-primary" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
