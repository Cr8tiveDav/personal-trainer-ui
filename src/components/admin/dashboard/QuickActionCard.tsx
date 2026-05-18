import Link from 'next/link'
import { UserPlus, Users, Megaphone, BarChart2, LucideIcon, Dumbbell, LineChart } from 'lucide-react'

interface QuickAction {
  label: string
  href: string
  icon: LucideIcon
}

const ACTIONS: QuickAction[] = [
  { label: 'Add Trainer', href: '/admin/trainers/new', icon: Dumbbell },
  { label: 'View Clients', href: '/admin/clients', icon: Users },
  { label: 'Broadcast', href: '/admin/broadcast', icon: Megaphone },
  { label: 'Reports', href: '/admin/analytics', icon: LineChart },
]

export function QuickActions() {
  return (
    <div className='rounded-xl border border-[#E4E2E9] p-5'>
      <h2 className='mb-4 text-base font-semibold text-muted-foreground'>Quick actions</h2>
      <div className='grid grid-cols-2 gap-3'>
        {ACTIONS.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className='flex flex-col items-center bg-[#F7F7F7] justify-center gap-2 rounded-lg border border-[#EBEBEB] py-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary'
          >
            <Icon className='h-5 w-5' />
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}