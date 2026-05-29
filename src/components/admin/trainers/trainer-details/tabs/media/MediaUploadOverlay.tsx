'use client'

import { motion, AnimatePresence } from 'motion/react'
import { ImageIcon, Video } from 'lucide-react'
import { cn } from '@/utils'

type MediaUploadOverlayProps = {
  open: boolean
  type: 'image' | 'video'
  progress: number
  fileLabel?: string
}

export function MediaUploadOverlay({
  open,
  type,
  progress,
  fileLabel,
}: MediaUploadOverlayProps) {
  const isVideo = type === 'video'
  const clampedProgress = Math.min(100, Math.max(0, progress))
  const isFinishing = clampedProgress >= 100

  const title = isVideo ? 'Uploading video' : 'Uploading images'
  const subtitle = isFinishing
    ? isVideo
      ? 'Processing upload — transcoding may take a few minutes.'
      : 'Finishing upload…'
    : isVideo
      ? 'Please keep this tab open until the upload completes.'
      : 'Your gallery images are being uploaded.'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]'
          role='dialog'
          aria-modal='true'
          aria-labelledby='media-upload-title'
          aria-busy='true'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className='w-full max-w-md rounded-[16px] border border-gray-100 bg-white p-8 shadow-2xl'
          >
            <div className='mb-6 flex flex-col items-center text-center'>
              <div
                className={cn(
                  'mb-4 flex h-14 w-14 items-center justify-center rounded-[16px]',
                  isVideo ? 'bg-[#E8F2FA]' : 'bg-[#ECFDF5]',
                )}
              >
                {isVideo ? (
                  <Video className='h-7 w-7 text-[#0b4d8d]' />
                ) : (
                  <ImageIcon className='h-7 w-7 text-[#0b4d8d]' />
                )}
              </div>
              <h2
                id='media-upload-title'
                className='text-lg font-semibold text-gray-900'
              >
                {title}
              </h2>
              <p className='mt-2 text-sm text-gray-500'>{subtitle}</p>
              {fileLabel ? (
                <p className='mt-2 max-w-full truncate text-xs font-medium text-gray-400'>
                  {fileLabel}
                </p>
              ) : null}
            </div>

            <div className='space-y-3'>
              <div className='flex items-center justify-between text-sm'>
                <span className='font-medium text-gray-700'>Progress</span>
                <span className='tabular-nums font-semibold text-[#0b4d8d]'>
                  {isFinishing && clampedProgress >= 100 ? '100%' : `${clampedProgress}%`}
                </span>
              </div>
              <div className='h-3 overflow-hidden rounded-[9999px] bg-gray-100'>
                <motion.div
                  className={cn(
                    'h-full rounded-[9999px] bg-[#0b4d8d]',
                    isFinishing && 'animate-pulse',
                  )}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${isFinishing ? 100 : clampedProgress}%`,
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </div>
              <p className='text-center text-xs text-gray-400'>
                Do not close or refresh this page during upload.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
