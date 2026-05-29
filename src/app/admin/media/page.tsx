"use client";

import { useState } from "react";
import { ImageIcon, Video } from "lucide-react";
import { useMediaList } from "@/api/media";
import { VideoTable } from "@/components/admin/Media-content/VideoTable";
import { ImageGrid } from "@/components/admin/Media-content/Imagegrid";


type Tab = "video" | "image";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "video", label: "Videos", icon: Video },
  { id: "image", label: "Images", icon: ImageIcon },
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<Tab>("video");

  const { data: media = [], isLoading, isError } = useMediaList({ type: activeTab });

  const videos = media.filter((m) => m.media_type === "video");
  const images = media.filter((m) => m.media_type === "image");

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-xl border border-gray-100 bg-gray-50 p-1 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      )}

      {isError && (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-sm text-red-400">Failed to load media.</p>
        </div>
      )}

      {!isLoading && !isError && activeTab === "video" && (
        <VideoTable videos={videos} />
      )}

      {!isLoading && !isError && activeTab === "image" && (
        <ImageGrid images={images} />
      )}
    </div>
  );
}