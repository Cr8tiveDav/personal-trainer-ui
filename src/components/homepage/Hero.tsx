'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section className='relative w-full overflow-hidden pt-28 md:pt-48'>
      <div
        className='absolute inset-0 z-0 opacity-[0.03]'
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className='absolute -left-20 top-0 h-200 w-150 rounded-full bg-[#C2DCFF]/70 blur-[120px]'></div>
      <div className='absolute -right-20 top-0 h-200 w-150 rounded-full bg-[#F5D9C0]/70 blur-[120px]'></div>

      <div className='container relative z-10 mx-auto px-4'>
        <div className='flex flex-col items-center text-center'>
          <div className='mb-6 inline-flex items-center rounded-full border border-primary bg-primarybadge px-4 py-1.5 text-xs font-semibold text-primary shadow-sm'>
            <span className='mr-2 h-2 w-2 animate-pulse rounded-full bg-primary'></span>
            Live Trainer Accountability
          </div>

          <h1 className='mb-6 max-w-4xl text-4xl font-bold tracking-tight text-muted-foreground sm:text-5xl md:text-6xl lg:text-[69px]'>
            Stay Consistent With Real{' '}
            <span className='relative m-2 inline-block bg-primary rounded-md text-5xl px-4 pb-1.5 text-white'>
              Trainers
            </span>
          </h1>

          <p className='mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl'>
            FitCall pairs you with a real trainer who calls you for every
            session. Real accountability and structured workouts.
          </p>

          <div className='mb-16 flex flex-col items-center gap-4 sm:flex-row'>
            <Button asChild size='lg'>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-3'
              >
                <Image
                  src='/images/landing-page/apple.svg'
                  alt='Apple'
                  width={24}
                  height={24}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div className='text-left'>
                  <p className='text-[12px] font-bold leading-none opacity-80'>
                    Download on App Store
                  </p>
                </div>
              </Link>
            </Button>

            <Button asChild variant='outline' size='lg' className='bg-white'>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-3'
              >
                <Image
                  src='/images/landing-page/google-play.svg'
                  alt='Playstore'
                  width={24}
                  height={24}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div className='text-left'>
                  <p className='text-[12px] font-bold leading-none opacity-80'>
                    Download on PlayStore
                  </p>
                </div>
              </Link>
            </Button>
          </div>

          <div className='relative h-75 w-full md:h-194'>
            <Image
              src='/images/landing-page/hero.png'
              alt='Landing Page Hero'
              fill
              sizes='100vw'
              loading='eager'
              className='w-full rounded-4xl object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
