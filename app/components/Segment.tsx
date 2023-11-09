"use client";
import React, { FC, useCallback, useState, useEffect } from "react";
import { RiMegaphoneLine } from "react-icons/ri";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { SegmentProps } from "@/types";
import YouTubeEmbed from "@/app/components/YoutubeEmbed";
import TweetEmbed from "./TweetEmbed";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SegmentProps2 {
  episodeNumber: number;
  segment: SegmentProps;
  segmentNumber: number;
  isOrganizedByLength: boolean;
  showVideo: boolean;
  setShowVideo: (value: boolean) => void;
  youtube_url: string;
  onSegmentClick: (segmentNumber: number) => void;
  showSummary: number | null;
  onSummaryToggle: (segmentNumber: number) => void;
  showSegmentIndex: number | null;
  setShowSegmentIndex: (value: number | null) => void;
  handleSummaryToggle: (index: number) => void;
}

const Segment: FC<SegmentProps2> = ({
  episodeNumber,
  segment,
  segmentNumber,
  isOrganizedByLength,
  showVideo,
  setShowVideo,
  youtube_url,
  showSegmentIndex,
  setShowSegmentIndex,
  handleSummaryToggle,
}) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const contentArray = [...segment.bullets, segment.summary];

  const handleCopy = useCallback(
    (textToCopy: string, type: "youtube" | "segment") => {
      navigator.clipboard.writeText(textToCopy);
      setCopySuccess(type);
    },
    []
  );

  // Toggle segment detail view
  const handleSegmentToggle = () => {
    setShowSegmentIndex(
      showSegmentIndex === segmentNumber ? null : segmentNumber
    );
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(null);
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
        {/* ROW 1: Index & Title */}
        <div
          className="flex items-center w-full h-20 gap-2 p-2 md:text-xl lg:text-2xl bg-gradient-to-b to-neutral-950 from-neutral-900"
          onClick={() => handleSegmentToggle()}
        >
          {/* INDEX */}
          <div className="px-1 font-semibold text-center grow-0 text-violet-400">
            <p>
              {isOrganizedByLength
                ? `${Math.floor(segment.segment_length_ms / 60000)}:${(
                    (segment.segment_length_ms % 60000) /
                    1000
                  )
                    .toFixed(0)
                    .padStart(2, "0")}`
                : segmentNumber + 1 + "."}
            </p>
          </div>
          {/* HEADLINE*/}
          <div className="content-center flex-grow my-auto font-semibold text-white text-balance">
            <span>{segment.segment_title}</span>
          </div>
        </div>

        {/* ROW 2: Blank & Content */}
        {showSegmentIndex === segmentNumber && (
          <div className="">
            <div className="flex-col w-full max-w-full pb-4 shadow-inner shadow-black md-text-l text-violet-200 bg-gradient-to-b to-neutral-900 from-neutral-800 ">
              {/* Bullets or Summary */}

              <div className="flex flex-col w-full p-3 mx-auto shadow-inner shadow-black text-violet-100">
                <Slider
                  {...settings}
                  className="max-w-xl mx-auto w-80 max-h-fit h-88"
                >
                  <div className="flex flex-col justify-between w-full">
                    <p className="mb-2 text-xl font-semibold text-center text-violet-400">
                      TLDL
                    </p>
                    <div className="flex flex-col space-y-4">
                      {contentArray.slice(0, -1).map((bullet, idx) => (
                        <div key={idx} className="flex p-2 my-auto bg-zinc-950">
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
                      {contentArray[contentArray.length - 1]}
                    </p>
                  </div>
                </Slider>
              </div>

              {/* YouTube Embed */}

              {/* Sources */}
              <div className="w-full px-3 mt-4 text-center">
                <div className="">
                  {/* Embed Tweet */}
                  {segment.URL &&
                    segment.URL.map((url, index) => (
                      <TweetEmbed key={url} url={url} />
                    ))}
                  <ul className="">
                    {segment.URL.map((url, idx) => (
                      <li
                        key={url}
                        className="flex items-center justify-center"
                      >
                        {/* Button styled link */}

                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          Open on Twitter
                        </a>
                        <button
                          className="py-2 ml-2 transition rounded-lg"
                          onClick={() => handleCopy(url, "segment")}
                        >
                          {copySuccess === "segment" ? (
                            <FaCheck />
                          ) : (
                            <FaRegCopy />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-3/5 mx-auto mt-4 border-b border-violet-300 opacity-40"></div>

              <div className="w-full px-4 pt-4 text-center">
                <YouTubeEmbed
                  youtubeUrl={youtube_url}
                  startTimeMs={segment.start_time_ms}
                  maxWidth="screen-sm"
                />
              </div>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};

export default Segment;
