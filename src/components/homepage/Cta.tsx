'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const APP_STORE_URL = 'https://apps.apple.com/app/fitcall/id123456789'; // TODO: replace with real App Store ID
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=net.emerj.fitcall';

const CTASection = ({ className }: { className?: string }) => {
  const handleDownload = () => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // iOS → App Store, everything else (Android + desktop) → Play Store
    const url = isIOS ? APP_STORE_URL : PLAY_STORE_URL;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={cn('bg-white py-20', className)}>
      <div className='container mx-auto px-4'>
        <div className='relative overflow-hidden rounded-[8px] bg-linear-to-br from-primary via-[#063660] to-[#0C6FC6] px-6 py-16 text-center text-white md:py-24'>
          <div className='relative z-10 mx-auto w-full max-w-2xl'>
            <h2 className='text-2xl font-bold leading-[1.1] tracking-tight md:text-4xl'>
              Stop skipping workouts. Start showing up.
            </h2>

            <p className='mx-auto mt-6 max-w-xl text-base text-blue-100 md:text-lg'>
              Your trainer will show up. So should you. Book your free session
              and feel the difference one phone call makes.
            </p>

            <Button
              onClick={handleDownload}
              className='mt-10 h-auto min-h-11 w-full max-w-75 bg-white px-6 py-3 font-bold text-primary transition-transform hover:scale-105 hover:bg-blue-50 hover:text-blue-900 active:scale-95 sm:w-auto sm:min-w-75'
            >
              Download FitCall
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
