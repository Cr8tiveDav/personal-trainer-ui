'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.API_URL

// Keep it clean: only fetch authorization tokens globally
async function getAuthHeaderString() {
    const cookieStore = await cookies()
    const token = cookieStore.get('session_token')?.value
    console.log('token:', token)
    return token ? `Bearer ${token}` : ''
}

export async function createTrainerAction(data: FormData) {
  const authHeader = await getAuthHeaderString()

  const newFormData = new FormData()
  newFormData.append('name', data.get('name') as string)
  newFormData.append('email', data.get('email') as string)
  newFormData.append('specializations', data.get('specializations') as string)
  newFormData.append('years_of_experience', data.get('years_of_experience') as string)
  newFormData.append('onboarding_status', 'pending')
  
  const bio = data.get('bio')
  if (bio) newFormData.append('bio', bio as string)

  const res = await fetch(`${BASE_URL}/trainers`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
    },
    body: newFormData, // Let fetch automatically configure multipart boundaries
  })

  const result = await res.json()
  console.log('response:', JSON.stringify(result, null, 2))

  if (!res.ok) {
    if (result.message?.includes('trainer created but credentials email failed')) {
      return result.data
    }
    throw new Error(result.message || 'Failed to create trainer')
  }
  return result.data
}

export async function uploadTrainerImageAction(trainerId: string, file: File) {
    const authHeader = await getAuthHeaderString()
    const formData = new FormData()
    
    // Change 'image' to 'images' to match your backend's multipart key requirements
    formData.append('images', file)

    const res = await fetch(`${BASE_URL}/trainers/${trainerId}/images`, {
        method: 'POST',
        headers: {
            'Authorization': authHeader,
        },
        body: formData,
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to upload image')
    return data
}
export async function uploadTrainerVideoAction(trainerId: string, file: File) {
    const authHeader = await getAuthHeaderString()
    const formData = new FormData()
    formData.append('video', file)

    const res = await fetch(`${BASE_URL}/trainers/${trainerId}/intro-video`, {
        method: 'POST',
        headers: {
            'Authorization': authHeader, // CRITICAL: Content-Type left blank intentionally here
        },
        body: formData,
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to upload video')
    return data
}