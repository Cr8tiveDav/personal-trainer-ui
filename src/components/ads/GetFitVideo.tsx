import Image from 'next/image'

import LeadForm from './LeadForm'

const GetFitVideo = () => {
  return (
    <section className="bg-white px-5 pt-9 pb-14 sm:px-8 md:pt-12 md:pb-16">
      <div className="mx-auto w-full max-w-[1088px]">
        <h2 className="text-center text-[12px] leading-tight font-bold text-[#202124] min-[480px]:text-[22px] md:text-[32px]">
          Watch more about FitCall
        </h2>

        <div className="mx-auto mt-3 w-full max-w-[1088px] overflow-hidden rounded-[8px] min-[480px]:mt-5 min-[480px]:rounded-[14px] md:rounded-[16px]">
          <Image
            src="/images/ads/get-fit-video.jpg"
            alt="FitCall outdoor group training session"
            width={1126}
            height={636}
            sizes="(max-width: 479px) 80vw, (max-width: 1023px) 86vw, 1088px"
            className="aspect-[563/318] h-auto w-full object-cover"
          />
        </div>

        <div className="mt-12 grid items-start gap-8 min-[480px]:justify-items-center min-[480px]:text-center md:mt-17 lg:grid-cols-[minmax(0,500px)_370px] lg:justify-between lg:justify-items-stretch lg:px-3 lg:text-left">
          <div className="max-w-[330px] min-[480px]:mx-auto min-[480px]:max-w-[660px] lg:mx-0 lg:max-w-[500px]">
            <h2 className="text-[31px] leading-[0.93] font-bold text-[#202124] min-[480px]:text-[36px] md:text-[38px] lg:max-w-[460px] lg:leading-[0.98]">
              Stop starting over. Start showing up.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.42] text-[#6D6D6D] min-[480px]:mx-auto min-[480px]:max-w-[600px] min-[480px]:leading-[1.42] md:text-[16px] lg:mx-0 lg:max-w-[440px] lg:leading-[1.36]">
              FitCall is built for people who know what they want but need
              someone in their corner to make it happen. Kindly fill the form
              and download FitCall today.
            </p>
          </div>

          <LeadForm
            formId="video-lead"
            compact
            phonePlaceholder="+1 (555) 000-0000"
            className="w-full max-w-[370px] min-[480px]:mx-auto min-[480px]:max-w-[560px] lg:mx-0 lg:max-w-[370px]"
          />
        </div>
      </div>
    </section>
  )
}

export default GetFitVideo
