'use client'

import { useState } from 'react'
import { ArrowLeft, Play, CheckCircle, Trash2, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import type { VideoDetail } from './mock-data'
import { VideoStatusBadge } from './VideoStatusBadge'

interface VideoDetailViewProps {
  video: VideoDetail
}

export function VideoDetailView({ video }: VideoDetailViewProps) {
  const [status, setStatus] = useState(video.status)

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Link
          href='/admin/video-content'
          className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700'
        >
          <ArrowLeft className='h-4 w-4' />
          Back
        </Link>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='space-y-6 lg:col-span-2'>
          <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
            <div className='flex h-64 items-center justify-center bg-gray-900 sm:h-80 lg:h-96'>
              <button className='flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30'>
                <Play className='h-7 w-7 fill-white' />
              </button>
            </div>
            <div className='p-6'>
              <div className='mb-2 flex items-start justify-between gap-4'>
                <h2 className='text-lg font-bold text-gray-900'>{video.title}</h2>
                <VideoStatusBadge status={status} />
              </div>
              <p className='text-sm leading-relaxed text-gray-500'>{video.description}</p>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
            <h3 className='mb-5 text-base font-bold text-gray-900'>Trainer Info</h3>
            <dl className='space-y-4'>
              {[
                { label: 'Name', value: video.trainer },
                { label: 'Email', value: video.trainerEmail },
                { label: 'Duration', value: video.duration },
                { label: 'Uploaded', value: video.uploadedAt },
              ].map(({ label, value }) => (
                <div key={label} className='flex items-center justify-between'>
                  <dt className='text-sm text-gray-400'>{label}</dt>
                  <dd className='text-sm font-semibold text-gray-900'>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
            <h3 className='mb-4 text-base font-bold text-gray-900'>Actions</h3>
            <div className='flex flex-col gap-3'>
              {status !== 'Approved' && (
                <button
                  onClick={() => setStatus('Approved')}
                  className='flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90'
                >
                  <CheckCircle className='h-4 w-4' />
                  Approve Video
                </button>
              )}
              <button className='flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                <RefreshCw className='h-4 w-4' />
                Replace Video
              </button>
              <button className='flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50'>
                <Trash2 className='h-4 w-4' />
                Remove Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
