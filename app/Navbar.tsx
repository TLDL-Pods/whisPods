'use client';

import Link from 'next/link';
import { GiSoundWaves } from 'react-icons/gi';
import YoutubeVideo from './components/YoutubeVideo';
import { useApp } from './hooks/useApp';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { state } = useApp();

  return (
    <div className=" bg-stone-950 max-w-screen">
      <header className="text-xl font-semibold text-gray-100 max-w-screen bg-stone-950 ">
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
            <Link href="/podcasts" className="hover:text-gray-300">
              Podcasts
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
          </div>
        </div>
      </header>

      <div className="w-screen h-full text-gray-100">{children}</div>
      <div
        className={`${
          state.isVideoModalOpen
            ? 'h-[350px] border-t border-violet-800'
            : 'h-0'
        } w-full bottom-0 fixed bg-stone-900  duration-300`}
      >
        <YoutubeVideo />
      </div>
    </div>
  );
}
