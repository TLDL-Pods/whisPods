"use client";
import IndividualSegment from "@/app/components/Segment";
import { EpisodeProps, SegmentProps } from "@/types";
import { useState, useEffect, useRef, createRef, useContext } from "react";
import {
  RiArrowUpCircleFill,
  RiArrowUpCircleLine,
  RiArrowUpFill,
  RiArrowUpSFill,
  RiMegaphoneLine,
} from "react-icons/ri";

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const [data, setData] = useState<EpisodeProps>();
  const [isELI5, setIsELI5] = useState<boolean>(false);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<
    number | null
  >(null);

  const segmentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const handleMode = () => {
    setIsELI5(!isELI5);
  };

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
      console.log(sortedData);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/4 h-screen overflow-y-auto bg-stone-950">
        <h3 className="mt-4 text-center text-violet-200">
          Episode {data.episode_number}
        </h3>
        <h3 className="mt-1 text-center text-violet-200">
          {data.release_date}
        </h3>
        <h4 className="text-2xl font-bold text-center text-violet-400">
          Stories
        </h4>
        <ul className="pt-2 pb-12">
          {data.episode_data.map((segment, index) => (
            <div className="border-b border-violet-200 border-opacity-40">
              <li
                key={segment.segment_number}
                className={`flex w-full h-24 my-auto text-sm align-middle transition-all duration-500 cursor-pointer hover:bg-stone-800`}
                onClick={() => {
                  setSelectedSegmentIndex(
                    selectedSegmentIndex === index ? null : index
                  );
                  const segmentRef = segmentRefs.current[index]?.current;
                  if (segmentRef) {
                    segmentRef.scrollIntoView();
                  }
                }}
              >
                <p className="mx-4 my-auto text-lg font-semibold text-violet-400">
                  {index + 1}
                </p>
                <div className="w-4/5 p-2 my-auto">
                  {isELI5 ? segment.headline_ELI5 : segment.headline}
                </div>
              </li>
              {index === selectedSegmentIndex && (
                <div className="p-4">
                  <h3 className="text-lg font-bold text-violet-400">TLDL:</h3>
                  <ul className="p-4 mt-2 w-fit bg-stone-950">
                    {(isELI5 ? segment.bullets_ELI5 : segment.bullets).map(
                      (bullet) => (
                        <li key={bullet} className="flex">
                          <div className="my-auto">
                            <RiMegaphoneLine />
                          </div>
                          <p className="ml-2">{bullet}</p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
