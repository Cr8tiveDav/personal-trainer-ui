import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BASE_URL = process.env.API_URL

async function getToken() {
  const cookieStore = await cookies()
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
        return NextResponse.json(
          { error: 'Video stream failed', details: errorText },
          { status: res.status }
        )
      }

      const headers = new Headers()

      const contentType = res.headers.get('Content-Type')
      const contentRange = res.headers.get('Content-Range')

      if (contentType) headers.set('Content-Type', contentType)
      if (contentRange) headers.set('Content-Range', contentRange)

      headers.set('Accept-Ranges', 'bytes')

      return new NextResponse(res.body, {
        status: res.status,
        headers,
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

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    let data
    try {
      data = await res.json()
    } catch {
      const text = await res.text()
      data = { error: 'Invalid JSON response', raw: text }
    }

    console.log('POST Response:', data)

    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error('POST Fetch Error:', err)
    return NextResponse.json(
      { error: 'Upload failed', details: String(err) },
      { status: 500 }
    )
  }
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