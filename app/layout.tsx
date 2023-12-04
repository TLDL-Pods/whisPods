// layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { EpisodeProvider } from './contexts/dataContext';
import { DrawerProvider } from './contexts/drawerContext';
import Navbar from './Navbar';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from './components/GoogleAnalyics';
import CookieBanner from '@/app/components/CookieBanner';
import CustomDrawer from '@/app/components/CustomDrawer';
import { AppStateProvider } from './StateContext';

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
      <GoogleAnalytics GA_MEASUREMENT_ID="G-Z6WGLHLZXB" />
      <body className="min-h-screen bg-stone-950">
        <DrawerProvider>
          <EpisodeProvider>
            <AppStateProvider>
              <Navbar>{children}</Navbar>
            </AppStateProvider>
            <CookieBanner />
          </EpisodeProvider>
          <CustomDrawer />
        </DrawerProvider>
        <Analytics />
      </body>
    </html>
  );
}
