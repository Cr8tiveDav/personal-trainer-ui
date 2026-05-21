'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import { BasicInfoValues, Step1BasicInfo } from '../../../../components/admin/trainers/step1/page'
import { useCreateTrainer } from '@/api/trainers'
import type { CreatedTrainer } from '@/api/types/trainers'
import { TrainerCreatedSuccess } from '../../../../components/admin/trainers/success/page'
import { AddTrainerStepper } from '../../../../components/admin/trainers/addtrainerstepper/page'
import { Step2MediaUpload } from '../../../../components/admin/trainers/step2/page'
import { Step3ReviewAndCreate } from '../../../../components/admin/trainers/step3/page'

export default function AddTrainerPage() {
  const [step, setStep] = useState(1)
  const [basicInfo, setBasicInfo] = useState<BasicInfoValues | null>(null)
  const [displayPicture, setDisplayPicture] = useState<File | null>(null)
  const createTrainer = useCreateTrainer()
  const [createdTrainerEmail, setCreatedTrainerEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const handleStep1 = (values: BasicInfoValues) => {
    setBasicInfo(values)
    setStep(2)
  }

  const handleStep2 = (image: File | null) => {
    setDisplayPicture(image)
    setStep(3)
  }

  const handleCreate = async () => {
    if (!basicInfo) return

    createTrainer.mutate(
      {
        email: basicInfo.email,
        name: basicInfo.name,
        specializations: basicInfo.specializations,
        training_styles: basicInfo.training_styles,
        benefits: basicInfo.benefits,
        bio: basicInfo.bio,
        years_of_experience: basicInfo.years_of_experience,
        onboarding_status: basicInfo.onboarding_status,
        display_picture: displayPicture,
      },
      {
        onSuccess: (trainer: CreatedTrainer) => {
          if (!trainer?.id) {
            toast.error(
              'Trainer was provisioned, but no unique identifier was returned from the server.'
            )
            return
          }
          setCreatedTrainerEmail(basicInfo.email)
          setSuccess(true)
          toast.success('Trainer created — credentials emailed.')
        },
        onError: (error: Error) => {
          const message = error instanceof Error ? error.message : 'Something went wrong'
          toast.error(message)
        },
      }
    )
  }

  if (success && basicInfo) {
    return (
      <TrainerCreatedSuccess
        trainerName={basicInfo.name}
        trainerEmail={createdTrainerEmail}
      />
    )
  }

  return (
    <div className='w-full max-w-350 mx-auto space-y-6 px-4 pb-6'>
      <Link
        href='/admin/trainers'
        className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors'
      >
        <ChevronLeft className='h-4 w-4' />
        Back to trainers
      </Link>

      <div>
        <h1 className='text-2xl font-bold text-muted-foreground'>Add a new trainer</h1>
        <p className='mb-8 text-sm text-muted'>
          Create the profile and provision their account in one request. Login credentials are
          emailed automatically.
        </p>
      </div>

      <AddTrainerStepper currentStep={step} />

      {step === 1 && (
        <Step1BasicInfo defaultValues={basicInfo ?? undefined} onNext={handleStep1} />
      )}
      {step === 2 && (
        <Step2MediaUpload
          defaultImage={displayPicture}
          onNext={handleStep2}
        />
      )}
      {step === 3 && basicInfo && (
        <Step3ReviewAndCreate
          basicInfo={basicInfo}
          hasImage={!!displayPicture}
          isSubmitting={createTrainer.isPending}
          onSubmit={handleCreate}
        />
      )}
    </div>
  )
}
