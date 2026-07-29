'use client'
import { useEffect, useState, startTransition, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import SqueezeFooter from '@/components/squeeze/us/SqueezeFooter'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const ThankYouPage = () => {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const pathname = usePathname()

  const getBounceRoute = useCallback((): string => {
    let fallback = '/'
    if (typeof window !== 'undefined') {
      const lastPage = sessionStorage.getItem('lastVisitedPage')
      if (lastPage) {
        return lastPage
      }

      if (typeof document !== 'undefined' && document.referrer) {
        try {
          const referrerUrl = new URL(document.referrer)
          if (
            referrerUrl.origin === window.location.origin &&
            referrerUrl.pathname !== pathname
          ) {
            fallback = referrerUrl.pathname + referrerUrl.search
          }
        } catch {
          // ignore
        }
      }
    }
    return fallback
  }, [pathname])

  useEffect(() => {
    const submittedForm = sessionStorage.getItem('waitlistSubmitted')

    if (submittedForm) {
      // Store the page they submitted from in a session key so refreshes are allowed
      sessionStorage.setItem('lastWaitlistPage', submittedForm)
      sessionStorage.removeItem('waitlistSubmitted')
      startTransition(() => setIsAuthorized(true))
    } else {
      // Check if they previously submitted in this session
      const lastPage = sessionStorage.getItem('lastWaitlistPage')
      if (lastPage) {
        startTransition(() => setIsAuthorized(true))
      } else {
        // No submission in this session; bounce them back to where they came from
        router.replace(getBounceRoute())
      }
    }

    // Clear the session variable when the component unmounts (user navigates away)
    return () => {
      sessionStorage.removeItem('lastWaitlistPage')
    }
  }, [router, pathname, getBounceRoute])

  // Return nothing while checking — prevents content flash before redirect
  if (!isAuthorized) return null
  return (
    <main>
      <section className="relative h-[357px] md:h-[503px] w-full">
        <Image
          src="/images/ads/us/thank-you-hero.jpg"
          alt="Thank you hero"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_50%] md:object-[50%_22%]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 px-5 text-center">
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <Image
              src="/images/ads/us/logo-icon.svg"
              alt=""
              width={55}
              height={55}
              className="shrink-0"
            />
            <span className="text-white font-bold text-4xl md:text-5xl leading-none tracking-tight">
              FitCall
            </span>
          </div>
        </div>
      </section>

      <section className="w-full h-[649px] flex flex-col items-center justify-center py-4">
        <div className="container mx-auto mb-6 flex flex-col items-center justify-center">
          <div className="md:max-w-[985px]">
            <h2 className="text-[48px] md:text-6xl font-semibold md:font-bold text-muted-foreground text-center md:mb-2.5">
              You&apos;re all set!
            </h2>
            <p className="text-base md:text-3xl px-4 text-muted text-center leading-6 md:leading-10">
              Thank you for completing the form.{' '}
              <br className="block md:hidden" /> FitCall connects you with a
              real trainer who calls you for every session. Tap the button below
              to download the{' '}
              <span className="text-primary font-semibold">FitCall App</span>{' '}
              from the Play Store or App Store and start your fitness journey.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5 w-full px-4 md:px-0">
          <Button
            size="lg"
            disabled
            className="w-full md:w-auto flex items-center justify-center gap-2 mt-0 bg-[#F5F5F5] text-muted-foreground text-base font-semibold rounded-[9999px] opacity-50 cursor-not-allowed"
          >
            <Image
              src="/images/ads/us/app-store.svg"
              alt=""
              width={20}
              height={20}
            />
            App Store Coming Soon!
          </Button>

          <Button
            size="lg"
            asChild
            className="w-full md:w-auto flex items-center justify-center gap-2 mt-0 bg-[#F5F5F5] hover:bg-[#dcdcdc]! text-muted-foreground text-base font-semibold rounded-[9999px]"
          >
            <Link
              href="https://play.google.com/store/apps/details?id=net.emerj.fitcall"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/ads/us/play-store.svg"
                alt=""
                width={20}
                height={20}
              />
              Download on Play Store
            </Link>
          </Button>
        </div>
      </section>
      <SqueezeFooter className="h-[502px] md:h-[733px]" />
    </main>
  )
}

export default ThankYouPage
