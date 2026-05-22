/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRef } from 'react'
import { ImageIcon, Video, X, UploadCloud, Plus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface GalleryImage {
  id: string
  image_url: string
  position: number
}

async function deleteImage(trainerId: string, imageId: string) {
  const res = await fetch(`/api/admin/media-trainers/${trainerId}?type=image&imageId=${imageId}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || 'Delete failed')
  }
}

export function ImageEmptyState({ type, onFileSelect, loading, multiple }: any) {
  const inputRef = useRef<HTMLInputElement>(null)
  const isImage = type === 'image'

  return (
    <div className='flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-14 transition-colors hover:border-[#0b4d8d]/30 hover:bg-blue-50/20'>
      <div className='flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm'>
        {isImage ? <ImageIcon className='h-5 w-5 text-gray-400' /> : <Video className='h-5 w-5 text-gray-400' />}
      </div>
      <div className='text-center'>
        <p className='text-sm font-semibold text-gray-800'>
          {isImage ? 'Drag & drop a portrait' : 'Drag & drop a video'}
        </p>
        <p className='mt-0.5 text-xs text-gray-400'>
          {isImage
            ? 'JPG, PNG, WebP, HEIC · up to 5 MB each · max 5 images'
            : 'MP4, MOV or any ffmpeg format · up to 500 MB · max 10 min'}
        </p>
      </div>
      <button
        type='button'
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        className='flex items-center gap-2 rounded-lg bg-[#0b4d8d] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#093e71] disabled:opacity-60'
      >
        <UploadCloud className='h-4 w-4' />
        {loading ? 'Uploading…' : 'Choose file'}
      </button>
      <input
        ref={inputRef}
        type='file'
        multiple={multiple}
        accept={isImage ? 'image/jpeg,image/png,image/webp,image/heic' : 'video/*'}
        className='hidden'
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          if (files.length) onFileSelect(files)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export function ImageGallery({ trainerId, images, uploading, onUpload }: any) {
  const inputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const canAddMore = images.length < 5

  const deleteMutation = useMutation({
    mutationFn: (imageId: string) => deleteImage(trainerId, imageId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainer-images', trainerId] }),
  })

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
        {images.map((img: GalleryImage) => (
          <div key={img.id} className='group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100' style={{ aspectRatio: '1/1' }}>
            <img src={img.image_url} alt='Gallery' className='h-full w-full object-cover' />
            <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
              <button
                type='button'
                onClick={() => deleteMutation.mutate(img.id)}
                disabled={deleteMutation.isPending}
                className='flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50'
              >
                <X className='h-3.5 w-3.5' /> Remove
              </button>
            </div>
          </div>
        ))}
        {canAddMore && (
          <button
            type='button'
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className='flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-[#0b4d8d]/40 hover:bg-blue-50/20 disabled:opacity-60'
            style={{ aspectRatio: '1/1' }}
          >
            <Plus className='h-6 w-6 text-gray-400' />
            <span className='text-xs text-gray-400'>{uploading ? 'Uploading…' : 'Add image'}</span>
          </button>
        )}
      </div>
      <p className='text-xs text-gray-400'>{images.length} / 5 images used</p>
      <input
        ref={inputRef}
        type='file'
        multiple
        accept='image/jpeg,image/png,image/webp,image/heic'
        className='hidden'
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          if (files.length) onUpload(files)
          e.target.value = ''
        }}
      />
    </div>
  )
}