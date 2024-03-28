import { useApp } from '@/app/hooks/useApp';
import { useSegments } from '@/app/hooks/useSegments';
import { EpisodeProps } from '@/types';
import { BiSolidTimer } from 'react-icons/bi';
import { FaPlayCircle } from 'react-icons/fa';
import { ImListNumbered } from 'react-icons/im';

interface SegmentTimelineProps {
  currentEpisode: EpisodeProps;
}

export default function SegmentTimeline({
  currentEpisode,
}: SegmentTimelineProps) {
  const { state, setState } = useApp();
  const { toggleOrganization, toggleVideoDrawer } = useSegments();

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

  function formatTimestamp(ms: number) {
    // Convert milliseconds to seconds
    const totalSeconds = ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Pad the minutes and seconds with leading zeros if they are less than 10
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    // Format the time string as HH:MM:SS
    // If there are no hours, display only MM:SS
    return hours > 0
      ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
      : `${paddedMinutes}:${paddedSeconds}`;
  }

  return (
    <div className="lg:text-md flex h-full w-full flex-col pb-4 lg:text-lg">
      <div className="relative flex w-11/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-secondary lg:text-lg">
        The Daily Gwei Refuel - {currentEpisode.episode_number}
        <div className="absolute h-full w-full bg-gradient-to-r from-transparent via-transparent via-90% to-black"></div>
      </div>
      <div className="relative flex w-11/12 gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {state.currentSegmentIndex ? state.currentSegmentIndex + 1 : 1}:{' '}
        {
          segments[state.currentSegmentIndex ? state.currentSegmentIndex : 0]
            .title
        }
        <div className="absolute h-full w-full bg-gradient-to-r from-transparent via-transparent via-90% to-black"></div>
      </div>
      <div className="relative my-auto mt-4 flex h-2 w-full items-center">
        {segments.map((segment, i) => (
          <div
            key={i} // Use original index to ensure keys are stable through re-renders
            title={segment.title}
            className={`absolute cursor-pointer border-r-2  ${state.currentSegmentIndex === i ? 'h-2.5 bg-accent' : 'h-2 bg-base3 hover:bg-white hover:bg-opacity-40'}`}
            style={{
              left: `${segment.startPositionPercentage}%`,
              width: `${segment.lengthPercentage}%`,
            }}
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                currentSegmentIndex: i,
              }));
              if (state.currentSegmentIndex === i) {
                toggleVideoDrawer(
                  sortedSegments[state.currentSegmentIndex || 0],
                );
              }
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-2 lg:mt-4">
        <button
          className="my-auto mt-1 text-2xl text-accent duration-300 hover:text-secondary"
          onClick={(e) => {
            e.stopPropagation(),
              toggleVideoDrawer(sortedSegments[state.currentSegmentIndex || 0]);
          }}
        >
          <FaPlayCircle />
        </button>
        <div className="text-center text-baseText1">
          {formatTimestamp(
            sortedSegments[state.currentSegmentIndex || 0].start_time_ms,
          )}{' '}
          -{' '}
          {formatTimestamp(
            sortedSegments[state.currentSegmentIndex || 0].end_time_ms,
          )}
        </div>
      </div>
      <button
        onClick={toggleOrganization}
        className="absolute right-3 top-3 text-lg duration-300 hover:border-opacity-100 hover:bg-base lg:right-12 lg:top-4"
        title="Sort Segments"
      >
        {state.segmentsByLength ? <BiSolidTimer /> : <ImListNumbered />}
      </button>
    </div>
  );
}
