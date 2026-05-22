import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.API_URL

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value
  const type = req.nextUrl.searchParams.get('type')

  console.log('=== GET MEDIA ROUTE HIT ===')
  console.log('id:', id)
  console.log('type:', type)
  console.log('BASE_URL:', BASE_URL)
  console.log('token exists:', !!token)

  const endpoint = type === 'video'
    ? `${BASE_URL}/trainers/${id}/intro-video/stream`
    : `${BASE_URL}/trainers/${id}/images`

  console.log('hitting endpoint:', endpoint)

  try {
    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'follow',
    })

    console.log('backend status:', res.status)

    if (type === 'video') {
      if (!res.ok) {
        const text = await res.text()
        console.log('video error body:', text.slice(0, 300))
        return NextResponse.json({ error: 'Not found' }, { status: res.status })
      }
      return new NextResponse(res.body, {
        headers: {
          'Content-Type': res.headers.get('Content-Type') ?? 'video/mp4',
          'Content-Length': res.headers.get('Content-Length') ?? '',
          'Accept-Ranges': 'bytes',
        },
      })
    }

    const text = await res.text()
    console.log('backend raw response:', text.slice(0, 300))
    const data = JSON.parse(text)
    return NextResponse.json(data, { status: res.status })

  } catch (err) {
    console.error('GET fetch error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log('=== POST MEDIA ROUTE HIT ===')

  if (req.headers.get('next-action')) {
    console.log('blocked server action hijack')
    return NextResponse.json({ error: 'Not a server action' }, { status: 400 })
  }

  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value
  const type = req.nextUrl.searchParams.get('type')

  console.log('id:', id)
  console.log('type:', type)
  console.log('BASE_URL:', BASE_URL)
  console.log('token exists:', !!token)

  const endpoint = type === 'image'
    ? `${BASE_URL}/trainers/${id}/images`
    : `${BASE_URL}/trainers/${id}/intro-video`

  console.log('hitting endpoint:', endpoint)

  try {
    const formData = await req.formData()
    console.log('formData keys:', [...formData.keys()])

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    console.log('backend status:', res.status)
    const text = await res.text()
    console.log('backend raw response:', text.slice(0, 300))

    const data = JSON.parse(text)
    return NextResponse.json(data, { status: res.status })

  } catch (err) {
    console.error('POST fetch error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log('=== DELETE MEDIA ROUTE HIT ===')

  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value
  const type = req.nextUrl.searchParams.get('type')
  const imageId = req.nextUrl.searchParams.get('imageId')

  console.log('id:', id)
  console.log('type:', type)
  console.log('imageId:', imageId)
  console.log('BASE_URL:', BASE_URL)
  console.log('token exists:', !!token)

  const endpoint = type === 'image'
    ? `${BASE_URL}/trainers/${id}/images/${imageId}`
    : `${BASE_URL}/trainers/${id}/intro-video`

  console.log('hitting endpoint:', endpoint)

  try {
    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })

    console.log('backend status:', res.status)
    const text = await res.text()
    console.log('backend raw response:', text.slice(0, 300))

    const data = JSON.parse(text)
    return NextResponse.json(data, { status: res.status })

  } catch (err) {
    console.error('DELETE fetch error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}