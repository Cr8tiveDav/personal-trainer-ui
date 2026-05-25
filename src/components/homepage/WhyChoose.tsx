'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import SectionHeader from '../ui/SectionHeader';
import { AnimatePresence, motion } from 'motion/react';

interface Feature {
  icon: string;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    icon: '/images/landing-page/icons/ve.png',
    title: 'Verified Coaches',
    description: 'All trainers are verified and experienced professionals',
    image: '/images/landing-page/phone-frame1.png',
  },
  {
    icon: '/images/landing-page/icons/pe.png',
    title: 'Personalized Coaching',
    description: 'Get customized guidance built around your goals',
    image: '/images/landing-page/phone-frame2.png',
  },
  {
    icon: '/images/landing-page/icons/flex.png',
    title: 'Flexible & Convenient',
    description: 'Choose coaches that fit your schedule and lifestyle',
    image: '/images/landing-page/phone-frame3.png',
  },
  {
    icon: '/images/landing-page/icons/las.png',
    title: 'Lasting Results',
    description: 'Build healthy habits with support and accountability',
    image: '/images/landing-page/phone-frame4.png',
  },
];

const WhyChoose = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className='w-full py-20'>
      <div className='container'>
        <SectionHeader
          badge='WHY CHOOSE FITCALL?'
          title='Coaching that fits your lifestyle'
          className='mb-6 md:mb-10'
          align='center'
          description='Every session has sets, reps, rest times, and a video demo. No gym floor confusion — open the app and follow.'
        />
        <div className='flex flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-12'>
          
          {/* Left Side: Phone Image */}
          <div className='relative h-[350px] w-full sm:h-[450px] md:h-[550px] md:w-1/2'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='relative h-full w-full'
              >
                <Image
                  src={features[activeIndex].image}
                  alt={`App Interface ${activeIndex + 1}`}
                  fill
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority
                  className='object-contain object-center drop-shadow-2xl'
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Features List */}
          <div className='w-full md:w-1/2 md:pl-12'>
            <div className='flex flex-col gap-3 py-4'>
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className='relative flex cursor-pointer items-center px-4'
                  >
                    {isActive && (
                      <motion.div
                        layoutId='activeLine'
                        className='absolute left-0 top-0 hidden h-full w-1 bg-primary md:block'
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <div className='flex w-full items-center gap-4 rounded-[16px] border border-[#EBEBEB] px-4 py-4 transition-all duration-300 md:px-5 md:py-6'>
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#EBEBEB]'>
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={20}
                          height={20}
                          className='object-contain'
                        />
                      </div>
                      <div>
                        <h4 className='mb-1 lg:text-lg font-semibold text-muted-foreground'>
                          {feature.title}
                        </h4>
                        <p className='text-sm leading-snug text-muted'>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;