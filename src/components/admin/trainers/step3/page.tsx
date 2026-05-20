'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, KeyRound } from 'lucide-react'
import { cn } from '@/utils'
import { BasicInfoValues } from '../step1/page'

type AccountMethod = 'invitation' | 'temporary_password'

interface Step3Props {
  basicInfo: BasicInfoValues
  hasImage: boolean
  hasVideo: boolean
  isSubmitting: boolean
  onSubmit: (method: AccountMethod, password?: string) => void
}

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%'
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function Step3AccountSetup({ basicInfo, hasImage, hasVideo, isSubmitting, onSubmit }: Step3Props) {
  const [method, setMethod] = useState<AccountMethod>('invitation')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (method === 'temporary_password' && password.length < 8) return
    onSubmit(method, method === 'temporary_password' ? password : undefined)
  }

  return (
    <div className='rounded-lg bg-white p-6'>
      <h2 className='text-base font-semibold text-gray-900'>Account setup</h2>
      <p className='mt-1 mb-6 text-sm text-gray-500'>Choose how this trainer will get access to FitCall.</p>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-6'>
        <button
          type='button'
          onClick={() => setMethod('invitation')}
          className={cn(
            'flex items-start gap-4 rounded-xl border p-4 text-left transition-colors',
            method === 'invitation' ? 'border-[#0b4d8d] bg-[#f4f9fd]' : 'border-gray-200 hover:border-gray-300'
          )}
        >
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors', method === 'invitation' ? 'bg-[#0b4d8d] text-white' : 'bg-gray-100 text-gray-500')}>
            <Mail className='h-5 w-5' />
          </div>
          <div className='flex-1'>
            <p className='text-sm font-semibold text-gray-900'>Send invitation link</p>
            <p className='text-xs text-gray-500 mt-1'>Email a secure setup link. The trainer creates their own password.</p>
          </div>
          <div className={cn('mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border', method === 'invitation' ? 'border-[#7f56d9]' : 'border-gray-300')}>
            {method === 'invitation' && <div className='h-2 w-2 rounded-full bg-[#7f56d9]' />}
          </div>
        </button>

        <button
          type='button'
          onClick={() => setMethod('temporary_password')}
          className={cn(
            'flex items-start gap-4 rounded-xl border p-4 text-left transition-colors',
            method === 'temporary_password' ? 'border-[#0b4d8d] bg-[#f4f9fd]' : 'border-gray-200 hover:border-gray-300'
          )}
        >
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors', method === 'temporary_password' ? 'bg-[#0b4d8d] text-white' : 'bg-gray-100 text-gray-500')}>
            <KeyRound className='h-5 w-5' />
          </div>
          <div className='flex-1'>
            <p className='text-sm font-semibold text-gray-900'>Generate temporary password</p>
            <p className='text-xs text-gray-500 mt-1'>Set a one-time password theyll change on first login.</p>
          </div>
          <div className={cn('mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border', method === 'temporary_password' ? 'border-[#7f56d9]' : 'border-gray-300')}>
            {method === 'temporary_password' && <div className='h-2 w-2 rounded-full bg-[#7f56d9]' />}
          </div>
        </button>
      </div>

      {method === 'temporary_password' && (
        <div className='mb-6'>
          <p className='text-sm font-medium text-muted mb-2'>Temporary password <span className='text-red-500'>*</span></p>
          <div className='relative flex items-center max-w-full rounded-lg overflow-hidden border border-gray-200 bg-white focus-within:border-[#0b4d8d] focus-within:ring-2 focus-within:ring-[#0b4d8d]/10 transition-all'>
            <Input
              type='text'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='flex-1 h-12 border-0 bg-transparent px-4 text-sm text-[#111111] placeholder-[#b0b0b0] outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none'
            />
            <button 
              type='button' 
              onClick={() => setPassword(generatePassword())}
              className='h-12 px-6 bg-[#0b4d8d] hover:bg-[#093e72] text-white text-sm font-medium transition-colors shrink-0'
            >
              Generate
            </button>
          </div>
          <p className='text-xs text-gray-500 mt-1'>Min 8 characters</p>
        </div>
      )}

      <div className='rounded-xl bg-gray-50 p-5 mb-6'>
        <p className='text-sm font-semibold text-muted mb-4'>Summary</p>
        <div className='space-y-3'>
          {[
            { label: 'Name', value: basicInfo.name, format: false },
            { label: 'Email', value: basicInfo.email, format: false },
            { label: 'Specialty', value: basicInfo.specializations?.[0], format: true },
            { label: 'Media', value: `Image ${hasImage ? '✓' : '✗'} · Video ${hasVideo ? '✓' : '✗'}`, format: false },
          ].map(({ label, value, format }) => (
            <div key={label} className='flex items-center justify-between'>
              <p className='text-sm text-gray-500'>{label}</p>
              <p className={cn('text-sm font-medium text-gray-900', format && 'capitalize')}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          type='button'
          onClick={handleSubmit}
          disabled={isSubmitting || (method === 'temporary_password' && password.length < 8)}
          className='flex items-center gap-2 bg-[#0b4d8d] hover:bg-[#093e72] text-white h-11 px-6 rounded-lg font-semibold shadow-none'
        >
          {isSubmitting ? 'Creating trainer...' : 'Create trainer'}
        </Button>
      </div>
    </div>
  )
}