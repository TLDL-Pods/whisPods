import Link from 'next/link';
import Image from 'next/image';
import { EpisodeProps } from '@/types';
import { GiLogicGateNot } from 'react-icons/gi';
import { RiMegaphoneLine } from 'react-icons/ri';
import TDG from '@/app/assets/the-daily-gwei.jpg';
import { useApp } from '../hooks/useApp';

interface EpisodeSelectProps {
  episode: EpisodeProps;
}

export default function EpisodeSelect({ episode }: EpisodeSelectProps) {
  const { setState } = useApp();

  const topThreeSegments = episode.episode_data
    .sort((a, b) => b.segment_length_ms - a.segment_length_ms)
    .slice(0, 3);

  return (
    <Link
      href={`/thedailygwei/${episode.episode_number}`}
      onClick={() =>
        setState((prevState) => ({
          ...prevState,
          currentSegmentIndex: null,
          currentSegment: null,
        }))
      }
    >
      <div className="my-2 flex min-h-full w-full flex-grow flex-col border-y border-white border-opacity-10 bg-gradient-to-r from-transparent via-base1 to-transparent py-2 text-center transition-all duration-500 hover:border-accent hover:bg-base2 lg:px-4 lg:py-8">
        {/* Image, Episode Number, and Date for mobile */}
        <div className="h-full w-4 bg-purple-600"></div>

        <div className="mx-auto flex w-full items-center p-2 lg:p-0">
          <div className="mr-2 flex w-20 flex-col items-center">
            <span className="w-fit border-accent border-opacity-40 font-bold text-secondary lg:mb-2 lg:border-b-2 lg:pb-1 lg:text-2xl">
              {episode.episode_number}
            </span>
            <span className="text-xs text-opacity-80 lg:text-sm">
              {episode.release_date}
            </span>
          </div>
          <div className="my-auto h-12 w-20 min-w-min lg:h-64 lg:w-64 lg:p-4">
            {/* Image container */}
            <Image
              src={TDG}
              alt="Background"
              className="my-auto h-12 w-12 object-cover lg:h-52 lg:w-52"
            />
          </div>

          <div className="w-full lg:w-3/5">
            <div className="text-textBase overflow-x-clip text-ellipsis whitespace-nowrap pl-2 text-left lg:text-3xl">
              <span className="my-auto mr-1 h-6 w-2 border-l-2 border-accent md:mr-2"></span>
              {episode.episode_title
                ? episode.episode_title.toUpperCase()
                : null}
            </div>
            <div className="ml-6 mt-8 hidden flex-col gap-2 text-baseText1 lg:flex">
              {topThreeSegments.map((segment, index) => (
                <div key={segment.segment_number} className="flex">
                  <div className="my-auto text-2xl text-secondary">
                    <GiLogicGateNot />
                  </div>

                  <p className="ml-2 text-left text-lg">
                    {segment.segment_title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
