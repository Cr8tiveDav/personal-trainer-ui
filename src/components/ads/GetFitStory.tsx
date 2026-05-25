import Image from 'next/image'

import LeadForm from './LeadForm'

const storyParagraphs = [
  "I wasn't unfit. I was just inconsistent. Gym membership, long forms, guilt, repeat. I had the intention every single Sunday. By Wednesday it was gone. I used to save workout routines at 1am like that was the same as doing them. Downloaded apps, bought a resistance band I used twice. I was really good at starting.",
  'Then my trainer called. Not a push notification. An actual video call at 6:30am. He was already moving, no waiting for me to feel ready.',
  "I've done that 20 times now. I haven't cancelled once.",
  "By session twelve I stopped checking how many calories I burned. By session twenty I realised it became about being someone who doesn't quit.",
]

const GetFitStory = () => {
  return (
    <section className="bg-white px-5 pt-12 pb-16 sm:px-8 md:pt-18 md:pb-18">
      <div className="mx-auto w-full max-w-[1088px]">
        <h2 className="hidden text-center text-[25px] leading-tight font-extrabold text-[#202124] md:block">
          How FitCall changed my life
        </h2>

        <div className="mx-auto mt-0 grid max-w-[1088px] items-start gap-6 md:mt-5 md:justify-items-center md:gap-8 md:px-3 lg:grid-cols-[470px_minmax(0,520px)] lg:justify-between lg:justify-items-stretch lg:gap-9">
          <div className="md:hidden">
            <span className="inline-flex rounded-full bg-[#E8F5FD] px-3 py-1 text-[10px] font-medium text-[#005B8F]">
              Frank&apos;s Story
            </span>
            <h2 className="mt-4 text-[31px] leading-[0.93] font-extrabold text-[#1F1F1F]">
              How FitCall changed my life
            </h2>
            <h3 className="mt-6 max-w-[250px] text-[31px] leading-[1.02] font-extrabold text-[#1F1F1F]">
              &ldquo;I stopped quitting the day my trainer called&rdquo;
            </h3>
          </div>

          <div className="w-full max-w-[540px] overflow-hidden rounded-[14px] md:rounded-[16px] lg:max-w-none">
            <Image
              src="/images/ads/get-fit-story.png"
              alt="Person training at home during a FitCall session"
              width={540}
              height={526}
              sizes="(max-width: 1023px) 100vw, 470px"
              className="aspect-[270/263] h-auto w-full object-cover"
            />
          </div>

          <article className="w-full max-w-[540px] rounded-[14px] border border-[#E5E5E5] bg-white px-5 py-5 md:rounded-[16px] md:px-6 md:py-5 lg:min-h-[500px] lg:max-w-none">
            <span className="hidden text-[13px] font-semibold text-[#005B8F] md:block">
              Frank&apos;s Story
            </span>
            <h3 className="hidden text-[24px] leading-[1.08] font-extrabold text-[#202124] md:mt-2 md:block">
              &ldquo;I stopped quitting the day my trainer called&rdquo;
            </h3>

            <div className="space-y-6 text-[15px] leading-[1.32] text-[#6B6B6B] md:mt-4 md:space-y-8 md:text-[15px] md:leading-[1.38]">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-12 grid items-start gap-8 min-[480px]:justify-items-center md:mt-24 md:px-3 lg:grid-cols-[minmax(0,430px)_370px] lg:justify-between lg:justify-items-stretch">
          <div className="max-w-[330px] min-[480px]:mx-auto min-[480px]:max-w-[620px] min-[480px]:text-center lg:mx-0 lg:max-w-[420px] lg:text-left">
            <h2 className="text-[31px] leading-[0.96] font-extrabold text-[#202124] md:text-[38px] md:leading-[0.98]">
              Book a trainer today.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.32] text-[#6F6F6F] min-[480px]:mx-auto min-[480px]:max-w-[560px] min-[480px]:leading-[1.36] md:text-[15px] lg:mx-0 lg:max-w-[390px] lg:leading-[1.28]">
              Stop restarting. Stop promising yourself &ldquo;next week.&rdquo;
              Kindly fill the form and download FitCall today.
            </p>
          </div>

          <LeadForm
            formId="story-lead"
            compact
            className="w-full max-w-[370px] min-[480px]:mx-auto min-[480px]:max-w-[560px] md:pt-0 lg:mx-0 lg:max-w-[370px]"
          />
        </div>
      </div>
    </section>
  )
}

export default GetFitStory
