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
      <Slider {...sliderSettings} className="mx-auto w-72 max-w-md md:w-1/2">
        <div className="flex w-full flex-col justify-between py-8">
          <p className="mb-2 text-center text-2xl font-semibold text-baseText ">
            TLDL
          </p>

          <div className="flex w-full flex-col space-y-1 ">
            {sliderContentArray.slice(0, -1).map((bullet, idx) => (
              <div key={idx} className="my-auto0 flex rounded-lg bg-base p-2">
                <div className="text-textBase my-auto flex text-lg">
                  <RiMegaphoneLine />
                </div>
                <p className="ml-4">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-textBase">
          <p className="mb-2 text-center text-xl font-semibold">SUMMARY</p>
          <p className="h-80 overflow-y-auto rounded-lg bg-base p-4 text-baseText">
            {sliderContentArray[sliderContentArray.length - 1]}
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default SummarySlider;
