'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Play } from 'lucide-react'
import type { VideoItem } from './mock-data'
import { VideoStatusBadge } from './VideoStatusBadge'

interface VideoTableProps {
  videos: VideoItem[]
}

function ActionButtons({ video }: { video: VideoItem }) {
  if (video.status === 'Missing') {
    return (
      <Link
        href='/admin/video-content/upload'
        className='rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary/90'
      >
        Upload
      </Link>
    )
  }

  if (video.status === 'Pending') {
    return (
      <Link
        href={`/admin/video-content/${video.id}`}
        className='rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
      >
        View
      </Link>
    )
  }

  return (
    <div className='flex items-center gap-2'>
      <Link
        href={`/admin/video-content/${video.id}`}
        className='rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
      >
        View
      </Link>
      <Link
        href={`/admin/video-content/upload?replace=${video.id}`}
        className='rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
      >
        Replace
      </Link>
    </div>
  )
}

export function VideoTable({ videos }: VideoTableProps) {
  const [search, setSearch] = useState('')

  const filtered = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.trainer.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Video Content</h1>
          <p className='mt-1 text-sm text-gray-500'>Manage trainer intro videos displayed in app</p>
        </div>
        <div className='flex shrink-0 items-center gap-3'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search by title or trainer'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-72 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20'
            />
          </div>
          <Link
            href='/admin/video-content/upload'
            className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90'
          >
            <Plus className='h-4 w-4' />
            Upload Video
          </Link>
        </div>
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white shadow-sm'>
        {filtered.length === 0 ? (
          <div className='flex min-h-[200px] items-center justify-center'>
            <p className='text-sm text-gray-400'>No videos found.</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-100 text-left text-xs font-medium text-gray-400'>
                  <th className='px-6 py-4'>Thumbnail</th>
                  <th className='px-6 py-4'>Trainers</th>
                  <th className='px-6 py-4'>Duration</th>
                  <th className='px-6 py-4'>Status</th>
                  <th className='px-6 py-4'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {filtered.map((video) => (
                  <tr key={video.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <div className='relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src='/images/admin/video-content/video-placeholder.png'
                          alt='video thumbnail'
                          className='h-full w-full object-cover'
                        />
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='flex h-7 w-7 items-center justify-center rounded-full bg-black/40'>
                            <Play className='h-3 w-3 fill-white text-white' />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-medium text-gray-900'>{video.trainer}</p>
                      <p className='text-xs text-gray-400'>{video.trainerSpecialty}</p>
                    </td>
                    <td className='px-6 py-4 text-gray-500'>{video.duration}</td>
                    <td className='px-6 py-4'>
                      <VideoStatusBadge status={video.status} />
                    </td>
                    <td className='px-6 py-4'>
                      <ActionButtons video={video} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
