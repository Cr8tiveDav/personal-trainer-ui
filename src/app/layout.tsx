import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./provider";

const interClass = 'font-sans'
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(interClass, 'w-full mx-auto antialiased')}>
        <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}