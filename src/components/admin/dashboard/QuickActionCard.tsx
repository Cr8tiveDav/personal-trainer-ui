import Link from 'next/link';
import {
  Users,
  Megaphone,
  LucideIcon,
  Dumbbell,
  LineChart,
} from 'lucide-react';

interface QuickAction {
  label: string;
  href: string;
  icon: LucideIcon;
}

const ACTIONS: QuickAction[] = [
  { label: 'Add Trainer', href: '/admin/trainers/new', icon: Dumbbell },
  { label: 'View Clients', href: '/admin/users', icon: Users },
  { label: 'Broadcast', href: '/admin/media', icon: Megaphone },
  { label: 'Reports', href: '/admin/paymentst', icon: LineChart },
];

export function QuickActions() {
  return (
    <div className='rounded-[12px]  '>
      <h2 className='mb-4 text-[24px] font-semibold text-muted-foreground'>
        Quick actions
      </h2>
      <div className='grid grid-cols-2 gap-3'>
        {ACTIONS.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className='flex flex-col items-center bg-[#F7F7F7] justify-center gap-2 rounded-[8px] border border-[#E4E2E9] py-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary'
          >
            <Icon className='h-5 w-5' />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
