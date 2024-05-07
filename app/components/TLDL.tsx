import { SegmentProps } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

interface TLDLProps {
  segment: SegmentProps;
}

export default function TLDL({ segment }: TLDLProps) {
  const [fullSumOpen, setFullSumOpen] = useState<boolean>(false);

  return (
    <div className="relative mx-auto flex w-full flex-col gap-2 border-y border-base3 bg-gradient-to-b from-base2 to-base1 shadow-sm shadow-black">
      <div className="flex w-full justify-between border-t border-accentDark p-4 text-2xl">
        <p className="border-l border-baseText1 bg-gradient-to-r from-base1 to-transparent p-2 text-secondary">
          {segment.segment_title.toUpperCase()}
        </p>
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
      <div className="grid-rows-auto mx-auto grid w-4/5 grid-cols-2 pb-4 pt-2">
        <Link
          href={`/thedailygwei/${segment.episode_number}`}
          className="mx-auto w-fit rounded-lg border border-base4 bg-accentDark p-1 px-3 pb-1.5 font-semibold shadow-md shadow-black"
        >
          Go To Episode
        </Link>
        <button
          onClick={() => {
            setFullSumOpen(true);
          }}
          className="mx-auto w-fit rounded-lg border border-base4 bg-accentDark  p-1  px-3 pb-1.5 font-semibold shadow-md shadow-black"
        >
          Full Summary
        </button>
      </div>{' '}
      <div className="flex w-full justify-between p-4 pt-0 text-sm text-baseText1">
        <p>Ep {segment.episode_number}</p>
        <p>TLDL</p>
      </div>
      {fullSumOpen && (
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-base2 py-4">
          <button
            onClick={() => setFullSumOpen(false)}
            className="border-base5 absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-md border bg-base4 px-1 pb-1 text-xl text-red-600"
          >
            X
          </button>
          <div className="flex h-[100%] flex-col items-center overflow-y-scroll p-2 px-8">
            <p className="flex w-full border-l border-baseText1 bg-gradient-to-r from-base1 to-transparent p-2 text-secondary">
              {segment.segment_title.toUpperCase()}
            </p>
            <div className="mt-4">{segment.summary}</div>
            <button
              onClick={() => {
                setFullSumOpen(false);
              }}
              className="mx-auto my-3 w-fit rounded-lg border border-base4 bg-accentDark p-1  px-3 pb-1.5 font-semibold shadow-md shadow-black"
            >
              Back To Segment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
