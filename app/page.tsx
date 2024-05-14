import Image from 'next/image';
import SearchBar from './components/SearchBar';
import Ticker from './components/HomeTicker';

export default function Home() {
  return (
    <div className="mx-auto w-full flex-col overflow-hidden pt-72 lg:pt-80">
      {/* TLDL Title */}
      <Image
        className="absolute left-0 right-0 top-36 z-10 mx-auto w-[250px] lg:top-0 lg:w-[500px]"
        src={'/tldl-logo-dm.svg'}
        alt={'TLDL'}
        width={500}
        height={200}
      />
      <div className="mx-auto w-4/5 lg:w-1/2">
        <SearchBar />
      </div>
      <div className="absolute bottom-80 left-0 right-0 z-40 text-center">
        <Ticker />
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-black"></div>
    </div>
  );
}
