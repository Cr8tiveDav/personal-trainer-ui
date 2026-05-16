import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = [
  '/',
  '/admin/login',
  '/trainers/login',
  '/forgot-password',
  '/unauthorized',
]

const AUTH_ROUTES = ['/admin/login', '/trainers/login']

const ADMIN_ROUTES = ['/admin', '/dashboard/admin']
const TRAINER_ROUTES = ['/trainers', '/dashboard/trainers']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('session_token')?.value
  const userType = request.cookies.get('user_type')?.value

  const isPublic = PUBLIC_ROUTES.some((route) => pathname === route)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route)
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route))
  const isTrainerRoute = TRAINER_ROUTES.some((route) => pathname.startsWith(route))

  if (isAuthRoute) {
    if (token && userType === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url))
    }
    if (token && userType === 'trainer') {
      return NextResponse.redirect(new URL('/dashboard/trainers', request.url))
    }
    return NextResponse.next()
  }

  if (isPublic) {
    return NextResponse.next()
  }

  if (!token || !userType) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (isAdminRoute && userType !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (isTrainerRoute && userType !== 'trainer') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|icons|fonts|api).*)'],
}