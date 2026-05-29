'use server';

import { cookies } from 'next/headers';
import { refreshSessionToken, type RefreshActionResult } from '@/lib/services/auth-session';

/**
 * Server Action that securely reads httpOnly cookies on the server,
 * calls the refresh endpoint, and returns the new session token details.
 */
export async function refreshSessionAction(): Promise<RefreshActionResult> {
  return await refreshSessionToken();
}

/**
 * Server Action to securely set httpOnly auth cookies on the server during login.
 */
export async function loginSessionAction(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("session_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  cookieStore.set("access_token", accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  cookieStore.set("has_refresh_token", "true", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}
