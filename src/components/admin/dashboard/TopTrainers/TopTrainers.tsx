'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Trainer, TrainerRow } from './TrainerRow'


async function fetchTopTrainers(): Promise<Trainer[]> {
  const res = await fetch('/api/v1/trainers/rankings')
  if (!res.ok) throw new Error('Failed to fetch trainers')
  const data = await res.json()
  return data.data
}

export function TopTrainers() {
  const { data: trainers } = useQuery({
    queryKey: ['top-trainers'],
    queryFn: fetchTopTrainers,
  })

  const list = trainers ?? []

  return (
    <div className='flex-1 rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-base font-semibold text-gray-900'>Top trainers this month</h2>
        <Link href='/admin/trainers' className='text-sm font-medium text-primary hover:underline'>
          View all
        </Link>
      </div>

      {list.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-10'>
          <p className='text-sm text-gray-400'>No trainer data yet</p>
        </div>
      ) : (
        <div className='divide-y divide-gray-50'>
          {list.map((trainer) => (
            <TrainerRow key={trainer.rank} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  )
}