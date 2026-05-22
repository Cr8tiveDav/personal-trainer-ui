'use client'

import { motion } from 'motion/react'
import { trainerRowVariants } from '@/components/admin/trainers/trainers-list/table/TrainerTableRow'
import type { Client } from './types'
import { ClientStatusBadge } from './ClientStatusBadge'
import { ClientTableActions } from './ClientTableActions'

interface ClientTableRowProps {
  client: Client
  index?: number
}

function formatRevenue(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ClientTableRow({ client, index = 0 }: ClientTableRowProps) {
  return (
    <motion.tr
      variants={trainerRowVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      custom={index}
      className='group border-b border-gray-50'
    >
      <td className='px-6 py-4 transition-colors group-hover:bg-gray-50/80'>
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white'>
            {client.displayInitial}
          </div>
          <div>
            <p className='text-sm font-medium text-gray-900'>{client.name}</p>
            <p className='text-xs text-gray-400'>{client.email}</p>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 text-sm text-gray-700 transition-colors group-hover:bg-gray-50/80'>
        {client.sessions}
      </td>
      <td className='px-6 py-4 text-sm text-gray-500 transition-colors group-hover:bg-gray-50/80'>
        {client.joinedAt}
      </td>
      <td className='px-6 py-4 text-sm font-medium text-gray-900 transition-colors group-hover:bg-gray-50/80'>
        {formatRevenue(client.revenue)}
      </td>
      <td className='px-6 py-4 transition-colors group-hover:bg-gray-50/80'>
        <ClientStatusBadge status={client.status} />
      </td>
      <td className='px-6 py-4 transition-colors group-hover:bg-gray-50/80'>
        <ClientTableActions client={client} />
      </td>
    </motion.tr>
  )
}
