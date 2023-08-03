"use client";
import IndividualSegment from "@/app/components/Segment";
import { EpisodeProps, SegmentProps } from "@/types";
import { useState, useEffect, useRef, createRef, useContext } from "react";

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const [data, setData] = useState<EpisodeProps>();
  const [isELI5, setIsELI5] = useState<boolean>(false);

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
    <div className="flex h-screen">
      <div className="w-full justify-center overflow-y-scroll">
        <div className="fixed left-0 h-full w-80 overflow-y-scroll bg-stone-950">
          <h3 className="mt-4 text-center text-violet-200">
            Episode {data.episode_number}
          </h3>
          <h4 className="text-center text-2xl font-bold text-violet-400">
            Stories
          </h4>
          <ul className="pb-32">
            {data.episode_data.map((segment, index) => (
              <li
                key={segment.segment_number}
                className="my-auto flex h-24 w-80 cursor-pointer border-b border-violet-200 border-opacity-40 align-middle text-sm transition-all duration-500 hover:bg-stone-800"
                onClick={() => {
                  const segmentRef = segmentRefs.current[index]?.current;
                  if (segmentRef) {
                    segmentRef.scrollIntoView();
                  }
                }}
              >
                <p className="mx-4 my-auto text-lg font-semibold text-violet-400">
                  {index + 1}
                </p>
                <div className="my-auto w-4/5 p-2">
                  {isELI5 ? segment.headline_ELI5 : segment.headline}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full pl-80">
          <div className="my-8 pl-24">
            <h3 className="mb-6 text-3xl font-bold text-violet-400">
              The Daily Gwei Refuel
            </h3>
            <h3 className="text-2xl text-violet-400">
              Episode {data.episode_number}
            </h3>
            <h3 className="text-violet-100">{data.release_date}</h3>
            <h1 className="mt-4 text-4xl text-violet-100">
              {data.episode_title_generated.toUpperCase()}
            </h1>
          </div>
          <div>
            {data.episode_data.map((segment, index) => (
              <div
                ref={segmentRefs.current[index]}
                key={segment.segment_number}
              >
                <IndividualSegment
                  key={segment.segment_number}
                  index={index}
                  data={data}
                  segment={segment}
                  isELI5={isELI5}
                />
                <div className="mx-auto h-1 w-full border-b border-white border-opacity-40"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex w-48 flex-col rounded-lg bg-stone-700 bg-opacity-40 px-4 pb-4 pt-2 text-center">
        <label>Mode:</label>
        <div className="mt-2 flex">
          <button
            className={`${
              !isELI5 ? "bg-opacity-100" : "bg-opacity-20"
            } w-20 rounded-l-md bg-violet-600`}
            onClick={handleMode}
          >
            Standard
          </button>
          <button
            className={`${
              isELI5 ? "bg-opacity-100" : "bg-opacity-20"
            } w-20 rounded-r-md bg-violet-600`}
            onClick={handleMode}
          >
            ELI5
          </button>
        </div>
      </div>
    </div>
  );
}
