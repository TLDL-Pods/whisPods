'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { SegmentProps } from '@/types';
import TweetEmbed from '../../../../components/TweetEmbed';
import SummarySlider from './components/SummarySlider';
import SegmentHeader from './components/SegmentHeader';
import { useSegments } from '@/app/hooks/useSegments';
import { useApp } from '@/app/hooks/useApp';

interface EpisodeSegmentProps {
  segment: SegmentProps;
  segmentNumber: number;
}

const EpisodeSegment: FC<EpisodeSegmentProps> = ({
  segment,
  segmentNumber,
}) => {
  const { state, setState } = useApp();
  const [isTweetLoaded, setIsTweetLoaded] = useState<boolean>(false);
  const segmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if this segment is the current segment
    if (state.currentSegmentIndex === segmentNumber && segmentRef.current) {
      const element = segmentRef.current;

      // Calculate the top position of the element relative to the document
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      // Define the offset as 10% of the viewport height
      const offset = window.innerHeight * 0.11;

      // Calculate the final scroll position with offset
      const scrollToPosition = elementPosition - offset;

      // Scroll to the calculated position smoothly
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }
  }, [state.currentSegmentIndex, segmentNumber]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const segmentNumFromURL = parseInt(hash.substring(1), 10);
      if (!isNaN(segmentNumFromURL) && segmentNumFromURL === segmentNumber) {
        setState(() => ({
          ...state,
          currentSegmentIndex: segmentNumber,
        }));
      }
    }
  }, [segmentNumber]);

  useEffect(() => {
    // If segment.URL is empty or contains only invalid URLs, set isTweetLoaded to true
    if (!segment.URL) {
      setIsTweetLoaded(true);
    }
  }, [segment.URL]);

  return (
    <div
      ref={segmentRef}
      id={`${segment.segment_number}`}
      className="relative align-middle shadow-inner shadow-black xl:max-w-[1200px]"
    >
      <li className="cursor-pointer">
        <SegmentHeader segment={segment} segmentNumber={segmentNumber} />
        {state.currentSegmentIndex === segmentNumber && (
          <div className="md-text-l relative w-full max-w-full flex-col bg-base1 pb-8 text-accent shadow-inner shadow-black">
            {isTweetLoaded ? (
              <SummarySlider segment={segment} />
            ) : (
              <div className="flex w-full items-center justify-center align-middle">
                <div className="mt-10 h-1/2 w-full text-center">
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
