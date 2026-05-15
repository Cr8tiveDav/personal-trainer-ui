'use client';

import React from 'react';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionHeader from '../ui/SectionHeader';

const stories = [
  {
    name: "Susan's Story",
    quote: 'I stopped watching other people workout',
    image: '/images/landing-page/success1.png',
    paragraphs: [
      'I had 47 saved workout videos on TikTok. Pilates for beginners. 20-minute home HIIT. Do this every morning and your life will change. I watched none of them.',
      "I wasn't lazy. I kept thinking I needed the perfect routine and time. So I kept saving.",
      'My friend sent me FitCall on a Tuesday night. I signed up mostly to stop her from sending me things. Wednesday morning, 7am - my phone rang. Not a notification. An actual call.',
      'It was my trainer. I was half-asleep but she was already warmed up. I had no excuses. We trained for 35 minutes.',
    ],
    footer: "I still have 47 saved videos I haven't opened.",
  },
  {
    name: 'Frank’s Story',
    quote: 'I stopped quitting the day my trainer called',
    image: '/images/landing-page/success-2.png',
    paragraphs: [
      "I wasn't unfit. I was just inconsistent. Gym membership, long forms, guilt, repeat. I had the intention every single Sunday. By Wednesday it was gone.",
      'I used to save workout routines at 1am like that was the same as doing them. Downloaded apps, bought a resistance band I used twice. I was really good at starting.',
      'Then my trainer called. Not a push notification. An actual video call at 6:30am. He was already moving, no waiting for me to feel ready.',
      "I've done that 20 times now. I haven't cancelled once.",
    ],
    footer:
      "By session twenty I realised it became about being someone who doesn't quit.",
  },
];

const SuccessStory = () => {
  return (
    <section className='w-full pb-14 md:mt-24'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <SectionHeader
          title='How FitCall changed my life'
          className='mb-8 md:mb-14'
        />

        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          slidesPerView={1}
          loop={stories.length > 2}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            bulletActiveClass: 'custom-bullet-active',
          }}
          className='pb-4 [&_.swiper-pagination]:relative! [&_.swiper-pagination]:mt-8! [&_.swiper-pagination]:bottom-auto!'
        >
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              <div className='w-full'>
                <div className='mb-6 text-left'>
                  <span className='text-lg font-medium tracking-wide text-primary'>
                    {story.name}
                  </span>
                  <h3 className='mt-2 text-xl font-bold text-muted-foreground md:text-2xl'>
                    &ldquo;{story.quote}&rdquo;
                  </h3>
                </div>

                <div className='grid grid-cols-1 gap-8 px-2 md:grid-cols-2 lg:gap-20'>
                  <div className='relative min-h-75 w-full md:min-h-100'>
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className='rounded-xl object-cover'
                      priority={index === 0}
                    />
                  </div>

                  <div className='flex flex-col justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:p-8'>
                    <div className='space-y-6 text-base leading-relaxed text-muted'>
                      {story.paragraphs.map((text, pIndex) => (
                        <p key={pIndex}>{text}</p>
                      ))}
                      <p className='font-semibold text-gray-400'>
                        {story.footer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStory;
