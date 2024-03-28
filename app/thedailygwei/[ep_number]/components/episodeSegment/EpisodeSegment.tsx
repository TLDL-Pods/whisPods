'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import { SegmentProps } from '@/types';
import TweetEmbed from '../../../../components/TweetEmbed';
import SegmentHeader from './components/SegmentHeader';
import { useApp } from '@/app/hooks/useApp';
import { RiMegaphoneLine } from 'react-icons/ri';

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
  const [showSummary, setShowSummary] = useState<boolean>(false);

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
          <div className="relative w-full max-w-full flex-col bg-base1 p-4">
            {isTweetLoaded ? (
              <div className="mx-auto flex w-full max-w-2xl flex-col">
                <div>
                  <p className="text-bold my-2 text-center text-2xl">TLDL </p>
                </div>
                {segment.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="mt-2 flex rounded-lg border-l border-accent bg-base p-2"
                  >
                    <div className="text-textBase my-auto flex text-lg">
                      <RiMegaphoneLine />
                    </div>
                    <p className="ml-4">{bullet}</p>
                  </div>
                ))}
                <button
                  onClick={() => setShowSummary(true)}
                  className="mx-auto mt-6 flex w-fit rounded-lg border border-white border-opacity-40 bg-base px-6 pb-0.5"
                >
                  Full Summary
                </button>
              </div>
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
      {showSummary ? (
        <div className="lg:max-h-1/2 fixed left-0 top-0 z-20 h-full w-full rounded-lg bg-base p-8 pt-28 lg:bottom-0 lg:right-0 lg:m-auto lg:h-fit lg:w-1/2 lg:border lg:border-base3 lg:pt-8">
          <div className="relative">
            <button
              className={`text-md absolute -top-1 right-0 -mr-4 h-8 w-8 border border-white border-opacity-40 bg-base1 px-1 text-center text-red-400 duration-300 hover:border-opacity-100 hover:bg-base3 md:w-16 lg:-top-4`}
              onClick={() => setShowSummary(false)}
              aria-label="Close Summary"
            >
              X
            </button>

            <p className="relative mb-2 font-semibold text-baseText1">
              FULL SUMMARY
            </p>

            <p className="mb-2 text-xl font-semibold text-secondary">
              {segment.segment_title}
            </p>

            <p className="mt-6 h-full overflow-y-auto rounded-lg text-baseText">
              {segment.summary}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EpisodeSegment;
