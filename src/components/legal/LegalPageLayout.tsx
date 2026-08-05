'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'

export interface LegalSection {
  id: string
  label: string
  title?: string
  content: React.ReactNode
}

export interface LegalPageLayoutProps {
  title: string
  subtitle: string
  introduction?: React.ReactNode
  sections: LegalSection[]
}

/** Height of the fixed site navbar (see src/components/navigation/navbar/index.tsx). */
const NAVBAR_HEIGHT = 88

export default function LegalPageLayout({
  title,
  subtitle,
  introduction,
  sections,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileBarRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  /** Total height obscured by fixed/sticky chrome at the top of the viewport. */
  const getStickyOffset = useCallback(() => {
    const bar = mobileBarRef.current
    // The sticky jump bar only renders (has layout) below the lg breakpoint.
    const barHeight = bar && bar.offsetParent !== null ? bar.offsetHeight : 0
    return NAVBAR_HEIGHT + barHeight + 16
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return

      // 1. Safety check: If we are scrolled close to the bottom of the page, force the last section to highlight
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100

      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1].id)
        return
      }

      // 2. Find the last section whose top has scrolled past the sticky chrome
      const threshold = getStickyOffset() + 16
      let activeId = sections[0].id

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= threshold) {
            activeId = section.id
          }
        }
      }
      setActiveSection(activeId)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections, getStickyOffset])

  // Close the mobile dropdown on outside click, Escape, or scroll.
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!mobileMenuRef.current) return
      if (!mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    const handleScroll = () => setMobileMenuOpen(false)

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top =
        element.getBoundingClientRect().top + window.scrollY - getStickyOffset()
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: 'smooth',
      })
      setActiveSection(id)
      setMobileMenuOpen(false)
    }
  }

  const activeLabel =
    sections.find((section) => section.id === activeSection)?.label ??
    'Navigation'

  return (
    <main className="w-full min-h-screen bg-transparent pt-28 md:pt-40 pb-20">
      <div className="container max-w-5xl px-4 mx-auto">
        {/* Centralized Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2.5 text-muted-foreground">
            {title}
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {subtitle}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-36 space-y-4">
            <h3 className="text-xs font-extrabold text-muted uppercase tracking-wider mb-4 pl-3">
              Table of Contents
            </h3>
            <nav className="flex flex-col gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left py-2 text-xs font-bold transition-all duration-200 ${
                    activeSection === section.id
                      ? 'text-primary border-l-2 border-primary pl-3'
                      : 'text-muted hover:text-muted-foreground pl-3 border-l border-transparent'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile Navigation Dropdown */}
          <div
            ref={mobileBarRef}
            className="lg:hidden sticky top-[88px] z-40 -mx-4 mb-8 border-b border-border bg-white/95 px-4 py-3 backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-100/50 p-3">
              <span className="text-xs font-extrabold text-muted uppercase tracking-wider">
                Jump to Section
              </span>
              <div className="relative" ref={mobileMenuRef}>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  aria-haspopup="menu"
                  aria-expanded={mobileMenuOpen}
                  className="flex max-w-[10rem] items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-sm"
                >
                  <Menu className="size-3.5 shrink-0" />
                  <span className="truncate">{activeLabel}</span>
                </button>
                {mobileMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 max-h-[60vh] w-56 overflow-y-auto overscroll-contain rounded-lg border border-border bg-white p-1.5 shadow-md"
                  >
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        role="menuitem"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                          activeSection === section.id
                            ? 'bg-slate-100 text-primary'
                            : 'text-muted hover:bg-slate-50'
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Document Content */}
          <div className="lg:col-span-3 space-y-12 text-muted-foreground">
            {/* Introduction (Optional) */}
            {introduction && (
              <article
                id={
                  sections[0]?.id === 'introduction'
                    ? 'introduction'
                    : undefined
                }
                className="prose prose-slate max-w-none scroll-mt-44 lg:scroll-mt-28"
              >
                {introduction}
              </article>
            )}

            {/* Sections Content */}
            {sections
              .filter((section) => section.id !== 'introduction')
              .map((section, idx, arr) => {
                const isLast = idx === arr.length - 1
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`space-y-4 scroll-mt-44 lg:scroll-mt-28 ${isLast ? 'pb-0 lg:pb-40' : ''}`}
                  >
                    {section.title && (
                      <h2 className="text-lg md:text-xl font-bold text-muted-foreground">
                        {section.title}
                      </h2>
                    )}
                    {section.content}
                  </section>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}
