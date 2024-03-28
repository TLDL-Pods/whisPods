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
  const { state } = useApp();
  const { toggleOrganization } = useSegments();

  return (
    <div className="max-w-screen flex w-full flex-col">
      <div className="w-full bg-black p-4 pb-6 pt-2 lg:mx-auto lg:mb-6 lg:max-w-6xl lg:bg-base">
        <div>
          <Link
            href={`/thedailygwei`}
            className="text-center text-secondary md:text-xl lg:text-2xl"
          >
            The Daily Gwei Refuel - {currentEpisode.episode_number}
          </Link>
          <div className="overflow-clip text-ellipsis whitespace-nowrap text-lg text-primary md:text-xl lg:text-xl">
            {currentEpisode.episode_title}
          </div>
        </div>
        <h3 className="w-fit text-xs text-baseText1">
          {currentEpisode.release_date}
        </h3>
      </div>
      <div
        className={`fixed bottom-0 z-20 flex w-full lg:px-24 ${state.isVideoModalOpen ? 'h-0' : 'h-32 p-3 pb-4 lg:h-40'} flex-col justify-between bg-black bg-opacity-95 duration-300 lg:flex-row`}
      >
        <div className="w-full">
          <SegmentTimeline currentEpisode={currentEpisode} />
        </div>
      </div>
      <button
        onClick={toggleOrganization}
        className="mx-auto flex h-8 w-full justify-center border border-base3 bg-base1 p-1 text-lg duration-300 hover:border-opacity-100 hover:bg-base lg:mb-2 lg:max-w-6xl"
        title="Sort Segments"
      >
        {state.segmentsByLength ? (
          <div className="flex items-center text-2xl">
            <BiSolidTimer />{' '}
            <span className="ml-2 text-sm">Sort By Length</span>
          </div>
        ) : (
          <div className="flex items-center">
            <ImListNumbered />{' '}
            <span className="ml-2 text-sm">Sort By Order</span>
          </div>
        )}
      </button>
    </div>
  );
}
