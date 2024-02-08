// layout.tsx

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-Z6WGLHLZXB" />
      <AppStateProvider>
        <main className="min-h-screen overflow-x-hidden bg-base">
          <Navbar />

          <CookieBanner />
          <Analytics />
          {children}
        </main>
      </AppStateProvider>
    </>
  );
}
