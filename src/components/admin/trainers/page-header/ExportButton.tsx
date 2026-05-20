import { Button } from '@/components/ui/button'
import React from 'react'

interface ExportButtonProps {
  onExport?: () => void
}

const ExportButton = ({ onExport }: ExportButtonProps) => {
  return (
    <Button
      size='lg'
      variant='outline'
      onClick={onExport}
      className='h-12 w-32.5 py-3 px-4.5 text-base text-muted-foreground font-semibold border border-[#A3A3A3] rounded-md cursor-pointer'
    >
      Export CSV
    </Button>
  )
}

export default ExportButton