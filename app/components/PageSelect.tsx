import { EpisodeProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { RiMegaphoneLine } from "react-icons/ri";
import TDG from "../assets/the-daily-gwei.jpg";

interface PageSelectProps {
  episode: EpisodeProps;
}

export default function PageSelect({ episode }: PageSelectProps) {
  const topThreeSegments = episode.episode_data
    .sort((a, b) => b.segment_length_ms - a.segment_length_ms)
    .slice(0, 3);
  // bg-stone-950
  return (
    <Link href={`/thedailygwei/${episode.episode_number}`}>
      <div className="flex flex-col flex-grow w-full min-h-full text-center transition-all duration-500 border-t bg-stone-950 border-violet-400 border-opacity-40 hover:bg-stone-800">
        {/* Image, Episode Number, and Date for mobile */}
        <div className="flex items-center w-full mb-3 lg:w-auto lg:hidden">
          <div className="relative w-24 h-16 mr-1 lg:w-64 lg:h-64">
            {/* Image container */}
            <Image
              src={TDG}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col mb-2 mr-2">
            <span className="text-sm font-bold text-white lg:text-xl lg:text-black">
              {episode.episode_number}
            </span>
            <span className="text-sm font-bold text-white lg:text-xl lg:text-black">
              {episode.release_date}
            </span>
          </div>
          <div className="w-full mb-2">
            <div className="text-base lg:text-2xl text-violet-100">
              {episode.episode_title
                ? episode.episode_title.toUpperCase()
                : null}
            </div>
          </div>
        </div>

        {/* Image, Episode Number, and Date for larger screens */}
        <div className="flex items-center justify-center">
          {/* Image */}
          <div className="relative hidden w-32 lg:block">
            <Image
              src={TDG}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Title, Date, Segments, Keywords */}
          <div className="justify-center w-1/2">
            <div className="grid grid-cols-12 gap-x-0 lg:text-left">
              {/* Episode Number*/}
              <div className="hidden mt-2 mr-1 lg:text-end lg:block text-l lg:text-xl text-violet-100 lg:col-span-1 lg:row-span-3">
                {episode.episode_number}:{" "}
              </div>
              {/* Title*/}
              <div className="justify-start hidden mt-2 lg:block text-l lg:text-xl text-violet-100 lg:col-span-9">
                {episode.episode_title
                  ? episode.episode_title.toUpperCase()
                  : null}
              </div>
              {/* Date */}
              <div className="hidden mt-2 lg:text-right lg:block text-l lg:text-sm text-violet-100 lg:col-span-2">
                {episode.release_date}
              </div>
              {/* Segments */}
              <div className="hidden mt-2 mb-2 lg:text-center lg:block text-l lg:text-l text-violet-100 lg:col-span-9">
                {topThreeSegments.map((segment, index) => (
                  <div
                    key={segment.segment_number}
                    className="flex mx-auto my-auto"
                  >
                    <div className="mt-1 text-violet-400">
                      <RiMegaphoneLine />
                    </div>

                    <p className="ml-2 text-left">{segment.segment_title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
