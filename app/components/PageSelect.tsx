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
      <div className="flex flex-col items-center justify-center w-full min-h-full text-center transition-all duration-500 border-t md:flex-row border-violet-400 border-opacity-40 bg-stone-950 hover:bg-stone-800">
        {/* Image, Episode Number, and Date for mobile */}
        <div className="flex items-center w-full mb-3 md:w-auto md:hidden">
          <div className="relative w-24 h-16 mr-1 md:w-64 md:h-64">
            {/* Image container */}
            <Image
              src={TDG}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col mb-2 mr-2">
            <span className="text-sm font-bold text-white md:text-xl md:text-black">
              {episode.episode_number}
            </span>
            <span className="text-sm font-bold text-white md:text-xl md:text-black">
              {episode.release_date}
            </span>
          </div>
          <div className="w-full mb-2">
            <div className="text-base md:text-2xl text-violet-100">
              {episode.episode_title
                ? episode.episode_title.toUpperCase()
                : null}
            </div>
          </div>
        </div>

        <div className="flex items-center mx-auto md:max-w-5xl">
          {/* Image container for larger screens */}
          <div className="hidden md:flex md:w-1/3">
            <div className="relative hidden w-64 h-64 mr-10 md:block">
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

          <div className="flex flex-col justify-center w-full md:w-2/3">
            <div className="hidden w-full mb-4 md:block">
              <div className="text-l md:text-2xl text-violet-100">
                {episode.episode_title
                  ? episode.episode_title.toUpperCase()
                  : null}
              </div>
            </div>

            {/* Segments */}
            <div className="hidden pb-4 mx-auto mt-2 md:block w-fit">
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
            <div className="hidden mx-auto text-xs md:flex">
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
      </div>
    </Link>
  );
}
