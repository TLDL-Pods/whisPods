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
  const [isTweetLoaded, setIsTweetLoaded] = useState<boolean>(false);

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

  useEffect(() => {
    // If segment.URL is empty or contains only invalid URLs, set isTweetLoaded to true
    if (!segment.URL || segment.URL.every((url) => !url)) {
      setIsTweetLoaded(true);
    }
  }, [segment.URL]);

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
          <div className="flex-col w-full max-w-full pb-8 shadow-inner shadow-black md-text-l text-accent bg-gradient-to-b to-base1 from-base2 relative">
            <button
              className="absolute flex items-center justify-center px-4 font-bold text-primary rounded top-7 right-2 hover:bg-baseText2"
              onClick={() =>
                handleShare({ segment, youtube_url, setCopySuccess })
              }
            >
              {copySuccess === true ? (
                <div className="text-accent">
                  <FaCheck size={20} />
                </div>
              ) : (
                <div className="text-primary">
                  <FiShare size={20} />
                </div>
              )}
            </button>
            {isTweetLoaded ? (
              <SummarySlider segment={segment} />
            ) : (
              <div className="w-full flex justify-center align-middle items-center">
                <div className="w-full text-center h-1/2 mt-10">
                  <div className="spinner"></div>
                  <p className="m-auto mt-3">Loading...</p>
                </div>
              </div>
            )}

            {/* Sources */}
            <div className="w-full px-3 text-center">
              {/* Embed Tweet */}
              {segment.URL &&
                segment.URL.map((url, index) => (
                  <TweetEmbed
                    key={url}
                    url={url}
                    isTweetLoaded={isTweetLoaded}
                    setIsTweetLoaded={setIsTweetLoaded}
                  />
                ))}
            </div>
          </div>
        )}
      </li>
    </div>
  );
};

export default EpisodeSegment;
