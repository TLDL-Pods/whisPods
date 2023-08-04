import Link from "next/link";
import { SearchBar } from "./components/SearchBar";
export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-stone-950">
      <header className="flex h-20 items-center justify-between bg-stone-950 px-6 text-xl font-semibold text-gray-100">
        <Link href={"/"}>
          <div className="my-auto flex items-center text-4xl font-bold">
            <p className="my-auto ml-2 text-4xl">TLDL:</p>
          </div>
        </Link>
        <SearchBar />
      </header>
      <div className="flex-1 overflow-hidden bg-stone-950">{children}</div>
    </div>
  );
}
