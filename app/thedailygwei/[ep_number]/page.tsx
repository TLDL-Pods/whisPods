'use client';
import { useRouter } from 'next/navigation';

import { EpisodeProps, SegmentProps } from '@/types';
import { useState, useEffect, useRef, createRef } from 'react';
import { IoArrowBack } from 'react-icons/io5';

import { ImListNumbered } from 'react-icons/im';
import { BiSolidTimer, BiXCircle } from 'react-icons/bi';

import Segment from '@/app/components/Segment';

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const [data, setData] = useState<EpisodeProps>();
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<
    number | null
  >(null);
  const [showSegmentIndex, setShowSegmentIndex] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState<number | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isOrganizedByLength, setIsOrganizedByLength] = useState<boolean>(true);

  const segmentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const router = useRouter();

  const toggleOrganization = () => {
    setIsOrganizedByLength(!isOrganizedByLength);
  };

  const handleSummaryToggle = (index: number) => {
    if (showSummary === index) {
      setShowSummary(null);
      console.log(showSummary);
    } else {
      setShowSummary(index);
      setSummary(data?.episode_data[index].summary || null);
      console.log(showSummary);
    }
  };

  const [currentEpisode, setCurrentEpisode] = useState<number>(
    parseInt(params.ep_number, 10),
  );

  useEffect(() => {
    const fetchData = async () => {
      const episodeNumber = parseInt(params.ep_number, 10);
      const res = await fetch(`/api/episode?episode_number=${episodeNumber}`);
      const json = await res.json();
      const filteredSegments = json['data'].episode_data.filter(
        (segment: SegmentProps) => segment.segment_number !== 0,
      );
      const sortedData = {
        ...json['data'],
        episode_data: filteredSegments.sort(
          (a: SegmentProps, b: SegmentProps) =>
            b.segment_length_ms - a.segment_length_ms,
        ),
      };
      segmentRefs.current = sortedData.episode_data.map(() =>
        createRef<HTMLDivElement>(),
      );
      setData(sortedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/episode?episode_number=${currentEpisode}`);
      const json = await res.json();
      const filteredSegments = json['data'].episode_data.filter(
        (segment: SegmentProps) => segment.segment_number !== 0,
      );
      const sortedData = {
        ...json['data'],
        episode_data: filteredSegments.sort(
          (a: SegmentProps, b: SegmentProps) =>
            b.segment_length_ms - a.segment_length_ms,
        ),
      };
      segmentRefs.current = sortedData.episode_data.map(() =>
        createRef<HTMLDivElement>(),
      );
      setData(sortedData);
      console.log(sortedData);
    };
    fetchData();
  }, [currentEpisode]);

  if (!data) {
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
            {data.episode_title}
          </div>

          <div className="pt-1">
            <h3 className="font-semibold text-center md:text-lg lg:text-xl text-violet-300">
              {' '}
              {/* Font size increases to text-lg on md screens and to text-xl on lg screens */}
              Episode {data.episode_number}
            </h3>
            <h3 className="text-center md:text-lg lg:text-xl text-violet-300">
              {' '}
              {/* Font size increases to text-lg on md screens and to text-xl on lg screens */}
              {data.release_date}
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
          {data.episode_data
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
                  episodeNumber={data.episode_number}
                  segment={segment}
                  segmentNumber={index}
                  isOrganizedByLength={isOrganizedByLength}
                  showVideo={showVideo}
                  setShowVideo={setShowVideo}
                  youtube_url={data.youtube_url}
                  showSummary={showSummary}
                  onSummaryToggle={handleSummaryToggle}
                  showSegmentIndex={showSegmentIndex}
                  setShowSegmentIndex={setShowSegmentIndex}
                  handleSummaryToggle={handleSummaryToggle}
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
