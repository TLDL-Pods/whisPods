"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import PageSelect from "./components/PageSelect";
import { useEpisodeContext } from "./hooks/useEpisodeContext";
import { EpisodeProps, SegmentProps } from "@/types";
import { RiMegaphoneLine } from "react-icons/ri";
import TDG from "./assets/the-daily-gwei.jpg";

export default function Home() {
  const [latestEpisode, setLatestEpisode] = useState<EpisodeProps>();
  const { data, setData } = useEpisodeContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(10);
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const [startIndex, setStartIndex] = useState(0);
  const [animationState, setAnimationState] = useState<
    "slide-in" | "slide-out"
  >("slide-in");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/latest-episode`);
      const json = await res.json();
      console.log(json);
      setLatestEpisode(json["data"]);
      console.log(json);
    };
    fetchData();
    console.log("data", latestEpisode);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (latestEpisode && animationState === "slide-out") {
        setStartIndex(
          (prevIndex) => (prevIndex + 4) % latestEpisode.episode_data.length
        );
        setAnimationState("slide-in");
      } else if (animationState === "slide-in") {
        setAnimationState("slide-out");
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [latestEpisode, animationState]);

  const displayedSegments = latestEpisode?.episode_data
    .sort((a: SegmentProps, b: SegmentProps) => {
      const lengthA = a.end_time_ms - a.start_time_ms;
      const lengthB = b.end_time_ms - b.start_time_ms;
      return lengthB - lengthA;
    })
    .slice(startIndex, startIndex + 4);

  return (
    <div className="flex-col justify-center w-full p-4">
      {/* Header */}
      <header className="p-4 text-white bg-gray-800">
        <h1 className="text-2xl font-bold">Too Long Didn't Listen</h1>
        <p className="mt-2">Summarize, trends, and references for Podcasts</p>
      </header>

      {/* Latest Story */}
      <div className="flex items-center justify-center pt-4">
        <Link href={`/thedailygwei/${latestEpisode?.episode_number}`}>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center p-4 border rounded">
              {/* Image on the left */}
              <div className="mr-4">
                {" "}
                {/* Note the added mr-4 class for some spacing between the image and the text */}
                <Image
                  src={TDG}
                  alt={"The Daily Gwei"}
                  className="w-32 h-32"
                  width={90}
                  height={90}
                />
              </div>
              {/* Info on the right */}
              <div>
                <h1 className="text-xl text-center text-violet-200">
                  LATEST EPISODE
                </h1>
                <p className="text-center ">{latestEpisode?.release_date}</p>
                <p className="text-center text-violet-400">
                  #{latestEpisode?.episode_number}
                </p>
                <h2 className="text-center text-l">
                  {latestEpisode?.episode_title}
                </h2>
              </div>
            </div>
          </div>
        </Link>

        {/* <div className="w-full max-w-2xl mx-auto">
          <Link
            href={`/podcasts/thedailygwei/episode/${latestEpisode?.episode_number}`}
          >
            <div className="relative w-full overflow-x-hidden border-b hero h-1/2 border-opacity-40">
              {latestEpisode && (
                <div className="absolute inset-0">
                  <img
                    src="https://picsum.photos/1920/1080/"
                    alt="Background"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="relative flex justify-center w-full h-full">
                <div className="flex h-full w-full items-center justify-start bg-gradient-to-r from-stone-950 via-stone-950 via-65% to-transparent">
                  <div className="w-2/3 h-full p-12">
                    <h1 className="text-xl text-center text-violet-200">
                      LATEST EPISODE
                    </h1>
                    <p className="mb-5 text-center">
                      {latestEpisode?.release_date}
                    </p>
                    <h2 className="text-2xl text-center text-violet-400">
                      TDGR #{latestEpisode?.episode_number}
                    </h2>
                    <h1 className="text-4xl text-center">
                      {latestEpisode?.episode_title_generated?.toUpperCase()}
                    </h1>
                    <div className="flex flex-col h-40 p-6 mx-auto my-auto transition-all duration-500 animatedHeadlines w-fit">
                      {displayedSegments?.map(
                        (segment: SegmentProps, index: number) => (
                          <div
                            key={segment.segment_number}
                            className={animationState}
                            onAnimationEnd={(e) => {
                              if (e.animationName === "slideInFromLeft") {
                                setAnimationState("slide-out");
                              }
                            }}
                          >
                            {segment.headline.length > 1 && (
                              <div className="flex mx-auto">
                                <div className="my-auto">
                                  <RiMegaphoneLine />
                                </div>
                                <p className="ml-2">{segment.headline}</p>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex w-full">
                      <button className="px-4 py-2 mx-auto transition-all duration-500 bg-opacity-50 rounded-lg btn bg-violet-700 hover:bg-opacity-100">
                        View More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
