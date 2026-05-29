import Link from 'next/link'
import { Star } from 'lucide-react'
import type { Review } from './types'
import { Skeleton } from '@/components/ui/skeleton'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { cn } from '@/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export function RecentReviews({
  reviews,
  isLoading = false,
  isError = false,
  className,
}: {
  reviews: Review[]
  isLoading?: boolean
  isError?: boolean
  className?: string
}) {
  const featured = reviews[0]

  return (
    <div
      className={cn(
        'flex h-full  flex-col rounded-[12px] border border-gray-100 bg-white shadow-sm',
        className,
      )}
    >
      <div className='flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4'>
        <h3 className='text-sm font-semibold text-gray-900'>Recent Reviews</h3>
        <Link
          href='/trainer/reviews'
          className='text-xs font-medium text-primary hover:underline'
        >
          View all reviews →
        </Link>
      </div>

      <div className='flex pb-24 min-h-0 flex-1 flex-col overflow-y-auto'>
      {isLoading ? (
        <div className='flex flex-1 flex-col justify-center space-y-2 px-5 py-4'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-16 w-full' />
        </div>
      ) : isError ? (
        <div className='flex flex-1 items-center justify-center px-5 py-8 text-center text-sm text-red-500'>
          Could not load reviews. Please try again.
        </div>
      ) : !featured ? (
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.reviews}
          imageAlt='No reviews'
          title='No reviews yet'
          description='Client feedback and ratings will show up here after completed sessions.'
          className='flex-1 py-6'
        />
      ) : (
        <div className='flex flex-1 flex-col px-5 py-4'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex items-center gap-2.5'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-[9999px] bg-primary text-xs font-semibold text-white'>
                {featured.clientName.charAt(0)}
              </div>
              <div>
                <p className='text-sm font-semibold text-gray-900'>{featured.clientName}</p>
                <StarRating rating={featured.rating} />
              </div>
            </div>
            <p className='shrink-0 text-xs text-gray-400'>{featured.date}</p>
          </div>
          <p className='mt-3 text-sm leading-relaxed text-gray-600'>{featured.comment}</p>
        </div>
      )}
      </div>
    </div>
  )
}
