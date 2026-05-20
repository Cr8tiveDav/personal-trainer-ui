import { ClientProfileHeader } from '@/components/admin/clients/ClientProfileHeader'
import { ClientDetailTabs } from '@/components/admin/clients/ClientDetailTabs'
import { mockClientDetail } from '@/components/admin/clients/mock-data'

export default function ClientDetailPage() {
  const client = mockClientDetail

  return (
    <div className='w-full max-w-[1400px] mx-auto space-y-6 px-4 pb-6'>
      <ClientProfileHeader client={client} />
      <ClientDetailTabs client={client} />
    </div>
  )
}
