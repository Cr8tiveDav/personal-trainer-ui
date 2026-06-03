'use client';

import React from 'react';
import LegalPageLayout, { LegalSection } from './LegalPageLayout';

const SECTIONS: LegalSection[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    content: null,
  },
  {
    id: 'collection',
    label: '1. Information We Collect',
    title: '1. Information We Collect',
    content: (
      <>
        <p className='text-sm leading-relaxed text-muted'>
          To provide our services, we collect:
        </p>
        <div className='space-y-4 pl-4'>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold text-muted-foreground block mb-0.5'>
              Account Information
            </span>
            Name, email address, and profile photo (via Google Authentication).
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold text-muted-foreground block mb-0.5'>
              Booking Data
            </span>
            Session dates, times, and trainer selection records.
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold text-muted-foreground block mb-0.5'>
              Usage Data
            </span>
            How you interact with the platform, session history, and device
            information to improve site performance.
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold text-muted-foreground block mb-0.5'>
              Payment Information
            </span>
            We do not store your full credit card details. Payments are processed
            through secure third-party providers (Apple/Google Pay), which handle
            your financial data according to their own privacy policies.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'usage',
    label: '2. How We Use Your Data',
    title: '2. How We Use Your Data',
    content: (
      <>
        <p className='text-sm leading-relaxed text-muted'>
          We use your information solely to:
        </p>
        <ul className='list-disc pl-5 space-y-2 text-sm leading-relaxed'>
          <li>Facilitate your connection with Trainers.</li>
          <li>Manage session scheduling, reminders, and notifications.</li>
          <li>Process payments and payouts.</li>
          <li>Maintain platform security and resolve disputes.</li>
          <li>Improve user experience based on platform analytics.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'sharing',
    label: '3. Data Sharing & Disclosure',
    title: '3. Data Sharing & Disclosure',
    content: (
      <>
        <p className='text-sm leading-relaxed text-muted'>
          We do not sell your personal data. We only share information in
          the following circumstances:
        </p>
        <div className='space-y-4 pl-4'>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold text-muted-foreground block mb-0.5'>
              With Trainers
            </span>
            We share the Client’s name and contact information only with
            the trainer they have booked, to facilitate the training
            session.
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold text-muted-foreground block mb-0.5'>
              Service Providers
            </span>
            We may use third-party tools (e.g., messenger for video,
            hosting providers) that require limited access to data to
            function correctly.
          </p>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold text-muted-foreground block mb-0.5'>
              Legal Requirements
            </span>
            If required by law or to protect the safety of our users, we
            may disclose data to relevant authorities.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'security',
    label: '4. Data Security',
    title: '4. Data Security',
    content: (
      <p className='text-sm leading-relaxed'>
        We employ industry-standard security measures (encryption and
        secure server hosting via Netlify/GitHub) to protect your data.
        However, no internet-based service is 100% secure, and we
        encourage you to protect your login credentials.
      </p>
    ),
  },
];

export default function PrivacyPolicyContent() {
  return (
    <LegalPageLayout
      title='Privacy Policy'
      subtitle='Last Updated: June 2026'
      introduction={
        <>
          <p className='text-sm md:text-base leading-relaxed text-muted-foreground mb-4 font-semibold'>
            This Privacy Policy for FitCall.me is designed to be transparent,
            compliant with standard data protection principles (relevant to
            US/UK/International users), and professional.
          </p>
          <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
            At FitCall.me, we respect your privacy and are committed to
            protecting the personal information you share with us. This
            policy outlines how we collect, use, and safeguard your data.
          </p>
        </>
      }
      sections={SECTIONS}
    />
  );
}
