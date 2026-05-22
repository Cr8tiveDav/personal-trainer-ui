import { API_ENDPOINTS } from "@/api/api-endpoints";
import { cookies } from "next/headers";
import { apiUrl, getApiBaseUrl } from "@/lib/api/config";

type RefreshResponse = {
  data?: {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
};

async function refreshAccessToken(
  refreshToken: string,
  expiredAccessToken: string | null,
): Promise<string | null> {
  const res = await fetch(apiUrl(API_ENDPOINTS.AUTH.REFRESH), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({
      access_token: expiredAccessToken ?? "",
    }),
  });

  if (!res.ok) return null;

  const newTokens = (await res.json()) as RefreshResponse;
  const sessionToken =
    newTokens.data?.access_token ?? newTokens.access_token ?? null;
  const newRefreshToken =
    newTokens.data?.refresh_token ?? newTokens.refresh_token ?? null;

  if (!sessionToken) return null;

  const cookieStore = await cookies();
  const maxAge =
    newTokens.data?.expires_in ?? newTokens.expires_in ?? 3600;

  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  cookieStore.set("access_token", sessionToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  if (newRefreshToken) {
    cookieStore.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  return sessionToken;
}

export async function refreshSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const expiredAccessToken = cookieStore.get("session_token")?.value ?? null;
  if (!refreshToken) return null;
  return refreshAccessToken(refreshToken, expiredAccessToken);
}

export async function getAccessToken(): Promise<string | null> {
  getApiBaseUrl();

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value ?? null;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (sessionToken) return sessionToken;

  if (!refreshToken) return null;

  return refreshAccessToken(refreshToken, null);
}

export async function authenticatedFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  let token = await getAccessToken();

  const doFetch = () => {
    const headers = new Headers(init.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return fetch(apiUrl(path), { ...init, headers });
  };

  let res = await doFetch();

  if (res.status === 401) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const expiredAccessToken = token;

    if (refreshToken) {
      token = await refreshAccessToken(refreshToken, expiredAccessToken);
      if (token) res = await doFetch();
    }
  }

  return res;
}
