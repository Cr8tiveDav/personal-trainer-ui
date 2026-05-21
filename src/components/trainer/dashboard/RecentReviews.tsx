import { Review } from './mock-data'
import { Star } from 'lucide-react'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export function RecentReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className='rounded-xl border border-gray-100 bg-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-gray-100 px-5 py-4'>
        <h3 className='text-sm font-semibold text-gray-900'>Recent Reviews</h3>
        <button className='text-xs font-medium text-primary hover:underline'>View all</button>
      </div>
      <div className='divide-y divide-gray-50'>
        {reviews.map((review) => (
          <div key={review.id} className='px-5 py-4'>
            <div className='flex items-start justify-between gap-3 mb-2'>
              <div className='flex items-center gap-2.5'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white'>
                  {review.clientName.charAt(0)}
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>{review.clientName}</p>
                  <p className='text-xs text-gray-400'>{review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className='text-xs text-gray-600 leading-relaxed line-clamp-2'>{review.comment}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className='px-5 py-8 text-center text-sm text-gray-400'>No reviews yet</div>
        )}
      </div>
    </div>
  )
}
