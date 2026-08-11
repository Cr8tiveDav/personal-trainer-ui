'use client'

import { useState } from 'react'
import { Video, Play } from 'lucide-react'
import type { Trainer } from '@/components/admin/trainers/types'
import { getApiBaseUrl } from '@/lib/api-base-url'
import { API_ENDPOINTS } from '@/api/api-endpoints'
import { cn } from '@/utils'

export function IntroVideoCard({
  trainer,
  className,
}: {
  trainer: Trainer
  className?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const hasVideo = Boolean(trainer.introVideoUrl)
  const videoSrc = trainer.introVideoUrl || `${getApiBaseUrl()}${API_ENDPOINTS.TRAINERS.INTRO_VIDEO_STREAM(trainer.id)}`

  return (
    <div
      className={cn(
        'rounded-[12px] border border-gray-100 bg-white p-5',
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Intro Video</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          This video is shown to potential clients on your public profile.
        </p>
      </div>

      {hasVideo ? (
        <div className="relative overflow-hidden rounded-[8px] bg-gray-900 w-full aspect-video">
          {isPlaying ? (
            <video
              src={videoSrc}
              controls
              autoPlay
              preload="auto"
              crossOrigin="use-credentials"
              className="w-full h-full rounded-[8px] bg-black object-contain"
            />
          ) : (
            <div
              className="relative w-full h-full cursor-pointer overflow-hidden rounded-[8px] group"
              onClick={() => setIsPlaying(true)}
            >
              <video
                src={videoSrc}
                className="w-full h-full object-contain opacity-80"
                muted
                playsInline
                preload="metadata"
                crossOrigin="use-credentials"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
                <div className="flex h-12 w-12 items-center justify-center rounded-[9999px] bg-black/50 transition-transform group-hover:scale-110">
                  <Play className="h-5 w-5 fill-white text-white translate-x-0.5" />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[8px] border border-dashed border-gray-200 bg-gray-50/50 p-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
            <Video className="h-5 w-5 text-gray-400" />
          </div>
          <h4 className="mt-3 text-xs font-semibold text-gray-950">No intro video</h4>
          <p className="mt-1 text-[11px] text-gray-500 max-w-[180px] leading-relaxed">
            Your intro video will appear here once it is uploaded.
          </p>
        </div>
      )}
    </div>
  )
}
