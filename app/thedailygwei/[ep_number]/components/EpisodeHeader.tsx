import { useRouter } from 'next/navigation';

import { IoArrowBack } from 'react-icons/io5';
import { ImListNumbered } from 'react-icons/im';
import { BiSolidTimer } from 'react-icons/bi';
import { EpisodeProps } from '@/types';
import Link from 'next/link';

interface EpisodeHeaderProps {
  isOrganizedByLength: boolean;
  currentEpisode: EpisodeProps;
  toggleOrganization: () => void;
}

export default function EpisodeHeader({
  isOrganizedByLength,
  currentEpisode,
  toggleOrganization,
}: EpisodeHeaderProps) {
  const router = useRouter();
  return (
    <div className="w-full max-w-screen px-4">
      <div>
        <Link href={`/thedailygwei`}>
          <div className="text-lg font-semibold text-center md:text-xl lg:text-2xl text-accent hover:opacity-90 w-fit mx-auto duration-100">
            The Daily Gwei Refuel
          </div>
        </Link>
        <div className="text-lg text-center md:text-xl lg:text-xl text-secondary">
          {currentEpisode.episode_title}
        </div>
        <div className="border-b w-64 mx-auto lg:my-4 hidden lg:block"></div>
        <div className="pt-4 lg:pt-1 max-w-screen flex justify-between lg:flex-col">
          <h3 className="font-semibold text-center md:text-lg lg:text-xl text-baseText">
            Episode {currentEpisode.episode_number}
          </h3>
          <h3 className="text-center text-baseText1">
            {currentEpisode.release_date}
          </h3>
        </div>
      </div>
      <div className="md:max-w-[1200px] lg:mx-auto">
        <div className="flex justify-between">
          {/* Back to Episodes button */}
          <button
            onClick={() => router.push('/')}
            className="font-bold text-white bg-base1 hover:bg-base border duration-300 border-white border-opacity-40 hover:border-opacity-100 px-6 py-1"
          >
            <IoArrowBack size={24} className="inline-block" />
          </button>
          {/* Organize by time or order button */}
          <button
            onClick={toggleOrganization}
            className=" border border-white bg-base1 hover:bg-base border-opacity-40 duration-300 hover:border-opacity-100 px-6 py-1"
            title="Presentation order or longest first"
          >
            {isOrganizedByLength ? <ImListNumbered /> : <BiSolidTimer />}
          </button>
        </div>
      </div>
    </div>
  );
}
