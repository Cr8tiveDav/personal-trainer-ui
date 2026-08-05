export type NavLink = {
  route: string
  link: string
  /** Hidden in the desktop bar, still rendered inside the mobile drawer. */
  hideOnDesktop?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { route: 'Features', link: '/features' },
  { route: 'Pricing', link: '/pricing' },
  { route: 'How It Works', link: '/how-it-works' },
  { route: 'About Us', link: '/about-us', hideOnDesktop: true },
  { route: 'Contact', link: '/contact', hideOnDesktop: true },
]

/**
 * Matches the exact route and any nested route below it, so `/features/pricing`
 * still highlights `/features`. The root path is matched exactly.
 */
export const isActiveLink = (pathname: string | null, link: string) => {
  if (!pathname) return false
  if (link === '/') return pathname === '/'
  return pathname === link || pathname.startsWith(`${link}/`)
}
