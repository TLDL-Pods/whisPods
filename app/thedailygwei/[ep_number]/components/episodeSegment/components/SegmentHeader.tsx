'use client';

import { useApp } from '@/app/hooks/useApp';
import { useSegments } from '@/app/hooks/useSegments';
import { SegmentProps } from '@/types';
import { FaPlayCircle, FaCheck } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';

interface SegmentHeaderProps {
  segment: SegmentProps;
  segmentNumber: number;
}

export const SegmentHeader = ({
  segment,
  segmentNumber,
}: SegmentHeaderProps) => {
  const { state } = useApp();
  const {
    handleShare,
    copySuccess,
    setCopySuccess,
    handleSegmentToggle,
    toggleVideoDrawer,
  } = useSegments();

  return (
    <div
      className="group my-1 flex h-16 w-full items-center gap-1 bg-gradient-to-r from-transparent via-base1 to-transparent duration-300 hover:bg-base3 md:text-xl lg:text-2xl xl:w-[1200px]"
      onClick={() => handleSegmentToggle(segmentNumber, segment)}
    >
      <div
        className={`h-full w-0.5 duration-500 ${state.currentSegmentIndex === segmentNumber ? 'bg-secondary' : 'bg-base group-hover:bg-secondary'}`}
      ></div>

      {/* INDEX */}
      <div
        className={`flex h-full w-16 min-w-fit gap-2 text-center font-semibold text-secondary lg:w-16`}
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
      <div className="text-textBase my-auto flex h-16 max-h-16 w-full items-start px-0.5">
        <span className="my-auto line-clamp-2 text-left">
          {segment.segment_title}
        </span>
      </div>
      {/* Play Button */}
      <div className="mr-2 flex h-full min-w-fit text-center">
        <button
          className="m-auto text-2xl text-accent duration-300 hover:text-secondary lg:text-4xl"
          onClick={(e) => {
            e.stopPropagation(), toggleVideoDrawer(segment);
          }}
        >
          <FaPlayCircle />
        </button>
      </div>
      <button
        className={`flex h-full items-center justify-center border-l border-white border-opacity-40 bg-base1 px-1 font-bold text-primary shadow-lg duration-500 hover:bg-base1 md:hover:border-opacity-100 ${
          copySuccess === true ? 'shadow-transparent ' : 'shadow-black'
        } hover:bg-baseText2`}
        onClick={() => handleShare({ segment, setCopySuccess })}
      >
        {copySuccess === true ? (
          <div className="text-accent">
            <FaCheck size={20} />
          </div>
        ) : (
          <div className="text-primary">
            <FiShare size={20} />
          </div>
        )}
      </button>
    </div>
  );
};

export default SegmentHeader;
