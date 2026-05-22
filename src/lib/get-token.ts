import Cookies from "universal-cookie";
import { siteConfig } from "@/config/site";

const cookies = new Cookies();

let cachedToken: string | null = null;

export function getToken() {
  if (cachedToken) return cachedToken;

  if (typeof window !== "undefined") {
    cachedToken = cookies.get(siteConfig.cookieNames.access_token) || null;
  }

  return cachedToken;
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
  }
}

export function removeToken(key: string) {
  cookies.remove(key, { path: "/" });

  if (key === siteConfig.cookieNames.access_token) {
    cachedToken = null;
  }
}

export function clearAuthCookies() {
  removeToken(siteConfig.cookieNames.access_token);
  removeToken(siteConfig.cookieNames.refresh_token);
  removeToken(siteConfig.cookieNames.user_type);
  removeToken(siteConfig.cookieNames.email);
  removeToken(siteConfig.cookieNames.user_profile);
}

export function logoutUser(loginPath = "/admin/login") {
  clearAuthCookies();
  if (typeof window === "undefined") return;
  window.location.replace(loginPath);
}
