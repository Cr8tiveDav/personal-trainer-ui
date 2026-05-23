import CTASection from '@/components/homepage/Cta';
import HowItWorks from '@/components/homepage/HowItWorks';
import React from 'react';

const HowItWorksPage = () => {
  return (
    <main className="w-full bg-secondary pt-24 md:pt-28">
      <HowItWorks className="pt-8 md:pt-10" />
      <CTASection/>
    </main>
  );
};

export default HowItWorksPage;
