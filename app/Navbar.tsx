"use client";

import Link from "next/link";
import { RiGasStationFill } from "react-icons/ri";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-stone-950 ">
      <header className="relative flex h-20 w-full justify-between bg-stone-950 text-xl font-semibold text-gray-100">
        <div className="absolute left-6 top-4 flex text-4xl font-bold">
          <Link href={"/"}>
            <div className="flex">
              <p className="my-auto text-5xl text-violet-400">
                <RiGasStationFill />
              </p>
              <p className="mx-auto my-auto ml-2 text-5xl">TLDL:</p>
            </div>
          </Link>
        </div>
        <div className="absolute top-5 mx-auto flex w-full justify-center">
          <div className="mx-12 my-auto hidden text-gray-100 lg:flex"></div>
        </div>
      </header>
      <div className={`min-h-screen bg-zinc-900`}>{children}</div>
    </div>
  );
}
