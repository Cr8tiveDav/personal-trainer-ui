'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MoreVertical, Upload } from 'lucide-react'
import type { VideoItem } from './mock-data'
import { VideoStatusBadge } from './VideoStatusBadge'

interface VideoTableProps {
  videos: VideoItem[]
}

export function VideoTable({ videos }: VideoTableProps) {
  const [search, setSearch] = useState('')

  const filtered = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.trainer.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search videos...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20'
          />
        </div>
        <Link
          href='/admin/video-content/upload'
          className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90'
        >
          <Upload className='h-4 w-4' />
          Upload Video
        </Link>
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
                <tr className='border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-400'>
                  <th className='px-6 py-3'>Thumbnail</th>
                  <th className='px-6 py-3'>Trainers</th>
                  <th className='px-6 py-3'>Duration</th>
                  <th className='px-6 py-3'>Status</th>
                  <th className='px-6 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {filtered.map((video) => (
                  <tr key={video.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <Link href={`/admin/video-content/${video.id}`} className='flex items-center gap-3 group'>
                        <div className='flex h-12 w-20 items-center justify-center rounded-lg bg-gray-100 shrink-0'>
                          <div className='h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-gray-400 group-hover:border-l-primary transition-colors' />
                        </div>
                        <span className='font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2'>
                          {video.title}
                        </span>
                      </Link>
                    </td>
                    <td className='px-6 py-4 text-gray-500'>{video.trainer}</td>
                    <td className='px-6 py-4 text-gray-500'>{video.duration}</td>
                    <td className='px-6 py-4'>
                      <VideoStatusBadge status={video.status} />
                    </td>
                    <td className='px-6 py-4'>
                      <button className='rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
                        <MoreVertical className='h-4 w-4' />
                      </button>
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
