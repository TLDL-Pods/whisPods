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
    <div className="flex flex-col w-full p-3 mx-auto text-baseText">
      <Slider {...sliderSettings} className="mx-auto w-72 md:w-1/2">
        <div className="flex flex-col justify-between w-full py-8">
          <p className="mb-2 text-2xl font-semibold text-baseText text-center ">
            TLDL
          </p>

          <div className="flex flex-col space-y-1 w-full ">
            {sliderContentArray.slice(0, -1).map((bullet, idx) => (
              <div key={idx} className="flex p-2 my-auto0 bg-base rounded-lg">
                <div className="flex my-auto text-lg text-textBase">
                  <RiMegaphoneLine />
                </div>
                <p className="ml-4">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-textBase">
          <p className="mb-2 text-xl font-semibold text-center">SUMMARY</p>
          <p className="p-4 overflow-y-auto bg-base text-baseText h-80 rounded-lg">
            {sliderContentArray[sliderContentArray.length - 1]}
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default SummarySlider;
