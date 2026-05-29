"use client";

import Cookies from "universal-cookie";
import { siteConfig } from "~/config/site";

const cookies = new Cookies();

export function useAuth() {
  const isClient = typeof window !== "undefined";
  const token = isClient
    ? cookies.get(siteConfig.cookieNames.access_token)
    : undefined;

  return {
    isAuthenticated: !!token,
    isLoading: !isClient,
  };
}
