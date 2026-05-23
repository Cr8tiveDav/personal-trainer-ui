'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import { BasicInfoValues, Step1BasicInfo } from '../../../../components/admin/trainers/step1/page'
import { useCreateTrainer } from '@/api/trainers'
import type { CreatedTrainer } from '@/api/types/trainers'
import { TrainerCreatedSuccess } from '../../../../components/admin/trainers/success/page'
import { AddTrainerStepper } from '../../../../components/admin/trainers/addtrainerstepper/page'
import { Step2MediaUpload } from '../../../../components/admin/trainers/step2/page'
import { Step3ReviewAndCreate } from '../../../../components/admin/trainers/step3/page'

const stepMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
}

export default function AddTrainerPage() {
  const [step, setStep] = useState(1)
  const [basicInfo, setBasicInfo] = useState<BasicInfoValues | null>(null)
  const [displayPicture, setDisplayPicture] = useState<File | null>(null)
  const createTrainer = useCreateTrainer()
  const [created, setCreated] = useState(false)

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
        phone_number: basicInfo.phone_number,
        gender: basicInfo.gender,
        specializations: basicInfo.specializations,
        years_of_experience: basicInfo.years_of_experience,
        bio: basicInfo.bio,
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
          setCreated(true)
        },
        onError: (error: Error) => {
          const message = error instanceof Error ? error.message : 'Something went wrong'
          toast.error(message)
        },
      }
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className='w-full max-w-350 mx-auto space-y-6 px-4 pb-6'
    >
      <Link
        href='/admin/trainers'
        className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors'
      >
        <ChevronLeft className='h-4 w-4' />
        Back to trainers
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className='text-2xl font-bold text-muted-foreground'>Add a new trainer</h1>
        <p className='mb-8 text-sm text-muted'>
          Create the profile and provision their account in one request. Login credentials are
          emailed automatically.
        </p>
      </motion.div>

      {created && basicInfo ? (
        <TrainerCreatedSuccess
          trainerName={basicInfo.name}
          trainerEmail={basicInfo.email}
        />
      ) : (
        <>
          <AddTrainerStepper currentStep={step} />

          <AnimatePresence mode='wait'>
            {step === 1 && (
              <motion.div key='step-1' {...stepMotion}>
                <Step1BasicInfo defaultValues={basicInfo ?? undefined} onNext={handleStep1} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key='step-2' {...stepMotion}>
                <Step2MediaUpload
                  defaultImage={displayPicture}
                  onNext={handleStep2}
                />
              </motion.div>
            )}
            {step === 3 && basicInfo && (
              <motion.div key='step-3' {...stepMotion}>
                <Step3ReviewAndCreate
                  basicInfo={basicInfo}
                  hasImage={!!displayPicture}
                  isSubmitting={createTrainer.isPending}
                  onSubmit={handleCreate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}
