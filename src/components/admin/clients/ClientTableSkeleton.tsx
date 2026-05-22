'use client'

import { motion } from 'motion/react'
import { Skeleton } from '@/components/ui/skeleton'

export function ClientTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.tr
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='border-b border-gray-50 last:border-none'
        >
          <td className='px-6 py-4'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-40' />
              </div>
            </div>
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-10' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-24' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-16' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-6 w-20 rounded-full' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-8 w-8 rounded-md' />
          </td>
        </motion.tr>
      ))}
    </>
  )
}
