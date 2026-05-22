import { NextResponse } from 'next/server'
import { AdminSessionsFetchError, fetchAdminSessionsFromBackend } from '@/lib/adminSessions/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 100)
    const sessions = await fetchAdminSessionsFromBackend(page, limit)

    return NextResponse.json({
      data: sessions,
    })
  } catch (error) {
    console.error('Failed to fetch admin sessions:', error)
    const status = error instanceof AdminSessionsFetchError ? error.status : 500

    return NextResponse.json(
      {
        error: 'Failed to fetch admin sessions',
        status,
      },
      { status }
    )
  }
}
