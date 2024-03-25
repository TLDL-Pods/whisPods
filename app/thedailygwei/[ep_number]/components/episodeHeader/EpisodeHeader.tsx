import { IoArrowBack } from 'react-icons/io5';
import { ImListNumbered } from 'react-icons/im';
import { BiSolidTimer } from 'react-icons/bi';
import { EpisodeProps } from '@/types';
import Link from 'next/link';
import SegmentTimeline from './EpisodeTimeline';
import { useSegments } from '@/app/hooks/useSegments';
import { useApp } from '@/app/hooks/useApp';

interface EpisodeHeaderProps {
  currentEpisode: EpisodeProps;
}

export default function EpisodeHeader({ currentEpisode }: EpisodeHeaderProps) {
  const { toggleOrganization } = useSegments();
  const { state } = useApp();

  return (
    <div className="max-w-screen flex w-full flex-col px-4">
      <div className="text-center">
        <Link
          href={`/thedailygwei`}
          className="mx-auto pt-8 text-center text-xl text-secondary duration-100 hover:opacity-90 md:pt-0 md:text-xl lg:text-2xl"
        >
          The Daily Gwei Refuel
        </Link>
        <div className="text-center text-primary md:text-xl lg:text-xl">
          {currentEpisode.episode_title}
        </div>
        <div className="mx-auto hidden w-64 border-b lg:my-4 lg:block"></div>
        <div className="max-w-screen flex justify-between pt-4 lg:flex-col lg:pt-1">
          <h3 className="text-center font-semibold text-baseText md:text-lg lg:text-xl">
            Episode {currentEpisode.episode_number}
          </h3>
          <h3 className="text-center text-baseText1">
            {currentEpisode.release_date}
          </h3>
        </div>
      </div>
      <div className="mt-8 w-full lg:mx-auto lg:max-w-6xl">
        <div className="flex w-full justify-between">
          {/* Back to Episodes button */}
          <Link
            href={'/thedailygwei'}
            className="border border-white border-opacity-40 bg-base1 px-6 py-1 font-bold text-white duration-300 hover:border-opacity-100 hover:bg-base"
          >
            <IoArrowBack size={24} className="inline-block" />
          </Link>
          <div className="hidden w-full lg:flex">
            <SegmentTimeline currentEpisode={currentEpisode} />
          </div>
          {/* Organize by time or order button */}
          <button
            onClick={toggleOrganization}
            className="border border-white border-opacity-40 bg-base1 px-6 py-1 duration-300 hover:border-opacity-100 hover:bg-base"
            title="Presentation order or longest first"
          >
            {state.segmentsByLength ? <ImListNumbered /> : <BiSolidTimer />}
          </button>
        </div>
      </div>
    </div>
  );
}
