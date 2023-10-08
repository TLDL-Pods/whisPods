"use client";
import React, { FC, useCallback, useState, useEffect, useRef } from "react";
import { RiMegaphoneLine, RiBookLine } from "react-icons/ri";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { SegmentProps } from "@/types";
import YouTubeEmbed from "@/app/components/YoutubeEmbed";
import TweetEmbed from "./TweetEmbed";
import TwitterTweetEmbed from "react-twitter-embed";

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

  function loadTwitterScript() {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }

  useEffect(() => {
    loadTwitterScript();
  }, []);

  return (
    <div className="align-middle ">
      <li key={segment.segment_number} className="cursor-pointer ">
        {/* ROW 1: Index & Title */}
        <div
          className="flex gap-2 p-2 md:text-xl lg:text-2xl hover:bg-stone-800"
          onClick={() => handleSegmentToggle(index)}
        >
          {/* INDEX */}
          <div className="font-semibold text-center grow-0 text-violet-400">
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
          <div className="content-center flex-grow text-violet-200 text-balance">
            <span>{segment.segment_title}</span>
          </div>
        </div>
        {/* ROW 2: Blank & Content */}
        <div className="flex gap-2 p-2 md:text-l lg:text-xl">
          {showSegmentIndex === index && (
            <div className="flex">
              {/* Blank */}
              <div className="content-center flex-none invisible font-semibold text-center grow-0 text-violet-400 md:text-xl lg:text-2xl">
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
              {/* CONTENT */}
              <div className="flex-col content-center flex-grow md-text-l text-violet-200">
                {/* Bullets or Summary */}
                <div className="flex flex-row text-violet-100">
                  {showSummary ? (
                    <div className="text-justify ">{segment.summary}</div>
                  ) : (
                    <>
                      <ul className="flex-grow ">
                        {segment.bullets.map((bullet) => (
                          <li key={bullet} className="flex pb-2 pl-0.5">
                            <div className="mt-1 grow-0">
                              <RiMegaphoneLine />
                            </div>
                            <p className="ml-2 ">{bullet}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <button
                    className="self-start pr-2 text-end text-violet-400"
                    onClick={handleSummaryToggle}
                  >
                    {showSummary ? (
                      <RiMegaphoneLine size={24} />
                    ) : (
                      <RiBookLine size={24} />
                    )}
                  </button>
                </div>
                {/* YouTube Embed */}
                <div className="pt-4 pr-4 ">
                  <YouTubeEmbed
                    youtubeUrl={youtube_url}
                    startTimeMs={segment.start_time_ms}
                    maxWidth="screen-sm"
                  />
                  <a
                    href={`${youtube_url}&t=${Math.floor(
                      segment.start_time_ms / 1000
                    )}`}
                    className="pr-2 text-blue-500 underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVideo(!showVideo);
                    }}
                  >
                    YouTube Segment
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
                {/* Sources */}
                <div className="mt-4 ">
                  <h4 className="text-lg font-bold text-violet-400">
                    Sources:
                  </h4>
                  <div className="">
                    <ul className="">
                      {segment.URL.map((url, idx) => (
                        <li key={idx} className="flex items-center truncate">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 truncate "
                          >
                            {url.length > 40
                              ? url.substring(0, 35) + "..."
                              : url}
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
                {/* Embed Tweet */}
                {segment.URL &&
                  segment.URL.map((url, index) => (
                    <TweetEmbed key={index} url={url} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default Segment;
