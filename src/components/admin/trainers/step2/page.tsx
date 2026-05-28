'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

interface Step2Props {
  defaultImages?: File[]
  onNext: (images: File[]) => void
  onBack: () => void
}

const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/heic'
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_IMAGES = 5

export function Step2MediaUpload({ defaultImages = [], onNext, onBack }: Step2Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<File[]>(defaultImages)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const addFiles = (incoming: FileList | File[]) => {
    const files = Array.from(incoming)
    const oversized = files.find((f) => f.size > MAX_IMAGE_BYTES)
    if (oversized) {
      setError('Each image must be 5 MB or smaller.')
      return
    }
    setError(null)
    setImages((prev) => {
      const combined = [...prev, ...files]
      if (combined.length > MAX_IMAGES) {
        setError(`You can upload a maximum of ${MAX_IMAGES} images.`)
        return prev
      }
      return combined
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setError(null)
  }

  return (
    <div className='rounded-[12px] border border-gray-100 bg-white p-6 shadow-sm'>
      <h2 className='text-base font-semibold text-gray-900'>Media upload</h2>
      <p className='mt-1 mb-6 text-sm text-gray-500'>
        Upload up to {MAX_IMAGES} images (JPEG, PNG, WebP, or HEIC, up to 5 MB each). The first
        image will be used as the trainer's profile picture.
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
        }}
        onClick={() => images.length < MAX_IMAGES && inputRef.current?.click()}
        className={`flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed transition-colors min-h-[160px] p-8 gap-3 cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}
          ${images.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className='flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-[#f4f9fd] text-[#0b4d8d]'>
          <ImageIcon className='h-5 w-5' />
        </div>
        <div className='text-center'>
          <p className='text-sm font-semibold text-[#111111]'>
            {images.length >= MAX_IMAGES
              ? 'Maximum images reached'
              : 'Drag & drop images here'}
          </p>
          <p className='text-xs text-[#98a2b3] mt-1'>
            PNG, JPG, WebP, or HEIC — up to 5 MB each · max {MAX_IMAGES} images
          </p>
        </div>
        {images.length < MAX_IMAGES && (
          <Button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
            className='flex items-center gap-2 bg-[#0b4d8d] hover:bg-[#093e72] text-white h-[38px] px-4 rounded-[8px] text-xs font-semibold shadow-none'
          >
            Choose files
          </Button>
        )}
        <input
          ref={inputRef}
          type='file'
          accept={ACCEPTED_IMAGE_TYPES}
          multiple
          className='hidden'
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}

      {/* Image previews */}
      {images.length > 0 && (
        <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'>
          {images.map((file, index) => {
            const url = URL.createObjectURL(file)
            return (
              <div key={index} className='relative group rounded-[12px] overflow-hidden border border-gray-200'>
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  className='w-full h-24 object-cover'
                />
                {index === 0 && (
                  <span className='absolute top-1 left-1 rounded-[4px] bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white'>
                    Profile
                  </span>
                )}
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100'
                >
                  <X className='h-3 w-3' />
                </button>
                <div className='px-1.5 py-1 bg-white'>
                  <p className='text-[10px] text-gray-500 truncate'>{file.name}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className='flex justify-between mt-6 gap-3'>
        <Button
          type='button'
          variant='outline'
          onClick={onBack}
          className='flex items-center gap-2'
        >
          <ArrowLeft className='h-4 w-4' /> Back
        </Button>
        <div className='flex gap-3'>
          <Button type='button' variant='outline' onClick={() => onNext([])}>
            Skip for now
          </Button>
          <Button
            type='button'
            onClick={() => onNext(images)}
            className='flex items-center gap-2'
          >
            Continue <ArrowRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
