import { notFound } from 'next/navigation'
import { SetPassword } from '@/components/auth/SetPassword'

type Props = {
  searchParams: Promise<{ token?: string }>
}

export default async function SetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams

  // Token must be present — it comes from the invite deep link email
  if (!token) {
    notFound()
  }

  return <SetPassword token={token} />
}
