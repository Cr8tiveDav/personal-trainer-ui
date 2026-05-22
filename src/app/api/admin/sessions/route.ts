import { NextResponse } from 'next/server'
import { AdminSessionsFetchError, fetchAdminSessionsFromBackend } from '@/lib/adminSessions/server'

const parsePositiveIntegerParam = (
  value: string | null,
  fallback: number,
  max = Number.MAX_SAFE_INTEGER
) => {
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < 1) return fallback
  return Math.min(parsed, max)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parsePositiveIntegerParam(searchParams.get('page'), 1)
    const limit = parsePositiveIntegerParam(searchParams.get('limit'), 100, 100)
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
