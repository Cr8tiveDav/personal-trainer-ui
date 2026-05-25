import type { Metadata } from 'next'

import GetFit from '@/components/ads/GetFit'

export const metadata: Metadata = {
  title: 'Get Fit with Real Trainer Accountability',
  description:
    'Stay consistent with FitCall. Get matched with real fitness trainers who call you at your workout time and keep you accountable.',
  alternates: {
    canonical: '/get-fit',
  },
  openGraph: {
    title: 'Get Fit with Real Trainer Accountability | FitCall',
    description:
      'Build consistency with real trainer calls, flexible scheduling, and human accountability from FitCall.',
    url: '/get-fit',
    siteName: 'FitCall',
    images: [
      {
        url: '/images/ads/get-fit-final-cta-desktop.jpg',
        width: 1200,
        height: 382,
        alt: 'Find your trainer today with FitCall',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Fit with Real Trainer Accountability | FitCall',
    description:
      'Get matched with real fitness trainers who call you at your workout time and keep you accountable.',
    images: ['/images/ads/get-fit-final-cta-desktop.jpg'],
  },
}

const GetFitPage = () => {
  return <GetFit />
}

export default GetFitPage
