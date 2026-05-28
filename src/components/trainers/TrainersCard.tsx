'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import { Trainer } from './trianers'

type Props = {
  trainer: Trainer
}

const TrainerCard = ({ trainer }: Props) => {
  const firstName = trainer.name.split(' ')[0]

  return (
    <div className="group relative flex h-full max-w-87.5 flex-col overflow-hidden rounded-[12px] border border-[#EBEBEB] bg-white transition-all duration-500 ease-in-out hover:border-primary/20 hover:shad">
      <div className="relative h-75 w-full overflow-hidden">
        {trainer.image ? (
          <Image
            src={trainer.image}
            alt={trainer.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-top transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105 group-hover:-translate-y-1.25"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#f4f5f7] transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105">
            <div className="relative h-24 w-24">
              <Image
                src="/logo.svg"
                alt="FitCall Logo Placeholder"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[24px] tracking-tight text-[#0f172a]">
            {trainer.name}
          </h3>

          <span className="text-[14px] font-medium text-muted-foreground tracking-wider">
            {trainer.sessions} {trainer.sessions <= 1 ? 'Session' : 'Sessions'}
          </span>
        </div>

        <p className="mb-6 line-clamp-2 text-[14px] leading-relaxed text-slate-500">
          {trainer.specialties.join(' • ')}
        </p>
        <Button className="relative mt-auto overflow-hidden rounded-[8px] bg-primary py-6 transition-all duration-300 hover:bg-primary/90 hover:ring-offset-2 active:scale-[0.98]">
          <span className="relative z-10">Reserve {firstName}</span>
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </Button>
      </div>
    </div>
  )
}

export default TrainerCard
