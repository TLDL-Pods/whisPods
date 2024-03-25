import { useSegments } from '@/app/hooks/useSegments';
import { EpisodeProps } from '@/types';

interface SegmentTimelineProps {
  currentEpisode: EpisodeProps;
}

export default function SegmentTimeline({
  currentEpisode,
}: SegmentTimelineProps) {
  const { setSelectedSegmentIndex } = useSegments();

  const totalDurationMs = currentEpisode.episode_data.reduce(
    (total, segment) => total + segment.segment_length_ms,
    0,
  );

  // Pre-calculate segment lengths and start positions as percentages
  let accumulatedStartMs = 0;
  const segments = currentEpisode.episode_data.map((segment) => {
    const lengthPercentage =
      (segment.segment_length_ms / totalDurationMs) * 100;
    const startPositionPercentage =
      (accumulatedStartMs / totalDurationMs) * 100;
    accumulatedStartMs += segment.segment_length_ms;

    return {
      lengthPercentage,
      startPositionPercentage,
      title: segment.segment_title,
    };
  });

  return (
    <div className="relative h-2 w-4/5 bg-red-600">
      {segments.map((segment, index) => (
        <div
          key={index}
          title={segment.title}
          className="absolute h-full border-r-2 bg-blue-500 hover:bg-black"
          style={{
            left: `${segment.startPositionPercentage}%`,
            width: `${segment.lengthPercentage}%`,
          }}
          onClick={() => setSelectedSegmentIndex(index)}
        />
      ))}
    </div>
  );
}
