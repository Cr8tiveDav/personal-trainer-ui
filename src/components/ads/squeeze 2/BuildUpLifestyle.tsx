import Image from 'next/image'

const BuildUpLifestyle = () => {
  return (
    <section className="bg-white px-5 pt-10 pb-12 sm:px-8 md:pt-12 md:pb-16">
      <div className="mx-auto w-full max-w-[1088px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[31px] leading-[1.05] font-extrabold text-[#202124] md:text-[44px] md:leading-[1.08]">
            Built for your fitness lifestyle
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[12px] leading-[1.55] text-[#6B6B6B] md:text-[14px]">
            Your schedule. Your pace. Your trainer works around all of it.
          </p>
        </div>

        <div className="mx-auto mt-7 w-full overflow-hidden rounded-[16px] md:mt-10 md:rounded-[18px]">
          <picture>
            <source
              srcSet="/images/ads/spread_desk.png"
              media="(max-width: 767px)"
            />
            <Image
              src="/images/ads/spread_desk.png"
              alt="Athlete training on a stationary bike"
              width={1536}
              height={1024}
              sizes="(max-width: 767px) 90vw, (max-width: 1199px) 80vw, 908px"
              className="aspect-[1536/622] h-auto w-full object-cover object-center max-md:aspect-[335/151]"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}

export default BuildUpLifestyle
