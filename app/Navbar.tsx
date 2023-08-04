import Link from "next/link";
import { SearchBar } from "./components/SearchBar";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-stone-950">
      <header className="bg-stone-950 text-xl font-semibold text-gray-100">
        <div className="flex w-full items-center justify-between p-6">
          <Link href={"/"}>
            <div className="my-auto flex items-center text-4xl font-bold">
              <p className="my-auto ml-2 text-4xl">TLDL:</p>
            </div>
          </Link>
          <SearchBar />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-stone-950">{children}</div>
    </div>
  );
}
