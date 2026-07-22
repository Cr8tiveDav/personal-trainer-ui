'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import FitcallDownload from '../homepage/FitcallDownload'

const Hero = () => {
  const handleDownloadRedirect = (platform: 'ios' | 'android') => {
    const userAgent = navigator.userAgent || navigator.vendor

    const iosLink = 'https://apps.apple.com/app/your-app-id'
    const androidLink =
      'https://play.google.com/store/apps/details?id=your.package.id'

    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    const isAndroid = /android/i.test(userAgent)

    if (platform === 'ios') {
      if (isIOS) {
        window.open(iosLink, '_blank', 'noopener,noreferrer')
      } else {
        alert(
          'Please visit this page on your mobile device to download the app.',
        )
      }
    } else {
      if (isAndroid) {
        window.open(androidLink, '_blank', 'noopener,noreferrer')
      } else {
        alert(
          'Please visit this page on your mobile device to download the app.',
        )
      }
    }
  }

  return (
    <section className="relative w-full overflow-hidden pt-[122px] md:pt-[154px]">
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      ></div>

      <div className="absolute -left-20 top-0 h-200 w-150 rounded-[9999px] bg-[#C2DCFF]/30 blur-[120px]"></div>
      <div className="absolute -right-20 top-0 h-200 w-150 rounded-[9999px] bg-[#F5D9C0]/30 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-[9999px] border border-primary bg-primarybadge px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-[9999px] bg-primary"></span>
            Real trainers · Real sessions · Real results
          </div>

          <h1 className="mb-6 max-w-4xl text-3xl font-bold tracking-tight text-muted-foreground sm:text-5xl md:text-6xl lg:text-[69px]">
            Fitness that actually{' '}
            <span className="text-[#0F4690]">keeps you</span> consistent.
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            Real trainers, scheduled sessions, and human accountability designed
            to help you finally stick to your fitness goals.{' '}
          </p>

          <FitcallDownload />

          <div className="hidden relative mt-12 mx-auto md:flex w-full max-w-5xl justify-center overflow-hidden">
            {/* Left Phone */}
            <div className="absolute left-[-5%] top-[26%] z-10 hidden w-[40%] md:block md:left-0 lg:left-[5%] lg:w-[32%]">
              <Image
                src="/images/landing-page/phone-sides.png"
                alt="left phone"
                width={360}
                height={730}
                className="h-auto w-full object-contain"
              />
            </div>

            {/* Right Phone */}
            <div className="absolute right-[-5%] top-[26%] z-10 hidden w-[40%] md:block md:right-0 lg:right-[5%] lg:w-[32%]">
              <Image
                src="/images/landing-page/phone-sides.png"
                alt="right phone"
                width={360}
                height={730}
                className="h-auto w-full object-contain"
              />
            </div>

            {/* Center Phone */}
            <div className="relative z-30 w-[85%] sm:w-[65%] md:w-[45%] lg:w-[38%] translate-y-[2%] hover:scale-105 hover:translate-y-[3%] duration-300">
              <Image
                src="/images/landing-page/phone-centre.png"
                alt="center phone"
                width={400}
                height={612}
                className="h-auto w-full object-contain object-bottom"
                priority
              />
            </div>
          </div>

          <div className=" md:hidden mt-12 mx-auto flex w-full justify-center">
            <Image
              src="/images/landing-page/phone-frame-mobile.png"
              alt="Phone Frames"
              width={1029}
              height={765}
              loading="eager"
              className="h-auto w-full object-contain translate-x-[5%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
