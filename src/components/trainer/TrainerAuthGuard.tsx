"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getToken, getRefreshToken } from "@/lib/get-token";
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
  const authenticated = isTrainerAuthenticated();

  useEffect(() => {
    if (authenticated) return;

    const loginUrl = `${TRAINER_LOGIN_PATH}?from=${encodeURIComponent(pathname)}`;
    router.replace(loginUrl);
  }, [authenticated, pathname, router]);

  if (!authenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
