import { SegmentProps } from '@/types';
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
    <div className="flex flex-col w-full p-3 mx-auto shadow-inner shadow-black text-baseText1">
      <Slider {...sliderSettings} className="mx-auto w-80 md:w-4/5">
        <div className="flex flex-col justify-between w-full">
          <p className="mb-2 text-xl font-semibold text-center">TLDL</p>

          <div className="flex flex-col space-y-1">
            {sliderContentArray.slice(0, -1).map((bullet, idx) => (
              <div
                key={idx}
                className="flex p-2 my-auto border-y border-baseText1 border-opacity-60 bg-baseText"
              >
                <div className="flex my-auto text-lg text-primary">
                  <RiMegaphoneLine />
                </div>
                <p className="ml-4">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <p className="mb-2 text-xl font-semibold text-center text-primary">
            SUMMARY
          </p>
          <p className="p-4 overflow-y-auto bg-baseText h-80">
            {sliderContentArray[sliderContentArray.length - 1]}
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default SummarySlider;
