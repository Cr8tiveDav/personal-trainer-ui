"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getToken, getRefreshToken } from "@/lib/get-token";
import { ensureValidAccessToken } from "@/lib/http";
import { TRAINER_LOGIN_PATH } from "@/lib/auth/trainer-routes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function isTrainerAuthenticated() {
  const hasToken = Boolean(getToken() || getRefreshToken());
  const userType = cookies.get(siteConfig.cookieNames.user_type);
  return hasToken && userType === "trainer";
}

export function TrainerAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (getRefreshToken()) {
        await ensureValidAccessToken();
      }
      if (cancelled) return;
      setAuthenticated(isTrainerAuthenticated());
      setChecked(true);
    }

    void verify();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!checked || authenticated) return;

    const loginUrl = `${TRAINER_LOGIN_PATH}?from=${encodeURIComponent(pathname)}`;
    router.replace(loginUrl);
  }, [authenticated, checked, pathname, router]);

  if (!checked) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
