'use client'

import { MoreVertical} from 'lucide-react'
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
  onCancel?: (id: string) => void
}

export function SessionTableRow({ session, onViewDetails, onReschedule, onCancel }: RowProps) {
  const isCompletedActionLayout = ['Completed', 'Settled', 'Disputed', 'Missed'].includes(session.state)

  const stateStyles: Record<Session['state'], string> = {
    Completed: 'bg-[#e7f6ec] text-[#0f973d]',
    Unconfirmed: 'bg-[#fff4e5] text-[#f59e0b]',
    Scheduled: 'bg-[#eff8ff] text-[#175cd3]',
    Settled: 'bg-[#e7f6ec] text-[#0f973d]',
    Disputed: 'bg-[#fef3f2] text-[#d92d20]',
    Missed: 'bg-[#f2f4f7] text-[#475467]',
  }

  return (
    <tr className='border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-xs text-[#111111]'>
      <td className='py-4 px-4 font-medium text-gray-500'>#{session.id}</td>
      
      {/* Client Identity Block with Dynamic Avatar Render */}
      <td className='py-4 px-4'>
        <div className='flex items-center gap-2'>
          {session.client.avatar ? (
            <img 
              src={session.client.avatar} 
              alt={session.client.name}
              className='h-7 w-7 rounded-full object-cover shrink-0 bg-gray-100'
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : (
            <div className='h-7 w-7 rounded-full bg-[#0b4d8d]/10 text-[#0b4d8d] font-bold flex items-center justify-center shrink-0 uppercase text-[10px]'>
              {session.client.name.charAt(0)}
            </div>
          )}
          <div>
            <p className='font-semibold text-gray-900'>{session.client.name}</p>
            <p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider'>{session.client.country}</p>
          </div>
        </div>
      </td>

      {/* Trainer Identity Block with Dynamic Avatar Render */}
      <td className='py-4 px-4'>
        <div className='flex items-center gap-2'>
          {session.trainer.avatar ? (
            <Image
              src={session.trainer.avatar} 
              alt={session.trainer.name}
              width={10}
              height={10}
              className='h-7 w-7 rounded-full object-cover shrink-0 bg-gray-100'
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : (
            <div className='h-7 w-7 rounded-full bg-purple-50 text-purple-600 font-bold flex items-center justify-center shrink-0 uppercase text-[10px]'>
              {session.trainer.name.charAt(0)}
            </div>
          )}
          <div>
            <p className='font-semibold text-gray-900'>{session.trainer.name}</p>
            <p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider'>{session.trainer.country}</p>
          </div>
        </div>
      </td>

      <td className='py-4 px-4'>
        <span className='inline-flex items-center justify-center rounded-md border border-gray-200 px-2 py-0.5 font-medium text-gray-600 bg-white text-[11px]'>
          {session.type}
        </span>
      </td>
      
      <td className='py-4 px-4 font-medium text-gray-600'>{session.scheduled}</td>
      <td className='py-4 px-4 text-gray-500 font-medium'>{session.duration}</td>
      <td className='py-4 px-4 font-semibold text-gray-900'>${session.amount}</td>
      
      <td className='py-4 px-4'>
        <span className={`inline-flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded-full text-[11px] ${
          session.clientConf === 'Yes' ? 'bg-[#e7f6ec] text-[#0f973d]' : session.clientConf === 'Pending' ? 'bg-[#fff4e5] text-[#f59e0b]' : 'bg-gray-100 text-gray-400'
        }`}>
          {session.clientConf !== 'N/A' && <span className={`h-1.5 w-1.5 rounded-full ${session.clientConf === 'Yes' ? 'bg-[#0f973d]' : 'bg-[#f59e0b]'}`} />}
          {session.clientConf === 'Yes' ? 'Confirmed' : session.clientConf}
        </span>
      </td>

      <td className='py-4 px-4'>
        <span className={`inline-flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded-full text-[11px] ${
          session.trainerConf === 'Yes' ? 'bg-[#e7f6ec] text-[#0f973d]' : session.trainerConf === 'Pending' ? 'bg-[#fff4e5] text-[#f59e0b]' : 'bg-gray-100 text-gray-400'
        }`}>
          {session.trainerConf !== 'N/A' && <span className={`h-1.5 w-1.5 rounded-full ${session.trainerConf === 'Yes' ? 'bg-[#0f973d]' : 'bg-[#f59e0b]'}`} />}
          {session.trainerConf === 'Yes' ? 'Confirmed' : session.trainerConf}
        </span>
      </td>

      <td className='py-4 px-4'>
        <span className={`inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-[11px] font-bold ${stateStyles[session.state]}`}>
          {session.state}
        </span>
      </td>

      <td className='py-4 px-4 text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 text-gray-400 hover:text-gray-900 focus:ring-0 shadow-none hover:bg-gray-100/80 rounded-lg'>
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-40 rounded-xl p-1.5 border-gray-100 shadow-xl bg-white z-50 animate-in fade-in zoom-in-95 duration-100'>
            {isCompletedActionLayout ? (
              <DropdownMenuItem 
                onClick={() => onViewDetails(session.id)}
                className='flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-white bg-primary cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
              >
                
                View detail
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem 
                  onClick={() => onViewDetails(session.id)}
                 className='flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-white bg-primary cursor-pointer'
                >
                  
                  View detail
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onReschedule?.(session.id)}
                  className='flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-muted cursor-pointer'
                >
                 
                  Reschedule
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onCancel?.(session.id)}
                  className='flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:text-red-700'
                >
                
                  Cancel session
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}