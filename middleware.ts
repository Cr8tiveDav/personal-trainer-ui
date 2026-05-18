import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('session_token')?.value
  const userType = request.cookies.get('user_type')?.value

  const isAdminDashboard = pathname.startsWith('/admin/dashboard')
  const isTrainerDashboard = pathname.startsWith('/trainers/dashboard')

  // Protect ONLY dashboards
  if (isAdminDashboard || isTrainerDashboard) {
    

    if (isAdminDashboard && userType !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (isTrainerDashboard && userType !== 'trainer') {
      return NextResponse.redirect(new URL('/trainers/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/trainers/dashboard/:path*'],
}