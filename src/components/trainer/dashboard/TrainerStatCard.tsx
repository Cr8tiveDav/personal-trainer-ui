interface TrainerStatCardProps {
  title: string
  value: string | number
  subtext?: string
  subtextPositive?: boolean
  stars?: number
  reviewCount?: number
}

export function TrainerStatCard({
  title,
  value,
  subtext,
  subtextPositive = true,
  stars,
  reviewCount,
}: TrainerStatCardProps) {
  return (
    <div className='rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm'>
      <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
        {title}
      </p>
      <div className='mt-2 flex items-end gap-2'>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
        {stars !== undefined ? (
          <div className='mb-0.5 flex items-center gap-0.5'>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < Math.round(stars) ? 'text-amber-400' : 'text-gray-200'}`}
              >
                ★
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {subtext ? (
        <p
          className={`mt-1 text-xs font-medium ${
            subtextPositive ? 'text-emerald-600' : 'text-gray-500'
          }`}
        >
          {subtext}
        </p>
      ) : null}
      {reviewCount !== undefined ? (
        <p className='mt-0.5 text-xs text-gray-400'>({reviewCount})</p>
      ) : null}
    </div>
  )
}
