'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Volume2, Maximize, RotateCcw } from 'lucide-react'
import type { VideoDetail } from './mock-data'
import { VideoStatusBadge } from './VideoStatusBadge'

interface VideoDetailViewProps {
  video: VideoDetail
}

export function VideoDetailView({ video }: VideoDetailViewProps) {
  const [status, setStatus] = useState(video.status)

  return (
    <div className='space-y-4'>
      <Link
        href='/admin/video-content'
        className='inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700'
      >
        <ArrowLeft className='h-4 w-4' />
        Back to Video Content
      </Link>

      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>{video.title}</h1>
          <p className='mt-1 text-sm text-gray-500'>
            {video.trainer} · {video.trainerSpecialty}
          </p>
        </div>
        <VideoStatusBadge status={status} />
      </div>

      <div className='overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm'>
        <div className='relative bg-gray-900' style={{ aspectRatio: '16/9' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/images/admin/video-content/video-placeholder.png'
            alt='video preview'
            className='h-full w-full object-cover opacity-60'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <button className='flex h-16 w-16 items-center justify-center rounded-[9999px] bg-white/20 text-white transition hover:bg-white/30'>
              <Play className='h-7 w-7 fill-white' />
            </button>
          </div>
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 px-4 pb-3 pt-8'>
            <div className='mb-2 h-1 w-full overflow-hidden rounded-[9999px] bg-white/30'>
              <div className='h-full w-0 rounded-[9999px] bg-white' />
            </div>
            <div className='flex items-center justify-between text-white'>
              <div className='flex items-center gap-3'>
                <Play className='h-4 w-4 fill-white' />
                <Volume2 className='h-4 w-4' />
                <span className='text-xs tabular-nums'>00:00 / {video.duration}</span>
              </div>
              <div className='flex items-center gap-2'>
                <RotateCcw className='h-4 w-4' />
                <Maximize className='h-4 w-4' />
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6 border-t border-gray-100 px-6 py-5'>
          <div className='space-y-4'>
            <div>
              <p className='text-xs text-gray-400'>Trainer Name</p>
              <p className='mt-0.5 text-sm font-medium text-gray-900'>{video.trainer}</p>
            </div>
            <div>
              <p className='text-xs text-gray-400'>Duration</p>
              <p className='mt-0.5 text-sm font-medium text-gray-900'>{video.duration}</p>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='text-xs text-gray-400'>Role</p>
              <p className='mt-0.5 text-sm font-medium text-gray-900'>{video.trainerSpecialty}</p>
            </div>
            <div>
              <p className='text-xs text-gray-400'>Upload Date</p>
              <p className='mt-0.5 text-sm font-medium text-gray-900'>{video.uploadedAt}</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4'>
          {status !== 'Approved' && (
            <button
              onClick={() => setStatus('Approved')}
              className='rounded-[8px] bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90'
            >
              Approve Video
            </button>
          )}
          <button className='rounded-[8px] border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Remove Video
          </button>
          <button className='rounded-[8px] bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90'>
            Replace Video
          </button>
        </div>
      </div>
    </div>
  )
}
