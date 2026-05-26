import Image from 'next/image'

import { cn } from '@/lib/utils'

import LeadForm from './LeadForm'

type AdsHeroSectionProps = {
  badge: string
  title: string
  description: string
  formId: string
  image: {
    src: string
    alt: string
    width: number
    height: number
    sizes?: string
    className?: string
  }
  socialLinks?: string[]
  socialLabel?: string
  contentClassName?: string
  titleClassName?: string
  imageWrapperClassName?: string
  containerClassName?: string
}

const AdsHeroSection = ({
  badge,
  title,
  description,
  formId,
  image,
  socialLinks,
  socialLabel = 'Works with apps you already use',
  contentClassName,
  titleClassName,
  imageWrapperClassName,
  containerClassName,
}: AdsHeroSectionProps) => {
  return (
    <section className="bg-white">
      <div
        className={cn(
          'mx-auto grid w-full max-w-[1088px] gap-9 px-5 pt-5 pb-10 sm:px-8 md:grid-cols-[minmax(0,590px)_minmax(260px,360px)] md:items-center md:gap-14 md:px-10 md:pt-20 md:pb-16 lg:gap-20 lg:px-0',
          containerClassName,
        )}
      >
        <div
          className={cn(
            'order-2 max-w-[420px] md:order-1 md:max-w-[560px]',
            contentClassName,
          )}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5FD] px-2.5 py-1 text-[10px] font-medium text-[#005B8F] md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#005B8F]" />
            {badge}
          </span>

          <h1
            className={cn(
              'mt-4 max-w-[390px] text-[31px] leading-[1.03] font-extrabold tracking-normal text-[#202124] sm:text-5xl md:max-w-[500px] md:text-[52px] md:leading-[1.08]',
              titleClassName,
            )}
          >
            {title}
          </h1>

          <p className="mt-5 max-w-[390px] text-[13px] leading-[1.65] text-[#656565] sm:text-sm md:max-w-[470px] md:text-[15px] md:leading-[1.5]">
            {description}
          </p>

          <LeadForm
            formId={formId}
            className="mt-4 w-full max-w-[374px] min-[480px]:max-w-[560px] lg:max-w-[374px]"
          />
        </div>

        <div
          className={cn(
            'order-1 mx-auto w-full max-w-[320px] overflow-hidden rounded-[18px] md:order-2 md:max-w-[360px]',
            imageWrapperClassName,
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes={image.sizes || '(max-width: 767px) 88vw, 360px'}
            className={cn(
              'aspect-[230/238] h-auto w-full object-cover',
              image.className,
            )}
          />
        </div>
      </div>

      {socialLinks && socialLinks.length > 0 ? (
        <div className="border-y border-[#EFEFEF]">
          <div className="mx-auto flex w-full max-w-[1088px] flex-col gap-4 px-5 py-5 text-[10px] text-[#707070] sm:px-8 md:flex-row md:items-center md:justify-between md:px-10 lg:px-0">
            <p>{socialLabel}</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-8">
              {socialLinks.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default AdsHeroSection
