import { EpisodeProps } from "@/types";
import Link from "next/link";
import { RiMegaphoneLine } from "react-icons/ri";

interface PageSelectProps {
  episode: EpisodeProps;
  cleanEpisodeTitle: (title: string) => string;
}

export default function PageSelect({
  episode,
  cleanEpisodeTitle,
}: PageSelectProps) {
  const topThreeSegments = episode.episode_data
    .sort((a, b) => {
      const lengthA = a.end_time_ms - a.start_time_ms;
      const lengthB = b.end_time_ms - b.start_time_ms;
      return lengthB - lengthA; // for descending order
    })
    .slice(0, 3);

  return (
    <Link href={`/episode/${episode.episode_number}`}>
      <div className="mx-auto flex h-96 w-full justify-center bg-stone-950 text-center transition-all duration-500 hover:bg-stone-800">
        <div className="relative my-auto flex">
          <div className="my-auto h-64 w-64">
            <div className="mx-auto flex h-96 w-full justify-center bg-stone-950 text-center transition-all duration-500 hover:bg-stone-800">
              <div className="relative my-auto flex">
                <div className="my-auto h-64 w-64">
                  <img
                    src="https://picsum.photos/1920/1080"
                    alt="Background"
                    className="my-auto h-full w-full object-cover"
                  />
                </div>
                <div className="my-auto flex flex-col p-12">
                  <p>{episode.release_date}</p>

                  <p className="text-blue-600">{episode.episode_number}</p>

                  {episode.episode_title_generated
                    ? cleanEpisodeTitle(
                        episode.episode_title_generated.toUpperCase()
                      )
                    : null}
                  <div className="mt-4 w-fit">
                    {topThreeSegments.map((segment, index) => (
                      <div
                        key={segment.segment_number}
                        className="mx-auto my-auto flex"
                      >
                        <p className="my-auto">
                          <RiMegaphoneLine />
                        </p>
                        <p className="ml-2">{segment.headline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
