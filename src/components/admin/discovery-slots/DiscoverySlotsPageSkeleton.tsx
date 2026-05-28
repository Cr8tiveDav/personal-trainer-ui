'use client'

import { motion } from 'motion/react'
import { Skeleton } from '@/components/ui/skeleton'

const DAY_PILL_COUNT = 7
const TABLE_ROW_COUNT = 5
const TABLE_COLUMNS = 4

function DiscoverySlotsTableSkeleton() {
  return (
    <>
      {Array.from({ length: TABLE_ROW_COUNT }).map((_, index) => (
        <motion.tr
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.28,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='border-b border-gray-50 last:border-0'
        >
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-24' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-36' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-40' />
          </td>
          <td className='px-6 py-4'>
            <div className='flex justify-end gap-2'>
              <Skeleton className='h-8 w-8 rounded-[6px]' />
              <Skeleton className='h-8 w-8 rounded-[6px]' />
            </div>
          </td>
        </motion.tr>
      ))}
    </>
  )
}

export function DiscoverySlotsPageSkeleton() {
  return (
    <div className='space-y-8' aria-busy='true' aria-label='Loading discovery slots'>
      <div>
        <Skeleton className='h-7 w-56' />
        <Skeleton className='mt-2 h-4 w-full max-w-2xl' />
        <Skeleton className='mt-1.5 h-4 w-full max-w-xl' />
      </div>

      <div className='overflow-hidden rounded-[12px] border border-gray-100 bg-white'>
        <div className='flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-3 w-48' />
          </div>
        </div>

        <div className='p-6'>
          <Skeleton className='mb-3 h-3 w-20' />
          <div className='mb-6 flex flex-wrap gap-2'>
            {Array.from({ length: DAY_PILL_COUNT }).map((_, i) => (
              <Skeleton key={i} className='h-11 w-[72px] rounded-[8px]' />
            ))}
          </div>

          <div className='mb-6 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-10' />
              <Skeleton className='h-10 w-full rounded-[8px]' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-10 w-full rounded-[8px]' />
            </div>
          </div>

          <div className='mb-6 max-w-md space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-56' />
          </div>

          <div className='flex justify-end'>
            <Skeleton className='h-10 w-[140px] rounded-[8px]' />
          </div>
        </div>
      </div>

      <div className='overflow-hidden rounded-[12px] border border-gray-100 bg-white'>
        <div className='border-b border-gray-100 px-6 py-4 space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-40' />
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-gray-100 text-left'>
                {Array.from({ length: TABLE_COLUMNS }).map((_, i) => (
                  <th key={i} className='px-6 py-3'>
                    <Skeleton className='h-3 w-16' />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <DiscoverySlotsTableSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
