import { AvailabilityTabSkeleton } from '@/components/availability/AvailabilityTabSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function TrainerAvailabilityLoading() {
  return (
    <div className='space-y-6'>
      <div className='mb-6'>
        <Skeleton className='h-7 w-32' />
        <Skeleton className='mt-2 h-4 w-72 max-w-full' />
      </div>
      <AvailabilityTabSkeleton showFullLayout={false} />
    </div>
  )
}
