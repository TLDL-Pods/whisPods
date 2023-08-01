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
  return (
    <div
      key={index}
      className={`h-fit p-24 transition-all duration-1000 hover:bg-stone-950`}
    >
      <h1 className="mb-2 text-xl font-bold">
        {isELI5 ? segment.headline_ELI5 : segment.headline}
      </h1>
      <ul>
        {(isELI5 ? segment.bullets_ELI5 : segment.bullets).map(
          (bullet, index) => (
            <li key={index} className="ml-8">
              -- {bullet}
            </li>
          )
        )}
      </ul>
      <p className="my-2 text-sm">
        {isELI5 ? segment.summary_ELI5 : segment.summary}
      </p>
    </div>
  );
}
