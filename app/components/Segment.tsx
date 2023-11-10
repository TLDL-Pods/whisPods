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
    adaptiveHeight: true,
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
      <li className="cursor-pointer ">
        {/* ROW 1: Index & Title */}
        <div
          className="flex items-center w-full h-20 gap-2 p-2 px-4 md:text-xl lg:text-2xl bg-gradient-to-b to-neutral-950 from-neutral-900"
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
                  className="mx-auto w-80 md:w-4/5"
                  // className="max-w-xl mx-auto w-80 max-h-fit h-88 md:w-4/5 md:max-w-none md:h-1/2 sm:max-h-fit md:h-88"
                >
                  <div className="flex flex-col justify-between w-full">
                    <p className="mb-2 text-xl font-semibold text-center">
                      TLDL
                    </p>
                    <div className="flex flex-col space-y-1">
                      {contentArray.slice(0, -1).map((bullet, idx) => (
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
                      {contentArray[contentArray.length - 1]}
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
                  <ul className="flex flex-col items-center justify-center">
                    {segment.URL.map((url, idx) => (
                      <li
                        key={url}
                        className="flex items-center justify-center w-full text-center truncate"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center text-blue-500 truncate"
                        >
                          {url.length > 40 ? url.substring(0, 35) + "..." : url}
                        </a>
                        <button
                          className="ml-4 bg-transparent border-none"
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

              {/* YouTube Embed */}
              <div className="w-full px-4 pt-4 text-center">
                <YouTubeEmbed
                  youtubeUrl={youtube_url}
                  startTimeMs={segment.start_time_ms}
                  maxWidth="screen-sm"
                />
                <a
                  href={`${youtube_url}&t=${Math.floor(
                    segment.start_time_ms / 1000
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-2 text-blue-500 underline"
                >
                  {`${youtube_url}&t=${Math.floor(
                    segment.start_time_ms / 1000
                  )}`.length > 40
                    ? `${youtube_url}&t=${Math.floor(
                        segment.start_time_ms / 1000
                      )}`.substring(0, 35) + "..."
                    : `${youtube_url}&t=${Math.floor(
                        segment.start_time_ms / 1000
                      )}`}
                </a>

                <button
                  title="Copy YouTube Segment Link"
                  onClick={() =>
                    handleCopy(
                      `${youtube_url}&t=${Math.floor(
                        segment.start_time_ms / 1000
                      )}`,
                      "youtube"
                    )
                  }
                >
                  {copySuccess === "youtube" ? <FaCheck /> : <FaRegCopy />}
                </button>
              </div>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};

export default Segment;
