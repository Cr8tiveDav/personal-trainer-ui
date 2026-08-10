"use client";

import { useState } from "react";
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
    </div>
  );
}
