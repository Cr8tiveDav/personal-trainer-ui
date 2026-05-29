'use client'

import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useAdminClient } from '@/api/clients'
import { ClientProfileHeader } from './ClientProfileHeader'
import { ClientDetailTabs } from './ClientDetailTabs'
import { ClientDetailsSkeleton } from './ClientDetailsSkeleton'

export function ClientDetailsClient() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === 'string' ? params.id : ''

  const { data: client, isLoading, isError } = useAdminClient(id)

  if (isLoading) {
    return <ClientDetailsSkeleton />
  }

  if (isError || !client) {
    return (
      <div className='mx-auto w-full max-w-[1400px] px-4 py-12 text-center'>
        <p className='mb-4 text-red-500'>Failed to load client details.</p>
        <button
          type='button'
          onClick={() => router.push('/admin/users')}
          className='text-primary hover:underline'
        >
          Back to Clients
        </button>
      </div>
    )
  }

  return (
    <div className='mx-auto w-full max-w-[1400px] space-y-6 px-4 pb-6'>
      <button
        type='button'
        onClick={() => router.push('/admin/users')}
        className='flex items-center text-sm text-gray-500 transition-colors hover:text-gray-900'
      >
        <ChevronLeft className='mr-1 h-4 w-4' />
        Back to Clients
      </button>

      <ClientProfileHeader client={client} />
      <ClientDetailTabs client={client} />
    </div>
  )
}
