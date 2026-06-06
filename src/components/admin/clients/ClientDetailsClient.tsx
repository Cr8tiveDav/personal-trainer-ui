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

  const { data: client, isLoading, isError, error } = useAdminClient(id)

  if (isLoading) {
    return <ClientDetailsSkeleton />
  }

  if (isError || !client) {
    const isForbidden =
      (error as { status?: number; response?: { status?: number } })?.response?.status === 403 ||
      error?.message?.toLowerCase().includes('forbidden')

    if (isForbidden) {
      return (
        <div className='flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-12 text-center'>
          <div className='flex w-full max-w-2xl flex-col items-center'>
            <p className='mb-4 text-sm font-semibold uppercase tracking-widest text-primary'>
              Access Restricted
            </p>
            <h1 className='mb-6 text-4xl font-black leading-none text-muted-foreground md:text-5xl lg:text-6xl'>
              Not Authorized
            </h1>
            <p className='mb-10 max-w-md text-base leading-relaxed text-muted'>
              You do not have permission to view client details. Super admin access is required.
            </p>
            <button
              onClick={() => router.push('/admin/users')}
              className='inline-block rounded-[9999px] bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90'
            >
              Back to clients
            </button>
          </div>
        </div>
      )
    }

    const errorMessage = error?.message || 'Failed to load client details.'

    return (
      <div className='mx-auto w-full max-w-[1400px] px-4 py-12 text-center'>
        <p className='mb-4 font-medium text-red-500'>
          {errorMessage}
        </p>
        <button
          type='button'
          onClick={() => router.push('/admin/users')}
          className='text-primary hover:underline font-semibold'
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
