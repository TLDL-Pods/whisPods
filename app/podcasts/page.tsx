"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { EpisodeProps, SegmentProps } from "@/types";
import TDG from "../assets/the-daily-gwei.jpg";

export default function Home() {
  const [latestEpisode, setLatestEpisode] = useState<EpisodeProps>();
  const [startIndex, setStartIndex] = useState(0);
  const [animationState, setAnimationState] = useState<
    "slide-in" | "slide-out"
  >("slide-in");

  return (
    <div className="flex-col justify-center w-full p-4">
      {/* Latest Story */}
      <h1 className="text-3xl font-bold text-left text-violet-200">Podcasts</h1>
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
    </div>
  );
}
