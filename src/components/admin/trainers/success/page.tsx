'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

interface TrainerCreatedSuccessProps {
  trainerName: string
  trainerEmail: string
}

export function TrainerCreatedSuccess({
  trainerName,
  trainerEmail,
}: TrainerCreatedSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className='rounded-[12px] border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm'
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 18 }}
        className='mx-auto flex h-16 w-16 items-center justify-center rounded-[9999px] bg-green-500'
      >
        <Image src='/success.svg' alt='' width={40} height={40} aria-hidden />
      </motion.div>

      <h2 className='mt-6 text-xl font-bold text-gray-900'>Trainer created</h2>
      <p className='mt-2 text-sm text-gray-500 max-w-md mx-auto'>
        <span className='font-medium text-gray-800'>{trainerName}</span> has been added
        to FitCall. Login credentials were sent to{' '}
        <span className='font-medium text-gray-700'>{trainerEmail}</span>.
      </p>

      <Button
        asChild
        className='mt-8 bg-[#0b4d8d] hover:bg-[#093e72] text-white h-11 px-8 rounded-[8px] font-semibold'
      >
        <Link href='/admin/trainers'>Back to trainers</Link>
      </Button>
    </motion.div>
  )
}
