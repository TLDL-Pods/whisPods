import Link from "next/link";
import { SearchBar } from "./components/SearchBar";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-stone-950">
      <header className="text-xl font-semibold text-gray-100 bg-stone-950">
        <div className="flex items-center justify-between w-full p-6">
          <Link href={"/"}>
            <div className="flex items-center my-auto text-4xl font-bold">
              <p className="my-auto ml-2 text-4xl">TLDL:</p>
            </div>
          </Link>
          {/* <SearchBar /> */}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-stone-950">{children}</div>
    </div>
  );
}
