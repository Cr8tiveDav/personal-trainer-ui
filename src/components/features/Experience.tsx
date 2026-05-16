import SectionHeader from '../ui/SectionHeader';
import Image from 'next/image';

const experience = [
  {
    icon: '/images/features/magnifying-glass.svg',
    title: 'Discover trainers',
    content: 'Browse certified coaches by goal, style, and schedule.',
  },
  {
    icon: '/images/features/calendar-check.svg',
    title: 'Book a session',
    content: 'Pick a time that fits — mornings, lunch, or after work.',
  },
  {
    icon: '/images/features/phone-call.svg',
    title: 'Join the live call',
    content: 'Train one-on-one over Zoom or WhatsApp, anywhere.',
  },
  {
    icon: '/images/features/trend-up.svg',
    title: 'Track your progress',
    content: 'See your streaks, sessions, and milestones grow.',
  },
];

const Experience = () => {
  return (
    <section className='w-full bg-white md:py-24'>
      <div className='container mx-auto max-w-4xl py-8 flex flex-col items-center justify-center'>
        <SectionHeader
          badge='Experience'
          title='Simple enough to use every day.'
          description='Four steps from couch to consistent — designed to feel calm, never overwhelming.'
          align='center'
          className='mb-10'
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10 gap-4'>
          {experience.map((item, index) => (
            <div
              key={index}
              className='rounded-2xl border border-[#EBEBEB] bg-white p-6'
            >
              <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primarybadge'>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={24}
                  sizes='24px'
                  height={24}
                  className='h-6 w-6'
                />
              </div>
              <h3 className='mb-3 text-lg font-semibold text-muted-foreground'>
                {item.title}
              </h3>
              <p className='text-sm leading-relaxed text-muted md:text-base'>
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className='container mx-auto max-w-5xl px-0! grid grid-cols-1 md:grid-cols-2 md:py-8 gap-6 lg:gap-8 items-stretch'>
          <div className='w-full rounded-lg overflow-hidden h-81 md:h-140.5'>
            <Image
              src='/images/features/woman-planking.png'
              alt='Woman Planking'
              width={615}
              height={562}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='w-full flex flex-col justify-center h-full bg-white px-4 py-6 md:p-8 border border-[#EBEBEB] md:border-none rounded-xl'>
            <h2 className='text-2xl lg:text-3xl font-bold tracking-tight text-muted-foreground mb-6'>
              Built around real life, 
              <span className='text-primary'>not perfect schedules.</span>
            </h2>
            <p className='text-muted text-xl leading-tight mb-6 opacity-90'>
              Whether you have 20 minutes before work or an hour at lunch,
              FitCall makes it easy to show up — and your trainer makes it worth
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
