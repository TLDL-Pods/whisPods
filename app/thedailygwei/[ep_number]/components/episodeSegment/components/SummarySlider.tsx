import { SegmentProps } from '@/types';
import { GiSoundWaves } from 'react-icons/gi';
import { RiMegaphoneLine } from 'react-icons/ri';
import Slider from 'react-slick';

interface SummarySliderProps {
  segment: SegmentProps;
}

export const SummarySlider = ({ segment }: SummarySliderProps) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const sliderContentArray = [...segment.bullets, segment.summary];

  return (
    <div className="mx-auto flex w-full flex-col p-3 text-baseText">
      <div className="mx-auto flex w-full max-w-2xl flex-col space-y-1 pt-16">
        {sliderContentArray.slice(0, -1).map((bullet, idx) => (
          <div key={idx} className="my-auto0 flex rounded-lg bg-base p-2">
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
            {sliderContentArray[sliderContentArray.length - 1]}
          </p>
        </div> */}
    </div>
  );
};

export default SummarySlider;
