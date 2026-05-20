import { notFound } from 'next/navigation'
import { VideoDetailView } from '~/components/admin/video-content/VideoDetailView'
import { mockVideos, mockVideoDetail } from '~/components/admin/video-content/mock-data'

interface Props {
  params: Promise<{ id: string }>
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params
  const exists = mockVideos.find((v) => v.id === id)
  if (!exists) notFound()

  return (
    <div className='w-full px-4 pb-6 lg:px-10'>
      <VideoDetailView video={{ ...mockVideoDetail, id }} />
    </div>
  )
}
