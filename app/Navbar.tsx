import Link from "next/link";
import { GiSoundWaves } from "react-icons/gi";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-stone-950">
      <header className="text-xl font-semibold text-gray-100 bg-stone-950">
        <div className="flex items-center justify-between w-full p-6">
          <Link href={"/"}>
            <div className="flex items-center my-auto text-4xl font-bold cursor-pointer">
              <GiSoundWaves className="my-auto mr-2 text-6xl" />
              <p className="my-auto">TLDL</p>
            </div>
          </Link>
          <div className="flex space-x-4">
            <Link href="/podcasts" className="hover:text-gray-300">
              Podcasts
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-stone-950">{children}</div>
    </div>
  );
}
