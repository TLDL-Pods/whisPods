"use client";
import { useRouter } from "next/navigation";

import { EpisodeProps, SegmentProps } from "@/types";
import { useState, useEffect, useRef, createRef } from "react";
import { IoArrowBack } from "react-icons/io5";

import { ImListNumbered } from "react-icons/im";
import { BiSolidTimer } from "react-icons/bi";

import Segment from "@/app/components/Segment";

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
    } else {
      setShowSummary(index);
    }
  };

  const [currentEpisode, setCurrentEpisode] = useState<number>(
    parseInt(params.ep_number, 10)
  );

  useEffect(() => {
    const fetchData = async () => {
      const episodeNumber = parseInt(params.ep_number, 10);
      const res = await fetch(`/api/episode?episode_number=${episodeNumber}`);
      const json = await res.json();
      const filteredSegments = json["data"].episode_data.filter(
        (segment: SegmentProps) => segment.segment_number !== 0
      );
      const sortedData = {
        ...json["data"],
        episode_data: filteredSegments.sort(
          (a: SegmentProps, b: SegmentProps) =>
            b.segment_length_ms - a.segment_length_ms
        ),
      };
      segmentRefs.current = sortedData.episode_data.map(() =>
        createRef<HTMLDivElement>()
      );
      setData(sortedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/episode?episode_number=${currentEpisode}`);
      const json = await res.json();
      const filteredSegments = json["data"].episode_data.filter(
        (segment: SegmentProps) => segment.segment_number !== 0
      );
      const sortedData = {
        ...json["data"],
        episode_data: filteredSegments.sort(
          (a: SegmentProps, b: SegmentProps) =>
            b.segment_length_ms - a.segment_length_ms
        ),
      };
      segmentRefs.current = sortedData.episode_data.map(() =>
        createRef<HTMLDivElement>()
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
    <div className="flex justify-center min-h-screen ">
      {/* Main Content */}
      <div className="">
        {/* Back to Episodes button */}
        <button
          onClick={() => router.push("/")}
          className="p-1 font-bold text-white rounded hover:bg-stone-900"
        >
          <IoArrowBack size={24} className="inline-block" />
        </button>

        <h3 className="mt-4 text-center text-violet-200">
          Episode {data.episode_number}
        </h3>
        <h3 className="mt-1 text-center text-violet-200">
          {data.release_date}
        </h3>
        <h4 className="text-2xl font-bold text-center text-violet-400">News</h4>

        {/* Organize by time or order button */}
        <div className="pr-3 text-right ">
          <button
            onClick={toggleOrganization}
            className="hover:bg-stone-900"
            title="Presentation order or longest first"
          >
            {isOrganizedByLength ? <ImListNumbered /> : <BiSolidTimer />}
          </button>
        </div>

        <ul className="pt-2 ">
          {data.episode_data
            .sort(
              isOrganizedByLength
                ? (a: SegmentProps, b: SegmentProps) =>
                    b.segment_length_ms - a.segment_length_ms
                : (a: SegmentProps, b: SegmentProps) =>
                    a.segment_number - b.segment_number
            )
            .map((segment, index) => (
              <div
                key={segment.segment_number}
                className="border-b border-violet-100 border-opacity-40"
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
                  onSegmentClick={(index) => {
                    history.pushState(null, "", `#segment-${index}`);
                    setSelectedSegmentIndex(
                      selectedSegmentIndex === index ? null : index
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
