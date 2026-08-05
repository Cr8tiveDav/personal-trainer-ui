'use client'

import React from 'react'
import LegalPageLayout, { LegalSection } from './LegalPageLayout'

const SECTIONS: LegalSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'Overview & Scope',
    content: (
      <p className="text-sm leading-relaxed text-muted">
        At FitCall.me, we respect your right to control your personal data. This
        Account Deletion Policy describes how users (including both trainers and
        clients) can request the deletion of their accounts and associated
        personal data, what data is removed, and our retention policies in
        compliance with global privacy regulations (GDPR, CCPA, and App Store
        guidelines).
      </p>
    ),
  },
  {
    id: 'how-to-request',
    label: '1. How to Initiate Deletion',
    title: '1. How to Initiate Deletion',
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted">
          You can request account deletion through several convenient methods:
        </p>
        <div className="space-y-4 pl-4 mt-2">
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-muted-foreground block mb-0.5">
              In-App Deletion
            </span>
            Log into your dashboard, go to <strong>Settings</strong>, locate the{' '}
            <strong>Danger Zone</strong> section, and click on{' '}
            <strong>Delete Account</strong>.
          </p>
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-muted-foreground block mb-0.5">
              Web-Based Deletion Request
            </span>
            If you no longer have access to the app, you can submit an account
            deletion request through our online support page or by using our
            direct contact form.
          </p>
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-muted-foreground block mb-0.5">
              Email Request
            </span>
            Send an email to{' '}
            <a
              href="mailto:support@fitcall.me"
              className="text-primary hover:underline"
            >
              support@fitcall.me
            </a>{' '}
            from the email address associated with your account. Please include
            &quot;Account Deletion Request&quot; in the subject line.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'data-deleted',
    label: '2. Data That Is Deleted',
    title: '2. Data That Is Deleted',
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted">
          Upon processing your request, we permanently remove or anonymize the
          following data from our active systems:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2 text-sm leading-relaxed text-muted">
          <li>
            <strong>Profile Credentials:</strong> Your name, email address,
            password hashes, and third-party login authorizations (e.g., Google
            Auth).
          </li>
          <li>
            <strong>Avatars & Media:</strong> Display pictures, uploaded videos,
            intro videos, and gallery assets.
          </li>
          <li>
            <strong>Booking History:</strong> Discovery slot bookings, call
            logs, and scheduling records.
          </li>
          <li>
            <strong>Trainer Profiles:</strong> Bios, specialized certifications,
            and training styles.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'retention-exceptions',
    label: '3. Data Retention & Exceptions',
    title: '3. Data Retention & Exceptions',
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted">
          We only retain data that we are legally or operationally required to
          keep:
        </p>
        <div className="space-y-4 pl-4 mt-2">
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-muted-foreground block mb-0.5">
              Financial & Transaction Logs
            </span>
            Payment history, subscription records, and payouts are kept for
            accounting, taxation, and fraud prevention purposes in accordance
            with local regulations.
          </p>
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-muted-foreground block mb-0.5">
              Backups & Server Logs
            </span>
            Backup copies of databases may persist for up to 90 days before
            being completely overwritten. During this period, your data remains
            secure and encrypted.
          </p>
          <p className="text-sm leading-relaxed">
            <span className="font-bold text-muted-foreground block mb-0.5">
              Public Content Anonymization
            </span>
            Reviews, feedback, or forum posts you submitted may be detached from
            your identity and displayed under an &quot;Anonymized User&quot;
            moniker.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'timeline',
    label: '4. Processing Timeline',
    title: '4. Processing Timeline',
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted">
          We act promptly on all data deletion requests to ensure compliance:
        </p>
        <ul className="list-disc pl-5 mt-2 text-sm leading-relaxed text-muted">
          <li>
            <strong>Immediate Action:</strong> Your account is immediately
            deactivated, revoking all login permissions and active session
            tokens.
          </li>
          <li>
            <strong>Completion Window:</strong> Full database removal and media
            deletion are completed within thirty (30) days.
          </li>
          <li>
            <strong>Confirmation:</strong> We will send a confirmation email
            once the process is complete.
          </li>
        </ul>
      </>
    ),
  },
  // {
  //   id: 'contact',
  //   label: '5. Contact Support',
  //   title: '5. Contact Support',
  //   content: (
  //     <p className='text-sm leading-relaxed text-muted'>
  //       If you have any questions, concerns, or special requests regarding your
  //       account deletion or data privacy, please contact our data protection
  //       officer at{' '}
  //       <a
  //         href='mailto:privacy@fitcall.me'
  //         className='text-primary hover:underline font-semibold'
  //       >
  //         privacy@fitcall.me
  //       </a>
  //       .
  //     </p>
  //   ),
  // },
]

export default function AccountDeletionPolicy() {
  return (
    <LegalPageLayout
      title="Account Deletion Policy"
      subtitle="Last Updated: August 2026"
      introduction={
        <>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-4 font-semibold">
            Learn how to delete your FitCall.me account and understand our data
            retention procedures.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            We are committed to providing you with clear and accessible choices
            regarding your data. This document outlines your rights, the exact
            steps to request account deletion, and how we handle your request.
          </p>
        </>
      }
      sections={SECTIONS}
    />
  )
}
