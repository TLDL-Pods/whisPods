'use client';

import { useApp } from '@/app/hooks/useApp';
import { useSegments } from '@/app/hooks/useSegments';
import { SegmentProps } from '@/types';
import { FaPlayCircle } from 'react-icons/fa';

interface SegmentHeaderProps {
  segment: SegmentProps;
  segmentNumber: number;
}

export const SegmentHeader = ({
  segment,
  segmentNumber,
}: SegmentHeaderProps) => {
  const { state } = useApp();

  const { handleSegmentToggle, toggleVideoDrawer } = useSegments();

  return (
    <div
      className="group my-1 flex h-24 w-full items-center bg-gradient-to-r from-transparent via-base1 to-transparent duration-300 hover:bg-base3 md:text-xl lg:text-2xl xl:w-[1200px]"
      onClick={() => handleSegmentToggle(segmentNumber, segment)}
    >
      {/* Play Button */}
      <div
        className={`h-full w-2 duration-500 ${state.currentSegmentIndex === segmentNumber ? 'bg-accent' : 'bg-base1 group-hover:bg-secondary'}`}
      ></div>
      <div className="flex h-full w-16 min-w-fit bg-base2 px-2 text-center">
        <button
          className="m-auto text-4xl text-accent duration-300 hover:text-secondary"
          onClick={(e) => {
            e.stopPropagation(), toggleVideoDrawer(segment);
          }}
        >
          <FaPlayCircle />
        </button>
      </div>

      {/* INDEX */}
      <div
        className={`flex h-full w-20 min-w-fit grow-0 border-r border-base3 bg-base2 px-2 text-center font-semibold text-secondary ${
          state.segmentsByLength ? ' w-20' : 'w-10'
        }`}
      >
        <p className="m-auto ">
          {state.segmentsByLength
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
      <div className="text-textBase my-auto flex h-16 max-h-16 w-10/12 items-start px-4">
        <span className="my-auto line-clamp-2 text-left">
          {segment.segment_title}
        </span>
      </div>
    </div>
  );
};

export default SegmentHeader;
