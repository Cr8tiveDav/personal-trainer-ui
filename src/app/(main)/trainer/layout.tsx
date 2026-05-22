import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { TrainerShell } from '@/components/trainer/TrainerShell'

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
    <TrainerShell userName={userName} userEmail={userEmail}>
      <Suspense>{children}</Suspense>
    </TrainerShell>
  )
}
