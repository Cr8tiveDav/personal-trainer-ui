"use client";

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const cookies = new Cookies();

export function useAuth() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = mounted
    ? cookies.get(siteConfig.cookieNames.access_token)
    : undefined;

  return {
    isAuthenticated: !!token,
    isLoading: !mounted,
  };
}
