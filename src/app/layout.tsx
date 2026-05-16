import type { Metadata } from "next";
import { Toaster } from "sonner"; // [!code ++]
import "./globals.css";
import { cn } from "@/lib/utils";

const interClass = 'font-sans'
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = "Personal Trainer";

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
        {children}
       
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}