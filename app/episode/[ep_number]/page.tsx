"use client";
import IndividualSegment from "@/app/components/Segment";
import { EpisodeProps, SegmentProps } from "@/types";
import { useState, useEffect } from "react";

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const [data, setData] = useState<EpisodeProps>();
  const [isELI5, setIsELI5] = useState<boolean>(false);

  const handleMode = () => {
    setIsELI5(!isELI5);
  };

  useEffect(() => {
    const fetchData = async () => {
      const episodeNumber = parseInt(params.ep_number, 10);
      const res = await fetch(`/api/episode?episode_number=${episodeNumber}`);
      const json = await res.json();
      const sortedData = {
        ...json["data"],
        episode_data: json["data"].episode_data.sort(
          (a: SegmentProps, b: SegmentProps) => {
            const lengthA = a.end_time_ms - a.start_time_ms;
            const lengthB = b.end_time_ms - b.start_time_ms;
            return lengthB - lengthA; // For descending order
          }
        ),
      };
      setData(sortedData);
      console.log(sortedData);
    };
    fetchData();
    console.log(data);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-3/4 ">
        <div className="mb- mx-auto my-4 flex w-40 flex-col text-center">
          <label>Mode:</label>
          <div className="flex">
            <button
              className={`${
                !isELI5 ? "bg-opacity-100" : "bg-opacity-20"
              } w-20 rounded-l-md bg-violet-500`}
              onClick={handleMode}
            >
              Standard
            </button>
            <button
              className={`${
                isELI5 ? "bg-opacity-100" : "bg-opacity-20"
              } w-20 rounded-r-md bg-violet-500`}
              onClick={handleMode}
            >
              ELI5
            </button>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl text-violet-400">
            TDGR #{data.episode_number}
          </h3>
          <h3>{data.release_date}</h3>
          <h1 className="mt-4 text-4xl">{data.episode_title.toUpperCase()}</h1>
        </div>
        <div>
          {data?.episode_data && (
            <div className="flex flex-col">
              {data.episode_data.map((item, index) => (
                <IndividualSegment
                  key={index}
                  index={index}
                  data={data}
                  segment={item}
                  isELI5={isELI5}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
