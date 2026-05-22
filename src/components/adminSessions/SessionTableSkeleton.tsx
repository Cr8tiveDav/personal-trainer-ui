'use client'

import { motion } from 'motion/react'
import { Skeleton } from '@/components/ui/skeleton'

const ROW_COUNT = 11

export function SessionTableSkeleton() {
  return (
    <>
      {Array.from({ length: ROW_COUNT }).map((_, index) => (
        <motion.tr
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='border-b border-gray-100 last:border-none'
        >
          <td className='px-4 py-5 whitespace-nowrap'>
            <Skeleton className='h-4 w-20' />
          </td>
          <td className='px-4 py-5 whitespace-nowrap'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <div className='flex flex-col gap-1.5'>
                <Skeleton className='h-3.5 w-24' />
                <Skeleton className='h-2.5 w-14' />
              </div>
            </div>
          </td>
          <td className='px-4 py-5 whitespace-nowrap'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <div className='flex flex-col gap-1.5'>
                <Skeleton className='h-3.5 w-24' />
                <Skeleton className='h-2.5 w-14' />
              </div>
            </div>
          </td>
          <td className='px-4 py-5 whitespace-nowrap'>
            <Skeleton className='h-4 w-28' />
          </td>
          <td className='px-4 py-5 whitespace-nowrap'>
            <Skeleton className='h-4 w-12' />
          </td>
          <td className='px-4 py-5 whitespace-nowrap'>
            <Skeleton className='h-6 w-16 rounded-full' />
          </td>
          <td className='px-4 py-5 whitespace-nowrap text-right'>
            <Skeleton className='ml-auto h-8 w-8 rounded-lg' />
          </td>
        </motion.tr>
      ))}
    </>
  )
}
