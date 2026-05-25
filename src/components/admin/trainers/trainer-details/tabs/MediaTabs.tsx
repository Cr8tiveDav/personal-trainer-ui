/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  trainerMediaQueryKeys,
  useDeleteTrainerVideo,
  useTrainerImages,
  useTrainerVideo,
  useUploadTrainerImages,
  useUploadTrainerVideo,
} from '@/api/trainer-media'
import { validateVideoFile } from '@/lib/media/validate-video-file'
import { displayError, getErrorMessage } from '@/lib/utils'
import { ImageEmptyState, ImageGallery } from './media/ImageGallerry'
import { MediaUploadOverlay } from './media/MediaUploadOverlay'
import { TrainerMediaTabSkeleton } from './media/TrainerMediaTabSkeleton'
import {
  VideoDetailView,
  VideoEmptyState,
  VideoTableView,
} from './media/VideoSection.tsx'

type UploadOverlayState = {
  type: 'image' | 'video'
  progress: number
  fileLabel?: string
}

function formatFileLabel(files: File[]) {
  if (files.length === 1) return files[0].name
  return `${files.length} images`
}

export function TrainerMediaTab({
  trainerId,
  trainerName,
  trainerSpecialty,
}: any) {
  const [subTab, setSubTab] = useState<'image' | 'video'>('image')
  const [videoView, setVideoView] = useState<'table' | 'detail'>('table')
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [uploadOverlay, setUploadOverlay] = useState<UploadOverlayState | null>(
    null,
  )

  const queryClient = useQueryClient()

  const { data: images = [], isLoading: imagesLoading } =
    useTrainerImages(trainerId)
  const uploadImagesMutation = useUploadTrainerImages(trainerId)
  const uploadVideoMutation = useUploadTrainerVideo(trainerId)
  const removeVideoMutation = useDeleteTrainerVideo(trainerId)

  const isVideoUploading =
    uploadOverlay?.type === 'video' || uploadVideoMutation.isPending

  const { data: video, isLoading: videoLoading } = useTrainerVideo(trainerId, {
    enabled: !isVideoUploading,
  })

  const isUploading =
    uploadOverlay !== null ||
    uploadImagesMutation.isPending ||
    uploadVideoMutation.isPending

  useEffect(() => {
    return () => {
      if (video?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(video.url)
      }
    }
  }, [video?.url])

  function handleUploadImages(files: File[]) {
    setUploadOverlay({
      type: 'image',
      progress: 0,
      fileLabel: formatFileLabel(files),
    })

    uploadImagesMutation.mutate(
      {
        files,
        onProgress: (progress) => {
          setUploadOverlay((prev) =>
            prev?.type === 'image' ? { ...prev, progress } : prev,
          )
        },
      },
      {
        onSettled: () => setUploadOverlay(null),
      },
    )
  }

  async function handleUploadVideo(file: File) {
    if (isUploading) return

    const validationError = await validateVideoFile(file)
    if (validationError) {
      toast.error(validationError)
      return
    }

    setOpenUploadModal(false)
    void queryClient.cancelQueries({
      queryKey: trainerMediaQueryKeys.video(trainerId),
    })

    setUploadOverlay({
      type: 'video',
      progress: 0,
      fileLabel: file.name,
    })

    uploadVideoMutation.mutate(
      {
        file,
        onProgress: (progress) => {
          setUploadOverlay((prev) =>
            prev?.type === 'video' ? { ...prev, progress } : prev,
          )
        },
      },
      {
        onError: (error) => {
          displayError(
            error,
            getErrorMessage(error, 'Video upload failed. Please try again.'),
          )
        },
        onSettled: () => setUploadOverlay(null),
      },
    )
  }

  const SUB_TABS = [
    { key: 'image', label: 'Image content' },
    { key: 'video', label: 'Video content' },
  ]

  return (
    <div className='space-y-5'>
      <MediaUploadOverlay
        open={uploadOverlay !== null}
        type={uploadOverlay?.type ?? 'image'}
        progress={uploadOverlay?.progress ?? 0}
        fileLabel={uploadOverlay?.fileLabel}
      />

      <div className='flex gap-0 border-b border-gray-200'>
        {SUB_TABS.map((tab) => (
          <button
            key={tab.key}
            type='button'
            onClick={() => setSubTab(tab.key as 'image' | 'video')}
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
        (imagesLoading ? (
          <TrainerMediaTabSkeleton variant='image' />
        ) : images.length === 0 ? (
          <ImageEmptyState
            type='image'
            multiple
            loading={isUploading}
            onFileSelect={handleUploadImages}
          />
        ) : (
          <ImageGallery
            trainerId={trainerId}
            images={images}
            uploading={isUploading}
            onUpload={handleUploadImages}
          />
        ))}

      {subTab === 'video' &&
        (videoLoading ? (
          <TrainerMediaTabSkeleton variant='video' />
        ) : (
        <>
          {videoView === 'detail' && video ? (
            <VideoDetailView
              video={video}
              trainerName={trainerName}
              trainerSpecialty={trainerSpecialty}
              onBack={() => setVideoView('table')}
              onReplace={handleUploadVideo}
              onRemove={() => removeVideoMutation.mutate()}
              uploading={isUploading}
            />
          ) : video ? (
            <VideoTableView
              video={video}
              trainerName={trainerName}
              trainerSpecialty={trainerSpecialty}
              onView={() => setVideoView('detail')}
              onReplace={handleUploadVideo}
              uploading={isUploading}
              onUploadNew={() => setOpenUploadModal(true)}
            />
          ) : (
            <VideoEmptyState
              loading={isUploading}
              onFileSelect={(files: File[]) => handleUploadVideo(files[0])}
            />
          )}

          {openUploadModal && !isUploading && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
              <div className='w-full max-w-2xl rounded-[12px] bg-white p-6'>
                <VideoEmptyState
                  loading={false}
                  onFileSelect={(files: File[]) => handleUploadVideo(files[0])}
                />
                <button
                  type='button'
                  onClick={() => setOpenUploadModal(false)}
                  className='mt-3 w-full rounded-[8px] border border-gray-200 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
        ))}
    </div>
  )
}
