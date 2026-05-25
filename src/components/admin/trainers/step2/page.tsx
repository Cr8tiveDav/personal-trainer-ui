'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, ImageIcon, RotateCcw, X } from 'lucide-react'
import Image from 'next/image'

interface Step2Props {
  defaultImage?: File | null
  onNext: (image: File | null) => void
}

const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/heic'
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export function Step2MediaUpload({ defaultImage, onNext }: Step2Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File | null>(defaultImage ?? null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const validateAndSet = (file: File) => {
    if (file.size > MAX_IMAGE_BYTES) {
      setError('Image must be 5 MB or smaller.')
      return
    }
    setError(null)
    setImage(file)
  }

  const preview = image ? URL.createObjectURL(image) : null

  return (
    <div className='rounded-[12px] border border-gray-100 bg-white p-6 shadow-sm'>
      <h2 className='text-base font-semibold text-gray-900'>Profile image</h2>
      <p className='mt-1 mb-6 text-sm text-gray-500'>
        Optional portrait (JPEG, PNG, WebP, or HEIC, up to 5 MB). Uploads asynchronously after
        creation — the trainer record returns with no picture until processing completes. Intro
        videos are uploaded by the trainer after they log in.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const dropped = e.dataTransfer.files[0]
          if (dropped) validateAndSet(dropped)
        }}
        className={`relative flex flex-col items-center justify-center rounded-[20px] border transition-colors min-h-[260px] ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-200'
        } ${image ? 'p-0 overflow-hidden' : 'p-10 gap-3'}`}
      >
        {image && preview ? (
          <>
            <Image
              src={preview}
              alt='Profile preview'
              width={700}
              height={700}
              className='w-full h-[260px] object-cover rounded-[20px]'
            />
            <div className='absolute top-2 right-2 flex gap-1'>
              <button
                type='button'
                onClick={() => inputRef.current?.click()}
                className='flex h-7 w-7 items-center justify-center rounded-[9999px] bg-white shadow text-gray-500 hover:text-primary transition-colors'
              >
                <RotateCcw className='h-3.5 w-3.5' />
              </button>
              <button
                type='button'
                onClick={() => {
                  setImage(null)
                  setError(null)
                }}
                className='flex h-7 w-7 items-center justify-center rounded-[9999px] bg-white shadow text-gray-500 hover:text-red-500 transition-colors'
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </div>
            <div className='absolute bottom-2 left-2 rounded-[6px] bg-black/50 px-2 py-1'>
              <p className='text-xs text-white truncate max-w-[200px]'>{image.name}</p>
              <p className='text-xs text-white/70'>
                {(image.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </>
        ) : (
          <>
            <div className='flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-[#f4f9fd] text-[#0b4d8d]'>
              <ImageIcon className='h-5 w-5' />
            </div>
            <div className='text-center'>
              <p className='text-sm font-semibold text-[#111111]'>Drag & drop a portrait</p>
              <p className='text-xs text-[#98a2b3] mt-1'>PNG, JPG, WebP, or HEIC — up to 5 MB</p>
            </div>
            <Button
              type='button'
              onClick={() => inputRef.current?.click()}
              className='flex items-center gap-2 bg-[#0b4d8d] hover:bg-[#093e72] text-white h-[38px] px-4 rounded-[8px] text-xs font-semibold shadow-none'
            >
              Choose file
            </Button>
          </>
        )}
        <input
          ref={inputRef}
          type='file'
          accept={ACCEPTED_IMAGE_TYPES}
          className='hidden'
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) validateAndSet(f)
          }}
        />
      </div>

      {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}

      <div className='flex justify-end mt-6 gap-3'>
        <Button type='button' variant='outline' onClick={() => onNext(null)}>
          Skip for now
        </Button>
        <Button type='button' onClick={() => onNext(image)} className='flex items-center gap-2'>
          Continue <ArrowRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
