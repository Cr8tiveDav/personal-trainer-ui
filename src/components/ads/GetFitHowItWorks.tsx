import LeadForm from './LeadForm';

const steps = [
  {
    number: '1',
    title: 'Get matched with a trainer',
    copy: 'We pair you with a vetted fitness trainer whose specialty and style fits your goals.',
  },
  {
    number: '2',
    title: 'Pick your schedule',
    copy: 'Choose the days and times that work for your lifestyle. Morning, evening - you decide when you train.',
  },
  {
    number: '3',
    title: 'Your trainer calls you',
    copy: 'At your scheduled time, your trainer initiates the video call. No logging in, no excuses - just show up.',
  },
];

const GetFitHowItWorks = () => {
  return (
    <section className='bg-[#F7F7F7] px-5 pt-8 pb-10 sm:px-8 md:pt-14 md:pb-12'>
      <div className='mx-auto w-full max-w-[1088px]'>
        <div className='mx-auto max-w-[650px] text-center'>
          <span className='inline-flex rounded-full bg-[#E8F5FD] px-3 py-1 text-[10px] font-semibold text-[#005B8F] md:text-[11px]'>
            How it Works
          </span>
          <h2 className='mx-auto mt-4 max-w-[610px] text-[31px] leading-[1.45] font-extrabold text-[#202124] md:mt-5 md:text-[49px] md:leading-[0.96]'>
            Consistency has never been this simple
          </h2>
        </div>

        <div className='mx-auto mt-8 grid max-w-[820px] gap-5 md:mt-12 md:grid-cols-3 md:gap-8'>
          {steps.map((step) => (
            <article
              key={step.number}
              className='relative rounded-[14px] border border-[#E8E8E8] bg-white px-6 pt-11 pb-8 text-center md:min-h-[137px] md:px-6 md:pt-10 md:pb-6'
            >
              <span className='absolute top-4 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#DCEFF7] text-[10px] font-bold text-[#005B8F] md:h-5 md:w-5 md:text-[9px]'>
                {step.number}
              </span>
              <h3 className='text-[13px] leading-tight font-semibold text-[#111111] md:text-[12px]'>
                {step.title}
              </h3>
              <p className='mx-auto mt-3 max-w-[210px] text-[11px] leading-[1.5] text-[#4F4F4F] md:text-[10px] md:leading-[1.55]'>
                {step.copy}
              </p>
            </article>
          ))}
        </div>

        <div className='mt-9 grid items-start gap-8 min-[480px]:justify-items-center md:mt-18 md:px-1 lg:grid-cols-[minmax(0,620px)_370px] lg:justify-between lg:justify-items-stretch'>
          <div className='max-w-[380px] min-[480px]:mx-auto min-[480px]:max-w-[700px] min-[480px]:text-center lg:mx-0 lg:max-w-[620px] lg:text-left'>
            <h2 className='text-[31px] leading-[0.92] font-extrabold text-[#3A3A3A] md:text-[40px] md:leading-[0.92]'>
              Growth through consistency, and accountability.
            </h2>
            <p className='mt-3 text-[15px] leading-[1.38] text-[#6D6D6D] min-[480px]:mx-auto min-[480px]:max-w-[650px] min-[480px]:leading-[1.38] md:text-[17px] lg:mx-0 lg:max-w-[540px] lg:leading-[1.32]'>
              FitCall isn&apos;t a gym. It isn&apos;t an app. It&apos;s the
              person in your corner who calls when it matters. Kindly fill the
              form and download FitCall today.
            </p>
          </div>

          <LeadForm
            formId='how-it-works-lead'
            compact
            className='w-full max-w-[370px] min-[480px]:mx-auto min-[480px]:max-w-[560px] md:pt-0 lg:mx-0 lg:max-w-[370px]'
          />
        </div>
      </div>
    </section>
  );
};

export default GetFitHowItWorks;
