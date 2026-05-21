"use client";

import Cookies from "universal-cookie";
import { useLayoutEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const cookies = new Cookies();

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const token = cookies.get(siteConfig.cookieNames.access_token);

  useLayoutEffect(() => {
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [token]);

  return { isAuthenticated, isLoading };
}
