import { Users, UserX, CalendarCheck, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Active clients', value: 10, icon: Users, iconColor: 'text-blue-500', iconBg: 'bg-blue-50' },
  { label: 'Inactive client', value: 1, icon: UserX, iconColor: 'text-red-400', iconBg: 'bg-red-50' },
  { label: 'Sessions booked', value: '1,949', icon: CalendarCheck, iconColor: 'text-green-500', iconBg: 'bg-green-50' },
  { label: 'Revenue generated', value: '$172.5k', icon: TrendingUp, iconColor: 'text-purple-500', iconBg: 'bg-purple-50' },
]

export function ClientStatCards() {
  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'
          >
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconBg}`}>
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
            <p className='mt-1 text-sm text-gray-500'>{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
