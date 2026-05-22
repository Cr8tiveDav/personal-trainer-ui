'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImageIcon, RotateCcw, X } from 'lucide-react'
import {
  TRAINER_ONBOARDING_STATUSES,
  TRAINER_SPECIALIZATIONS,
  type TrainerSpecialization,
} from '@/api/types/trainers'
import { useUpdateTrainer } from '@/api/trainers'
import type { Trainer } from '@/components/admin/trainers/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UpdateTrainerFormInput } from '@/lib/trainers/build-update-trainer-form-data'

const SPECIALIZATION_OPTIONS: {
  value: TrainerSpecialization
  label: string
}[] = [
  { value: 'yoga', label: 'Yoga' },
  { value: 'speed', label: 'Speed' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'endurance', label: 'Endurance' },
  { value: 'strength', label: 'Strength & Conditioning' },
]

const ONBOARDING_LABELS: Record<string, string> = {
  pending: 'Pending',
  active: 'Active',
  approved: 'Approved',
  suspended: 'Suspended',
}

const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/heic'
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

function getCurrentPictureUrl(trainer: Trainer): string | null {
  const url = trainer.displayPictureUrl?.trim()
  if (url) return url
  if (trainer.avatarUrl && !trainer.avatarUrl.includes('pravatar.cc')) {
    return trainer.avatarUrl
  }
  return null
}

type EditTrainerDialogProps = {
  trainer: Trainer
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FormState = {
  specialization: TrainerSpecialization | ''
  bio: string
  yearsOfExperience: string
  introVideoUrl: string
  onboardingStatus: string
}

function trainerToFormState(trainer: Trainer): FormState {
  const spec = trainer.specializations?.[0] as TrainerSpecialization | undefined

  return {
    specialization:
      spec && TRAINER_SPECIALIZATIONS.includes(spec) ? spec : '',
    bio: trainer.bio ?? '',
    yearsOfExperience: String(trainer.yearsOfExperience ?? 0),
    introVideoUrl: trainer.introVideoUrl ?? '',
    onboardingStatus: trainer.onboardingStatus || 'pending',
  }
}

function formToUpdateInput(
  form: FormState,
  trainer: Trainer,
  pictureFile: File | null,
): UpdateTrainerFormInput {
  const years = Number(form.yearsOfExperience)

  return {
    specializations: form.specialization ? [form.specialization] : [],
    training_styles: trainer.trainingStyles ?? [],
    bio: form.bio.trim(),
    years_of_experience: Number.isFinite(years) ? years : 0,
    intro_video_url: form.introVideoUrl.trim(),
    display_picture: trainer.displayPictureUrl || undefined,
    onboarding_status: form.onboardingStatus,
    display_picture_file: pictureFile,
  }
}

export function EditTrainerDialog({
  trainer,
  open,
  onOpenChange,
}: EditTrainerDialogProps) {
  const updateTrainer = useUpdateTrainer(trainer.id)
  const inputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<FormState>(() => trainerToFormState(trainer))
  const [pictureFile, setPictureFile] = useState<File | null>(null)
  const [pictureError, setPictureError] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setForm(trainerToFormState(trainer))
      setPictureFile(null)
      setPictureError(null)
    }
  }, [open, trainer])

  useEffect(() => {
    if (!pictureFile) {
      setFilePreview(null)
      return
    }
    const url = URL.createObjectURL(pictureFile)
    setFilePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [pictureFile])

  const currentPictureUrl = getCurrentPictureUrl(trainer)
  const previewSrc = filePreview ?? currentPictureUrl
  const showingNewUpload = !!filePreview

  function validateAndSetPicture(file: File) {
    if (file.size > MAX_IMAGE_BYTES) {
      setPictureError('Image must be 5 MB or smaller.')
      return
    }
    setPictureError(null)
    setPictureFile(file)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.specialization) return

    updateTrainer.mutate(formToUpdateInput(form, trainer, pictureFile), {
      onSuccess: () => onOpenChange(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='bg-white max-h-[90vh] overflow-y-auto sm:max-w-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Edit trainer</DialogTitle>
          <DialogDescription>
            Update profile details for {trainer.name}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-900 mb-1.5'>
              Specialty
            </label>
            <Select
              value={form.specialization}
              onValueChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  specialization: v as TrainerSpecialization,
                }))
              }
            >
              <SelectTrigger className='login-input h-11'>
                <SelectValue placeholder='Select specialty' />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {SPECIALIZATION_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-900 mb-1.5'>
              Years of experience
            </label>
            <Input
              type='number'
              min={0}
              className='login-input'
              value={form.yearsOfExperience}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  yearsOfExperience: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-900 mb-1.5'>
              Bio
            </label>
            <Textarea
              className='login-input min-h-[100px] resize-none'
              maxLength={400}
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-900 mb-1.5'>
              Intro video URL
            </label>
            <Input
              className='login-input'
              placeholder='https://…'
              value={form.introVideoUrl}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  introVideoUrl: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-900 mb-1.5'>
              Onboarding status
            </label>
            <Select
              value={form.onboardingStatus}
              onValueChange={(v) =>
                setForm((prev) => ({ ...prev, onboardingStatus: v }))
              }
            >
              <SelectTrigger className='login-input h-11'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {TRAINER_ONBOARDING_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {ONBOARDING_LABELS[status] ?? status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='pt-2 border-t border-gray-100'>
            <label className='block text-sm font-medium text-gray-900 mb-1'>
              Display picture
            </label>
            <p className='text-xs text-gray-500 mb-3'>
              {showingNewUpload
                ? 'Preview of your new upload'
                : currentPictureUrl
                  ? 'Current profile photo'
                  : 'No profile photo on file yet'}
            </p>
            <div
              className={`relative flex flex-col items-center justify-center rounded-xl border min-h-[180px] overflow-hidden ${
                previewSrc ? 'border-gray-200' : 'border-dashed border-gray-200 p-6'
              }`}
            >
              {previewSrc ? (
                <>
                  <Image
                    src={previewSrc}
                    alt={`${trainer.name} profile`}
                    width={400}
                    height={180}
                    className='w-full h-[180px] object-cover'
                    unoptimized={showingNewUpload}
                  />
                  <div className='absolute top-2 right-2 flex gap-1'>
                    <button
                      type='button'
                      onClick={() => inputRef.current?.click()}
                      className='flex h-8 w-8 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:text-[#0b4d8d]'
                      aria-label='Change photo'
                    >
                      <RotateCcw className='h-4 w-4' />
                    </button>
                    {pictureFile && (
                      <button
                        type='button'
                        onClick={() => {
                          setPictureFile(null)
                          setPictureError(null)
                        }}
                        className='flex h-8 w-8 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:text-red-600'
                        aria-label='Revert to current photo'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    )}
                  </div>
                  {pictureFile && (
                    <div className='absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1'>
                      <p className='text-xs text-white truncate max-w-[200px]'>
                        {pictureFile.name}
                      </p>
                    </div>
                  )}
                  {!pictureFile && (
                    <button
                      type='button'
                      onClick={() => inputRef.current?.click()}
                      className='absolute bottom-2 right-2 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-[#0b4d8d] shadow hover:bg-white'
                    >
                      Replace photo
                    </button>
                  )}
                </>
              ) : (
                <div className='flex flex-col items-center gap-3 text-center'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#f4f9fd] text-[#0b4d8d]'>
                    <ImageIcon className='h-5 w-5' />
                  </div>
                  <p className='text-sm text-gray-600'>No profile image yet</p>
                  <Button
                    type='button'
                    onClick={() => inputRef.current?.click()}
                    className='mt-0 h-9 bg-[#0b4d8d] hover:bg-[#093d73] text-white text-xs'
                  >
                    Upload photo
                  </Button>
                </div>
              )}
            </div>
            {pictureError && (
              <p className='text-xs text-red-500 mt-1'>{pictureError}</p>
            )}
            <input
              ref={inputRef}
              type='file'
              accept={ACCEPTED_IMAGE_TYPES}
              className='hidden'
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) validateAndSetPicture(f)
                e.target.value = ''
              }}
            />
          </div>

          <DialogFooter className='gap-2 sm:gap-0 pt-2'>
            <Button
              type='button'
              variant='outline'
              className='mt-0'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='mt-0 bg-[#0b4d8d] hover:bg-[#093d73]'
              disabled={!form.specialization || updateTrainer.isPending}
            >
              {updateTrainer.isPending ? 'Saving…' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
