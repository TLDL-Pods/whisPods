import Link from 'next/link';
import Image from 'next/image';
import { EpisodeProps } from '@/types';
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
      <div className="my-1 flex min-h-full w-full flex-grow flex-col border-b border-white border-opacity-40 bg-gradient-to-r from-transparent via-base1 to-transparent py-2 text-center transition-all duration-500 hover:bg-base2">
        {/* Image, Episode Number, and Date for mobile */}
        <div className="h-full w-4 bg-purple-600"></div>

        <div className="mx-auto flex w-full items-center p-2 lg:p-0">
          <div className="mr-2 flex w-32 flex-col items-center">
            <span className="w-fit border-accent border-opacity-40 font-bold text-accent lg:mb-2 lg:border-b-2 lg:pb-1 lg:text-2xl">
              {episode.episode_number}
            </span>
            <span className="text-xs text-secondary text-opacity-80 lg:text-sm">
              {episode.release_date}
            </span>
          </div>
          <div className="mr-1 h-16 w-24 min-w-min lg:h-40 lg:w-64 lg:p-4">
            {/* Image container */}
            <Image
              src={TDG}
              alt="Background"
              className="h-16 w-16 object-cover lg:h-32 lg:w-32"
            />
          </div>

          <div className="w-full">
            <div className="text-textBase line-clamp-2 lg:text-left lg:text-2xl">
              {episode.episode_title
                ? episode.episode_title.toUpperCase()
                : null}
            </div>
            <div className="mt-2 hidden text-baseText1 lg:block">
              {topThreeSegments.map((segment, index) => (
                <div key={segment.segment_number} className="flex">
                  <div className="text-textBase mt-1">
                    <RiMegaphoneLine />
                  </div>

                  <p className="ml-2 text-left">{segment.segment_title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
