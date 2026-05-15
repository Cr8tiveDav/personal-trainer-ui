import CTASection from '@/components/homepage/Cta';
import HowItWorks from '@/components/homepage/HowItWorks';
import React from 'react';

const HowItWorksPage = () => {
  return (
    <main className="w-full bg-secondary pt-28 md:pt-48">
      <HowItWorks />
      <CTASection/>
    </main>
  );
};

export default HowItWorksPage;
