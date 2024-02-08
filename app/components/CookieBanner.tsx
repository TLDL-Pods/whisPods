// components/cookiebanner.tsx

'use client';

import Link from 'next/link';
import { getLocalStorage, setLocalStorage } from '@/app/lib/storageHelper';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 2000; // 2000 milliseconds or 2 seconds

    // Function to update consent
    const updateConsent = () => {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: cookieConsent ? 'granted' : 'denied',
        });
        console.log('Consent updated successfully.');
      } else if (retryCount < maxRetries) {
        console.warn(
          `gtag not loaded, retrying in ${retryDelay / 1000} seconds...`,
        );
        setTimeout(() => {
          retryCount += 1;
          updateConsent(); // Retry updating consent
        }, retryDelay);
      } else {
        console.error('Failed to load gtag after maximum retries.');
      }
    };

    updateConsent(); // Attempt to update consent on component mount or cookieConsent change

    setLocalStorage('cookie_consent', cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        ${cookieConsent != null ? 'hidden' : 'flex'} 
                         px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-baseText2 rounded-lg shadow`}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p>
            We use <span className="font-bold text-sky-400">cookies</span> on
            our site.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCookieConsent(false)}
          className="px-5 py-2 text-gray-300 rounded-md border-baseText1"
        >
          Decline
        </button>
        <button
          onClick={() => setCookieConsent(true)}
          className="px-5 py-2 text-white rounded-lg bg-baseText1"
        >
          Allow Cookies
        </button>
      </div>
    </div>
  );
}
