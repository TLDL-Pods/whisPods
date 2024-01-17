'use client';

import Link from 'next/link';
import { GiSoundWaves } from 'react-icons/gi';
import YoutubeDrawer from './components/YoutubeDrawer';
import { useApp } from './hooks/useApp';
import SearchBar from './components/SearchBar';
import { useSearch } from './hooks/useSearch';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { state, setState } = useApp();
  const { performSearch, clearSearchResults } = useSearch();

  return (
    <div className="bg-base max-w-screen">
      <header className="fixed h-fit w-full text-xl font-semibold text-baseText max-w-screen bg-base z-40">
        <div className="flex items-center justify-between w-full p-6">
          {/* TLDL Title */}
          <Link href={'/'}>
            <div className="flex flex-col my-auto text-4xl font-bold cursor-pointer">
              <div className="flex">
                <GiSoundWaves className="my-auto mr-2 text-6xl" />
                <p className="my-auto">TLDL</p>
              </div>
              <h1 className="text-sm font-semibold text-center">
                Too Long Didn't Listen
              </h1>
            </div>
          </Link>
          <div className="flex-col hidden lg:block justify-center items-center w-full md:w-1/2">
            <div className="md:mb-0 text-center">
              <p className="mb-4 text-normal font-light">
                Summarization, trends, and references for Podcasts
              </p>
            </div>
            <SearchBar
              onSearch={performSearch}
              clearSearchResults={clearSearchResults}
            />
          </div>
          {/* Links */}
          <div className="space-x-4 max-w-screen hidden lg:block">
            <Link href="/podcasts" className="hover:text-baseText1">
              Podcasts
            </Link>
            <Link href="/about" className="hover:text-baseText1">
              About
            </Link>
          </div>
        </div>
      </header>

      <div className="w-screen h-full text-baseText py-40 z-0">{children}</div>
      <div
        className={`${
          state.isVideoModalOpen
            ? 'h-[350px] border-t border-white border-opacity-40'
            : 'h-0'
        } w-full bottom-0 fixed bg-base1  duration-300`}
      >
        <YoutubeDrawer />
      </div>
      <div
        onClick={() => {
          console.log('hi');
          setState(() => ({
            ...state,
            isMenuModalOpen: !state.isMenuModalOpen,
          }));
        }}
        className="fixed top-4 right-4 border bg-base3 w-10 h-10 z-50 lg:hidden"
      ></div>
      <div
        className={`${
          state.isMenuModalOpen ? 'w-96' : 'w-0'
        } fixed top-0 right-0 h-full z-40 pt-3 duration-300 bg-black bg-opacity-95 border-l border border-white border-opacity-40 lg:hidden`}
      >
        <div className="w-4/5 pl-3 mt-1">
          <SearchBar
            onSearch={performSearch}
            clearSearchResults={clearSearchResults}
          />
        </div>
        <p>Home</p>
        <p>Podcasts</p>
        <p>About</p>
      </div>
    </div>
  );
}
