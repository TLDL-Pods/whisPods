"use client";

import Link from "next/link";
import { RiGasStationFill } from "react-icons/ri";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-stone-950">
      {/* Fixed Navbar */}
      <header className="flex items-center justify-between h-20 px-6 text-xl font-semibold text-gray-100 bg-stone-950">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center text-4xl font-bold">
            <p className="text-5xl text-violet-400">
              <RiGasStationFill />
            </p>
            <p className="ml-2 text-5xl">TLDL:</p>
          </div>
        </Link>

        {/* Central Content */}
        <div className="hidden mx-12 text-gray-100 lg:flex">
          {/* Empty for now, fill this as needed */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-stone-950">{children}</div>
    </div>
  );
}
