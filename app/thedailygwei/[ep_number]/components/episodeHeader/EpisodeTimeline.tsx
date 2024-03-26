import { useApp } from '@/app/hooks/useApp';
import { useSegments } from '@/app/hooks/useSegments';
import { EpisodeProps } from '@/types';

interface SegmentTimelineProps {
  currentEpisode: EpisodeProps;
}

export default function SegmentTimeline({
  currentEpisode,
}: SegmentTimelineProps) {
  const { state, setState } = useApp();

  const totalDurationMs = currentEpisode.episode_data.reduce(
    (total, segment) => total + segment.segment_length_ms,
    0,
  );

  // Sort segments based on the current organization preference
  const sortedSegments = [...currentEpisode.episode_data].sort(
    state.segmentsByLength
      ? (a, b) => b.segment_length_ms - a.segment_length_ms // Longest first
      : (a, b) => a.segment_number - b.segment_number, // Original order
  );

  // Calculate segment lengths and start positions as percentages
  let accumulatedStartMs = 0;
  const segments = sortedSegments.map((segment, index) => {
    const lengthPercentage =
      (segment.segment_length_ms / totalDurationMs) * 100;
    // Update startPositionPercentage based on accumulatedStartMs which adjusts based on the sorted order
    const startPositionPercentage =
      (accumulatedStartMs / totalDurationMs) * 100;
    accumulatedStartMs += segment.segment_length_ms;

    return {
      lengthPercentage,
      startPositionPercentage,
      title: segment.segment_title,
      index: currentEpisode.episode_data.indexOf(segment), // Store original index for consistent selection
    };
  });

  return (
    <div className="mx-auto flex w-11/12 flex-col text-xs">
      <p className="text-center">
        {
          segments[state.currentSegmentIndex ? state.currentSegmentIndex : 0]
            .title
        }
      </p>
      <div className="relative my-auto flex h-2 w-full items-center">
        {segments.map((segment, i) => (
          <div
            key={i} // Use original index to ensure keys are stable through re-renders
            title={segment.title}
            className={`absolute border-r-2  ${state.currentSegmentIndex === i ? 'h-2.5 bg-accent' : 'h-2 bg-base3 hover:bg-white hover:bg-opacity-40'}`}
            style={{
              left: `${segment.startPositionPercentage}%`,
              width: `${segment.lengthPercentage}%`,
            }}
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                currentSegmentIndex: i,
              }))
            }
          />
        ))}
      </div>
    </div>
  );
}
