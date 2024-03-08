'use client';

import Link from 'next/link';
import { GiHamburgerMenu, GiSoundWaves } from 'react-icons/gi';
import YoutubeDrawer from './components/YoutubeDrawer';
import { useApp } from './hooks/useApp';
import SearchBar from './components/SearchBar';
import { useSearch } from './hooks/useSearch';

export default function Navbar() {
  const { state, setState } = useApp();
  const { performSearch, clearSearchResults } = useSearch();

  return (
    <div className="bg-base max-w-screen">
      <header className="z-40 w-full mx-auto text-xl font-semibold xl:fixed h-fit xl:px-24 text-baseText max-w-screen bg-base">
        <div className="flex items-center justify-between w-full pt-2 pl-4 xl:py-4">
          {/* TLDL Title */}
          <Link href={'/'}>
            <div className="flex flex-col my-auto text-4xl font-bold cursor-pointer">
              <div className="flex">
                <GiSoundWaves className="my-auto mr-2 text-6xl" />
                <p className="my-auto">TLDL</p>
              </div>
              <h1 className="text-sm font-semibold text-right">
                Too Long Didn't Listen
              </h1>
            </div>
          </Link>
          <div className="flex-col items-center justify-center hidden w-full lg:block md:w-1/2">
            <div className="text-center md:mb-0">
              <p className="mb-4 font-light text-normal">
                Summarization, trends, and references for Podcasts
              </p>
            </div>
            <SearchBar
              onSearch={performSearch}
              clearSearchResults={clearSearchResults}
            />
          </div>
          {/* Links */}
          <div className="hidden space-x-4 max-w-screen lg:block">
            <Link href="/podcasts" className="hover:text-baseText1">
              Podcasts
            </Link>
            <Link href="/about" className="hover:text-baseText1">
              About
            </Link>
          </div>
        </div>
      </header>
      <div
        className={`${
          state.isVideoModalOpen
            ? 'h-[350px] border-t border-white border-opacity-40'
            : 'h-0'
        } w-full bottom-0 fixed bg-base1 duration-300 z-50`}
      >
        <YoutubeDrawer />
      </div>
      <div
        onClick={() => {
          setState(() => ({
            ...state,
            isMenuModalOpen: !state.isMenuModalOpen,
          }));
        }}
        className={`${
          state.isMenuModalOpen ? 'text-secondary' : 'text-accent'
        } fixed top-4 p-1 text-3xl duration-300 right-4 border bg-base3 w-10 h-10 z-50 lg:hidden`}
      >
        <GiHamburgerMenu />
      </div>
      <div 
      
        className={`${
          state.isMenuModalOpen ? '-translate-y-36' : 'translate-y-0'
        } fixed top-0 right-0 w-full h-36 z-40 duration-300 bg-black bg-opacity-95 border-l border border-white text-baseText border-opacity-40 lg:hidden`}
      >
        <div className="flex w-3/4 m-4 my-6 justify-evenly">
          <Link
            onClick={(e) => {
              e.stopPropagation();
              setState(() => ({
                ...state,
                isMenuModalOpen: !state.isMenuModalOpen,
              }));
            }}
            href="/"
            className="hover:text-baseText1"
          >
            <p>Home</p>
          </Link>

          <Link
            onClick={(e) => {
              e.stopPropagation();
              setState(() => ({
                ...state,
                isMenuModalOpen: !state.isMenuModalOpen,
              }));
            }}
            href="/podcasts"
            className="hover:text-baseText1"
          >
            <p>Podcasts</p>
          </Link>
          <Link
            onClick={(e) => {
              e.stopPropagation();
              setState(() => ({
                ...state,
                isMenuModalOpen: !state.isMenuModalOpen,
              }));
            }}
            href="/about"
            className="hover:text-baseText1"
          >
            <p>About</p>
          </Link>
        </div>
        <div className="w-full px-3 mt-8">
          <SearchBar
            onSearch={performSearch}
            clearSearchResults={clearSearchResults}
          />
        </div>
      </div>
    </div>
  );
}
