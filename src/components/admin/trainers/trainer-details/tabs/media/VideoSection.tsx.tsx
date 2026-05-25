/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRef } from 'react'
import { Video, Play, ArrowLeft } from 'lucide-react'

export interface VideoData {
  url: string
  status: 'Approved' | 'Pending' | 'Missing'
  duration?: string
  uploadedAt?: string
}

export function VideoEmptyState({ onFileSelect, loading }: any) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='space-y-3'>
      <div>
        <h3 className='text-sm font-bold text-gray-900'>Intro / workout video</h3>
        <p className='text-xs text-gray-400 mt-0.5'>MP4 or MOV · max 500 MB · max 10 min · transcoded to H.264</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-dashed border-gray-200 bg-gray-50 py-14 transition-colors hover:border-[#0b4d8d]/30 hover:bg-blue-50/20'>
        <div className='flex h-12 w-12 items-center justify-center rounded-[12px] border border-gray-200 bg-white shadow-sm'>
          <Video className='h-5 w-5 text-gray-400' />
        </div>
        <button
          type='button'
          disabled={loading}
          onClick={() => inputRef.current?.click()}
          className='flex items-center gap-2 rounded-[8px] bg-[#0b4d8d] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#093e71] disabled:opacity-60'
        >
          Upload Video
        </button>
        <input
          ref={inputRef}
          type='file'
          accept='video/*'
          className='hidden'
          onChange={(e) => {
            const files = Array.from(e.target.files ?? [])
            if (files.length) onFileSelect(files)
            e.target.value = ''
          }}
        />
      </div>
    </div>
  )
}

export function VideoTableView({ video, trainerName, trainerSpecialty, onView, onReplace }: any) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='rounded-[12px] border border-gray-100 bg-white shadow-sm overflow-hidden'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-gray-100 text-left'>
            <th className='px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400'>Thumbnail</th>
            <th className='px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400'>Trainer</th>
            <th className='px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400'>Duration</th>
            <th className='px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400'>Status</th>
            <th className='px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-gray-400'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-gray-50 hover:bg-gray-50/60 transition-colors'>
            <td className='px-5 py-4'>
              <div
                className='relative flex h-12 w-20 items-center justify-center overflow-hidden rounded-[8px] bg-gray-900 cursor-pointer'
                onClick={video.url ? onView : undefined}
              >
                {video.url ? (
                  <>
                    <video
                      src={video.url}
                      className='h-full w-full object-cover opacity-80'
                      muted
                      playsInline
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-[9999px] bg-black/50'>
                        <Play className='h-3 w-3 fill-white text-white' />
                      </div>
                    </div>
                  </>
                ) : (
                  <span className='px-1 text-center text-[9px] font-medium text-white/80'>
                    Processing
                  </span>
                )}
              </div>
            </td>
            <td className='px-5 py-4'>
              <p className='font-medium text-gray-900 text-xs'>{trainerName ?? '—'}</p>
              <p className='text-[10px] text-gray-400'>{trainerSpecialty ?? '—'}</p>
            </td>
            <td className='px-5 py-4 text-xs text-gray-500'>{video.duration ?? '—'}</td>
            <td className='px-5 py-4 text-xs font-semibold'>{video.status}</td>
            <td className='px-5 py-4'>
              <button onClick={onView} className='text-xs mr-2'>View</button>
              <button onClick={() => inputRef.current?.click()} className='text-xs'>Replace</button>
              <input
                ref={inputRef}
                type='file'
                accept='video/*'
                className='hidden'
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) onReplace(f)
                  e.target.value = ''
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function VideoDetailView({ video, onBack, onReplace, onRemove, uploading }: any) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='space-y-4'>
      <button onClick={onBack} className='text-sm flex items-center gap-1'>
        <ArrowLeft className='h-4 w-4' /> Back
      </button>

      {video.url ? (
        <video src={video.url} controls className='w-full rounded-[12px]' />
      ) : (
        <div className='flex min-h-[200px] items-center justify-center rounded-[12px] border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500'>
          Video is processing. Check back in a few minutes.
        </div>
      )}

      <div className='flex gap-2'>
        <button onClick={onRemove} className='text-red-600 text-sm'>Remove</button>
        <button onClick={() => inputRef.current?.click()} className='text-sm'>
          {uploading ? 'Uploading...' : 'Replace'}
        </button>

        <input
          ref={inputRef}
          type='file'
          accept='video/*'
          className='hidden'
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onReplace(f)
            e.target.value = ''
          }}
        />
      </div>
    </div>
  )
}