"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PageSelect from "@/app/components/PageSelect";
import { EpisodeProps, SegmentProps } from "@/types";
import { useEpisodeContext } from "@/app/hooks/useEpisodeContext";
import TDG from "@/app/assets/the-daily-gwei.jpg";
import sassano from "@/app/assets/sassano_400x400.jpg";

export default function Home() {
  const { data, setData } = useEpisodeContext();

  return (
    <div className="flex flex-col items-center w-full max-w-full">
      <div className="flex flex-col space-y-6 ">
        {/* Podcast Card*/}
        <Link href={`/thedailygwei`}>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center p-4 border rounded">
              {/* Image on the left */}
              <div className="mr-4">
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
        {/* Host Card*/}
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

      {/* Episodes */}
      <div className="pb-32">
        {data.map((episode: EpisodeProps, index: number) => (
          <PageSelect key={episode._id} episode={episode} />
        ))}
      </div>
    </div>
  );
}
