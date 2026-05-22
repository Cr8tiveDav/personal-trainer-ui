// src/lib/services/trainer-media.ts
export async function uploadTrainerMedia(
  trainerId: string,
  formData: FormData,
  type: 'image' | 'video'
) {
  const res = await fetch(
    `/api/admin/media-trainers/${trainerId}?type=${type}`,
    {
      method: 'POST',
      body: formData,
    }
  )

  let data

  try {
    data = await res.json()
  } catch {
    const text = await res.text()
    data = { message: text || 'Invalid response' }
  }

  if (!res.ok) throw new Error(data.message || 'Upload failed')

  return data
}