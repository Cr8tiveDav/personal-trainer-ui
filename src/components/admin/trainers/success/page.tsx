import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface TrainerCreatedSuccessProps {
  trainerName: string
  trainerEmail: string
}

export function TrainerCreatedSuccess({
  trainerName,
  trainerEmail,
}: TrainerCreatedSuccessProps) {
  return (
    <div className='flex flex-col h-screen items-center justify-center py-20 text-center'>
      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-500 mb-6'>
        <Image src='/success.svg' alt='success' width={100} height={100} />
      </div>
      <h2 className='text-xl font-bold text-gray-900 mb-2'>Trainer created</h2>
      <p className='text-sm text-gray-500 max-w-sm mb-8'>
        {trainerName} has been added to FitCall. Login credentials were sent to{' '}
        <span className='font-medium text-gray-700'>{trainerEmail}</span>.
      </p>
      <Button asChild>
        <Link href='/admin/trainers'>Back to trainers</Link>
      </Button>
    </div>
  )
}
