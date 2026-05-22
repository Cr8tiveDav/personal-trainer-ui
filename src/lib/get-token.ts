import Cookies from "universal-cookie";
import { siteConfig } from "@/config/site";

const cookies = new Cookies();

const ACCESS_TOKEN_EXPIRY_KEY = "access_token_expires_at";

let cachedToken: string | null = null;

export function invalidateAccessTokenCache() {
  cachedToken = null;
}

export function setAccessTokenExpiry(expiresInSeconds: number) {
  if (typeof window === "undefined") return;
  const expiresAt = Date.now() + expiresInSeconds * 1000;
  sessionStorage.setItem(ACCESS_TOKEN_EXPIRY_KEY, String(expiresAt));
}

export function isAccessTokenExpired(bufferMs = 30_000) {
  if (typeof window === "undefined") return false;
  const raw = sessionStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  if (!raw) return false;
  return Date.now() >= Number(raw) - bufferMs;
}

export function getToken() {
  if (cachedToken) return cachedToken;

  if (typeof window !== "undefined") {
    cachedToken = cookies.get(siteConfig.cookieNames.access_token) || null;
  }

  return cachedToken;
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return cookies.get(siteConfig.cookieNames.refresh_token) || null;
}

export function getCookie(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return cookies.get(key) || null;
}

export function setToken(key: string, value: string, maxAgeSeconds?: number) {
  cookies.set(key, value, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...(maxAgeSeconds
      ? { maxAge: maxAgeSeconds }
      : { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }),
  });

  if (key === siteConfig.cookieNames.access_token) {
    cachedToken = value;
    if (maxAgeSeconds) {
      setAccessTokenExpiry(maxAgeSeconds);
    }
  }
}

export function removeToken(key: string) {
  cookies.remove(key, { path: "/" });

  if (key === siteConfig.cookieNames.access_token) {
    cachedToken = null;
  }
}

export function clearAuthCookies() {
  invalidateAccessTokenCache();
  removeToken(siteConfig.cookieNames.access_token);
  removeToken(siteConfig.cookieNames.refresh_token);
  removeToken(siteConfig.cookieNames.user_type);
  removeToken(siteConfig.cookieNames.email);
  removeToken(siteConfig.cookieNames.user_profile);
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
  }
}

export function logoutUser(loginPath?: string) {
  const resolvedPath =
    loginPath ??
    (getCookie(siteConfig.cookieNames.user_type) === "trainer"
      ? "/trainers/login"
      : "/admin/login");

  clearAuthCookies();
  if (typeof window === "undefined") return;
  window.location.replace(resolvedPath);
}
