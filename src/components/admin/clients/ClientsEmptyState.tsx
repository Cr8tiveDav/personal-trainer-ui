import { Users } from 'lucide-react'

type ClientsEmptyStateProps = {
  title: string
  description?: string
}

export function ClientsEmptyState({
  title,
  description = 'Clients will appear here once they register on the platform.',
}: ClientsEmptyStateProps) {
  return (
    <div className='flex min-h-[280px] flex-col items-center justify-center px-6 py-16 text-center'>
      <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50'>
        <Users className='h-7 w-7 text-primary' />
      </div>
      <h3 className='text-base font-semibold text-gray-900'>{title}</h3>
      <p className='mt-2 max-w-sm text-sm text-gray-500'>{description}</p>
    </div>
  )
}
