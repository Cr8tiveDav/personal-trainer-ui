'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.API_URL

async function getAuthHeaderString() {
    const cookieStore = await cookies()
    const token = cookieStore.get('session_token')?.value
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

  const accountSetupMethod = data.get('account_setup_method')
  if (accountSetupMethod) {
    newFormData.append('account_setup_method', accountSetupMethod as string)
  }

  const password = data.get('password')
  if (password) {
    newFormData.append('password', password as string)
  }
  
  const bio = data.get('bio')
  if (bio) newFormData.append('bio', bio as string)

  const res = await fetch(`${BASE_URL}/trainers`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
    },
    body: newFormData, 
  })

  const result = await res.json()

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
            'Authorization': authHeader, 
        },
        body: formData,
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to upload video')
    return data
}