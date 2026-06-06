import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { TrainerShell } from '@/components/trainer/TrainerShell'
import { TrainerAuthGuard } from '@/components/trainer/TrainerAuthGuard'
import { isValidImageSrc } from '@/lib/utils'

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const profileCookie = cookieStore.get('user_profile')?.value

  let userName = 'Trainer'
  let userEmail = ''
  let userAvatar: string | undefined = undefined

  if (profileCookie) {
    try {
      const user = JSON.parse(profileCookie)
      userName = user.name || userName
      userEmail = user.email || userEmail
      userAvatar = isValidImageSrc(user.avatar_url) ? user.avatar_url : undefined
    } catch {
      // ignore parse errors
    }
  }

  return (
    <TrainerAuthGuard>
      <TrainerShell userName={userName} userEmail={userEmail} userAvatar={userAvatar}>
        <Suspense>{children}</Suspense>
      </TrainerShell>
    </TrainerAuthGuard>
  )
}
