'use client';

import Image from 'next/image';
import { Button } from '../ui/button';

const Hero = () => {
  const handleDownloadRedirect = (platform: 'ios' | 'android') => {
    const userAgent = navigator.userAgent || navigator.vendor;

    const iosLink = 'https://apps.apple.com/app/your-app-id';
    const androidLink =
      'https://play.google.com/store/apps/details?id=your.package.id';

    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const isAndroid = /android/i.test(userAgent);

    if (platform === 'ios') {
      if (isIOS) {
        window.open(iosLink, '_blank', 'noopener,noreferrer');
      } else {
        alert(
          'Please visit this page on your mobile device to download the app.'
        );
      }
    } else {
      if (isAndroid) {
        window.open(androidLink, '_blank', 'noopener,noreferrer');
      } else {
        alert(
          'Please visit this page on your mobile device to download the app.'
        );
      }
    }
  };

  return (
    <section className='relative w-full overflow-hidden pt-28 md:pt-32 md:h-[1290px]'>
      <div
        className='absolute inset-0 z-0 opacity-[0.03]'
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className='absolute -left-20 top-0 h-200 w-150 rounded-[9999px] bg-[#C2DCFF]/30 blur-[120px]'></div>
      <div className='absolute -right-20 top-0 h-200 w-150 rounded-[9999px] bg-[#F5D9C0]/30 blur-[120px]'></div>

      <div className='container relative z-10 mx-auto px-4'>
        <div className='flex flex-col items-center text-center gap-3'>
          <div className='inline-flex items-center rounded-[9999px] border border-primary px-4 py-1.5 text-xs font-semibold text-primary shadow-sm'>
            <span className='mr-2 h-2 w-2 animate-pulse rounded-[9999px] bg-primary'></span>
            Live Trainer Accountability
          </div>

          <h1 className='max-w-4xl text-3xl font-bold  text-muted-foreground sm:text-5xl md:text-5xl lg:text-6xl'>
            Get A Personal Trainer Who Helps You Achieve Your Fitness{' '}
            <span className='relative m-2 inline-block bg-[#0F4F80] rounded-[6px] text-2xl px-4 md:text-4xl lg:text-5xl md:pb-1.5 text-white'>
              Goals
            </span>
          </h1>

          <p className='max-w-2xl lg:text-lg leading-relaxed text-muted'>
            FitCall connects you with a dedicated personal trainer who helps you
            achieve your fitness goals through live coaching, accountability,
            and personalised support.
          </p>

          <div className='flex flex-col items-center gap-2 sm:flex-row'>
            <Button
              size='lg'
              onClick={() => handleDownloadRedirect('ios')}
              className='flex items-center gap-3 cursor-pointer'
            >
              <Image
                src='/images/landing-page/apple.svg'
                alt='Apple'
                width={16}
                height={16}
              />
              Download on App Store
            </Button>

            <Button
              size='lg'
              variant='outline'
              onClick={() => handleDownloadRedirect('android')}
              className='flex items-center gap-3 cursor-pointer'
            >
              <Image
                src='/images/landing-page/google-play.svg'
                alt='Playstore'
                width={16}
                height={16}
              />
              Download on PlayStore
            </Button>
          </div>

          <div className='relative h-75 w-full md:h-194 mt-4'>
            <Image
              src='/images/landing-page/hero.png'
              alt='Landing Page Hero'
              fill
              sizes='100vw'
              loading='eager'
              className='w-full rounded-[16px] object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
