'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, ImageIcon, VideoIcon, RotateCcw, X } from 'lucide-react'
import Image from 'next/image'


interface MediaFiles {
  image: File | null
  video: File | null
}

interface Step2Props {
  defaultValues?: MediaFiles
  onNext: (files: MediaFiles) => void
}

interface DropZoneProps {
  label: string
  accept: string
  hint: string
  icon: React.ReactNode
  file: File | null
  onFile: (file: File) => void
  onRemove: () => void
  isVideo?: boolean
}

function DropZone({ label, accept, hint, icon, file, onFile, onRemove, isVideo }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) onFile(dropped)
  }

  const preview = file ? URL.createObjectURL(file) : null

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm font-medium text-gray-900'>{label} <span className='text-red-500'>*</span></p>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-[20px] border  transition-colors min-h-[260px] ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-200'
        } ${file ? 'p-0 overflow-hidden' : 'p-10 gap-3'}`}
      >
        {file && preview ? (
          <>
            {isVideo ? (
              <video src={preview} className='w-full h-[260px] object-cover rounded-[20px]' controls />
            ) : (
              <Image src={preview} alt='preview' width={700} height={700} className='w-full h-[260px] object-cover rounded-[20px]' />
            )}
            <div className='absolute top-2 right-2 flex gap-1'>
              <button
                type='button'
                onClick={() => inputRef.current?.click()}
                className='flex h-7 w-7 items-center justify-center rounded-full bg-white shadow text-gray-500 hover:text-primary transition-colors'
              >
                <RotateCcw className='h-3.5 w-3.5' />
              </button>
              <button
                type='button'
                onClick={onRemove}
                className='flex h-7 w-7 items-center justify-center rounded-full bg-white shadow text-gray-500 hover:text-red-500 transition-colors'
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </div>
            <div className='absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1'>
              <p className='text-xs text-white truncate max-w-[200px]'>{file.name}</p>
              <p className='text-xs text-white/70'>{(file.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          </>
        ) : (
          <>
            <div className='flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-[#f4f9fd] text-[#0b4d8d]'>
              {icon}
            </div>
            <div className='text-center'>
              <p className='text-sm font-semibold text-[#111111]'>Drag & drop {isVideo ? 'a video' : 'a portrait'}</p>
              <p className='text-xs text-[#98a2b3] mt-1'>{hint}</p>
            </div>
            <Button
              type='button'
              onClick={() => inputRef.current?.click()}
              className='flex items-center gap-2 bg-[#0b4d8d] hover:bg-[#093e72] text-white h-[38px] px-4 rounded-lg text-xs font-semibold shadow-none'
            >
              <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
              </svg>
              Choose file
            </Button>
          </>
        )}
        <input
          ref={inputRef}
          type='file'
          accept={accept}
          className='hidden'
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onFile(f)
          }}
        />
      </div>
    </div>
  )
}

export function Step2MediaUpload({ defaultValues, onNext }: Step2Props) {
  const [image, setImage] = useState<File | null>(defaultValues?.image ?? null)
  const [video, setVideo] = useState<File | null>(defaultValues?.video ?? null)

  const handleContinue = () => {
    if (image && video) {
      onNext({ image, video })
    }
  }

  return (
    <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
      <h2 className='text-base font-semibold text-gray-900'>Media upload</h2>
      <p className='mt-1 mb-6 text-sm text-gray-500'>Upload a clear profile portrait and a short intro/workout video.</p>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <DropZone
          label='Profile image'
          accept='image/jpeg,image/png,image/webp,image/heic'
          hint='PNG, JPG up to 5 MB - 1:1 ratio recommended'
          icon={<ImageIcon className='h-5 w-5' />}
          file={image}
          onFile={setImage}
          onRemove={() => setImage(null)}
        />
        <DropZone
          label='Intro / workout video'
          accept='video/mp4,video/mov'
          hint='MP4, MOV up to 200 MB - 30–60 sec recommended'
          icon={<VideoIcon className='h-5 w-5' />}
          file={video}
          onFile={setVideo}
          onRemove={() => setVideo(null)}
          isVideo
        />
      </div>

      <div className='flex justify-end mt-6'>
        <Button 
          type='button' 
          onClick={handleContinue} 
          disabled={!image || !video} 
          className='flex items-center gap-2'
        >
          Continue <ArrowRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}