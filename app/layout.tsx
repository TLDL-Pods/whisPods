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
    <>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-Z6WGLHLZXB" />
      </Suspense>
      <AppStateProvider>
        <Navbar>{children} </Navbar>
        <CookieBanner />
        <Analytics />
      </AppStateProvider>
    </>
  );
}
