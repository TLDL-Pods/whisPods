'use client';
import { useRouter } from 'next/navigation';

import { SegmentProps } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { ImListNumbered } from 'react-icons/im';
import { BiSolidTimer } from 'react-icons/bi';

import Segment from '@/app/components/EpisodeSegment';
import { useEpisodes } from '@/app/hooks/useEpisodes';

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const { fetchEpisodeData, currentEpisode } = useEpisodes();
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<
    number | null
  >(null);
  const [showSegmentIndex, setShowSegmentIndex] = useState<number | null>(null);
  const [isOrganizedByLength, setIsOrganizedByLength] = useState<boolean>(true);
  const segmentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const router = useRouter();

  const toggleOrganization = () => {
    setIsOrganizedByLength(!isOrganizedByLength);
  };

  useEffect(() => {
    fetchEpisodeData(params.ep_number);
  }, []);

  if (!currentEpisode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col justify-center h-full min-w-screen">
      {/* Segment Header */}
      <div className="w-full max-w-screen">
        <div className="">
          <div className="text-lg font-semibold text-center md:text-xl lg:text-2xl text-violet-400">
            {' '}
            {/* Font size increases to text-xl on md screens and to text-2xl on lg screens */}
            The Daily Gwei Refuel
          </div>
          <div className="text-lg text-center md:text-xl lg:text-2xl text-violet-400">
            {' '}
            {/* Font size increases to text-xl on md screens and to text-2xl on lg screens */}
            {currentEpisode.episode_title}
          </div>

          <div className="pt-1">
            <h3 className="font-semibold text-center md:text-lg lg:text-xl text-violet-300">
              {' '}
              {/* Font size increases to text-lg on md screens and to text-xl on lg screens */}
              Episode {currentEpisode.episode_number}
            </h3>
            <h3 className="text-center md:text-lg lg:text-xl text-violet-300">
              {' '}
              {/* Font size increases to text-lg on md screens and to text-xl on lg screens */}
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

      {/* Segments */}
      <div className="flex justify-center w-full mt-4">
        <ul className="list-none">
          {currentEpisode.episode_data
            .sort(
              isOrganizedByLength
                ? (a: SegmentProps, b: SegmentProps) =>
                    b.segment_length_ms - a.segment_length_ms
                : (a: SegmentProps, b: SegmentProps) =>
                    a.segment_number - b.segment_number,
            )
            .map((segment, index) => (
              <div
                key={segment.segment_number}
                className=" border-y border-violet-100 border-opacity-60 bg-neutral-950"
              >
                <Segment
                  segment={segment}
                  segmentNumber={index}
                  isOrganizedByLength={isOrganizedByLength}
                  youtube_url={currentEpisode.youtube_url}
                  showSegmentIndex={showSegmentIndex}
                  setShowSegmentIndex={setShowSegmentIndex}
                  onSegmentClick={(index) => {
                    history.pushState(null, '', `#segment-${index}`);
                    setSelectedSegmentIndex(
                      selectedSegmentIndex === index ? null : index,
                    );
                    const segmentRef = segmentRefs.current[index]?.current;
                    if (segmentRef) {
                      segmentRef.scrollIntoView();
                    }
                  }}
                />
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
