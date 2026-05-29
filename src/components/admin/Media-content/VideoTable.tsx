"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Play } from "lucide-react";
import { MediaStatusBadge } from "./VideoStatusBadge";
import type { MediaItem } from "@/api/media";

function formatBytes(bytes: number) {
  if (!bytes) return "-";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ActionButtons({ item }: { item: MediaItem }) {
  if (item.status === "failed") {
    return (
      <Link
        href="/admin/media/upload"
        className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary/90"
      >
        Re-upload
      </Link>
    );
  }

  if (item.status === "processing") {
    return (
      <Link
        href={`/admin/media/${item.id}`}
        className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        View
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/media/${item.id}`}
        className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        View
      </Link>
      <Link
        href={`/admin/media/upload?replace=${item.id}`}
        className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Replace
      </Link>
    </div>
  );
}

export function VideoTable({ videos }: { videos: MediaItem[] }) {
  const [search, setSearch] = useState("");

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Content</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage trainer intro videos displayed in app
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
            href="/admin/media/upload?type=video"
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Upload Video
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-gray-400">No videos found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-400">
                  <th className="px-6 py-4">Thumbnail</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Uploaded</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {item.public_url ? (
                          <video
                            src={item.public_url}
                            className="h-full w-full object-cover"
                            muted
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40">
                            <Play className="h-3 w-3 fill-white text-white" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatBytes(item.size_bytes)}
                    </td>
                    <td className="px-6 py-4">
                      <MediaStatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <ActionButtons item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}