import { DashboardGreeting } from "@/components/admin/dashboard/DashboardGreeting";
import { LatestPayment } from "@/components/admin/dashboard/LatestPatment";
import { QuickActions } from "@/components/admin/dashboard/QuickActionCard";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";
import { RevenueSnapshot } from "@/components/admin/dashboard/RevenueSnapShot";
import { StatCardsSection } from "@/components/admin/dashboard/StatSection";
import { TopTrainers } from "@/components/admin/dashboard/TopTrainers/TopTrainers";

export default function AdminDashboardPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6 px-4 pb-6">
      <DashboardGreeting />
      <StatCardsSection />

      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-[400px] shrink-0 space-y-6 bg-white rounded-xl border border-gray-100 p-6 shadow-sm'>
          <QuickActions />
          <LatestPayment />
        </div>
        <div className='flex-1 min-w-0'>
          <RecentActivity />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='flex-1 min-w-0'>
          <TopTrainers />
        </div>
        <div className='w-full lg:w-[400px] shrink-0'>
          <RevenueSnapshot />
        </div>
      </div>
    </div>
  )
}