/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { authenticateUser } from '@/lib/services/auth';
import { cookies } from 'next/headers';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const type = formData.get('type') as 'admin' | 'trainer';

  const endpoint =
    type === 'admin' ? '/auth/admin/log-in' : '/auth/login';

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
      maxAge: 7 * 24 * 60 * 60,
    });

    const userType = result.data.user.user_type;

    if (!userType) {
      throw new Error('User type is missing from API response');
    }

    cookieStore.set('user_type', userType, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
    });

    const userProfile = {
      name: result.data.user?.name ?? '',
      email: result.data.user?.email ?? '',
      avatar_url: result.data.user?.avatar_url ?? null,
    };

    cookieStore.set('user_profile', JSON.stringify(userProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: result.data.expires_in,
    });

    return {
      success: true,
      redirectTo: userType === 'trainer' ? '/trainer/dashboard' : '/admin/dashboard',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
