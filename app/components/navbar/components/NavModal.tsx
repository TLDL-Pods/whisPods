'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/app/hooks/useApp';
import SearchBar from '../../SearchBar';

const links = [
  { name: 'HOME', href: '/' },
  { name: 'PODCASTS', href: '/podcasts' },
  { name: 'DONATE', href: '/donate' },
  { name: 'ABOUT', href: '/about' },
];

interface NavModalProps {
  navMenuToggle: () => void;
  pathname: string;
}

export default function NavModal({ navMenuToggle, pathname }: NavModalProps) {
  const { state } = useApp();

  return (
    <div
      onBlur={navMenuToggle}
      className={`${state.isMenuModalOpen ? 'right-0' : '-right-[100%]'} absolute top-0 mx-auto flex h-screen w-full flex-col gap-2 bg-black bg-opacity-[96%] px-8 pb-8 duration-300 lg:w-64 lg:rounded-br-2xl lg:px-10 lg:pt-16`}
    >
      {/* TLDL Title */}
      <Link href={'/'} className=" lg:hidden">
        <Image
          src={'/tldl-logo-dm.svg'}
          alt={'TLDL'}
          width={100}
          height={100}
        />
      </Link>
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
            className={`text-2xl duration-300 hover:ml-2 hover:text-baseText1 ${pathname === link.href ? 'border-l-2 border-accent pl-2' : ''}`}
          >
            <p>{link.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
