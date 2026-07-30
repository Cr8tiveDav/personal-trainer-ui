'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function NavigationTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && pathname !== '/thank-you') {
      try {
        sessionStorage.setItem('lastVisitedPage', pathname + window.location.search)
      } catch {
        // ignore storage errors
      }
    }
  }, [pathname])

  return null
}
