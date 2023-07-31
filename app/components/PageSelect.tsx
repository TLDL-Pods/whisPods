import { EpisodeProps } from "@/types";
import Link from "next/link";

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
  return (
    <Link href={`/episode/${episode.episode_number}`}>
      <div className="mx-auto flex h-96 w-full justify-center bg-stone-950 text-center transition-all duration-500 hover:bg-stone-800">
        <div key={index} className="relative my-auto flex">
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

            {cleanEpisodeTitle(episode.episode_title)}
          </div>
        </div>
      </div>
    </Link>
  );
}
