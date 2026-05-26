import Image from 'next/image'

import { cn } from '@/lib/utils'

import LeadForm from './LeadForm'

export type AdsTestimonial = {
  quote: string
  name: string
  location: string
  avatar: string
}

type AdsTestimonialsSectionProps = {
  testimonials: AdsTestimonial[]
  bottomTitle: string
  bottomDescription: string
  bottomFormId: string
  badge?: string
  title?: string
  description?: string
  sectionClassName?: string
  cardsGridClassName?: string
  cardClassName?: string
  quoteClassName?: string
  bottomClassName?: string
  bottomTextClassName?: string
  bottomTitleClassName?: string
  bottomDescriptionClassName?: string
}

const AdsTestimonialsSection = ({
  testimonials,
  bottomTitle,
  bottomDescription,
  bottomFormId,
  badge = 'Our Testimonials',
  title = 'What people are saying',
  description = 'Real reviews from people having real lifestyle changes',
  sectionClassName,
  cardsGridClassName,
  cardClassName,
  quoteClassName,
  bottomClassName,
  bottomTextClassName,
  bottomTitleClassName,
  bottomDescriptionClassName,
}: AdsTestimonialsSectionProps) => {
  return (
    <section
      className={cn(
        'bg-[#F7F7F7] px-5 pt-10 pb-16 sm:px-8 md:pt-24 md:pb-30',
        sectionClassName,
      )}
    >
      <div className="mx-auto w-full max-w-[1088px]">
        <div className="mx-auto max-w-[420px] text-center">
          <span className="inline-flex rounded-full bg-[#E8F5FD] px-3 py-1 text-[10px] font-medium text-[#005B8F] md:text-xs">
            {badge}
          </span>
          <h2 className="mt-4 text-[30px] leading-[1.04] font-extrabold text-[#1F1F1F] md:text-[34px] md:leading-tight">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[310px] text-[12px] leading-[1.35] text-[#6B6B6B] md:max-w-none md:text-[13px]">
            {description}
          </p>
        </div>

        <div
          className={cn(
            'mt-6 grid gap-4 md:mt-7 md:grid-cols-4 md:gap-6',
            cardsGridClassName,
          )}
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className={cn(
                'flex min-h-[124px] flex-col rounded-2xl border border-[#EAEAEA] bg-white px-5 py-5 md:min-h-[124px] md:px-5 md:py-4',
                cardClassName,
              )}
            >
              <div className="flex gap-1 text-[13px] leading-none text-[#FF9D19] md:text-[12px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>&#9733;</span>
                ))}
              </div>

              <p
                className={cn(
                  'mt-10 text-[11px] leading-[1.5] font-normal text-[#111111] md:mt-7 md:text-[10px] md:leading-[1.4]',
                  quoteClassName,
                )}
              >
                {testimonial.quote}
              </p>

              <div className="mt-auto flex items-center gap-3 pt-8 md:pt-7">
                <Image
                  src={testimonial.avatar}
                  alt=""
                  width={36}
                  height={36}
                  sizes="36px"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-[11px] leading-tight font-semibold text-[#171717]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-[#6D6D6D]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={cn(
            'mt-9 grid items-start gap-12 min-[480px]:justify-items-center min-[480px]:gap-10 md:mt-18 lg:grid-cols-[minmax(0,470px)_370px] lg:justify-between lg:justify-items-stretch lg:gap-16',
            bottomClassName,
          )}
        >
          <div
            className={cn(
              'max-w-[350px] min-[480px]:mx-auto min-[480px]:max-w-[620px] min-[480px]:text-center lg:mx-0 lg:max-w-[470px] lg:text-left',
              bottomTextClassName,
            )}
          >
            <h2
              className={cn(
                'text-[32px] leading-[0.95] font-extrabold text-[#3A3A3A] md:text-[43px] md:leading-[0.94]',
                bottomTitleClassName,
              )}
            >
              {bottomTitle}
            </h2>
            <p
              className={cn(
                'mt-4 text-[16px] leading-[1.28] text-[#7A7A7A] min-[480px]:mx-auto min-[480px]:max-w-[600px] min-[480px]:leading-[1.32] md:text-[17px] lg:mx-0 lg:max-w-[455px] lg:leading-[1.22]',
                bottomDescriptionClassName,
              )}
            >
              {bottomDescription}
            </p>
          </div>

          <LeadForm
            formId={bottomFormId}
            compact
            className="w-full max-w-[370px] min-[480px]:mx-auto min-[480px]:max-w-[560px] md:pt-1 lg:mx-0 lg:max-w-[370px]"
          />
        </div>
      </div>
    </section>
  )
}

export default AdsTestimonialsSection
