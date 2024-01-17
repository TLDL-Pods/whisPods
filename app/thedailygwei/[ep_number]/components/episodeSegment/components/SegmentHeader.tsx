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
      className="flex items-center h-24 md:text-xl lg:text-2xl bg-gradient-to-r to-transparent via-base2 from-transparent hover:bg-base3 duration-300 w-full md:w-[1200px] my-1 group"
      onClick={() => handleSegmentToggle()}
    >
      {/* Play Button */}
      <div className="w-2 h-full bg-base1 group-hover:bg-secondary duration-500"></div>
      <div className=" text-center w-16 min-w-fit h-full px-2 bg-base2 flex">
        <button
          className="text-4xl text-accent hover:text-secondary m-auto duration-300"
          onClick={openVideoDrawer}
        >
          <FaPlayCircle />
        </button>
      </div>

      {/* INDEX */}
      <div
        className={`font-semibold text-center grow-0 text-secondary w-20 px-2 min-w-fit border-r border-base3 bg-base2 h-full flex ${
          isOrganizedByLength ? ' w-20' : 'w-10'
        }`}
      >
        <p className=" m-auto">
          {isOrganizedByLength
            ? `${Math.floor(segment.segment_length_ms / 60000)}:${(
                (segment.segment_length_ms % 60000) /
                1000
              )
                .toFixed(0)
                .padStart(2, '0')}`
            : segmentNumber + 1}
        </p>
      </div>
      {/* HEADLINE*/}
      <div className="flex items-start my-auto text-textBase w-10/12 max-h-16 h-16 px-4">
        <span className="line-clamp-2 my-auto text-left">
          {segment.segment_title}
        </span>
      </div>
    </div>
  );
};

export default SegmentHeader;
