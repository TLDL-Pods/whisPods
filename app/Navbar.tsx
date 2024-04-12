'use client';

import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import YoutubeDrawer from './components/YoutubeDrawer';
import { useApp } from './hooks/useApp';
import SearchBar from './components/SearchBar';
import Image from 'next/image';

const links = [
  { name: 'HOME', href: '/' },
  { name: 'PODCASTS', href: '/podcasts' },
  { name: 'LEADERBOARD', href: '/leaderboard' },
  { name: 'ABOUT', href: '/about' },
];

export default function Navbar() {
  const { state, setState } = useApp();

  const navMenuToggle = () => {
    setState((prevState) => ({
      ...prevState,
      isMenuModalOpen: !prevState.isMenuModalOpen,
    }));
  };

  return (
    <div className="max-w-screen">
      <div
        className={`z-10 flex h-24 items-center justify-between duration-300`}
      >
        <div
          className={`${state.isMenuModalOpen ? ' rounded-none' : 'lg:rounded-br-2xl'}  flex h-24 w-full items-center justify-between gap-4 bg-black bg-opacity-[96%] px-4 shadow shadow-baseShadow duration-300 lg:flex-row lg:justify-center lg:px-12`}
        >
          {/* TLDL Title */}
          <Link href={'/'}>
            <Image
              src={'/tldl-logo-dm.svg'}
              alt={'TLDL'}
              width={120}
              height={100}
            />
          </Link>

          {/* Search */}
          <div
            className={`mx-auto hidden w-11/12 flex-col items-center justify-center duration-300 lg:block lg:w-1/2`}
          >
            <SearchBar />
          </div>
          <div
            onClick={navMenuToggle}
            className={`${
              state.isMenuModalOpen ? 'rotate-90 bg-base3' : 'rotate-0'
            } z-50 flex h-12 w-12 items-center justify-center border-2 p-1 text-3xl text-baseText duration-300`}
          >
            <GiHamburgerMenu />
          </div>
        </div>

        {/*NavMenu */}
        <div
          onBlur={navMenuToggle}
          className={`${state.isMenuModalOpen ? 'right-0' : '-right-[100%]'} absolute top-24 mx-auto flex h-screen w-full flex-col gap-2 bg-black bg-opacity-[96%] px-8 pb-8 duration-300 lg:w-64 lg:rounded-br-2xl lg:px-10 lg:pt-4`}
        >
          <div
            className={`mb-2 mt-2 w-full flex-col items-center justify-center duration-300 lg:hidden`}
          >
            <SearchBar />
          </div>
          <div className="my-8 flex flex-col gap-8">
            {links.map((link, i) => (
              <Link
                onClick={navMenuToggle}
                href={link.href}
                className="text-center text-2xl hover:text-baseText1"
              >
                <p>{link.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/*Youtube Drawer */}
      <div
        className={`${
          state.isVideoModalOpen
            ? 'h-[350px] border-t border-white border-opacity-40'
            : 'h-0'
        } fixed bottom-0 z-50 w-full bg-base1 duration-300`}
      >
        <YoutubeDrawer />
      </div>
    </div>
  );
}
