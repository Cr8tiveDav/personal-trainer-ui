"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { TrainerSidebar } from "./sidebar";
import { TrainerHeader } from "./header";
import { useTrainerMe } from "@/api/trainers";

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

  // Dynamically fetch the trainer's latest profile to keep the avatar in sync
  const { data: response } = useTrainerMe();
  const trainer = response?.data;
  const displayAvatar = trainer?.avatarUrl || trainer?.displayPictureUrl || userAvatar;
  const displayName = trainer?.name || userName;

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#f4f5f7]">
      <TrainerSidebar
        userName={displayName}
        userEmail={userEmail}
        userAvatar={displayAvatar}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
      
          <TrainerHeader
            userName={displayName}
            userAvatar={displayAvatar}
            onMenuClick={() => setMobileOpen(true)}
          />
       
        <main
          className="flex-1 overflow-y-auto px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-14"
        >
          {children}
        </main>
      </div>
      {isDashboard && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-[9999px] bg-primary text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
