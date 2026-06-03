import React from 'react';
import { Metadata } from 'next';
import FAQSection from '@/components/homepage/Faq';

export const metadata: Metadata = {
  title: 'Help Centre - FitCall',
  description:
    'Find answers to frequently asked questions and get help with FitCall.me.',
};

const HelpCentrePage = () => {
  return (
    <main className='w-full min-h-screen bg-transparent pt-28 md:pt-40 pb-20'>
      <div className='container max-w-5xl px-4 mx-auto'>
        {/* Centralized Header Section */}
        <div className='mb-16 text-center'>
          <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight mb-2.5 text-muted-foreground'>
            Help Centre
          </h1>
          <p className='text-sm text-muted max-w-xl mx-auto'>
            Have questions? We’re here to help. Explore our frequently asked
            questions below.
          </p>
        </div>

        {/* FAQ Component */}
        <FAQSection
          badge='FAQ'
          title='Frequently Asked Questions'
          description='Everything you need to know about FitCall.me.'
        />
      </div>
    </main>
  );
};

export default HelpCentrePage;
