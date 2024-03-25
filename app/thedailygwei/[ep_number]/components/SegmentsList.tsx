import { EpisodeProps, SegmentProps } from '@/types';
import EpisodeSegment from '@/app/thedailygwei/[ep_number]/components/episodeSegment/EpisodeSegment';
import { useSegments } from '@/app/hooks/useSegments';

interface SegmentsListProps {
  currentEpisode: EpisodeProps;
}

export default function SegmentsList({ currentEpisode }: SegmentsListProps) {
  const { isOrganizedByLength } = useSegments();

  return (
    <div className="min-w-screen relative flex h-full flex-col justify-center">
      {/* Segments */}
      <div className={`mt-2 flex w-full justify-center`}>
        <ul className="list-none">
          {currentEpisode.episode_data
            .sort(
              isOrganizedByLength
                ? (a: SegmentProps, b: SegmentProps) =>
                    b.segment_length_ms - a.segment_length_ms
                : (a: SegmentProps, b: SegmentProps) =>
                    a.segment_number - b.segment_number,
            )
            .map((segment, index) => (
              <div
                key={segment.segment_number}
                className="border-b border-white border-opacity-30 bg-base"
              >
                <EpisodeSegment segment={segment} segmentNumber={index} />
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
