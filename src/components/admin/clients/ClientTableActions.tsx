'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useDeleteClient } from '@/api/clients'
import type { Client } from './types'
import { EditClientDialog } from './EditClientDialog'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ClientTableActionsProps = {
  client: Client
}

export function ClientTableActions({ client }: ClientTableActionsProps) {
  const router = useRouter()
  const deleteClient = useDeleteClient()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  function goToDetail() {
    router.push(`/admin/users/${client.id}`)
  }

  function handleDelete() {
    deleteClient.mutate(client.id, {
      onSuccess: () => setDeleteOpen(false),
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type='button'
            variant='ghost'
            onClick={(e) => e.stopPropagation()}
            className='h-8 w-8 p-0 text-gray-400 hover:text-gray-700 focus:ring-0 shadow-none hover:bg-gray-100 rounded-full'
          >
            <MoreVertical className='h-4 w-4' />
            <span className='sr-only'>Client actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          onClick={(e) => e.stopPropagation()}
          className='w-44 rounded-xl p-1.5 border border-gray-100 shadow-xl bg-white z-50'
        >
          <DropdownMenuItem
            onSelect={() => goToDetail()}
            className='rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900'
          >
            <Eye className='h-3.5 w-3.5' />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setEditOpen(true)}
            className='rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900'
          >
            <Pencil className='h-3.5 w-3.5' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator className='my-1 border-gray-100' />
          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            className='rounded-lg px-3 py-2 text-xs font-semibold text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:text-red-700 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700'
          >
            <Trash2 className='h-3.5 w-3.5' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditClientDialog client={client} open={editOpen} onOpenChange={setEditOpen} />

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent
          className='bg-white'
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>Delete client?</DialogTitle>
            <DialogDescription>
              This permanently removes {client.name} from the platform. This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='gap-2 sm:gap-0'>
            <Button
              type='button'
              variant='outline'
              className='mt-0'
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type='button'
              variant='destructive'
              className='mt-0'
              disabled={deleteClient.isPending}
              onClick={handleDelete}
            >
              {deleteClient.isPending ? 'Deleting…' : 'Delete client'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
