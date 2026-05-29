'use client'

import { MoreVertical } from 'lucide-react'
import Image from 'next/image'
import { motion, type Variants } from 'motion/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Session } from './session'

interface RowProps {
  session: Session
  index?: number
  onViewDetails: (id: string) => void
  onReschedule?: (id: string) => void
}

export const sessionRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.06,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

export function SessionTableRow({
  session,
  index = 0,
  onViewDetails,
  onReschedule,
}: RowProps) {
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
    <motion.tr
      variants={sessionRowVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      custom={index}
      className='border-b border-gray-100 text-xs text-[#111111] transition-colors hover:bg-gray-50/50'
    >
      <td className='px-4 py-3.5 text-[11px] font-medium text-gray-400'>
        <span title={`#${session.id}`}>#{formatSessionId(session.id)}</span>
      </td>

      <td className='px-4 py-3.5'>
        <div className='flex items-center gap-2'>
          {session.client.avatar ? (
            <Image
              src={session.client.avatar}
              alt={session.client.name}
              width={28}
              height={28}
              className='h-7 w-7 shrink-0 rounded-[9999px] bg-gray-100 object-cover'
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : (
            <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-[9999px] bg-[#0b4d8d]/10 text-[10px] font-bold uppercase text-[#0b4d8d]'>
              {session.client.name.charAt(0)}
            </div>
          )}
          <div>
            <p className='text-[11px] font-semibold text-[#555]'>{session.client.name}</p>
            <p className='text-[10px] font-medium uppercase tracking-wider text-gray-400'>
              {session.client.country}
            </p>
          </div>
        </div>
      </td>

      <td className='px-4 py-3.5'>
        <div className='flex items-center gap-2'>
          {session.trainer.avatar ? (
            <Image
              src={session.trainer.avatar}
              alt={session.trainer.name}
              width={28}
              height={28}
              className='h-7 w-7 shrink-0 rounded-[9999px] bg-gray-100 object-cover'
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : (
            <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-[9999px] bg-purple-50 text-[10px] font-bold uppercase text-purple-600'>
              {session.trainer.name.charAt(0)}
            </div>
          )}
          <div>
            <p className='text-[11px] font-semibold text-gray-900'>{session.trainer.name}</p>
            <p className='text-[10px] font-medium uppercase tracking-wider text-gray-400'>
              {session.trainer.country}
            </p>
          </div>
        </div>
      </td>

      <td className='px-4 py-3.5 text-[11px] font-medium text-gray-600'>
        {session.scheduled}
      </td>
      <td className='px-4 py-3.5 text-[11px] font-medium text-gray-400'>
        {session.duration}
      </td>

      <td className='px-4 py-3.5'>
        <span
          className={`inline-flex items-center gap-1.5 rounded-[9999px] px-2 py-0.5 text-[11px] font-semibold ${confStyle(session.clientConf)}`}
        >
          {session.clientConf !== 'N/A' && (
            <span className={`h-1.5 w-1.5 rounded-[9999px] ${dotStyle(session.clientConf)}`} />
          )}
          {session.clientConf}
        </span>
      </td>

      <td className='px-4 py-3.5 text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 rounded-[8px] p-0 text-gray-400 shadow-none hover:bg-gray-100/80 hover:text-gray-700 focus:ring-0'
            >
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='z-50 w-40 rounded-[12px] border border-gray-100 bg-white p-1.5 shadow-xl'
          >
            {isClientConfirmed ? (
              <DropdownMenuItem
                onClick={() => onViewDetails(session.id)}
                className='cursor-pointer rounded-[8px] bg-[#0b4d8d] px-3 py-2 text-xs font-semibold text-white focus:bg-[#0b4d8d] focus:text-white'
              >
                View detail
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => onViewDetails(session.id)}
                  className='cursor-pointer rounded-[8px] bg-[#0b4d8d] px-3 py-2 text-xs font-semibold text-white focus:bg-[#0b4d8d] focus:text-white'
                >
                  View detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onReschedule?.(session.id)}
                  className='cursor-pointer rounded-[8px] px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 focus:bg-gray-50'
                >
                  Reschedule
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </motion.tr>
  )
}
