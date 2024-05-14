import { SegmentProps } from '@/types';

interface SummaryModalProps {
  setFullSumOpen: (fullSumOpen: boolean) => void;
  segment: SegmentProps;
}

export default function SummaryModal({
  setFullSumOpen,
  segment,
}: SummaryModalProps) {
  return (
    <div className="fixed left-0 right-0 top-32 z-20 mx-auto h-fit max-h-[600px] w-full overflow-y-scroll rounded-lg bg-base2 py-4 lg:bottom-0 lg:w-1/2">
      <button
        onClick={() => setFullSumOpen(false)}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-base4 px-1 pb-1 text-xl"
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
  );
}
