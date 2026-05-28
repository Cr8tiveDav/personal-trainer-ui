import { DashboardGreeting } from '@/components/admin/dashboard/DashboardGreeting';
import { LatestPayment } from '@/components/admin/dashboard/LatestPatment';
import { QuickActions } from '@/components/admin/dashboard/QuickActionCard';
import { RecentActivity } from '@/components/admin/dashboard/RecentActivity';
import { RevenueSnapshot } from '@/components/admin/dashboard/RevenueSnapShot';
import { StatCardsSection } from '@/components/admin/dashboard/StatSection';
import { TopTrainers } from '@/components/admin/dashboard/TopTrainers/TopTrainers';

export default function AdminDashboardPage() {
  return (
    <div className='w-full space-y-6 md:px-4 pb-6 lg:px-10'>
      <DashboardGreeting />
      <StatCardsSection />

      <div className='flex flex-col gap-6 lg:flex-row'>
        <div className='w-full shrink-0 space-y-6 rounded-[12px] border border-[#E4E2E9] bg-white p-6 lg:w-[400px]'>
          <QuickActions />
          <LatestPayment />
        </div>
        <div className='min-w-0 flex-1'>
          <RecentActivity />
        </div>
      </div>

      <div className='flex flex-col gap-6 lg:flex-row'>
        <div className='min-w-0 flex-1'>
          <TopTrainers />
        </div>
        <div className='w-full shrink-0 lg:w-[400px]'>
          <RevenueSnapshot />
        </div>
      </div>
    </div>
  );
}
