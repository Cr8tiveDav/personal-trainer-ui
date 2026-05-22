'use client'

import { useState } from 'react'
import { useUpdateClient } from '@/api/clients'
import type { Client } from './types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type EditClientDialogProps = {
  client: Client
  open: boolean
  onOpenChange: (open: boolean) => void
}

function clientToFormState(client: Client) {
  return {
    name: client.name === '—' ? '' : client.name,
    email: client.email === '—' ? '' : client.email,
    isActive: client.status === 'Active',
  }
}

function EditClientDialogForm({
  client,
  onOpenChange,
}: {
  client: Client
  onOpenChange: (open: boolean) => void
}) {
  const updateClient = useUpdateClient()
  const initial = clientToFormState(client)
  const [name, setName] = useState(initial.name)
  const [email, setEmail] = useState(initial.email)
  const [isActive, setIsActive] = useState(initial.isActive)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateClient.mutate(
      {
        id: client.id,
        payload: {
          name: name.trim(),
          email: email.trim(),
          is_active: isActive,
        },
      },
      { onSuccess: () => onOpenChange(false) },
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Edit client</DialogTitle>
        <DialogDescription>
          Update client details. Changes apply immediately.
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid gap-2'>
          <label htmlFor='client-name' className='text-sm font-medium text-gray-700'>
            Name
          </label>
          <Input
            id='client-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Client name'
          />
        </div>
        <div className='grid gap-2'>
          <label htmlFor='client-email' className='text-sm font-medium text-gray-700'>
            Email
          </label>
          <Input
            id='client-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='client@email.com'
            required
          />
        </div>
        <div className='grid gap-2'>
          <label htmlFor='client-status' className='text-sm font-medium text-gray-700'>
            Status
          </label>
          <Select
            value={isActive ? 'active' : 'inactive'}
            onValueChange={(value) => setIsActive(value === 'active')}
          >
            <SelectTrigger id='client-status'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className='gap-2 sm:gap-0'>
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
          className='mt-0'
          disabled={updateClient.isPending || !email.trim()}
        >
          {updateClient.isPending ? 'Saving…' : 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function EditClientDialog({
  client,
  open,
  onOpenChange,
}: EditClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-white' onClick={(e) => e.stopPropagation()}>
        {open ? (
          <EditClientDialogForm
            key={client.id}
            client={client}
            onOpenChange={onOpenChange}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
