"use client";
import {  ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMediaDetail } from "@/api/media";
import { MediaStatusBadge } from "./VideoStatusBadge";


export function VideoDetailView({ id }: { id: string }) {
  const { data: media, isLoading, isError } = useMediaDetail(id)
  if (isLoading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (isError || !media) return <p className="text-sm text-red-400">Failed to load media.</p>;

  return (
    <div className="space-y-4">
      <Link
        href="/admin/media"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Media
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{media.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{media.category}</p>
        </div>
        <MediaStatusBadge status={media.status} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="relative bg-gray-900" style={{ aspectRatio: "16/9" }}>
          {media.media_type === "video" ? (
            <video
              src={media.public_url}
              controls
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={media.public_url}
              alt={media.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-gray-100 px-6 py-5">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400">Title</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">{media.title}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Category</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">{media.category}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400">Type</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900 capitalize">{media.media_type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Upload Date</p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">
                {new Date(media.created_at).toLocaleDateString("en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Remove
          </button>
          <Link
            href={`/admin/media/upload?replace=${id}`}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Replace
          </Link>
        </div>
      </div>
    </div>
  );
}