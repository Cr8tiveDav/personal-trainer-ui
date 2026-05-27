import Image from 'next/image'

const phones = [
  {
    src: '/images/ads/left_phone.png',
    alt: 'FitCall trainer discovery screen',
    className:
      'left-[27%] top-[14%] z-10 w-[32%] -translate-x-1/2 md:left-[31%] md:top-[13%] md:w-[28%]',
  },
  {
    src: '/images/ads/right_phone.png',
    alt: 'FitCall trainer profile screen',
    className:
      'left-[73%] top-[14%] z-10 w-[32%] -translate-x-1/2 md:left-[69%] md:top-[13%] md:w-[28%]',
  },
  {
    src: '/images/ads/mid_phone.png',
    alt: 'FitCall trainer search screen',
    className: 'left-1/2 top-0 z-20 w-[37%] -translate-x-1/2 md:w-[32%]',
  },
]

const BuildUpPhoneShowcase = () => {
  return (
    <section className="bg-white px-5 pt-6 pb-16 sm:px-8 md:pt-8 md:pb-22">
      <div className="mx-auto w-full max-w-[1088px] text-center">
        <h2 className="mx-auto max-w-[760px] text-[31px] leading-[1.02] font-extrabold text-[#202124] md:text-[48px] md:leading-[1.04]">
          Find the perfect trainer for your fitness goals
        </h2>
        <p className="mx-auto mt-4 max-w-[660px] text-[12px] leading-[1.55] text-[#6B6B6B] md:text-[14px]">
          Find a vetted Nigerian fitness trainer who calls you at your scheduled
          time - live, on video.
        </p>

        <div className="relative mx-auto mt-8 aspect-[360/300] w-full max-w-[420px] overflow-visible sm:mt-10 sm:aspect-[560/430] sm:max-w-[620px] md:mt-12 md:aspect-[780/520] md:max-w-[780px]">
          {phones.map((phone) => (
            <div
              key={phone.src}
              className={`absolute overflow-hidden rounded-[18px] border-[3px] border-black bg-white shadow-[0_18px_35px_rgba(0,0,0,0.18)] sm:rounded-[24px] md:rounded-[30px] md:border-[5px] ${phone.className}`}
            >
              <Image
                src={phone.src}
                alt={phone.alt}
                width={1167}
                height={2533}
                sizes="(max-width: 767px) 34vw, 240px"
                className="aspect-[1167/2533] h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BuildUpPhoneShowcase
