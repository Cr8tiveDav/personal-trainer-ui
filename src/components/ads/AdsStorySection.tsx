import Image from 'next/image'

import { cn } from '@/lib/utils'

type AdsStorySectionProps = {
  title: string
  storyLabel: string
  quote: string
  paragraphs: string[]
  image: {
    src: string
    alt: string
    width: number
    height: number
    sizes?: string
    className?: string
  }
  className?: string
  containerClassName?: string
  gridClassName?: string
  imageWrapperClassName?: string
  articleClassName?: string
  mobileIntroClassName?: string
  desktopTitleClassName?: string
  quoteClassName?: string
  paragraphsClassName?: string
}

const AdsStorySection = ({
  title,
  storyLabel,
  quote,
  paragraphs,
  image,
  className,
  containerClassName,
  gridClassName,
  imageWrapperClassName,
  articleClassName,
  mobileIntroClassName,
  desktopTitleClassName,
  quoteClassName,
  paragraphsClassName,
}: AdsStorySectionProps) => {
  return (
    <section
      className={cn(
        'bg-white px-5 pt-12 pb-0 sm:px-8 md:pt-18',
        className,
      )}
    >
      <div className={cn('mx-auto w-full max-w-[1088px]', containerClassName)}>
        <h2
          className={cn(
            'hidden text-center text-[25px] leading-tight font-extrabold text-[#202124] md:block',
            desktopTitleClassName,
          )}
        >
          {title}
        </h2>

        <div
          className={cn(
            'mx-auto mt-0 grid max-w-[1088px] items-start gap-6 md:mt-5 md:justify-items-center md:gap-8 md:px-3 lg:grid-cols-[470px_minmax(0,520px)] lg:justify-between lg:justify-items-stretch lg:gap-9',
            gridClassName,
          )}
        >
          <div className={cn('md:hidden', mobileIntroClassName)}>
            <span className="inline-flex rounded-full bg-[#E8F5FD] px-3 py-1 text-[10px] font-medium text-[#005B8F]">
              {storyLabel}
            </span>
            <h2 className="mt-4 text-[31px] leading-[0.93] font-extrabold text-[#1F1F1F]">
              {title}
            </h2>
            <h3
              className={cn(
                'mt-6 max-w-[270px] text-[31px] leading-[1.02] font-extrabold text-[#1F1F1F]',
                quoteClassName,
              )}
            >
              &ldquo;{quote}&rdquo;
            </h3>
          </div>

          <div
            className={cn(
              'w-full max-w-[540px] overflow-hidden rounded-[14px] md:rounded-[16px] lg:max-w-none',
              imageWrapperClassName,
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={image.sizes || '(max-width: 1023px) 100vw, 470px'}
              className={cn(
                'aspect-[270/263] h-auto w-full object-cover',
                image.className,
              )}
            />
          </div>

          <article
            className={cn(
              'w-full max-w-[540px] rounded-[14px] border border-[#E5E5E5] bg-white px-5 py-5 md:rounded-[16px] md:px-6 md:py-5 lg:min-h-[500px] lg:max-w-none',
              articleClassName,
            )}
          >
            <span className="hidden text-[13px] font-semibold text-[#005B8F] md:block">
              {storyLabel}
            </span>
            <h3
              className={cn(
                'hidden text-[24px] leading-[1.08] font-extrabold text-[#202124] md:mt-2 md:block',
                quoteClassName,
              )}
            >
              &ldquo;{quote}&rdquo;
            </h3>

            <div
              className={cn(
                'space-y-6 text-[15px] leading-[1.32] text-[#6B6B6B] md:mt-4 md:space-y-8 md:text-[15px] md:leading-[1.38]',
                paragraphsClassName,
              )}
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default AdsStorySection
