/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageEmptyState, ImageGallery } from "./media/ImageGallerry";
import {
  VideoDetailView,
  VideoEmptyState,
  VideoTableView,
} from "./media/VideoSection.tsx";
import { Loader2 } from "lucide-react";

export function TrainerMediaTab({
  trainerId,
  trainerName,
  trainerSpecialty,
}: any) {
  const [subTab, setSubTab] = useState<"image" | "video">("image");
  const [videoView, setVideoView] = useState<"table" | "detail">("table");
  const [, setImageProcessing] = useState(false);
  const [, setVideoProcessing] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const queryClient = useQueryClient();

  const { data: images = [] } = useQuery({
    queryKey: ["trainer-images", trainerId],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/media-trainers/${trainerId}?type=image`,
      );
      const json = await res.json();
      return json?.data ?? [];
    },
  });

  const { data: video } = useQuery({
    queryKey: ["trainer-video", trainerId],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/media-trainers/${trainerId}?type=video`,
      );
      if (!res.ok) return null;
      return {
        url: `/api/admin/media-trainers/${trainerId}?type=video`,
        status: "Approved",
      };
    },
  });

  const uploadVideoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("video", file);

      const res = await fetch(
        `/api/admin/media-trainers/${trainerId}?type=video`,
        {
          method: "POST",
          headers: { "x-requested-with": "XMLHttpRequest" },
          body: formData,
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Upload failed");
      }

      return res.json();
    },
    onSuccess: async () => {
      setVideoProcessing(true);
      setOpenUploadModal(false);
      await queryClient.invalidateQueries({
        queryKey: ["trainer-video", trainerId],
      });
      await queryClient.refetchQueries({
        queryKey: ["trainer-video", trainerId],
      });
      setVideoProcessing(false);
    },
  });

  
  const uploadImagesMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((f) => formData.append("images", f));
      return fetch(`/api/admin/media-trainers/${trainerId}?type=image`, {
        method: "POST",
        headers: { "x-requested-with": "XMLHttpRequest" },
        body: formData,
      });
    },
    onSuccess: async () => {
      setImageProcessing(true);
      await queryClient.invalidateQueries({
        queryKey: ["trainer-images", trainerId],
      });
      await queryClient.refetchQueries({
        queryKey: ["trainer-images", trainerId],
      });
      setImageProcessing(false);
    },
  });

  const SUB_TABS = [
    { key: "image", label: "Image content" },
    { key: "video", label: "Video content" },
  ];

  return (
    <div className="space-y-5">
      {(uploadImagesMutation.isPending || uploadVideoMutation.isPending) && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-lg">
          <Loader2 className="h-4 w-4 animate-spin text-amber-500 shrink-0" />
          <p className="text-xs font-medium text-amber-700">
            {uploadVideoMutation.isPending
              ? "Video uploading & transcoding — this may take a few minutes."
              : "Images uploading — this may take a few seconds."}
          </p>
        </div>
      )}

      <div className="flex gap-0 border-b border-gray-200">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSubTab(tab.key as any)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-xs font-medium transition-colors ${
              subTab === tab.key
                ? "border-[#0b4d8d] text-[#0b4d8d]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === "image" &&
        (images.length === 0 ? (
          <ImageEmptyState
            type="image"
            multiple
            loading={uploadImagesMutation.isPending}
            onFileSelect={(f: File[]) => uploadImagesMutation.mutate(f)}
          />
        ) : (
          <ImageGallery
            trainerId={trainerId}
            images={images}
            uploading={uploadImagesMutation.isPending}
            onUpload={(f: File[]) => uploadImagesMutation.mutate(f)}
          />
        ))}

      {subTab === "video" && (
        <>
          {videoView === "detail" && video ? (
            <VideoDetailView
              video={video}
              trainerName={trainerName}
              trainerSpecialty={trainerSpecialty}
              onBack={() => setVideoView("table")}
              onReplace={(f: File) => uploadVideoMutation.mutate(f)}
              onRemove={() => {}}
              uploading={uploadVideoMutation.isPending}
            />
          ) : video ? (
            <VideoTableView
              video={video}
              trainerName={trainerName}
              trainerSpecialty={trainerSpecialty}
              onView={() => setVideoView("detail")}
              onReplace={(file: File) => uploadVideoMutation.mutate(file)}
              uploading={uploadVideoMutation.isPending}
              onUploadNew={() => setOpenUploadModal(true)}
            />
          ) : (
            <VideoEmptyState
              loading={uploadVideoMutation.isPending}
              onFileSelect={(f: File[]) => uploadVideoMutation.mutate(f[0])}
            />
          )}

          {openUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-2xl rounded-xl bg-white p-6">
                <VideoEmptyState
                  loading={uploadVideoMutation.isPending}
                  onFileSelect={(files: File[]) =>
                    uploadVideoMutation.mutate(files[0])
                  }
                />
                <button
                  onClick={() => setOpenUploadModal(false)}
                  className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
