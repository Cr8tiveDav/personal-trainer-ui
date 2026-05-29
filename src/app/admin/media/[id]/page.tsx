import { VideoDetailView } from "@/components/admin/Media-content/VideoDetailView";
import { use } from "react";


export default function MediaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <VideoDetailView id={id} />;
}