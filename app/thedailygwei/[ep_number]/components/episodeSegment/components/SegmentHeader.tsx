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
      showSegmentIndex === segmentNumber ? null : segmentNumber,
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
      className="flex items-center h-24 py-2 md:text-xl lg:text-2xl bg-gradient-to-b to-base from-base1 w-full md:w-[768px]"
      onClick={() => handleSegmentToggle()}
    >
      {/* Play Button */}
      <div className=" text-center w-1/12 min-w-fit px-2">
        <button
          className="text-4xl text-accent hover:text-secondary "
          onClick={openVideoDrawer}
        >
          <FaPlayCircle />
        </button>
      </div>

      {/* INDEX */}
      <div className="font-semibold text-center grow-0 text-secondary w-1/12 px-2 min-w-fit">
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
      <div className="flex items-start text-ellipsis my-auto font-semibold text-textBase w-10/12 max-h-16 h-16 px-2">
        <span className="my-auto text-left">{segment.segment_title}</span>
      </div>
    </div>
  );
};

export default SegmentHeader;
