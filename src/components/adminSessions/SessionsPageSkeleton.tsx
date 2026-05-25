'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { SessionTableSkeleton } from './SessionTableSkeleton'

const TABLE_COLUMNS = 7

function SessionsListSkeleton() {
  return (
    <div className='space-y-0 w-full'>
      <div className='border-b border-gray-200 bg-white'>
        <nav className='flex items-center gap-0 px-4'>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className='mx-3 my-3.5 h-5 w-28' />
          ))}
        </nav>
      </div>

      <div className='space-y-4 pt-4'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <Skeleton className='h-10 w-full max-w-md rounded-[8px]' />
          <Skeleton className='h-10 w-32 rounded-[8px]' />
        </div>

        <div className='overflow-hidden rounded-[12px] border border-gray-100 bg-white shadow-sm'>
          <div className='flex items-center justify-between border-b border-gray-100 bg-white p-4'>
            <Skeleton className='h-5 w-28' />
          </div>

          <div className='w-full overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-b border-gray-100 bg-gray-50/70'>
                  {Array.from({ length: TABLE_COLUMNS }).map((_, i) => (
                    <th key={i} className='px-4 py-3.5'>
                      <Skeleton className='h-3 w-16' />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                <SessionTableSkeleton />
              </tbody>
            </table>
          </div>

          <div className='flex flex-col items-center gap-3 border-t border-gray-100 px-4 py-6'>
            <div className='flex items-center gap-3'>
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className='h-9 w-9 rounded-[6px]' />
              ))}
            </div>
            <Skeleton className='h-4 w-44' />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SessionsPageSkeleton() {
  return <SessionsListSkeleton />
}
