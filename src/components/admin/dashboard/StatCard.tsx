import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  trend?: number;
  isUp?: boolean;
}

export function StatCard({ title, value, trend, isUp = true }: StatCardProps) {
  return (
    <div className='min-h-[130px] rounded-[12px] border border-[#E4E2E9] bg-white p-5'>
      <div className='mb-4 flex items-center justify-between'>
        <h6 className='text-sm text-[#1C1C1C] '>{title}</h6>
        {trend !== undefined && (
          <span
            className={`flex items-center gap-1 rounded-[8px] p-[4px] text-xs font-semibold ${
              isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
            }`}
          >
            {isUp ? (
              <TrendingUp className='h-3 w-3' />
            ) : (
              <TrendingDown className='h-3 w-3' />
            )}
            {trend}%
          </span>
        )}
      </div>
      <p className='text-[28px] font-semibold text-gray-900'>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}
