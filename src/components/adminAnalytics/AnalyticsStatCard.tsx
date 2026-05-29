interface AnalyticsStatCardProps {
  label: string
  value: string | number
  subtitle: string
  trend?: string
}

export function AnalyticsStatCard({ label, value, subtitle, trend }: AnalyticsStatCardProps) {
  return (
    <div className='min-h-[130px] rounded-[12px] border border-[#E4E2E9] bg-white p-5'>
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