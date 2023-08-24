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
    .sort((a, b) => {
      const lengthA = a.end_time_ms - a.start_time_ms;
      const lengthB = b.end_time_ms - b.start_time_ms;
      return lengthB - lengthA;
    })
    .slice(0, 3);

  return (
    <Link href={`/thedailygwei/${episode.episode_number}`}>
      <div className="flex justify-center w-full min-h-full mx-auto text-center transition-all duration-500 border-t h-96 border-violet-400 border-opacity-40 bg-stone-950 hover:bg-stone-800">
        <div className="relative flex w-3/4 h-full my-auto">
          <div className="relative w-64 h-64 my-auto">
            {/* Image container */}
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
          <div className="flex flex-col justify-between w-3/5 p-12 mx-auto my-auto">
            <div className="mb-4">
              <div className="w-full text-2xl text-violet-100">
                {episode.episode_title
                  ? episode.episode_title.toUpperCase()
                  : null}
              </div>
            </div>

            <div className="pb-4 mx-auto mt-2 w-fit">
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
            <div className="flex mx-auto text-xs">
              {episode.episode_keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="p-1 px-2 mx-2 my-auto rounded-lg bg-violet-600 bg-opacity-30"
                >
                  <p>{keyword.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
