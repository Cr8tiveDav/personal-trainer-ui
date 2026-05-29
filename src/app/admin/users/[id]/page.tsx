import { Suspense } from 'react'
import { ClientDetailsClient } from '@/components/admin/clients/ClientDetailsClient'
import { ClientDetailsSkeleton } from '@/components/admin/clients/ClientDetailsSkeleton'

export default function ClientDetailPage() {
  return (
    <Suspense fallback={<ClientDetailsSkeleton />}>
      <ClientDetailsClient />
    </Suspense>
  )
}
