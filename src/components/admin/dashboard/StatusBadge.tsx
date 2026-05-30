import { cn } from '~/utils';

interface StatusBadgeProps {
  type: string;
}

const TYPE_STYLES: Record<string, string> = {
  booking_completed: 'border border-[#2EA83A] text-[#1E7829] bg-[#1E78291A]',
  booking_rescheduled:
    'border border-[#D48A0C3D] text-[#D48A0C] bg-[#D48A0C1A]',
  booking_created: 'border border-[#2EA83A] text-[#1E7829] bg-[#1E78291A]',
  booking_cancelled: 'border border-[#C42D2B3D] text-[#C42D2B] bg-[#C42D2B1A]',
};

const TYPE_LABELS: Record<string, string> = {
  booking_completed: 'Completed',
  booking_rescheduled: 'Unconfirmed',
  booking_created: 'Settled',
  booking_cancelled: 'Disputed',
};

export function StatusBadge({ type }: StatusBadgeProps) {
  const styleClass =
    TYPE_STYLES[type] || 'border border-gray-300 text-gray-500 bg-gray-50/10';
  const label =
    TYPE_LABELS[type] ||
    type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={cn(
        'rounded-[9999px] h-6.5 px-2 py-1 text-xs font-medium whitespace-nowrap tracking-wide select-none',
        styleClass
      )}
    >
      {label}
    </span>
  );
}
