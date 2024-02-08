// layout.tsx

import React, { Suspense } from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Navbar from './Navbar';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from './components/GoogleAnalyics';
import CookieBanner from '@/app/components/CookieBanner';
import { AppStateProvider } from './contexts/StateContext';

export const metadata: Metadata = {
  title: 'TLDL',
  description: "Too Long Didn't Listen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Suspense fallback={<div>Loading Analytics...</div>}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-Z6WGLHLZXB" />
      </Suspense> */}
      <body className="min-h-screen overflow-x-hidden bg-base">
        <AppStateProvider>
          <Navbar />
          <main className="z-0 w-screen h-full text-baseText -pt-0 xl:pt-36">
            {children}
          </main>
        </AppStateProvider>
        {/* <CookieBanner /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
