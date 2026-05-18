import { AdminShell } from '@/components/admin/dashboard/AdminShell'
import { cookies } from 'next/headers'
 

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const userName = cookieStore.get('user_name')?.value ?? 'Admin'
  const userEmail = cookieStore.get('user_email')?.value ?? ''
  const userAvatar = cookieStore.get('user_avatar')?.value

  return (
    <AdminShell userName={userName} userEmail={userEmail} userAvatar={userAvatar}>
      {children}
    </AdminShell>
  )
}