'use client'

import { useState } from 'react'
import { TRAINER_ONBOARDING_STATUSES } from '@/api/types/trainers'
import { useUpdateTrainer } from '@/api/trainers'
import type { Trainer } from '@/components/admin/trainers/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  suspended: 'Suspended',
}

function normalizeStatus(status: string | undefined): string {
  const value = status?.toLowerCase() || 'pending'
  if (value === 'active') return 'approved'
  if (
    TRAINER_ONBOARDING_STATUSES.includes(
      value as (typeof TRAINER_ONBOARDING_STATUSES)[number],
    )
  ) {
    return value
  }
  return 'pending'
}

type EditTrainerDialogProps = {
  trainer: Trainer
  open: boolean
  onOpenChange: (open: boolean) => void
}

function EditTrainerDialogForm({
  trainer,
  onOpenChange,
}: {
  trainer: Trainer
  onOpenChange: (open: boolean) => void
}) {
  const updateTrainer = useUpdateTrainer(trainer.id)
  const [status, setStatus] = useState(() =>
    normalizeStatus(trainer.onboardingStatus),
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateTrainer.mutate(
      { onboarding_status: status },
      { onSuccess: () => onOpenChange(false) },
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='mb-1.5 block text-sm font-medium text-gray-900'>
          Status
        </label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className='login-input h-11'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            {TRAINER_ONBOARDING_STATUSES.map((value) => (
              <SelectItem key={value} value={value}>
                {STATUS_LABELS[value] ?? value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DialogFooter className='gap-2 pt-2 sm:gap-0'>
        <Button
          type='button'
          variant='outline'
          className='mt-0'
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          className='mt-0 bg-[#0b4d8d] hover:bg-[#093d73]'
          disabled={updateTrainer.isPending}
        >
          {updateTrainer.isPending ? 'Saving…' : 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function EditTrainerDialog({
  trainer,
  open,
  onOpenChange,
}: EditTrainerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='max-h-[90vh] overflow-y-auto bg-white sm:max-w-md'
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Edit trainer</DialogTitle>
          <DialogDescription>
            Update status for {trainer.name}.
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <EditTrainerDialogForm
            key={trainer.id}
            trainer={trainer}
            onOpenChange={onOpenChange}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
