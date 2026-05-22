/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ImageEmptyState, ImageGallery } from './media/ImageGallerry'
import { VideoDetailView, VideoEmptyState, VideoTableView } from './media/VideoSection.tsx'

export function TrainerMediaTab({ trainerId, trainerName, trainerSpecialty }: any) {
  const [subTab, setSubTab] = useState<'image' | 'video'>('image')
  const [videoView, setVideoView] = useState<'table' | 'detail'>('table')
  const [, setImageProcessing] = useState(false)
  const [videoProcessing, setVideoProcessing] = useState(false)
  const [openUploadModal, setOpenUploadModal] = useState(false)

  const queryClient = useQueryClient()

  const { data: images = [] } = useQuery({
    queryKey: ['trainer-images', trainerId],
    queryFn: () =>
      fetch(`/api/admin/media-trainers/${trainerId}?type=image`)
        .then((r) => r.json())
        .then((r) => r.data ?? []),
  })

  const { data: video } = useQuery({
    queryKey: ['trainer-video', trainerId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/media-trainers/${trainerId}?type=video`)
      if (!res.ok) return null

      return {
        url: `/api/admin/media-trainers/${trainerId}?type=video`,
        status: 'Approved',
      }
    },
  })

  const uploadVideoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('video', file)
      return fetch(`/api/admin/media-trainers/${trainerId}?type=video`, {
        method: 'POST',
        headers: { 'x-requested-with': 'XMLHttpRequest' },
        body: formData,
      })
    },
    onSuccess: async () => {
      setVideoProcessing(true)
      setOpenUploadModal(false)

      await queryClient.invalidateQueries({ queryKey: ['trainer-video', trainerId] })

      setTimeout(async () => {
        await queryClient.refetchQueries({ queryKey: ['trainer-video', trainerId] })
        setVideoProcessing(false)
      }, 3000)
    },
  })

  const uploadImagesMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()
      files.forEach((f) => formData.append('images', f))
      return fetch(`/api/admin/media-trainers/${trainerId}?type=image`, {
        method: 'POST',
        headers: { 'x-requested-with': 'XMLHttpRequest' },
        body: formData,
      })
    },
    onSuccess: async () => {
      setImageProcessing(true)
      await queryClient.invalidateQueries({ queryKey: ['trainer-images', trainerId] })
      await queryClient.refetchQueries({ queryKey: ['trainer-images', trainerId] })
      setImageProcessing(false)
    },
  })

  const SUB_TABS = [
    { key: 'image', label: 'Image content' },
    { key: 'video', label: 'Video content' },
  ]

  return (
    <div className='space-y-5'>
      <div className='flex gap-0 border-b border-gray-200'>
        {SUB_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSubTab(tab.key as any)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-xs font-medium transition-colors ${
              subTab === tab.key
                ? 'border-[#0b4d8d] text-[#0b4d8d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === 'image' &&
        (images.length === 0 ? (
          <ImageEmptyState
            type='image'
            multiple
            loading={uploadImagesMutation.isPending}
            onFileSelect={(f: File[]) => uploadImagesMutation.mutate(f)}
          />
        ) : (
          <ImageGallery
            trainerId={trainerId}
            images={images}
            uploading={uploadImagesMutation.isPending}
            onUpload={(f: File[]) => uploadImagesMutation.mutate(f)}
          />
        ))}

      {subTab === 'video' && (
        <>
          {videoProcessing ? (
            <div className='flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-4 border-[#0b4d8d] border-t-transparent' />

              <h3 className='mt-4 text-sm font-semibold text-gray-900'>
                Uploading video...
              </h3>

              <p className='mt-2 max-w-sm text-xs text-gray-500'>
                Video may take a few seconds to upload and process. Please wait.
              </p>
            </div>
          ) : videoView === 'detail' && video ? (
            <VideoDetailView
              video={video}
              trainerName={trainerName}
              trainerSpecialty={trainerSpecialty}
              onBack={() => setVideoView('table')}
              onReplace={(f: File) => uploadVideoMutation.mutate(f)}
              onRemove={() => {}}
              uploading={uploadVideoMutation.isPending}
            />
          ) : video ? (
            <VideoTableView
              video={video}
              trainerName={trainerName}
              trainerSpecialty={trainerSpecialty}
              onView={() => setVideoView('detail')}
              onReplace={(file: File) => uploadVideoMutation.mutate(file)}
              uploading={uploadVideoMutation.isPending}
              onUploadNew={() => setOpenUploadModal(true)}
            />
          ) : (
            <VideoEmptyState
              loading={uploadVideoMutation.isPending}
              onFileSelect={(f: File[]) => uploadVideoMutation.mutate(f[0])}
            />
          )}

          {openUploadModal && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
              <div className='w-full max-w-2xl rounded-xl bg-white p-6'>
                <VideoEmptyState
                  loading={uploadVideoMutation.isPending}
                  onFileSelect={(files: File[]) => uploadVideoMutation.mutate(files[0])}
                />

                <p className='mt-3 text-center text-xs text-gray-500'>
                  Video may take a few seconds to upload and process.
                </p>

                <button
                  onClick={() => setOpenUploadModal(false)}
                  className='mt-3 w-full rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}