'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const CTASection = ({ className }: { className?: string }) => {
  const handleDownloadRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Store links
    const iosLink = 'https://apps.apple.com/app/your-app-id';
    const androidLink =
      'https://play.google.com/store/apps/details?id=your.package.id';

    // Check for iPhone/iPad
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Check for Android
    const isAndriod = /android/i.test(userAgent);

    if (isIOS) {
      window.open(iosLink, '_blank', 'noopener,noreferrer');
    } else if (isAndriod) {
      window.open(androidLink, '_blank', 'noopener,noreferrer');
    } else {
      // Handle desktop or unsupported platforms
      alert(
        'Please visit this page on your mobile device to download the app.'
      );
    }
  };

  return (
    <section className={cn('bg-white py-20', className)}>
      <div className='container mx-auto px-4'>
        <div className='relative overflow-hidden rounded-lg bg-linear-to-br from-primary via-[#063660] to-[#0C6FC6] px-6 py-16 text-center text-white md:py-24'>
          <div className='relative z-10 mx-auto w-full max-w-2xl'>
            <h2 className='text-2xl font-bold leading-[1.1] tracking-tight md:text-4xl'>
              Stop skipping workouts. Start showing up.
            </h2>

            <p className='mx-auto mt-6 max-w-xl text-base text-blue-100 md:text-lg'>
              Your trainer will show up. So should you. Book your free session
              and feel the difference one phone call makes.
            </p>

            <Button
              onClick={handleDownloadRedirect}
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
