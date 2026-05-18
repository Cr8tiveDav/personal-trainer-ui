import Experience from '@/components/features/Experience';
import Hero from '@/components/features/Hero';
import HumanSide from '@/components/features/HumanSide';
import WhatWeBelieve from '@/components/features/WhatWeBelieve';
import WhyFitCall from '@/components/features/WhyFitCall';
import CTASection from '@/components/homepage/Cta';

const FeaturesPage = () => {
  return (
    <main className='w-full bg-secondary'>
      <Hero />
      <WhyFitCall />
      <WhatWeBelieve />
      <HumanSide />
      <Experience />
      <CTASection className='py-0' />
    </main>
  );
};

export default FeaturesPage;
