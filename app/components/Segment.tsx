"use client";

"use client";

import { EpisodeProps, SegmentProps } from "@/types";
import Link from "next/link";
import { useState } from "react";
import {
  RiArrowUpCircleFill,
  RiArrowUpCircleLine,
  RiArrowUpFill,
  RiArrowUpSFill,
  RiMegaphoneLine,
} from "react-icons/ri";
import { useState } from "react";
import {
  RiArrowUpCircleFill,
  RiArrowUpCircleLine,
  RiArrowUpFill,
  RiArrowUpSFill,
  RiMegaphoneLine,
} from "react-icons/ri";

interface IndividualSegmentProps {
  index: number;
  data: EpisodeProps;
  segment: SegmentProps;
  isELI5: boolean;
}

export default function IndividualSegment({
  index,
  data,
  segment,
  isELI5,
}: IndividualSegmentProps) {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <div key={index} className={`h-fit p-24`}>
      <h1 className="text-2xl font-bold text-violet-200">
        {isELI5 ? segment.headline_ELI5 : segment.headline}
      </h1>
      <div className="p-4">
        <h3 className="text-lg font-bold text-violet-400">TLDL:</h3>
        <ul className="mt-2 w-fit bg-stone-950 p-4">
          {(isELI5 ? segment.bullets_ELI5 : segment.bullets).map((bullet) => (
            <li key={bullet} className="flex">
              <div className="my-auto">
                <RiMegaphoneLine />
              </div>
              <p className="ml-2">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-fit px-4">
        <h3
          className="flex cursor-pointer text-lg font-bold text-violet-400"
          onClick={() => setShowFullStory(!showFullStory)}
        >
          <h3 className="mr-2">Full Story</h3>{" "}
          <div
            className={`my-auto text-3xl transition-all duration-500 ${
              showFullStory ? "rotate-180" : "rotate-0"
            }`}
          >
            <RiArrowUpSFill />
          </div>
        </h3>

        <div
          className={`ml-6 max-h-fit w-3/4 cursor-pointer overflow-y-auto transition-all duration-500 ${
            showFullStory ? "h-40" : "h-0"
          }`}
          onClick={() => setShowFullStory(false)}
        >
          {isELI5 ? segment.summary_ELI5 : segment.summary}
        </div>
      </div>
    </div>
  );
}
