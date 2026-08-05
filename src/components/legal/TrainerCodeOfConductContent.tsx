'use client'

import React from 'react'
import LegalPageLayout, { LegalSection } from './LegalPageLayout'

const SECTIONS: LegalSection[] = [
  {
    id: 'introduction',
    label: 'Introduction',
    content: null,
  },
  {
    id: 'professionalism',
    label: '1. Professionalism & Punctuality',
    title: '1. Professionalism & Punctuality',
    content: (
      <div className="space-y-4 pl-4 text-sm leading-relaxed text-muted">
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Show Up On Time:
          </span>{' '}
          You are required to be in the video call at least 2 minutes before the
          scheduled start time.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">Reliability:</span>{' '}
          Punctuality is the core of our brand. Consistent tardiness is grounds
          for account review or deactivation.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Dress & Environment:
          </span>{' '}
          Maintain a professional appearance and ensure your training
          environment is clean, well-lit, and free from excessive background
          noise.
        </p>
      </div>
    ),
  },
  {
    id: 'engagement',
    label: '2. Client Engagement',
    title: '2. Client Accountability & Engagement',
    content: (
      <div className="space-y-4 pl-4 text-sm leading-relaxed text-muted">
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Be a Partner, Not Just a Coach:
          </span>{' '}
          Your goal is to keep clients consistent. Check in during the session,
          offer encouragement, and ensure they feel the value of the human
          connection.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Focus on the Goal:
          </span>{' '}
          Stay focused on the client’s fitness objectives. Avoid discussing
          unrelated personal topics that could detract from the session’s value.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Non-Discriminatory Practice:
          </span>{' '}
          Treat all clients with equal respect, regardless of their fitness
          level, background, location, or cultural identity.
        </p>
      </div>
    ),
  },
  {
    id: 'safety',
    label: '3. Safety & Liability',
    title: '3. Safety & Liability',
    content: (
      <div className="space-y-4 pl-4 text-sm leading-relaxed text-muted">
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">Safety First:</span>{' '}
          If a client exhibits signs of injury or distress, stop the session
          immediately and advise them to seek medical attention.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Scope of Practice:
          </span>{' '}
          Do not provide medical, nutritional, or clinical advice. If you are
          not a licensed nutritionist or doctor, clearly state that your
          guidance is for fitness and general wellness only.
        </p>
      </div>
    ),
  },
  {
    id: 'integrity',
    label: '4. Platform Integrity',
    title: '4. Platform Integrity',
    content: (
      <div className="space-y-4 pl-4 text-sm leading-relaxed text-muted">
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            No Off-Platform Payments:
          </span>{' '}
          All sessions must be booked and paid for through the FitCall.me
          platform. Attempting to solicit clients to pay you directly outside of
          our system is a violation of our Terms and will result in permanent
          account termination.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Communication:
          </span>{' '}
          Trainer and Clients may exchange contact information to coordinate and
          conduct training sessions. Both parties are expected to communicate
          professionally and comply with FitCall&apos;s policies at all times.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Dispute Resolution:
          </span>{' '}
          In the event of a client complaint, remain professional. You are
          required to provide your version of events to the Admin team if a
          dispute is filed.
        </p>
      </div>
    ),
  },
  {
    id: 'availability',
    label: '5. Availability & Commitment',
    title: '5. Availability & Commitment',
    content: (
      <div className="space-y-4 pl-4 text-sm leading-relaxed text-muted">
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Calendar Integrity:
          </span>{' '}
          Keep your availability updated. If you must change your availability,
          do so at least 24 hours in advance to avoid disruption to your
          clients.
        </p>
        <p>
          •{' '}
          <span className="font-bold text-muted-foreground">
            Professionalism in Cancellations:
          </span>{' '}
          If you have an emergency that prevents you from attending a session,
          notify the Admin team immediately so we can assist the client.
        </p>
      </div>
    ),
  },
  {
    id: 'zero-tolerance',
    label: '6. Zero-Tolerance Policy',
    title: '6. Zero-Tolerance Policy',
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted mb-2">
          FitCall.me maintains a zero-tolerance policy for:
        </p>
        <div className="space-y-3 pl-4 text-sm leading-relaxed text-muted">
          <p>• Harassment, bullying, or inappropriate language of any kind.</p>
          <p>• Any form of sexual solicitation or inappropriate conduct.</p>
          <p>• Theft, fraud, or misrepresentation of credentials.</p>
        </div>
      </>
    ),
  },
]

export default function TrainerCodeOfConductContent() {
  return (
    <LegalPageLayout
      title="Trainer Code of Conduct"
      subtitle="Last Updated: August 2026"
      introduction={
        <>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-4 font-semibold">
            This Trainer Code of Conduct is designed to maintain the high
            standards of FitCall.me, ensuring a professional, safe, and
            consistent environment for your international clients.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            As a vetted Trainer on the FitCall.me platform, you represent our
            global community. Your conduct directly impacts client retention,
            the reputation of our platform, and your professional growth. By
            accepting your invitation to join FitCall.me, you agree to uphold
            the following standards:
          </p>
        </>
      }
      sections={SECTIONS}
    />
  )
}
