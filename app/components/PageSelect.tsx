import { EpisodeProps } from "@/types";
import Link from "next/link";

interface PageSelectProps {
  index: number;
  episode: EpisodeProps;
}

export default function PageSelect({ index, episode }: PageSelectProps) {
  return (
    <div className="mt-5 flex">
      <div key={index} className="mb-5">
        <p>{episode.release_date}</p>
        <h2 className="flex">
          <Link href={`/episode/${episode.episode_number}`}>
            <p className="text-blue-600">{episode.episode_number}</p>
          </Link>
          {" - "}
          {episode.episode_title}
        </h2>
      </div>
    </div>
  );
}
