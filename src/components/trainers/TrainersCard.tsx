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
    <div className="group relative flex h-full max-w-87.5 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-500 ease-in-out hover:border-primary/20 hover:shad
      <div className="relative h-75 w-full overflow-hidden">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover object-top transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105 group-hover:-translate-y-1.25"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[17px] font-semibold tracking-tight text-[#0f172a]">
            {trainer.name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {trainer.sessions} Sessions
            </span>
          </div>
        </div>

        <p className="mb-6 line-clamp-2 text-[13px] leading-relaxed text-slate-500">
          {trainer.specialties.join(' • ')}
        </p>
        <Button className="relative mt-auto overflow-hidden rounded-xl bg-[#0d2b45] py-6 transition-all duration-300 hover:bg-[#0d2b45] hover:ring-offset-2 active:scale-[0.98]">
          <span className="relative z-10">Reserve {firstName}</span>
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </Button>
      </div>
    </div>
  )
}

export default TrainerCard
