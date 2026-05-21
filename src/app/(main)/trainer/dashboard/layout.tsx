import { Suspense } from 'react'
import { TrainerShell } from '@/components/trainer/TrainerShell'

export default function TrainerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TrainerShell
      userName='Alex Morgan'
      userEmail='alex.morgan@fitcall.com'
    >
      <Suspense>{children}</Suspense>
    </TrainerShell>
  )
}
