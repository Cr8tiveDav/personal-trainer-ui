import type { Metadata } from 'next'

import BuildUp from '@/components/ads/squeeze 2/BuildUp'

export const metadata: Metadata = {
  title: 'Never Miss a Workout Session | FitCall',
  description:
    'Find a vetted Nigerian fitness trainer who calls you at your scheduled time and keeps your workouts consistent.',
  alternates: {
    canonical: '/build-up',
  },
  openGraph: {
    title: 'Never Miss a Workout Session | FitCall',
    description:
      'Build momentum with live trainer accountability, weekly progress, and workout reminders from FitCall.',
    url: '/build-up',
    siteName: 'FitCall',
    images: [
      {
        url: '/images/ads/athlete_desk.jpg',
        width: 1200,
        height: 1200,
        alt: 'Runner training outdoors',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Never Miss a Workout Session | FitCall',
    description:
      'Find a vetted trainer who calls you at your scheduled workout time.',
    images: ['/images/ads/athlete_desk.jpg'],
  },
}

const BuildUpPage = () => {
  return <BuildUp />
}

export default BuildUpPage
