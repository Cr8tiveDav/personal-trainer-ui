import Link from 'next/link'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AnalyticsPageHeader() {
  return (
    <div className='flex md:flex-row flex-col items-start justify-between'>
      <div>
        <h1 className='text-xl font-bold text-muted-foreground'>Analytics & Reports</h1>
        <p className='mt-1 text-base text-muted'>
          Monitor platform performance, subscriptions, and trainer outcomes.
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <Button variant='outline' className='flex items-center gap-2' asChild>
          <Link href='/admin/analytics/export-csv'>
            Export CSV
          </Link>
        </Button>
        <Button className='flex items-center gap-2' asChild>
          <Link href='/admin/analytics/export-report'>
            <Download className='h-4 w-4' />
            Export Report
          </Link>
        </Button>
      </div>
    </div>
  )
}