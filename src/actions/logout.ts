'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete('session_token')
  cookieStore.delete('refresh_token')
  cookieStore.delete('user_type')
  cookieStore.delete('user_name')
  cookieStore.delete('user_email')
  cookieStore.delete('user_avatar')

  redirect('/admin/login')
}