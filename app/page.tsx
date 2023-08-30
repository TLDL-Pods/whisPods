"use client";

import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { EpisodeProps, SegmentProps } from "@/types";
import TDG from "./assets/the-daily-gwei.jpg";

export default function Home() {
  const [latestEpisode, setLatestEpisode] = useState<EpisodeProps>();

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
      </div>
      <Analytics />
    </div>
  );
}
