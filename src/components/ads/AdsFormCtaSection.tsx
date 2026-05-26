import { cn } from '@/lib/utils'

import LeadForm from './LeadForm'

type AdsFormCtaSectionProps = {
  title: string
  description: string
  formId: string
  className?: string
  innerClassName?: string
  textClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

const AdsFormCtaSection = ({
  title,
  description,
  formId,
  className,
  innerClassName,
  textClassName,
  titleClassName,
  descriptionClassName,
}: AdsFormCtaSectionProps) => {
  return (
    <section className={cn('bg-white px-5 pb-16 sm:px-8 md:pb-18', className)}>
      <div
        className={cn(
          'mx-auto grid w-full max-w-[1088px] items-start gap-8 min-[480px]:justify-items-center md:px-3 lg:grid-cols-[minmax(0,430px)_370px] lg:justify-between lg:justify-items-stretch',
          innerClassName,
        )}
      >
        <div
          className={cn(
            'max-w-[330px] min-[480px]:mx-auto min-[480px]:max-w-[620px] min-[480px]:text-center lg:mx-0 lg:max-w-[420px] lg:text-left',
            textClassName,
          )}
        >
          <h2
            className={cn(
              'text-[31px] leading-[0.96] font-extrabold text-[#202124] md:text-[38px] md:leading-[0.98]',
              titleClassName,
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'mt-3 text-[15px] leading-[1.32] text-[#6F6F6F] min-[480px]:mx-auto min-[480px]:max-w-[560px] min-[480px]:leading-[1.36] md:text-[15px] lg:mx-0 lg:max-w-[390px] lg:leading-[1.28]',
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </div>

        <LeadForm
          formId={formId}
          compact
          className="w-full max-w-[370px] min-[480px]:mx-auto min-[480px]:max-w-[560px] md:pt-0 lg:mx-0 lg:max-w-[370px]"
        />
      </div>
    </section>
  )
}

export default AdsFormCtaSection
