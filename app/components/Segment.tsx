import { EpisodeProps, SegmentProps } from "@/types";
import Link from "next/link";

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
  if (!isELI5) {
    return (
      <div key={index} className="my-6">
        <h1 className="mb-2 text-xl font-bold">{segment.headline}</h1>
        <ul>
          {data.episode_data[index].bullets.map((bullet, index) => (
            <li key={index} className="ml-8">
              -- {bullet}
            </li>
          ))}
        </ul>
        <p className="my-2 text-sm">{segment.summary}</p>
      </div>
    );
  }

  if (isELI5) {
    return (
      <div key={index} className="my-6">
        <h1 className="mb-2 text-xl font-bold">{segment.headline_ELI5}</h1>
        <ul>
          {data.episode_data[index].bullets_ELI5.map((bullet, index) => (
            <li key={index} className="ml-8">
              -- {bullet}
            </li>
          ))}
        </ul>
        <p className="my-2 text-sm">{segment.summary_ELI5}</p>
      </div>
    );
  }
}
