interface AnalyticsStatCardProps {
  label: string
  value: string | number
  subtitle: string
  trend?: string
}

export function AnalyticsStatCard({ label, value, subtitle, trend }: AnalyticsStatCardProps) {
  return (
    <div className='flex flex-col gap-2 rounded-[16px] border border-gray-100 bg-white p-5 shadow-sm'>
      <p className='text-sm text-muted font-semibold'>{label}</p>
      <p className='text-3xl text-muted-foreground font-bold'>{value}</p>
      {trend ? (
        <p className='text-xs font-medium text-green-500'>{trend}</p>
      ) : (
        <p className='text-xs text-muted'>{subtitle}</p>
      )}
    </div>
  )
}