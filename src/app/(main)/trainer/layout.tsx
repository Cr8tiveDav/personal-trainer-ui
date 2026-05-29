import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { TrainerShell } from '@/components/trainer/TrainerShell'
import { TrainerAuthGuard } from '@/components/trainer/TrainerAuthGuard'

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const profileCookie = cookieStore.get('user_profile')?.value

  let userName = 'Trainer'
  let userEmail = ''

  if (profileCookie) {
    try {
      const user = JSON.parse(profileCookie)
      userName = user.name || userName
      userEmail = user.email || userEmail
    } catch {
      // ignore parse errors
    }
  }

  return (
    <TrainerAuthGuard>
      <TrainerShell userName={userName} userEmail={userEmail}>
        <Suspense>{children}</Suspense>
      </TrainerShell>
    </TrainerAuthGuard>
  )
}
