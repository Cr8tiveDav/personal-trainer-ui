"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { TrainerSidebar } from "./sidebar";
import { TrainerHeader } from "./header";

interface TrainerShellProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  children: React.ReactNode;
}

export function TrainerShell({
  userName,
  userEmail,
  userAvatar,
  children,
}: TrainerShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === "/trainer/dashboard";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f5f7]">
      <TrainerSidebar
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {!isDashboard && (
          <TrainerHeader
            userName={userName}
            userAvatar={userAvatar}
            onMenuClick={() => setMobileOpen(true)}
          />
        )}
        <main
          className={
            isDashboard
              ? "flex-1 overflow-y-auto px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-14"
              : "flex-1 overflow-y-auto py-6"
          }
        >
          {children}
        </main>
      </div>
      {isDashboard && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
