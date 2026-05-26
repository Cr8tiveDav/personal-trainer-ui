"use client";

import { MediaStatus } from "@/api/types/media";

const STYLES: Record<MediaStatus, { dot: string; text: string; label: string }> = {
  ready: { dot: "bg-green-500", text: "text-green-600", label: "Ready" },
  processing: { dot: "bg-orange-400", text: "text-orange-500", label: "Processing" },
  failed: { dot: "bg-red-500", text: "text-red-500", label: "Failed" },
};

export function MediaStatusBadge({ status }: { status: MediaStatus }) {
  const { dot, text, label } = STYLES[status];
  return (
    <span className={`flex items-center gap-1.5 text-sm font-medium ${text}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}