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
    id: 'overview',
    label: '1. Overview',
    title: '1. Overview',
    content: (
      <p className='text-sm leading-relaxed text-muted'>
        FitCall.me is a marketplace connecting fitness enthusiasts (“Clients”)
        with independent personal trainers (“Trainers”). We provide the
        platform for discovery, scheduling, video integration, and payment
        processing.
      </p>
    ),
  },
  {
    id: 'security',
    label: '2. User Accounts & Security',
    title: '2. User Accounts & Security',
    content: (
      <div className='space-y-4 pl-4 text-sm leading-relaxed text-muted'>
        <p>
          • You must be at least 18 years old to use FitCall.me.
        </p>
        <p>
          • You are responsible for maintaining the confidentiality of your
          account credentials.
        </p>
        <p>
          • We use Google OAuth for authentication; you are responsible for
          the security of your Google account.
        </p>
      </div>
    ),
  },
  {
    id: 'booking',
    label: '3. Booking & Rescheduling',
    title: '3. Session Booking & Rescheduling Policy',
    content: (
      <div className='space-y-4 pl-4 text-sm leading-relaxed text-muted'>
        <p>
          • <span className='font-bold text-muted-foreground'>Booking:</span>{' '}
          All sessions are 60 minutes in duration.
        </p>
        <p>
          •{' '}
          <span className='font-bold text-muted-foreground'>
            Rescheduling:
          </span>{' '}
          Clients may reschedule sessions up to 12 hours prior to the
          scheduled start time.
        </p>
        <p>
          • <span className='font-bold text-muted-foreground'>Forfeiture:</span>{' '}
          If a cancellation or reschedule is requested within the 12-hour
          window, the session is forfeited, and no refund will be issued.
        </p>
        <p>
          •{' '}
          <span className='font-bold text-muted-foreground'>
            Trainer No-Show:
          </span>{' '}
          If a Trainer fails to join a scheduled session within 15 minutes of
          the start time, the Client is entitled to a full credit for that
          session.
        </p>
      </div>
    ),
  },
  {
    id: 'payments',
    label: '4. Payments & Commissions',
    title: '4. Payments, Subscriptions, & Commissions',
    content: (
      <div className='space-y-4 pl-4 text-sm leading-relaxed text-muted'>
        <p>
          • <span className='font-bold text-muted-foreground'>Payments:</span>{' '}
          Payments are processed via secure in-app payment providers
          (Apple/Google).
        </p>
        <p>
          • <span className='font-bold text-muted-foreground'>Commission:</span>{' '}
          FitCall.me operates on a 50/50 revenue-share model after platform
          marketplace fees are deducted.
        </p>
        <p>
          • <span className='font-bold text-muted-foreground'>Refunds:</span>{' '}
          All sales are final. We do not provide cash refunds for unused
          sessions, but we do offer credits for technical service failures as
          outlined in our Dispute Resolution policy.
        </p>
      </div>
    ),
  },
  {
    id: 'disputes',
    label: '5. Dispute Resolution',
    title: '5. Dispute Resolution',
    content: (
      <>
        <p className='text-sm leading-relaxed text-muted'>
          If a disagreement arises regarding session quality, behavior, or
          technical issues:
        </p>
        <div className='space-y-4 pl-4 text-sm leading-relaxed text-muted'>
          <p>
            • Users must report the incident via the platform within 24 hours of
            the session.
          </p>
          <p>
            • FitCall.me administration will review the session logs and
            communication history.
          </p>
          <p>
            • Admin decisions regarding credits or account standing are final.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'vetting',
    label: '6. Trainer Relationship',
    title: '6. Trainer Vetting & Relationship',
    content: (
      <>
        <p className='text-sm leading-relaxed text-muted'>
          FitCall.me serves as an intermediary. Trainers are independent
          contractors, not employees.
        </p>
        <p className='text-sm leading-relaxed text-muted'>
          While we vet all trainers for professional certification, FitCall.me
          is not liable for the specific workout outcomes or injuries
          sustained during sessions. Clients should consult a physician
          before beginning any new fitness regimen.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    label: '7. Limitation of Liability',
    title: '7. Limitation of Liability',
    content: (
      <p className='text-sm leading-relaxed text-muted'>
        To the maximum extent permitted by law, FitCall.me shall not be liable
        for any indirect, incidental, or consequential damages resulting from
        your use of the platform.
      </p>
    ),
  },
  {
    id: 'changes',
    label: '8. Changes to Terms',
    title: '8. Changes to Terms',
    content: (
      <p className='text-sm leading-relaxed text-muted'>
        We may update these terms periodically. Continued use of the platform
        constitutes acceptance of the updated terms.
      </p>
    ),
  },
];

export default function TermsOfServiceContent() {
  return (
    <LegalPageLayout
      title='Terms of Service'
      subtitle='Last Updated: June 2026'
      introduction={
        <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
          Welcome to FitCall.me. By accessing our platform, you agree to be
          bound by these Terms of Service. If you do not agree, please do not
          use our services.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
