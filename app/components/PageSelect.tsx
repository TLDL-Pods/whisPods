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

  return (
    <Link href={`/thedailygwei/${episode.episode_number}`}>
      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-full text-center transition-all duration-500 border-t border-violet-400 border-opacity-40 bg-stone-950 hover:bg-stone-800">
        {/* Image, Episode Number, and Date for mobile */}
        <div className="flex items-center w-full md:w-auto md:hidden mb-3">
          <div className="relative w-24 h-16 md:w-64 md:h-64 mr-1">
            {/* Image container */}
            <Image
              src={TDG}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex mb-2 flex-col mr-2">
            <span className="text-sm md:text-xl font-bold text-white md:text-black">
              {episode.episode_number}
            </span>
            <span className="text-sm md:text-xl font-bold text-white md:text-black">
              {episode.release_date}
            </span>
          </div>
          <div className="mb-2 w-full">
            <div className="text-base md:text-2xl text-violet-100">
              {episode.episode_title
                ? episode.episode_title.toUpperCase()
                : null}
            </div>
          </div>
        </div>

        {/* Image container for larger screens */}
        <div className="md:flex items-center justify-center w-1/2 h-full">
          <div className="hidden md:block relative w-64 h-64 mr-10">
            <Image
              src={TDG}
              alt="Background"
              className="object-cover w-full h-full"
            />
            {/* Number overlay */}
            <div
              className="absolute transform -translate-x-1/2 top-1/2 left-1/2 -translate-y-3/5"
              style={{ transform: "translate(-60%, -150%) rotate(-32deg)" }}
            >
              <span className="text-xl font-bold text-black">
                {episode.episode_number}
              </span>
            </div>
            {/* Date overlay */}
            <div className="absolute bottom-0 pb-1 transform -translate-x-1/2 left-1/2">
              <span className="text-xl font-bold text-black">
                {episode.release_date}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-1/2 md:ml-1">
          <div className="hidden md:block mb-4 w-full">
            <div className="text-l md:text-2xl text-violet-100">
              {episode.episode_title
                ? episode.episode_title.toUpperCase()
                : null}
            </div>
          </div>

          {/* Segments */}
          <div className="hidden md:block pb-4 mx-auto mt-2 w-fit">
            {topThreeSegments.map((segment, index) => (
              <div
                key={segment.segment_number}
                className="flex mx-auto my-auto"
              >
                <div className="mt-1 text-violet-400">
                  <RiMegaphoneLine />
                </div>

                <p className="ml-2 text-left">{segment.headline}</p>
              </div>
            ))}
          </div>
          {/* Keywords */}
          <div className="hidden md:flex mx-auto text-xs">
            {episode.episode_keywords && episode.episode_keywords.length > 0
              ? episode.episode_keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="p-1 px-2 mx-2 my-auto rounded-lg bg-violet-600 bg-opacity-30"
                  >
                    <p>{keyword.toUpperCase()}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
