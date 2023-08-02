import { EpisodeProps } from "@/types";
import Link from "next/link";
import { RiMegaphoneLine } from "react-icons/ri";

interface PageSelectProps {
  index: number;
  episode: EpisodeProps;
  cleanEpisodeTitle: (title: string) => string;
}

export default function PageSelect({
  index,
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
      <div className="flex justify-center w-full mx-auto text-center transition-all duration-500 h-96 bg-stone-950 hover:bg-stone-800">
        <div key={index} className="relative flex my-auto">
          <div className="w-64 h-64 my-auto">
            <img
              src="https://picsum.photos/1920/1080"
              alt="Background"
              className="object-cover w-full h-full my-auto"
            />
          </div>
          <div className="flex flex-col p-12 my-auto">
            <p>{episode.release_date}</p>

            <p className="text-blue-600">{episode.episode_number}</p>

            {cleanEpisodeTitle(episode.episode_title)}
            <div className="mt-4 w-fit">
              {topThreeSegments.map((segment, index) => (
                <div key={index} className="flex mx-auto my-auto">
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
    </Link>
  );
}
