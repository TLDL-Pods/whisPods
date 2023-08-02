"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import PageSelect from "./components/PageSelect";
import { EpisodeProps, SegmentProps } from "@/types";
import { RiMegaphoneLine } from "react-icons/ri";

export default function Home() {
  const [data, setData] = useState<EpisodeProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = data.slice(indexOfFirstEpisode, indexOfLastEpisode);
  const latestEpisode = currentEpisodes[currentEpisodes.length - 1];

  const [animationState, setAnimationState] = useState<
    "slide-in" | "slide-out"
  >("slide-in");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/all-episodes`);
      const json = await res.json();
      setData(json["data"]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (latestEpisode && animationState === "slide-out") {
        setStartIndex(
          (prevIndex) => (prevIndex + 4) % latestEpisode.episode_data.length
        );
        setAnimationState("slide-in");
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

  function cleanEpisodeTitle(title: string): string {
    if (title?.endsWith("and more")) {
      return title.replace("and more", "").trim();
    } else if (title?.endsWith("& more")) {
      return title.replace("& more", "").trim();
    }
    return title;
  }

  return (
    <div className="w-full h-screen max-w-full min-h-screen overflow-y-scroll">
      <Link href={`/episode/${latestEpisode?.episode_number}`}>
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
                  {cleanEpisodeTitle(
                    latestEpisode?.episode_title
                  )?.toUpperCase()}
                </h1>
                <div className="flex flex-col p-6 mx-auto my-6 transition-all duration-500 animatedHeadlines h-2/5 w-fit">
                  {displayedSegments?.map(
                    (segment: SegmentProps, index: number) => (
                      <div
                        key={index}
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
      {currentEpisodes
        .reverse()
        .map(
          (episode: EpisodeProps, index: number) =>
            index > 1 && (
              <PageSelect
                key={index}
                index={index}
                episode={episode}
                cleanEpisodeTitle={cleanEpisodeTitle}
              />
            )
        )}
    </div>
  );
}
