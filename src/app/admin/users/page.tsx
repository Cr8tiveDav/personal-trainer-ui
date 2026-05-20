import { ClientStatCards } from '@/components/admin/clients/ClientStatCards'
import { ClientsTable } from '@/components/admin/clients/ClientsTable'
import { Download, Plus } from 'lucide-react'

export default function ClientsPage() {
  return (
    <div className='w-full max-w-[1400px] mx-auto space-y-6 px-4 pb-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>Clients</h1>
        <div className='flex items-center gap-3'>
          <button className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            <Download className='h-4 w-4' />
            Export CSV
          </button>
          <button className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90'>
            <Plus className='h-4 w-4' />
            Add Client
          </button>
        </div>
      </div>

      <ClientStatCards />
      <ClientsTable />
    </div>
  )
}
