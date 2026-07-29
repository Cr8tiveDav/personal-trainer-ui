import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./provider";
import { NavigationTracker } from "@/components/navigation/NavigationTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = "Personal Trainer || FITCALL.ME";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: "Personal Trainer — Your dedicated fitness companion for personalized workouts and professional guidance.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: appName,
    description: "Personal Trainer — Your dedicated fitness companion for personalized workouts and professional guidance.",
    url: appUrl,
    siteName: "FitCall",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "FitCall Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: "Personal Trainer — Your dedicated fitness companion for personalized workouts and professional guidance.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={cn(inter.className, "font-sans w-full mx-auto antialiased")}>
        <noscript>
          <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <strong>JavaScript is required to use Fitcall.</strong>
            <p>Please enable JavaScript in your browser settings and reload the page.</p>
          </div>
        </noscript>
        <Providers>
          <NavigationTracker />
          {children}
        </Providers>

      </body>
    </html>
  );
}