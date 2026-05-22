'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ClientTableSkeleton } from './ClientTableSkeleton'

const TABLE_COLUMNS = 6

function ClientStatCardSkeleton() {
  return (
    <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
      <Skeleton className='mb-3 h-9 w-9 rounded-lg' />
      <Skeleton className='mb-2 h-8 w-20' />
      <Skeleton className='h-4 w-28' />
    </div>
  )
}

function ClientsTableSectionSkeleton() {
  return (
    <div className='rounded-2xl border-2 border-dashed border-blue-200 bg-white'>
      <div className='px-6 pt-5'>
        <div className='flex w-full gap-6 border-b border-[#CBD5E1] pb-3'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-5 w-24' />
          ))}
        </div>
      </div>

      <div className='flex items-center gap-3 border-b border-gray-100 px-6 py-4'>
        <Skeleton className='h-10 flex-1 rounded-lg' />
        <Skeleton className='h-10 w-20 rounded-lg' />
        <Skeleton className='h-10 w-20 rounded-lg' />
      </div>

      <div className='min-h-50 overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b border-gray-100'>
              {Array.from({ length: TABLE_COLUMNS }).map((_, i) => (
                <th key={i} className='px-6 py-3'>
                  <Skeleton className='h-3 w-16' />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <ClientTableSkeleton />
          </tbody>
        </table>
      </div>

      <div className='flex flex-col items-center justify-center gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-between'>
        <Skeleton className='h-4 w-44' />
        <div className='flex items-center gap-1'>
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className='h-9 w-9 rounded-md' />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ClientsPageSkeleton() {
  return (
    <>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <ClientStatCardSkeleton key={i} />
        ))}
      </div>
      <ClientsTableSectionSkeleton />
    </>
  )
}
