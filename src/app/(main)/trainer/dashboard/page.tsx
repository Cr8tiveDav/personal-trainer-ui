import {
  CalendarDays,
  Users,
  DollarSign,
  Dumbbell,
  Star,
} from 'lucide-react'
import { TrainerStatCard } from '@/components/trainer/dashboard/TrainerStatCard'
import { AllSessionsTable } from '@/components/trainer/dashboard/AllSessionsTable'
import { SessionOverviewChart } from '@/components/trainer/dashboard/SessionOverviewChart'
import { UpcomingSessions } from '@/components/trainer/dashboard/UpcomingSessions'
import { RecentReviews } from '@/components/trainer/dashboard/RecentReviews'
import { SetAvailability } from '@/components/trainer/dashboard/SetAvailability'
import {
  mockSessions,
  mockUpcomingSessions,
  mockReviews,
  mockChartData,
  mockStats,
} from '@/components/trainer/dashboard/mock-data'

const STAT_CARDS = [
  {
    title: 'Total Sessions',
    value: mockStats.totalSessions,
    trend: 12,
    isUp: true,
    icon: CalendarDays,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Upcoming Sessions',
    value: mockStats.upcomingSessions,
    trend: 5,
    isUp: true,
    icon: Dumbbell,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    title: 'Revenue Earned',
    value: mockStats.revenueEarned,
    trend: 8,
    isUp: true,
    icon: DollarSign,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    title: 'Active Clients',
    value: mockStats.activeClients,
    trend: 3,
    isUp: false,
    icon: Users,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Total Reviews',
    value: mockStats.totalReviews,
    trend: 18,
    isUp: true,
    icon: Star,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
]

export default function TrainerDashboardPage() {
  return (
    <div className='px-4 pb-6 lg:px-8'>
      <div className='mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-xl font-bold text-gray-900'>Welcome back, Alex 👋</h1>
          <p className='text-sm text-gray-500 mt-0.5'>Here&apos;s what&apos;s happening with your sessions today.</p>
        </div>
        <div className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm w-fit'>
          <CalendarDays className='h-4 w-4 text-gray-400' />
          <span>May 21, 2026</span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-6'>
        {STAT_CARDS.map((card) => (
          <TrainerStatCard key={card.title} {...card} />
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2 flex flex-col gap-6'>
          <AllSessionsTable sessions={mockSessions} />

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <SessionOverviewChart data={mockChartData} />
            <UpcomingSessions sessions={mockUpcomingSessions} />
          </div>

          <RecentReviews reviews={mockReviews} />
        </div>

        <div className='lg:col-span-1'>
          <SetAvailability />
        </div>
      </div>
    </div>
  )
}
