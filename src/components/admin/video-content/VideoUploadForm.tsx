'use client'

import { useState, useRef } from 'react'
import { UploadCloud, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const TRAINERS = [
  'Amara J.',
  'Cara K.',
  'Helen E.',
  'Dani K.',
  'Sally V.',
  'Jade K.',
  'Jubril K.',
  'Murphy E.',
]

export function VideoUploadForm() {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [trainer, setTrainer] = useState('')
  const [duration, setDuration] = useState('')
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  return (
    <div className='mx-auto max-w-2xl space-y-6'>
      <div className='flex items-center gap-3'>
        <Link
          href='/admin/video-content'
          className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700'
        >
          <ArrowLeft className='h-4 w-4' />
          Back
        </Link>
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white p-8 shadow-sm'>
        <h2 className='mb-6 text-xl font-bold text-gray-900'>Upload Video</h2>

        <div className='space-y-5'>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 transition-colors ${
              dragging ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:border-primary/50'
            }`}
          >
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm'>
              <UploadCloud className='h-6 w-6 text-gray-400' />
            </div>
            {file ? (
              <p className='text-sm font-medium text-gray-900'>{file.name}</p>
            ) : (
              <>
                <p className='text-sm font-medium text-gray-700'>Drag & drop your video here</p>
                <p className='text-xs text-gray-400'>or click to browse — MP4, MOV, AVI supported</p>
              </>
            )}
            <input
              ref={inputRef}
              type='file'
              accept='video/*'
              className='hidden'
              onChange={handleFileChange}
            />
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium text-gray-700'>Video Title</label>
            <input
              type='text'
              placeholder='Enter video title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20'
            />
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium text-gray-700'>Select Trainer</label>
            <select
              value={trainer}
              onChange={(e) => setTrainer(e.target.value)}
              className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20'
            >
              <option value='' disabled>Select a trainer</option>
              {TRAINERS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium text-gray-700'>Duration</label>
            <input
              type='text'
              placeholder='e.g. 45:00'
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className='w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20'
            />
          </div>

          <div className='flex gap-3 pt-2'>
            <Link
              href='/admin/video-content'
              className='flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              Cancel
            </Link>
            <button
              className='flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50'
              disabled={!file || !trainer || !duration || !title}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
