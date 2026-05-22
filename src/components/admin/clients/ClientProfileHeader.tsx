import Image from 'next/image'
import { Mail } from 'lucide-react'
import type { Client } from './types'
import { ClientStatusBadge } from './ClientStatusBadge'

function formatRevenue(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

interface ClientProfileHeaderProps {
  client: Client
}

export function ClientProfileHeader({ client }: ClientProfileHeaderProps) {
  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className='relative flex-1 rounded-2xl border border-gray-100 bg-white shadow-sm'>
        <div className='relative h-44 w-full overflow-hidden rounded-t-2xl'>
          <div className='h-full w-full bg-gradient-to-br from-slate-700 to-slate-900' />
          <div className='absolute inset-0 bg-[#181818]/40 backdrop-blur-[4px]' />
          <h2 className='absolute bottom-4 left-[180px] text-xl font-bold text-white drop-shadow'>
            {client.name}
          </h2>
        </div>

        <div className='absolute left-6 top-[112px] z-10'>
          <div className='relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md'>
            {client.avatar ? (
              <Image
                src={client.avatar}
                alt={client.name}
                fill
                sizes='128px'
                className='object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-primary text-3xl font-bold text-white'>
                {client.displayInitial}
              </div>
            )}
          </div>
        </div>

        <div className='rounded-b-2xl px-6 pb-5 pl-[180px] pt-6'>
          <span className='flex items-center gap-2 text-sm text-gray-500'>
            <Mail className='h-3.5 w-3.5 shrink-0' />
            {client.email}
          </span>
        </div>
      </div>

      <div className='w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:w-[280px] lg:shrink-0'>
        <h3 className='mb-5 text-lg font-bold text-gray-900'>Details</h3>
        <dl className='space-y-4'>
          {[
            { label: 'Name', value: client.name },
            { label: 'Email', value: client.email },
            { label: 'Joined', value: client.joinedAt },
            {
              label: 'Sessions booked',
              value: String(client.sessions),
            },
            { label: 'Revenue', value: formatRevenue(client.revenue) },
          ].map(({ label, value }) => (
            <div key={label} className='flex items-center justify-between gap-3'>
              <dt className='text-sm text-gray-400'>{label}</dt>
              <dd className='text-right text-sm font-semibold text-gray-900'>
                {value}
              </dd>
            </div>
          ))}
          <div className='flex items-center justify-between'>
            <dt className='text-sm text-gray-400'>Status</dt>
            <dd>
              <ClientStatusBadge status={client.status} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
