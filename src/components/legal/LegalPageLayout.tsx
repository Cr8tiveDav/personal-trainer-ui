'use client';

import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

export interface LegalSection {
  id: string;
  label: string;
  title?: string;
  content: React.ReactNode;
}

export interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  introduction?: React.ReactNode;
  sections: LegalSection[];
}

export default function LegalPageLayout({
  title,
  subtitle,
  introduction,
  sections,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);

    const handleScroll = () => {
      if (sections.length === 0) return;

      // 1. Safety check: If we are scrolled close to the bottom of the page, force the last section to highlight
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // 2. Find the last section whose top has scrolled past the threshold (160px from the top of the viewport)
      const threshold = 160;
      let activeId = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            activeId = section.id;
          }
        }
      }
      setActiveSection(activeId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 120;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className='w-full min-h-screen bg-transparent pt-28 md:pt-40 pb-20'>
      <div className='container max-w-5xl px-4 mx-auto'>
        {/* Centralized Header Section */}
        <div className='mb-16 text-center'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight mb-2.5 text-muted-foreground'>
            {title}
          </h1>
          <p className='text-xs font-semibold uppercase tracking-wider text-muted'>
            {subtitle}
          </p>
        </div>

        {/* Layout Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12 items-start'>
          {/* Sticky Table of Contents Sidebar */}
          <aside className='hidden lg:block lg:col-span-1 sticky top-36 space-y-4'>
            <h3 className='text-xs font-extrabold text-muted uppercase tracking-wider mb-4 pl-3'>
              Table of Contents
            </h3>
            <nav className='flex flex-col gap-1'>
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
          <div className='lg:hidden flex items-center justify-between p-3 rounded-lg bg-slate-100/50 mb-8'>
            <span className='text-xs font-extrabold text-muted uppercase tracking-wider'>
              Jump to Section
            </span>
            <div className='relative'>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-xs font-bold text-muted-foreground shadow-sm'
              >
                <Menu className='size-3.5' /> Navigation
              </button>
              {mobileMenuOpen && (
                <div className='absolute right-0 mt-2 w-52 rounded-lg border border-border bg-white shadow-md z-50 p-1.5'>
                  {sections.map((section) => (
                    <button
                      key={section.id}
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

          {/* Main Document Content */}
          <div className='lg:col-span-3 space-y-12 text-muted-foreground'>
            {/* Introduction (Optional) */}
            {introduction && (
              <article
                id={sections[0]?.id === 'introduction' ? 'introduction' : undefined}
                className='prose prose-slate max-w-none scroll-mt-28'
              >
                {introduction}
              </article>
            )}

            {/* Sections Content */}
            {sections
              .filter((section) => section.id !== 'introduction')
              .map((section, idx, arr) => {
                const isLast = idx === arr.length - 1;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`space-y-4 scroll-mt-28 ${isLast ? 'pb-0 lg:pb-40' : ''}`}
                  >
                    {section.title && (
                      <h2 className='text-lg md:text-xl font-bold text-muted-foreground'>
                        {section.title}
                      </h2>
                    )}
                    {section.content}
                  </section>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
