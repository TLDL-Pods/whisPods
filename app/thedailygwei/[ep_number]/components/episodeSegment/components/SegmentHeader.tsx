'use client';
import { useApp } from '@/app/hooks/useApp';
import { SegmentProps } from '@/types';
import { FaPlayCircle } from 'react-icons/fa';

interface SegmentHeaderProps {
  segment: SegmentProps;
  segmentNumber: number;
  showSegmentIndex: number | null;
  youtube_url: string;
  setShowSegmentIndex: (value: number | null) => void;
  isOrganizedByLength: boolean;
}

export const SegmentHeader = ({
  segment,
  segmentNumber,
  showSegmentIndex,
  setShowSegmentIndex,
  youtube_url,
  isOrganizedByLength,
}: SegmentHeaderProps) => {
  const { state, setState } = useApp();

  // Toggle segment detail view
  const handleSegmentToggle = () => {
    setShowSegmentIndex(
      showSegmentIndex === segmentNumber ? null : segmentNumber
    );
  };

  const openVideoDrawer = () => {
    setState(() => ({
      ...state,
      isVideoModalOpen: true,
      currentYouTubeVideo: youtube_url,
      currentSegment: segment,
    }));
  };

  return (
    <div
      className="flex items-center w-full h-20 gap-2 p-2 px-4 md:text-xl lg:text-2xl bg-gradient-to-b to-neutral-950 from-neutral-900"
      onClick={() => handleSegmentToggle()}
    >
      {/* Play Button */}
      <div className="pr-1 my-2 text-center">
        <button
          className="text-4xl text-violet-400 hover:text-violet-300"
          onClick={openVideoDrawer}
        >
          <FaPlayCircle />
        </button>
      </div>

      {/* INDEX */}
      <div className="px-1 font-semibold text-center grow-0 text-violet-400">
        <p>
          {isOrganizedByLength
            ? `${Math.floor(segment.segment_length_ms / 60000)}:${(
                (segment.segment_length_ms % 60000) /
                1000
              )
                .toFixed(0)
                .padStart(2, '0')}`
            : segmentNumber + 1 + '.'}
        </p>
      </div>
      {/* HEADLINE*/}
      <div className="content-center flex-grow my-auto font-semibold text-white text-balance">
        <span>{segment.segment_title}</span>
        {/* Share Button */}
      </div>
    </div>
  );
};

export default SegmentHeader;
