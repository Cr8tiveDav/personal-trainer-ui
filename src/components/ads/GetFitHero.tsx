import Image from 'next/image'

import LeadForm from './LeadForm'

const GetFitHero = () => {
  return (
    <section className="mx-auto grid w-full max-w-[1088px] gap-9 px-5 pt-5 pb-10 sm:px-8 md:grid-cols-[minmax(0,590px)_minmax(260px,360px)] md:items-center md:gap-14 md:px-10 md:pt-20 md:pb-16 lg:gap-20 lg:px-0">
      <div className="order-2 max-w-[420px] md:order-1 md:max-w-[560px]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5FD] px-2.5 py-1 text-[10px] font-medium text-[#005B8F] md:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#005B8F]" />
          Live trainer accountability
        </span>

        <h1 className="mt-4 max-w-[390px] text-[31px] leading-[1.03] font-extrabold tracking-normal text-[#202124] sm:text-5xl md:max-w-[500px] md:text-[52px] md:leading-[1.08]">
          Stay consistent with real trainers
        </h1>

        <p className="mt-5 max-w-[390px] text-[13px] leading-[1.65] text-[#656565] sm:text-sm md:max-w-[470px] md:text-[15px] md:leading-[1.5]">
          Get matched with an expert Nigerian fitness coach who calls you at
          your work out time. Kindly fill the form and download FitCall today.
        </p>

        <LeadForm formId="hero-lead" className="mt-4 max-w-[374px]" />
      </div>

      <div className="order-1 mx-auto w-full max-w-[320px] overflow-hidden rounded-[18px] md:order-2 md:max-w-[360px]">
        <Image
          src="/images/ads/get-fit-runner.png"
          alt="Runner training outdoors"
          width={460}
          height={476}
          priority
          sizes="(max-width: 767px) 88vw, 360px"
          className="aspect-[230/238] h-auto w-full object-cover"
        />
      </div>
    </section>
  )
}

export default GetFitHero
