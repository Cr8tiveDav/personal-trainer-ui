'use client'

import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {  ArrowLeft, ArrowRight} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import TestimonialCard from './TestimonialCard'
import { testimonials } from './testimonials-data'
import { cn } from '@/lib/utils'

const Testimonials = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F7F7] py-12 md:py-20">
      <div className="container relative mx-auto px-4">
        <SectionHeader
          badge="OUR TESTIMONIAL"
          title="What people are saying"
          description="Real reviews from people having real lifestyle changes"
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-6xl">
          <button className="swiper-button-prev-custom absolute -left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[9999px] border border-slate-100 bg-white shadow-md">
            <ArrowLeft className="h-5 w-5 text-slate-400" />
          </button>

          <button className="swiper-button-next-custom absolute -right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[9999px] border border-slate-100 bg-white shadow-md">
            <ArrowRight className="h-5 w-5 text-slate-400" />
          </button>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="py-10"
          >
            {testimonials.map((item) => (
              <SwiperSlide
                key={item.id}
                className="flex items-center justify-center"
              >
                {({ isActive }) => (
                  <div
                    className={cn(
                      'w-full transition-all duration-500 ease-in-out',
                      isActive
                        ? 'z-10 scale-110 opacity-100'
                        : 'scale-90 opacity-60 grayscale-[0.5]'
                    )}
                  >
                    <TestimonialCard
                      image={item.image}
                      content={item.content}
                      name={item.name}
                      location={item.stack}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
