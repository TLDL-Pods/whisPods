import { SegmentProps } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useSegments } from '../../hooks/useSegments';
import { FaCheck } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import SummaryModal from './SummaryModal';

interface TLDLProps {
  segment: SegmentProps;
}

export default function TLDL({ segment }: TLDLProps) {
  const { handleShare, copySuccess, setCopySuccess } = useSegments();
  const [fullSumOpen, setFullSumOpen] = useState<boolean>(false);

  function scoreToColor(score: number | undefined) {
    if (score) {
      const maxScore = 10; // adjust according to your max score observed
      const hue = (score / maxScore) * 120; // This will give us a hue from 0 (red) to 120 (green)
      return `hsl(${hue}, 100%, 50%)`;
    } // 100% saturation and 50% lightness
  }

  function formatTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const scoreColor = scoreToColor(segment.score);
  return (
    <div className="mx-auto flex w-full flex-col gap-2 border-t-2 border-accent pb-12 pt-8 lg:w-1/2 lg:rounded-lg lg:bg-base2 lg:pb-4 lg:pt-4">
      <div className="flex w-full justify-between p-4 py-0 text-sm text-baseText1">
        <p className="flex items-center text-xl font-semibold text-secondary">
          Ep. {segment.episode_number} -
          <span className="ml-1">TLDL #{segment.segment_number}</span>
        </p>

        <span className="my-auto text-sm font-semibold">
          ({formatTime(segment.start_time_ms)}-{formatTime(segment.end_time_ms)}
          )
        </span>
      </div>
      <div className="flex w-full p-4 pt-0 text-right text-sm text-baseText1">
        <p>{segment.release_date}</p>
      </div>
      <div className="flex w-full flex-col justify-between gap-2 p-4 pt-0 font-thin">
        {segment.bullets.map((bullet, i) => (
          <div
            key={i}
            className="rounded-lg border border-base4 bg-base3 p-3 shadow-sm shadow-black"
          >
            {bullet}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-2 flex w-full justify-evenly border-y border-base5 text-secondaryLight">
        <Link
          href={`/thedailygwei/${segment.episode_number}`}
          className="flex h-10 w-2/5 items-center justify-center bg-base4 px-2 duration-500 hover:bg-base1"
        >
          Go To Episode
        </Link>
        <button
          onClick={() => {
            setFullSumOpen(true);
          }}
          className="flex h-10 w-2/5 items-center justify-center border-x border-base5 bg-base4 px-2 duration-500 hover:bg-base1"
        >
          Full Summary
        </button>
        <button
          className={`flex h-10 w-1/5 items-center justify-center bg-base4 px-1 font-bold duration-500 hover:bg-base1 ${
            copySuccess === true ? 'shadow-transparent ' : 'shadow-black'
          } hover:bg-baseText2`}
          onClick={() => handleShare({ segment, setCopySuccess })}
        >
          {copySuccess === true ? (
            <div className="text-secondary">
              <FaCheck size={20} />
            </div>
          ) : (
            <div className="text-secondary">
              <FiShare size={20} />
            </div>
          )}
        </button>
      </div>
      <div className="flex h-6 w-full items-center justify-end p-1 text-right text-sm font-bold">
        <p style={{ borderColor: scoreColor }} className="border-b-2 p-1">
          {segment.score?.toFixed(1)}
        </p>
      </div>

      {fullSumOpen && (
        <>
          <div className="fixed left-0 top-0 h-full w-full bg-black opacity-70"></div>
          <SummaryModal setFullSumOpen={setFullSumOpen} segment={segment} />
        </>
      )}
    </div>
  );
}
