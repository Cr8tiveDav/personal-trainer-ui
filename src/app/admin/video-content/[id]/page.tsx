import { notFound } from 'next/navigation'
import { VideoDetailView } from '~/components/admin/video-content/VideoDetailView'
import { mockVideos, mockVideoDetail } from '~/components/admin/video-content/mock-data'
import type { VideoDetail } from '~/components/admin/video-content/mock-data'

interface Props {
  params: Promise<{ id: string }>
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params
  const video = mockVideos.find((v) => v.id === id)
  if (!video) notFound()

  const detail: VideoDetail = {
    ...mockVideoDetail,
    id: video.id,
    title: video.title,
    trainer: video.trainer,
    trainerSpecialty: video.trainerSpecialty,
    duration: video.duration,
    status: video.status,
    uploadedAt: video.uploadedAt,
  }

  return (
    <div className='w-full px-4 pb-6 lg:px-10'>
      <VideoDetailView video={detail} />
    </div>
  )
}
