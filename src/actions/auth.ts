/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { authenticateUser } from '@/lib/services/auth';
import { cookies } from 'next/headers';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const type = formData.get('type') as 'admin' | 'trainer';

  const endpoint =
    type === 'admin' ? '/auth/admin/log-in' : '/api/v1/trainers/login';

  try {
    const result = await authenticateUser({ email, password }, endpoint);

    const cookieStore = await cookies();

    cookieStore.set('session_token', result.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: result.data.expires_in,
    });

    cookieStore.set('refresh_token', result.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    cookieStore.set('user_type', result.data.user.user_type, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
    });

  
    cookieStore.set('user_profile', JSON.stringify(result.data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: result.data.expires_in,
    });

    return {
      success: true,
      redirectTo: type === 'admin' ? '/admin/dashboard' : '/dashboard/trainers',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}