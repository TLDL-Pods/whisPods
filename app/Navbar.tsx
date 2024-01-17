'use client';

import Link from 'next/link';
import { GiSoundWaves } from 'react-icons/gi';
import YoutubeDrawer from './components/YoutubeDrawer';
import { useApp } from './hooks/useApp';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { state } = useApp();

  return (
    <div className=" bg-base max-w-screen">
      <header className="text-xl font-semibold text-baseText max-w-screen bg-base ">
        <div className="flex items-center justify-between w-full p-6">
          {/* TLDL Title */}
          <Link href={'/'}>
            <div className="flex items-center my-auto text-4xl font-bold cursor-pointer">
              <GiSoundWaves className="my-auto mr-2 text-6xl" />
              <p className="my-auto">TLDL</p>
            </div>
          </Link>

          {/* Links */}
          <div className="flex space-x-4 max-w-screen">
            <Link href="/podcasts" className="hover:text-baseText1">
              Podcasts
            </Link>
            <Link href="/about" className="hover:text-baseText1">
              About
            </Link>
          </div>
        </div>
      </header>

      <div className="w-screen h-full text-baseText">{children}</div>
      <div
        className={`${
          state.isVideoModalOpen
            ? 'h-[350px] border-t border-white border-opacity-40'
            : 'h-0'
        } w-full bottom-0 fixed bg-base1  duration-300`}
      >
        <YoutubeDrawer />
      </div>
    </div>
  );
}
