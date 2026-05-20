/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import { BasicInfoValues, Step1BasicInfo } from '../../../../components/admin/trainers/step1/page'
import { createTrainerAction, uploadTrainerImageAction, uploadTrainerVideoAction } from '@/actions/addtrainer'
import { TrainerCreatedSuccess } from '../../../../components/admin/trainers/success/page'
import { AddTrainerStepper } from '../../../../components/admin/trainers/addtrainerstepper/page'
import { Step2MediaUpload } from '../../../../components/admin/trainers/step2/page'
import { Step3AccountSetup } from '../../../../components/admin/trainers/step3/page'


interface MediaFiles {
    image: File | null
    video: File | null
}

export default function AddTrainerPage() {
    const [step, setStep] = useState(1)
    const [basicInfo, setBasicInfo] = useState<BasicInfoValues | null>(null)
    const [media, setMedia] = useState<MediaFiles>({ image: null, video: null })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createdTrainerName, setCreatedTrainerName] = useState('')
    const [success, setSuccess] = useState(false)

    const handleStep1 = (values: BasicInfoValues) => {
        setBasicInfo(values)
        setStep(2)
    }

    const handleStep2 = (files: MediaFiles) => {
        setMedia(files)
        setStep(3)
    }

    const handleStep3 = async (method: 'invitation' | 'temporary_password', password?: string) => {
        if (!basicInfo) return
        setIsSubmitting(true)

        try {
            const formData = new FormData()
            Object.entries(basicInfo).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value))
                }
            })

            const trainer = await createTrainerAction(formData)

            if (media.image) await uploadTrainerImageAction(trainer.id, media.image)
            if (media.video) await uploadTrainerVideoAction(trainer.id, media.video)

            setCreatedTrainerName(basicInfo.name)
            setSuccess(true)
            toast.success('Trainer created successfully!')
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (success) {
        return <TrainerCreatedSuccess trainerName={createdTrainerName} />
    }

    return (
        <div className='w-full max-w-350 mx-auto space-y-6 px-4 pb-6'>
            <Link
                href='/admin/trainers'
                className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors'
            >
                <ChevronLeft className='h-4 w-4' />
                Back to Trainer
            </Link>
            
            <div>
                <h1 className='text-2xl font-bold text-muted-foreground'>Add a new trainer</h1>
                <p className='mb-8 text-sm text-muted'>
                    Create the profile, upload media, and get them ready to coach on FitCall.
                </p>
            </div>

            <AddTrainerStepper currentStep={step} />

            {step === 1 && (
                <Step1BasicInfo defaultValues={basicInfo ?? undefined} onNext={handleStep1} />
            )}
            {step === 2 && (
                <Step2MediaUpload defaultValues={media} onNext={handleStep2} />
            )}
            {step === 3 && basicInfo && (
                <Step3AccountSetup
                    basicInfo={basicInfo}
                    hasImage={!!media.image}
                    hasVideo={!!media.video}
                    isSubmitting={isSubmitting}
                    onSubmit={handleStep3}
                />
            )}
        </div>
    )
}