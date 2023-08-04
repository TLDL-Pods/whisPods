import { EpisodeProps } from "@/types";
import Link from "next/link";
import { RiMegaphoneLine } from "react-icons/ri";

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
    <Link href={`/episode/${episode.episode_number}`}>
      <div className="mx-auto flex h-96 w-full justify-center bg-stone-950 text-center transition-all duration-500 hover:bg-stone-800">
        <div className="relative my-auto flex w-3/4">
          <div className="my-auto h-64 w-64">
            <img
              src="https://picsum.photos/1920/1080"
              alt="Background"
              className="my-auto h-full w-full object-cover"
            />
          </div>
          <div className="my-auto flex w-3/4 flex-col justify-between p-12">
            <p>{episode.release_date}</p>

            <div className="my-8">
              <p className="text-violet-400">TDGR #{episode.episode_number}</p>

              <div className="w-full overflow-hidden truncate text-2xl">
                {episode.episode_title_generated
                  ? episode.episode_title_generated.toUpperCase()
                  : null}
              </div>
            </div>

            <div className="mx-auto mt-4 w-fit pb-8">
              {topThreeSegments.map((segment, index) => (
                <div
                  key={segment.segment_number}
                  className="mx-auto my-auto flex"
                >
                  <p className="my-auto">
                    <div className="text-violet-400">
                      <RiMegaphoneLine />
                    </div>
                  </p>
                  <p className="ml-2">{segment.headline}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto flex text-sm">
              {episode.episode_keywords.map((keyword) => (
                <div className="mx-2 my-auto rounded-lg bg-violet-950 p-1 px-2">
                  <p>{keyword}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
