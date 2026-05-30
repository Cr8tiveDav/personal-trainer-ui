"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Trash2 } from "lucide-react";
import { useDeleteMedia } from "@/api/media";
import { MediaStatusBadge } from "./VideoStatusBadge";
import type { MediaItem } from "@/api/media";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ImageGrid({ images }: { images: MediaItem[] }) {
  const [search, setSearch] = useState("");
  const { mutate: deleteMedia } = useDeleteMedia();

  const filtered = images.filter((img) =>
    img.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage organisation-level images
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Link
            href="/admin/media/upload?type=image"
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Upload Image
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
          <p className="text-sm text-gray-400">No images found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {item.public_url ? (
                  <img
                    src={item.public_url}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
                <button
                  onClick={() => deleteMedia(item.id)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-red-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-white"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-gray-400">
                  {item.category}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <MediaStatusBadge status={item.status} />
                  <span className="text-xs text-gray-400">
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}