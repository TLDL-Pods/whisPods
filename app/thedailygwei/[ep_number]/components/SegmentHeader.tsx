import { useRouter } from 'next/navigation';

import { IoArrowBack } from 'react-icons/io5';
import { ImListNumbered } from 'react-icons/im';
import { BiSolidTimer } from 'react-icons/bi';
import { EpisodeProps } from '@/types';

interface SegmentsHeaderProps {
  isOrganizedByLength: boolean;
  currentEpisode: EpisodeProps;
  toggleOrganization: () => void;
}

export default function SegmentHeader({
  isOrganizedByLength,
  currentEpisode,
  toggleOrganization,
}: SegmentsHeaderProps) {
  const router = useRouter();
  return (
    <div className="w-full max-w-screen">
      <div className="">
        <div className="text-lg font-semibold text-center md:text-xl lg:text-2xl text-violet-400">
          The Daily Gwei Refuel
        </div>
        <div className="text-lg text-center md:text-xl lg:text-2xl text-violet-400">
          {currentEpisode.episode_title}
        </div>

        <div className="pt-1">
          <h3 className="font-semibold text-center md:text-lg lg:text-xl text-violet-300">
            Episode {currentEpisode.episode_number}
          </h3>
          <h3 className="text-center md:text-lg lg:text-xl text-violet-300">
            {currentEpisode.release_date}
          </h3>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between mx-4">
          {/* Back to Episodes button */}
          <button
            onClick={() => router.push('/')}
            className="font-bold text-white rounded hover:bg-stone-900"
          >
            <IoArrowBack size={24} className="inline-block" />
          </button>
          {/* Organize by time or order button */}
          <button
            onClick={toggleOrganization}
            className="hover:bg-stone-900"
            title="Presentation order or longest first"
          >
            {isOrganizedByLength ? <ImListNumbered /> : <BiSolidTimer />}
          </button>
        </div>
      </div>
    </div>
  );
}
