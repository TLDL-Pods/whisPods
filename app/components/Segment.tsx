"use client";
import React, { FC, useCallback, useState, useEffect, useRef } from "react";
import { RiMegaphoneLine, RiBookLine } from "react-icons/ri";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { SegmentProps } from "@/types";
import YouTubeEmbed from "@/app/components/YoutubeEmbed";

interface SegmentProps2 {
  segment: SegmentProps;
  index: number;
  isOrganizedByLength: boolean;
  showVideo: boolean;
  setShowVideo: (value: boolean) => void;
  youtube_url: string;
  onSegmentClick: (index: number) => void;
  showSummary: number | null;
  onSummaryToggle: (index: number) => void;
  showSegmentIndex: number | null;
  setShowSegmentIndex: (value: number | null) => void;
}

const Segment: FC<SegmentProps2> = ({
  segment,
  index,
  isOrganizedByLength,
  showVideo,
  setShowVideo,
  youtube_url,
  showSegmentIndex,
  setShowSegmentIndex,
}) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const handleCopy = useCallback(
    (textToCopy: string, type: "youtube" | "segment") => {
      navigator.clipboard.writeText(textToCopy);
      setCopySuccess(type);
    },
    []
  );

  // Toggle segment detail view
  const handleSegmentToggle = (index: number) => {
    setShowSegmentIndex(showSegmentIndex === index ? null : index);
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(null);
      }, 1000); // Revert back after 1 second

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [copySuccess]);

  const segmentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const handleSummaryToggle = () => {
    setShowSummary(!showSummary);
  };

  return (
    <div className="">
      <li
        key={segment.segment_number}
        className="p-2 align-middle transition-all duration-500 cursor-pointer hover:bg-stone-800"
        onClick={() => handleSegmentToggle(index)}
      >
        <div className="md:grid md:grid-cols-[1fr,10fr] md:gap-2 ">
          {/* INDEX */}
          <div className="content-center font-semibold text-center md-text-3xl text-violet-400">
            <p>
              {isOrganizedByLength
                ? `${Math.floor(segment.segment_length_ms / 60000)}:${(
                    (segment.segment_length_ms % 60000) /
                    1000
                  )
                    .toFixed(0)
                    .padStart(2, "0")}`
                : index + 1 + "."}
            </p>
          </div>
          {/* HEADLINE*/}
          <div className="content-center md-text-3xl text-violet-200 text-balance">
            <span>{segment.segment_title}</span>
          </div>
        </div>
      </li>
      <div className="md:grid md:grid-cols-[1fr,10fr] md:gap-2 ">
        {/* Blank BELOW */}
        <div className=""></div>
        {/* CONTENT */}
        <div className="">
          {showSegmentIndex === index && (
            // Bullets or summary
            <div className="relative p">
              <div className="flex flex-row text-violet-100 ">
                {showSummary ? (
                  <div className="text-justify rounded shadow-md text-balance bg-stone-950">
                    {segment.summary}
                  </div>
                ) : (
                  <>
                    <ul className="grow bg-stone-950">
                      {segment.bullets.map((bullet) => (
                        <li key={bullet} className="flex">
                          <div className="mt-1">
                            <RiMegaphoneLine />
                          </div>
                          <p className="ml-2 text-balance">{bullet}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <button
                  className="self-start pl-2 text-end text-violet-400"
                  onClick={handleSummaryToggle}
                >
                  {showSummary ? (
                    <RiMegaphoneLine size={24} />
                  ) : (
                    <RiBookLine size={24} />
                  )}
                </button>
              </div>

              <div className="pt-3 pl-0">
                <YouTubeEmbed
                  youtubeUrl={youtube_url}
                  startTimeMs={segment.start_time_ms}
                />
                <a
                  href={`${youtube_url}&t=${Math.floor(
                    segment.start_time_ms / 1000
                  )}`}
                  className="text-blue-500 underline "
                  onClick={(e) => {
                    e.preventDefault();
                    setShowVideo(!showVideo);
                  }}
                >
                  {youtube_url}&t={Math.floor(segment.start_time_ms / 1000)}
                </a>

                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    marginLeft: "10px",
                  }}
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
                <div className="mt-4">
                  <h4 className="text-lg font-bold text-violet-400">
                    Sources:
                  </h4>
                  <ul>
                    {segment.URL.map((url, idx) => (
                      <li key={idx} className="items-center truncate ">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          {url}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Segment;
