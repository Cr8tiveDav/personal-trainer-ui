import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  let sessionToken = cookieStore.get('session_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value
  const baseURL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || ''

  const fetchPage = async (token: string, page: number) =>
    fetch(`${baseURL}/admin/sessions?page=${page}&limit=100`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

  try {
    let firstRes: Response | undefined

    if (sessionToken) {
      firstRes = await fetchPage(sessionToken, 1)
    }

    // Refresh token if missing or 401
    if (!sessionToken || firstRes?.status === 401) {
      if (!refreshToken) {
        return NextResponse.json(
          { error: 'Unauthorized: No valid session or refresh token' },
          { status: 401 }
        )
      }

      const refreshRes = await fetch(`${baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      if (!refreshRes.ok) {
        return NextResponse.json(
          { error: 'Unauthorized: Session expired and refresh failed' },
          { status: 401 }
        )
      }

      const newTokens = await refreshRes.json()
      sessionToken = newTokens.data?.access_token || newTokens.access_token

      if (sessionToken) {
        cookieStore.set('session_token', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: newTokens.data?.expires_in || newTokens.expires_in || 600,
        })
      }

      firstRes = await fetchPage(sessionToken!, 1)
    }

    if (!firstRes || firstRes.status === 401) {
      return NextResponse.json(
        { error: 'Unauthorized: Backend session expired' },
        { status: 401 }
      )
    }

    if (!firstRes.ok) {
      throw new Error(`Backend returned ${firstRes.status}`)
    }

    const firstData = await firstRes.json()
    const allSessions = [...(firstData.data || [])]
    const totalPages: number = firstData.meta?.total_pages || 1

    // Fetch remaining pages in parallel
    if (totalPages > 1) {
      const remainingPages = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 2
      )
      const remainingResults = await Promise.all(
        remainingPages.map((page) =>
          fetchPage(sessionToken!, page).then((r) => r.json())
        )
      )
      remainingResults.forEach((result) => {
        if (result.data) allSessions.push(...result.data)
      })
    }

    return NextResponse.json({
      data: allSessions,
      total: firstData.meta?.total_count || allSessions.length,
    })
  } catch (error) {
    console.error('Failed to fetch sessions from backend:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
