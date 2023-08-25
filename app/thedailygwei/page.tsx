"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import PageSelect from "@/app/components/PageSelect";
import { EpisodeProps, SegmentProps } from "@/types";
import { RiMegaphoneLine } from "react-icons/ri";
import { useEpisodeContext } from "@/app/hooks/useEpisodeContext";
import TDG from "@/app/assets/the-daily-gwei.jpg";
import sassano from "@/app/assets/sassano_400x400.jpg";
import { SearchBar } from "@/app/components/SearchBar";

export default function Home() {
  const { data, setData } = useEpisodeContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(10);
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const [startIndex, setStartIndex] = useState(0);

  const sortedEpisodes = [...data].sort(
    (a, b) => b.episode_date - a.episode_date
  );
  const currentEpisodes = sortedEpisodes.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );

  const latestEpisode = currentEpisodes[0];

  const [animationState, setAnimationState] = useState<
    "slide-in" | "slide-out"
  >("slide-in");

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
    <div className="w-full max-w-full">
      {/* Podcast Card*/}
      <div className="flex items-center pt-4 justify-left">
        <Link href={`/thedailygwei`}>
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
              <div className="max-w-md break-words">
                <h1 className="text-xl text-center text-violet-200">
                  The Daily Gwei Refuel
                </h1>
                <p className="text-sm text-center text-gray-400">
                  The Daily Gwei Refuel gives you a recap every week day on
                  everything that happened in the Ethereum and crypto ecosystems
                  over the previous 24 hours - hosted by Anthony Sassano.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      {/* Host Card*/}
      <div className="flex items-center pt-4 justify-left">
        <Link href={`/thedailygwei`}>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center p-4 border rounded">
              {/* Image on the left */}
              <div className="mr-4">
                <Image
                  src={sassano}
                  alt={"The Daily Gwei"}
                  className="w-32 h-32"
                  width={90}
                  height={90}
                />
              </div>
              {/* Info on the right */}
              <div className="max-w-md break-words">
                <h1 className="text-xl text-center text-violet-200">
                  Anthony Sassano
                </h1>
                <p className="text-sm text-center text-gray-400">
                  Independent Ethereum educator, investor and advisor.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      {/* Search Bar */}
      {/* <div className="flex items-center pt-4 justify-left">
        <SearchBar />
      </div> */}
      <Link href={`/thedailygwei/${latestEpisode?.episode_number}`}>
        <div className="relative w-full overflow-x-hidden border-b hero h-1/2 border-opacity-40">
          {latestEpisode && (
            <div className="absolute inset-0">
              <Image
                src={TDG}
                alt="Background"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          {/* <div className="relative flex justify-center w-full h-full">
            <div className="flex h-full w-full items-center justify-start bg-gradient-to-r from-stone-950 via-stone-950 via-65% to-transparent">
              <div className="w-2/3 h-full p-12">
                <h1 className="text-xl text-center text-violet-200">
                  LATEST EPISODE
                </h1>
                <p className="mb-5 text-center">
                  {latestEpisode?.release_date}
                </p>
                <h2 className="text-2xl text-center text-violet-400">
                  TDG #{latestEpisode?.episode_number}
                </h2>
                <h1 className="text-4xl text-center">
                  {latestEpisode?.episode_title?.toUpperCase()}
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
          </div> */}
        </div>
      </Link>
      <div className="pb-32">
        {currentEpisodes.map((episode: EpisodeProps, index: number) => (
          <PageSelect key={episode._id} episode={episode} />
        ))}
      </div>
    </div>
  );
}
