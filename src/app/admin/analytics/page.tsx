import { AnalyticsPageHeader } from '@/components/adminAnalytics/AnalyticsHeader';
import { ConsultationConversion } from '@/components/adminAnalytics/ConsultaionConversion';
import { PerformanceInsights } from '@/components/adminAnalytics/Insights';
import { PlatformPerformance } from '@/components/adminAnalytics/PlatformPerformance';
import { AnalyticsStatsSection } from '@/components/adminAnalytics/StatSection';
import { SubscriptionBreakdown } from '@/components/adminAnalytics/SubscriptionBreakdown';

export default function AnalyticsPage() {
  return (
    <div className='w-full space-y-6 md:px-4 lg:px-10 pb-6'>
      <AnalyticsPageHeader />
      <AnalyticsStatsSection />
      <PerformanceInsights />
      <PlatformPerformance />
      <div className='flex md:flex-row gap-6 flex-col'>
        <ConsultationConversion />
        <SubscriptionBreakdown />
      </div>
    </div>
  );
}
