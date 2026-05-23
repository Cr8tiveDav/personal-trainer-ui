"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getToken, getRefreshToken } from "@/lib/get-token";
import { TRAINER_LOGIN_PATH } from "@/lib/auth/trainer-routes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function TrainerAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasToken = Boolean(getToken() || getRefreshToken());
    const userType = cookies.get(siteConfig.cookieNames.user_type);

    if (!hasToken || userType !== "trainer") {
      const loginUrl = `${TRAINER_LOGIN_PATH}?from=${encodeURIComponent(pathname)}`;
      router.replace(loginUrl);
      return;
    }

    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
