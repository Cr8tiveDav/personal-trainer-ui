"use client";

import { useState, useRef } from "react";
import { UploadCloud, ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUploadMedia } from "@/api/media";


export function MediaUploadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultType = (searchParams.get("type") as "image" | "video") ?? "video";

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType] = useState<"image" | "video">(defaultType);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadMedia, isPending } = useUploadMedia();

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    uploadMedia(
      {
        file,
        meta: { title, media_type: mediaType, category, description },
        onProgress: setProgress,
      },
      {
        onSuccess: () => {
          router.push("/admin/media")
          router.refresh()
        },
      },
    );
  }

  const accept = mediaType === "video" ? "video/*" : "image/*";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
      <Link
        href="/admin/media"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Media
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Upload {mediaType === "video" ? "Video" : "Image"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload a new {mediaType} to the organisation media library.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 transition-colors ${
            dragging ? "border-primary bg-primary/5" : "border-gray-200 bg-gray-50"
          }`}
        >
          <UploadCloud className="h-10 w-10 text-gray-300" />
          {file ? (
            <p className="text-sm font-semibold text-gray-900">{file.name}</p>
          ) : (
            <>
              <p className="text-base font-semibold text-gray-800">
                Drag &amp; drop your {mediaType} here
              </p>
              <p className="text-sm text-gray-400">
                Or click to choose file from your computer
              </p>
            </>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-1 rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Choose file
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {isPending && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-gray-500">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="e.g. Intro Strength Coaching"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="yoga">Yoga</option>
                <option value="pilates">Pilates</option>
                <option value="nutrition">Nutrition</option>
                <option value="general">General</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief description of this media..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/media"
          className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={!file || !title || isPending}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
}