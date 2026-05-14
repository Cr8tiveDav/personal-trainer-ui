'use client'

import Image from 'next/image'
import { A11y, Autoplay, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { WaitlistForm } from './WaitListForm'

const Hero = () => {
  return (
    <section className="mb-16 w-full overflow-hidden">
      <div className="container">
        <div className="flex flex-col-reverse items-center gap-12 px-2 sm:flex-row lg:items-center">
          <div className="w-full min-w-0 lg:w-1/2">
            <div className="mb-4 inline-flex max-w-full flex-wrap items-center rounded-full bg-primarybadge px-4 py-2 text-xs font-medium text-primary">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary"></span>
              Live trainer accountability
            </div>

            <h1 className="mb-6 break-words text-left text-4xl font-bold leading-tight tracking-tight text-muted-foreground sm:text-5xl md:text-6xl">
              Never miss a workout session
            </h1>

            <p className="mb-8 max-w-full break-words text-left text-base leading-relaxed text-muted">
              Connect with vetted fitness trainers who call you at your
              scheduled time — live, on video. Join the waitlist for exclusive
              early access to FitCall.
            </p>

            <WaitlistForm />
          </div>

          <div className="flex w-full min-w-0 justify-center lg:w-1/2">
            <div className="relative h-[320px] w-full max-w-[100%] overflow-hidden rounded-md sm:h-[420px] md:h-[500px] md:max-w-[500px] lg:h-[600px]">
              <Swiper
                modules={[Pagination, Scrollbar, A11y, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                speed={1200}
                className="h-full w-full"
              >
                <SwiperSlide>
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/landing-page/hero.png"
                      alt="Professional Trainer"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
