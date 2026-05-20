import { VideoTable } from '~/components/admin/video-content/VideoTable'
import { mockVideos } from '~/components/admin/video-content/mock-data'

export default function VideoContentPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Video Content</h1>
        <p className='mt-1 text-sm text-gray-500'>Manage and review trainer video submissions</p>
      </div>
      <VideoTable videos={mockVideos} />
    </div>
  )
}
