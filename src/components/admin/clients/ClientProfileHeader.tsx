import Image from 'next/image'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import type { ClientDetail } from './mock-data'
import { ClientStatusBadge } from './ClientStatusBadge'

interface ClientProfileHeaderProps {
  client: ClientDetail
}

export function ClientProfileHeader({ client }: ClientProfileHeaderProps) {
  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className='relative flex-1 rounded-2xl border border-gray-100 bg-white shadow-sm'>

        {/* Banner */}
        <div className='relative h-44 w-full overflow-hidden rounded-t-2xl'>
          {client.banner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={client.banner} alt='Profile banner' className='h-full w-full object-cover' />
          ) : (
            <div className='h-full w-full bg-gradient-to-br from-slate-700 to-slate-900' />
          )}
          <div className='absolute inset-0 bg-[#181818]/40 backdrop-blur-[4px]' />
          <h2 className='absolute bottom-4 left-[180px] text-xl font-bold text-white drop-shadow'>
            {client.name}
          </h2>
        </div>

        {/* Avatar — overlaps banner and contact section */}
        <div className='absolute left-6 top-[112px] z-10'>
          <div className='relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md'>
            {client.avatar ? (
              <Image src={client.avatar} alt={client.name} fill sizes='128px' className='object-cover' />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-primary text-3xl font-bold text-white'>
                {client.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Contact row */}
        <div className='flex items-center justify-between rounded-b-2xl px-6 pb-5 pl-[180px] pt-6'>
          <div className='flex flex-col gap-2 text-sm text-gray-500'>
            <span className='flex items-center gap-2'>
              <Mail className='h-3.5 w-3.5 shrink-0' />
              {client.email}
            </span>
            <span className='flex items-center gap-2'>
              <Phone className='h-3.5 w-3.5 shrink-0' />
              {client.phone}
            </span>
          </div>
          <button className='flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            <MessageCircle className='h-4 w-4' />
            Message
          </button>
        </div>
      </div>

      {/* Details panel */}
      <div className='w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:w-[280px] lg:shrink-0'>
        <h3 className='mb-5 text-lg font-bold text-gray-900'>Details</h3>
        <dl className='space-y-4'>
          {[
            { label: 'Name', value: client.name },
            { label: 'Age', value: `${client.age} years` },
            { label: 'Gender', value: client.gender },
            { label: 'Email', value: client.email },
          ].map(({ label, value }) => (
            <div key={label} className='flex items-center justify-between'>
              <dt className='text-sm text-gray-400'>{label}</dt>
              <dd className='text-sm font-semibold text-gray-900'>{value}</dd>
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
