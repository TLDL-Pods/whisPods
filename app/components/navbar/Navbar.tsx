'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import YoutubeDrawer from '../YoutubeDrawer';
import { useApp } from '../../hooks/useApp';
import SearchBar from '../SearchBar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NavModal from './components/NavModal';

export default function Navbar() {
  const { state, setState } = useApp();
  const pathname = usePathname();

  const navMenuToggle = () => {
    setState((prevState) => ({
      ...prevState,
      isMenuModalOpen: !prevState.isMenuModalOpen,
    }));
    console.log(pathname);
  };

  if (pathname === '/') {
    return (
      <div
        className={`${state.isMenuModalOpen ? ' rounded-none' : 'lg:rounded-br-2xl'} flex h-24 w-full items-center justify-end gap-4 px-4 duration-300 lg:flex-row lg:justify-end lg:px-12`}
      >
        <div
          onClick={navMenuToggle}
          className={`${
            state.isMenuModalOpen
              ? 'rotate-90 border-accent bg-base3'
              : 'rotate-0'
          } absolute z-50 flex h-12 w-12 items-center justify-center border-2 p-1 text-3xl text-baseText duration-300`}
        >
          <GiHamburgerMenu />
        </div>

        {/*NavMenu */}
        <NavModal navMenuToggle={navMenuToggle} pathname={pathname} />
      </div>
    );
  }

  return (
    <div className="max-w-screen">
      <div
        className={`z-10 flex h-24 items-center justify-between duration-300`}
      >
        <div
          className={`${state.isMenuModalOpen ? ' rounded-none' : 'lg:rounded-br-2xl'}  flex h-24 w-full items-center justify-end gap-4 px-4 duration-300 lg:flex-row lg:justify-center lg:px-12`}
        >
          <Image
            className=" w-[110px]"
            src={'/tldl-logo-dm.svg'}
            alt={'TLDL'}
            width={100}
            height={200}
          />
          {/* Search */}
          <div
            className={`mx-auto hidden w-11/12 flex-col items-center justify-center duration-300 lg:block lg:w-1/2`}
          >
            <SearchBar />
          </div>
          <div
            onClick={navMenuToggle}
            className={`${
              state.isMenuModalOpen
                ? 'rotate-90 border-accent bg-base3'
                : 'rotate-0'
            } z-50 flex h-12 w-12 items-center justify-center border-2 p-1 text-3xl text-baseText duration-300`}
          >
            <GiHamburgerMenu />
          </div>
        </div>

        {/*NavMenu */}
        <NavModal navMenuToggle={navMenuToggle} pathname={pathname} />
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
