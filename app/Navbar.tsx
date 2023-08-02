"use client";

import Link from "next/link";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-stone-950">
      {/* Fixed Navbar */}
      <header className="flex h-20 items-center justify-between bg-stone-950 px-6 text-xl font-semibold text-gray-100">
        {/* Logo */}
        <Link href={"/"}>
          <div className="my-auto flex items-center text-4xl font-bold">
            <p className="my-auto ml-2 text-4xl">TLDL:</p>
          </div>
        </Link>

        {/* Central Content */}
        <div className="mx-12 hidden text-gray-100 lg:flex">
          {/* Empty for now, fill this as needed */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-stone-950">{children}</div>
    </div>
  );
}
