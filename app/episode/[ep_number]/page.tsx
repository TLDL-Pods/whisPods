"use client";
import IndividualSegment from "@/app/components/Segment";
import { EpisodeProps } from "@/types";
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
      setData(json["data"]);
      console.log(json["data"]);
    };
    fetchData();
    console.log(data);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-3/4 ">
        <div className="flex w-40 my-4">
          <label>Mode:</label>
          <div className="flex ml-4">
            <button
              className={`${
                !isELI5 ? "bg-opacity-100" : "bg-opacity-20"
              } w-20 bg-violet-500`}
              onClick={handleMode}
            >
              Standard
            </button>
            <button
              className={`${
                isELI5 ? "bg-opacity-100" : "bg-opacity-20"
              } w-20 bg-violet-500`}
              onClick={handleMode}
            >
              ELI5
            </button>
          </div>
        </div>
        <h1 className="mt-6">Episode Page: {params.ep_number} </h1>

        <div>
          <h1>{data.episode_number}</h1>
          <h2>{data.episode_title}</h2>
          <h3>{data.release_date}</h3>

          {data.episode_data && (
            <div className="flex flex-col">
              {data.episode_data.map((item, index) => (
                <IndividualSegment
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
