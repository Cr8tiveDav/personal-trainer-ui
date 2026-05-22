'use client'

import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Session } from './session'
import Image from 'next/image'

interface RowProps {
  session: Session
  onViewDetails: (id: string) => void
  onReschedule?: (id: string) => void
}

const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

export function SessionTableRow({ session, onViewDetails, onReschedule }: RowProps) {
  const isClientConfirmed = session.clientConf === 'Yes'

  const confStyle = (val: string) => {
    if (val === 'Yes') return 'bg-[#e7f6ec] text-[#0f973d]'
    if (val === 'Pending') return 'bg-[#fff4e5] text-[#f59e0b]'
    return 'bg-[#f2f4f7] text-[#aaa]'
  }

  const dotStyle = (val: string) => {
    if (val === 'Yes') return 'bg-[#0f973d]'
    if (val === 'Pending') return 'bg-[#f59e0b]'
    return ''
  }

  return (
    <tr className='border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-xs text-[#111111]'>
      <td className='py-3.5 px-4 text-[11px] font-medium text-gray-400'>
        <span title={`#${session.id}`}>#{formatSessionId(session.id)}</span>
      </td>

      <td className='py-3.5 px-4'>
        <div className='flex items-center gap-2'>
          {session.client.avatar ? (
            <Image
              src={session.client.avatar}
              alt={session.client.name}
              width={28}
              height={28}
              className='h-7 w-7 rounded-full object-cover shrink-0 bg-gray-100'
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          ) : (
            <div className='h-7 w-7 rounded-full bg-[#0b4d8d]/10 text-[#0b4d8d] font-bold flex items-center justify-center shrink-0 uppercase text-[10px]'>
              {session.client.name.charAt(0)}
            </div>
          )}
          <div>
            <p className='font-semibold text-[11px] text-[#555]'>{session.client.name}</p>
            <p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider'>{session.client.country}</p>
          </div>
        </div>
      </td>

      <td className='py-3.5 px-4'>
        <div className='flex items-center gap-2'>
          {session.trainer.avatar ? (
            <Image
              src={session.trainer.avatar}
              alt={session.trainer.name}
              width={28}
              height={28}
              className='h-7 w-7 rounded-full object-cover shrink-0 bg-gray-100'
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          ) : (
            <div className='h-7 w-7 rounded-full bg-purple-50 text-purple-600 font-bold flex items-center justify-center shrink-0 uppercase text-[10px]'>
              {session.trainer.name.charAt(0)}
            </div>
          )}
          <div>
            <p className='font-semibold text-[11px] text-gray-900'>{session.trainer.name}</p>
            <p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider'>{session.trainer.country}</p>
          </div>
        </div>
      </td>

      <td className='py-3.5 px-4 text-[11px] font-medium text-gray-600'>
        {session.scheduled}
      </td>
      <td className='py-3.5 px-4 text-[11px] font-medium text-gray-400'>
        {session.duration}
      </td>

      <td className='py-3.5 px-4'>
        <span className={`inline-flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded-full text-[11px] ${confStyle(session.clientConf)}`}>
          {session.clientConf !== 'N/A' && (
            <span className={`h-1.5 w-1.5 rounded-full ${dotStyle(session.clientConf)}`} />
          )}
          {session.clientConf}
        </span>
      </td>

      <td className='py-3.5 px-4 text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0 text-gray-400 hover:text-gray-700 focus:ring-0 shadow-none hover:bg-gray-100/80 rounded-lg'
            >
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-40 rounded-xl p-1.5 border border-gray-100 shadow-xl bg-white z-50'
          >
            {isClientConfirmed ? (
              <DropdownMenuItem
                onClick={() => onViewDetails(session.id)}
                className='rounded-lg px-3 py-2 text-xs font-semibold text-white bg-[#0b4d8d] cursor-pointer focus:bg-[#0b4d8d] focus:text-white'
              >
                View detail
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => onViewDetails(session.id)}
                  className='rounded-lg px-3 py-2 text-xs font-semibold text-white bg-[#0b4d8d] cursor-pointer focus:bg-[#0b4d8d] focus:text-white'
                >
                  View detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onReschedule?.(session.id)}
                  className='rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
                >
                  Reschedule
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}
