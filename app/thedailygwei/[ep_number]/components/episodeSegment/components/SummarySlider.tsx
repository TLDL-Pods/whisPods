import { SegmentProps } from '@/types';
import { RiMegaphoneLine } from 'react-icons/ri';

interface SummaryProps {
  segment: SegmentProps;
}

export const Summary = ({ segment }: SummaryProps) => {
  return (
    <div className="mx-auto flex w-full flex-col p-3 text-baseText">
      <div className="mx-auto flex w-full max-w-2xl flex-col space-y-2">
        <div>
          <p className="text-bold my-2 text-center text-2xl">TLDL </p>
        </div>
        {segment.bullets.map((bullet, idx) => (
          <div key={idx} className="flex rounded-lg bg-base p-2">
            <div className="text-textBase my-auto flex text-lg">
              <RiMegaphoneLine />
            </div>
            <p className="ml-4">{bullet}</p>
          </div>
        ))}
      </div>
      {/* <div className="text-textBase">
          <p className="mb-2 text-xl font-semibold text-center">SUMMARY</p>
          <p className="p-4 overflow-y-auto rounded-lg h-80 bg-base text-baseText">
            {ContentArray[ContentArray.length - 1]}
          </p>
        </div> */}
    </div>
  );
};

export default Summary;
