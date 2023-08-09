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
    <div className="grid grid-cols-4">
      <div className="fixed left-0 h-screen col-span-1 overflow-y-auto bg-stone-950">
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
            <li
              key={segment.segment_number}
              className="flex h-24 my-auto text-sm align-middle transition-all duration-500 border-b cursor-pointer w-80 border-violet-200 border-opacity-40 hover:bg-stone-800"
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
              <div className="w-4/5 p-2 my-auto">
                {isELI5 ? segment.headline_ELI5 : segment.headline}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3 ml-[25%]">
        <div className="w-full">
          <div className="pl-24 my-8">
            <h3 className="mb-6 text-3xl font-bold text-violet-400">
              The Daily Gwei Refuel - Episode {data.episode_number}
            </h3>
            <h3 className="text-violet-100">{data.release_date}</h3>
            <h1 className="mt-4 text-4xl text-violet-100">
              {data.episode_title_generated
                ? data.episode_title_generated.toUpperCase()
                : null}
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
                <div className="w-full h-1 mx-auto border-b border-white border-opacity-40"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed flex flex-col w-48 px-4 pt-2 pb-4 text-center rounded-lg bottom-8 right-8 bg-stone-700 bg-opacity-40">
        <label>Mode:</label>
        <div className="flex mt-2">
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
