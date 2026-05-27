export type MediaStatus = "ready" | "processing" | "failed";
export type MediaType = "image" | "video";

export type MediaItem = {
  id: string;
  media_type: MediaType;
  title: string;
  description: string;
  category: string;
  object_key: string;
  public_url: string;
  mime_type: string;
  size_bytes: number;
  status: MediaStatus;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
};

export type MediaListParams = {
  type?: MediaType;
  category?: string;
  status?: MediaStatus;
  page?: number;
  limit?: number;
};