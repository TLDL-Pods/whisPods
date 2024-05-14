import Image from 'next/image';
import SearchBar from './components/SearchBar';
import Ticker from './components/HomeTicker';

export default function Home() {
  return (
    <div className="relative mx-auto h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col ">
        <div className="z-10 pt-24 lg:pt-0">
          {/* TLDL Title */}
          <Image
            className=" mx-auto w-[250px] lg:mt-12 lg:w-[400px]"
            src={'/tldl-logo-dm.svg'}
            alt={'TLDL'}
            width={500}
            height={200}
          />
        </div>
        <div className="mx-auto w-4/5 lg:w-1/2">
          <SearchBar />
        </div>
        <div className="z-10 mt-16 text-center text-white">
          <Ticker />
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-black"></div>
    </div>
  );
}
