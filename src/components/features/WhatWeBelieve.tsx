import Image from 'next/image';

const beliefs = [
  {
    icon: '/images/features/user.svg',
    title: 'Real trainer accountability',
    content:
      'Stay committed with trainers who expect you to show up and guide you through every session.',
  },
  {
    icon: '/images/features/calendar-check.svg',
    title: 'Flexible session scheduling',
    content:
      'Book sessions that fit your lifestyle so fitness becomes sustainable, not stressful.',
  },
  {
    icon: '/images/features/video-camera.svg',
    title: 'Live guided workouts',
    content:
      'Train in real-time with personalized guidance, corrections, and motivation.',
  },
  {
    icon: '/images/features/person-arms-spread.svg',
    title: 'Personalized coaching',
    content: 'Get support tailored to your goals, pace, and fitness level.',
  },
  {
    icon: '/images/features/bell.svg',
    title: 'Session reminders',
    content:
      'Stay on track with timely reminders that help you build consistent habits.',
  },
  {
    icon: '/images/features/trend-up.svg',
    title: 'Feedback & progress tracking',
    content:
      'Track your sessions, celebrate wins, and stay motivated through visible progress.',
  },
];

const WhatWeBelieve = () => {
  return (
    <section className='w-full bg-white'>
      <div className='container mx-auto min-h-172.5 px-4 py-8 flex flex-col items-center justify-center'>
        <h2 className='mb-6 font-semibold text-[32px]'>What we believe</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {beliefs.map((item, index) => (
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
      </div>
    </section>
  );
};

export default WhatWeBelieve;
