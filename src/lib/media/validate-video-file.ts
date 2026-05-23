const MAX_VIDEO_BYTES = 500 * 1024 * 1024
const MAX_VIDEO_SECONDS = 10 * 60

const ALLOWED_VIDEO_TYPES = new Set([
  'video/mp4',
  'video/quicktime',
  'video/x-m4v',
  'video/webm',
])

function readVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const element = document.createElement('video')
    element.preload = 'metadata'

    const cleanup = () => {
      element.removeAttribute('src')
      element.load()
      URL.revokeObjectURL(url)
    }

    element.onloadedmetadata = () => {
      const duration = element.duration
      cleanup()
      if (!Number.isFinite(duration) || duration <= 0) {
        reject(new Error('Could not read video duration'))
        return
      }
      resolve(duration)
    }

    element.onerror = () => {
      cleanup()
      reject(new Error('Could not read video file'))
    }

    element.src = url
  })
}

/** Returns an error message when invalid, otherwise null. */
export async function validateVideoFile(file: File): Promise<string | null> {
  if (!file.type || !ALLOWED_VIDEO_TYPES.has(file.type)) {
    const ext = file.name.split('.').pop()?.toLowerCase()
    const allowedExt = ['mp4', 'mov', 'm4v', 'webm']
    if (!ext || !allowedExt.includes(ext)) {
      return 'Use MP4, MOV, or WebM video.'
    }
  }

  if (file.size > MAX_VIDEO_BYTES) {
    return 'Video must be 500 MB or smaller.'
  }

  try {
    const duration = await readVideoDuration(file)
    if (duration > MAX_VIDEO_SECONDS) {
      return 'Video must be 10 minutes or shorter.'
    }
  } catch {
    return 'Could not read this video file. Try MP4 or MOV format.'
  }

  return null
}
