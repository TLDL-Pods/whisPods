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
      {/* <GoogleAnalytics GA_MEASUREMENT_ID="G-Z6WGLHLZXB" /> */}
      <body className="min-h-screen bg-base overflow-x-hidden">
        <AppStateProvider>
          <Navbar>{children}</Navbar>
        </AppStateProvider>
        {/* <CookieBanner /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
