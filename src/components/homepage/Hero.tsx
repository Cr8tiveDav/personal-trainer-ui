'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section className='relative w-full overflow-hidden pt-28 md:pt-32 md:h-[1290px]'>
      <div
        className='absolute inset-0 z-0 opacity-[0.03]'
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="absolute -left-20 top-0 h-200 w-150 rounded-full bg-[#C2DCFF]/30 blur-[120px]"></div>
      <div className="absolute -right-20 top-0 h-200 w-150 rounded-full bg-[#F5D9C0]/30 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center rounded-full border border-primary px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary"></span>
            Live Trainer Accountability
          </div>

          <h1 className='max-w-3xl text-4xl font-bold  text-muted-foreground sm:text-5xl md:text-5xl lg:text-6xl'>
            Stay Consistent With Real{' '}
            <span className='relative m-2 inline-block bg-[#0F4F80] rounded-md text-5xl px-4 md:text-4xl lg:text-5xl pb-1.5 text-white'>
              Trainers
            </span>
          </h1>

          <p className='max-w-xl lg:text-lg leading-relaxed text-muted'>
            FitCall pairs you with a real trainer who calls you for every
            session. Real accountability and structured workouts.
          </p>

          <div className='flex flex-col items-center gap-2 sm:flex-row'>
  <Button asChild size='lg'>
    <Link href='#' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3'>
      <Image src='/images/landing-page/apple.svg' alt='Apple' width={16} height={16} />
      Download on App Store
    </Link>
  </Button>

  <Button asChild size='lg' variant='outline'>
    <Link href='#' target='_blank' rel='noopener noreferrer' className='flex items-center gap-3'>
      <Image src='/images/landing-page/google-play.svg' alt='Playstore' width={16} height={16} />
      Download on PlayStore
    </Link>
  </Button>
</div>

          <div className='relative h-75 w-full md:h-194 mt-4'>
            <Image
              src='/images/landing-page/hero.png'
              alt='Landing Page Hero'
              fill
              sizes='100vw'
              loading='eager'
              className='w-full rounded-2xl object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
