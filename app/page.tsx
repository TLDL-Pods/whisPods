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

  const displayedSegments = latestEpisode?.episode_data.slice(
    startIndex,
    startIndex + 4
  );

  function cleanEpisodeTitle(title: string): string {
    if (title?.endsWith("and more")) {
      return title.replace("and more", "").trim();
    } else if (title?.endsWith("& more")) {
      return title.replace("& more", "").trim();
    }
    return title;
  }

  return (
    <div className="h-screen min-h-screen w-full max-w-full">
      <Link href={`/episode/${latestEpisode?.episode_number}`}>
        <div className="hero relative h-1/2 w-full overflow-x-hidden border-b border-opacity-40">
          {latestEpisode && (
            <div className="absolute inset-0">
              <img
                src="https://picsum.photos/1920/1080/"
                alt="Background"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="relative flex h-full w-full justify-center">
            <div className="flex h-full w-full items-center justify-start bg-gradient-to-r from-stone-950 via-black via-65% to-transparent">
              <div className="h-full w-2/3 p-12">
                <h1 className="text-center text-xl text-violet-200">
                  LATEST EPISODE
                </h1>
                <p className="mb-5 text-center">
                  {latestEpisode?.release_date}
                </p>

                <h2 className="text-center text-2xl text-violet-400">
                  TDGR #{latestEpisode?.episode_number}
                </h2>
                <h1 className="mt-4 text-center text-4xl">
                  {cleanEpisodeTitle(
                    latestEpisode?.episode_title
                  )?.toUpperCase()}
                </h1>
                <div className="animatedHeadlines mx-auto my-6 flex h-2/5 w-fit flex-col p-6 transition-all duration-500">
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
                          <div className="mx-auto flex">
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
                  <button className="btn mx-auto rounded-lg bg-violet-700 bg-opacity-50 px-4 py-2 transition-all duration-500 hover:bg-opacity-100">
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
