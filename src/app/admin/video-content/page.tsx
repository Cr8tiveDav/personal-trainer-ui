import { VideoTable } from '~/components/admin/video-content/VideoTable'
import { mockVideos } from '~/components/admin/video-content/mock-data'

export default function VideoContentPage() {
  return (
    <div className='w-full px-4 pb-6 lg:px-10'>
      <VideoTable videos={mockVideos} />
    </div>
  )
}
