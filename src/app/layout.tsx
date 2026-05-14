import type { Metadata } from 'next';
import { Geist, Roboto_Mono, Figtree } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { cn } from '@/lib/utils';
import { Providers } from './provider';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'Next Starter';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'African Personal Trainer | FitCall.me',
    template: `%s | FitCall.me`,
  },
  description:
    'FitCall.me connects users with professional African personal trainers through a modern and accessible fitness platform designed for training, wellness, and personalized coaching.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        robotoMono.variable,
        'font-sans',
        figtree.variable
      )}
    >
      <body className='min-h-full flex flex-col'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
