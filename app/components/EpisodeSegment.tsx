'use client';
import React, { FC, useState, useEffect } from 'react';
import { RiMegaphoneLine } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { SegmentProps } from '@/types';
import TweetEmbed from './TweetEmbed';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FiShare } from 'react-icons/fi';
import { FaPlayCircle } from 'react-icons/fa';
import { useApp } from '../hooks/useApp';
import { handleShare } from '../utils/handleShare';

interface EpisodeSegmentProps {
  segment: SegmentProps;
  segmentNumber: number;
  isOrganizedByLength: boolean;
  youtube_url: string;
  onSegmentClick: (segmentNumber: number) => void;
  showSegmentIndex: number | null;
  setShowSegmentIndex: (value: number | null) => void;
}

const EpisodeSegment: FC<EpisodeSegmentProps> = ({
  segment,
  segmentNumber,
  isOrganizedByLength,
  youtube_url,
  showSegmentIndex,
  setShowSegmentIndex,
}) => {
  const { state, setState } = useApp();
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const sliderContentArray = [...segment.bullets, segment.summary];

  // Toggle segment detail view
  const handleSegmentToggle = () => {
    setShowSegmentIndex(
      showSegmentIndex === segmentNumber ? null : segmentNumber,
    );
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const segmentNumFromURL = parseInt(hash.substring(1), 10);
      if (!isNaN(segmentNumFromURL) && segmentNumFromURL === segmentNumber) {
        setShowSegmentIndex(segmentNumber);
      }
    }
  }, [segmentNumber]);

  const openVideoDrawer = () => {
    setState(() => ({
      ...state,
      youtubeURL: youtube_url,
      youtubeStartTimeMS: segment.start_time_ms,
      isVideoModalOpen: !state.isVideoModalOpen,
    }));
    console.log(youtube_url, segment.start_time_ms, state.isVideoModalOpen);
  };

  return (
    <div
      id={`${segment.segment_number}`}
      className="align-middle md:max-w-[768px] relative shadow-inner shadow-black"
      key={segment.segment_number}
    >
      <li className="cursor-pointer">
      {/* ROW 1: Index & Title */}
      <div
        className="flex items-center w-full h-20 gap-2 p-2 px-4 md:text-xl lg:text-2xl bg-gradient-to-b to-neutral-950 from-neutral-900"
        onClick={() => handleSegmentToggle()}
      >
        {/* Play Button */}
        <div className="pr-4 my-2 text-center">
          <button
            className="text-4xl text-violet-400 hover:text-violet-300"
            onClick={openVideoDrawer}
          >
            <FaPlayCircle />
          </button>
        </div>

        {/* INDEX */}
        <div className="px-1 font-semibold text-center grow-0 text-violet-400">
          <p>
            {isOrganizedByLength
              ? `${Math.floor(segment.segment_length_ms / 60000)}:${(
                  (segment.segment_length_ms % 60000) /
                  1000
                )
                  .toFixed(0)
                  .padStart(2, '0')}`
              : segmentNumber + 1 + '.'}
          </p>
        </div>
        {/* HEADLINE*/}
        <div className="content-center flex-grow my-auto font-semibold text-white text-balance">
          <span>{segment.segment_title}</span>
          {/* Share Button */}
        </div>
      </div>

        {/* ROW 2: Blank & Content */}
        {showSegmentIndex === segmentNumber && (
          <div className="">
            <div className="flex-col w-full max-w-full pb-4 shadow-inner shadow-black md-text-l text-violet-200 bg-gradient-to-b to-neutral-900 from-neutral-800 ">
              <button
                className="absolute flex items-center justify-center px-4 py-2 font-bold text-white rounded top-7 right-2 hover:bg-zinc-700"
                onClick={() =>
                  handleShare({ segment, youtube_url, setCopySuccess })
                }
              >
                {copySuccess === true ? (
                  <FaCheck size={20} />
                ) : (
                  <FiShare size={20} />
                )}
              </button>

              {/* Bullets or Summary */}
              <div className="flex flex-col w-full p-3 mx-auto shadow-inner shadow-black text-violet-100">
                <Slider {...sliderSettings} className="mx-auto w-80 md:w-4/5">
                  <div className="flex flex-col justify-between w-full">
                    <p className="mb-2 text-xl font-semibold text-center">
                      TLDL
                    </p>

                    <div className="flex flex-col space-y-1">
                      {sliderContentArray.slice(0, -1).map((bullet, idx) => (
                        <div
                          key={idx}
                          className="flex p-2 my-auto border-y border-violet-100 border-opacity-60 bg-zinc-950"
                        >
                          <div className="flex my-auto text-lg text-violet-400">
                            <RiMegaphoneLine />
                          </div>
                          <p className="ml-4">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <p className="mb-2 text-xl font-semibold text-center text-violet-400">
                      SUMMARY
                    </p>
                    <p className="p-4 overflow-y-auto bg-zinc-950 h-80">
                      {sliderContentArray[sliderContentArray.length - 1]}
                    </p>
                  </div>
                </Slider>
              </div>

              {/* Sources */}
              <div className="w-full px-3 mt-4 text-center">
                <div className="">
                  {/* Embed Tweet */}
                  {segment.URL &&
                    segment.URL.map((url, index) => (
                      <TweetEmbed key={url} url={url} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};

export default EpisodeSegment;
