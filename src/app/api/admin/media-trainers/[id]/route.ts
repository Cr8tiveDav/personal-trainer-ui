import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BASE_URL = process.env.API_URL

async function getToken() {
  const cookieStore = await cookies()
  // Change 'auth_token' to 'access_token'
  return cookieStore.get('access_token')?.value 
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const type = req.nextUrl.searchParams.get('type')
  const token = await getToken()

  const endpoint = type === 'video'
    ? `${BASE_URL}/trainers/${id}/intro-video/stream`
    : `${BASE_URL}/trainers/${id}/images`

  console.log('--- GET ROUTE ---')
  console.log('Endpoint:', endpoint)
  console.log('Token present:', !!token)

  try {
    if (type === 'video') {
      const range = req.headers.get('range')
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(range ? { Range: range } : {}),
        },
      })

      console.log('Video Backend Status:', res.status)
      if (!res.ok) {
        const errorText = await res.text()
        console.log('Video Error Body:', errorText)
        return NextResponse.json({ error: 'Video stream failed', details: errorText }, { status: res.status })
      }

      return new NextResponse(res.body, {
        status: res.status,
        headers: {
          'Content-Type': res.headers.get('Content-Type') ?? 'video/mp4',
          'Content-Range': res.headers.get('Content-Range') ?? '',
          'Accept-Ranges': 'bytes',
        },
      })
    }

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    console.log('Image Data Received:', data)
    
    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error('GET Fetch Error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const type = req.nextUrl.searchParams.get('type')
  const token = await getToken()
  const formData = await req.formData()

  const endpoint = type === 'image'
    ? `${BASE_URL}/trainers/${id}/images`
    : `${BASE_URL}/trainers/${id}/intro-video`

  console.log('--- POST ROUTE ---')
  console.log('Endpoint:', endpoint)

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })

  const data = await res.json()
  console.log('POST Response:', data)
  
  return NextResponse.json(data, { status: res.status })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const type = req.nextUrl.searchParams.get('type')
  const imageId = req.nextUrl.searchParams.get('imageId')
  const token = await getToken()

  const endpoint = type === 'image'
    ? `${BASE_URL}/trainers/${id}/images/${imageId}`
    : `${BASE_URL}/trainers/${id}/intro-video`

  console.log('--- DELETE ROUTE ---')
  console.log('Endpoint:', endpoint)

  const res = await fetch(endpoint, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()
  console.log('DELETE Response:', data)
  
  return NextResponse.json(data, { status: res.status })
}