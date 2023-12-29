'use client';
import React, { FC, useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { SegmentProps } from '@/types';
import TweetEmbed from '../../../../components/TweetEmbed';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FiShare } from 'react-icons/fi';
import { handleShare } from '../../../../utils/handleShare';
import SummarySlider from './components/SummarySlider';
import SegmentHeader from './components/SegmentHeader';

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
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

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

  return (
    <div
      id={`${segment.segment_number}`}
      className="align-middle md:max-w-[768px] relative shadow-inner shadow-black"
      key={segment.segment_number}
    >
      <li className="cursor-pointer">
        <SegmentHeader
          segment={segment}
          segmentNumber={segmentNumber}
          showSegmentIndex={showSegmentIndex}
          youtube_url={youtube_url}
          setShowSegmentIndex={setShowSegmentIndex}
          isOrganizedByLength={isOrganizedByLength}
        />

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

              <SummarySlider segment={segment} />

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
