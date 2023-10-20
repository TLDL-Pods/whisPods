"use client";
import React, { FC, useCallback, useState, useEffect, useRef } from "react";
import { RiMegaphoneLine, RiBookLine } from "react-icons/ri";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { SegmentProps } from "@/types";
import YouTubeEmbed from "@/app/components/YoutubeEmbed";
import TweetEmbed from "./TweetEmbed";
import { AiOutlineShareAlt } from "react-icons/ai";

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

  const handleSummaryToggle = () => {
    setShowSummary(!showSummary);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const segmentNumFromURL = parseInt(hash.substring(1), 10);
      if (!isNaN(segmentNumFromURL) && segmentNumFromURL === segmentNumber) {
        setShowSegmentIndex(segmentNumber);
      }
    }
  }, [segmentNumber]);

  const handleCopyLink = (segmentNumber: Number, episodeNumber: Number) => {
    const url = `${window.location.origin}/thedailygwei/${episodeNumber}#${segmentNumber}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div
      id={`${segment.segment_number}`}
      className="align-middle md:max-w-[768px]"
      key={segment.segment_number}
    >
      <li className="cursor-pointer ">
        {/* ROW 1: Index & Title */}
        <div
          className="flex gap-2 p-2 md:text-xl lg:text-2xl hover:bg-stone-800"
          onClick={() => handleSegmentToggle()}
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
                : segmentNumber + 1 + "."}
            </p>
          </div>
          {/* HEADLINE*/}
          <div className="content-center flex-grow text-violet-200 text-balance">
            <span>{segment.segment_title}</span>
          </div>
        </div>

        {/* ROW 2: Blank & Content */}
        <div className="flex gap-2 p-2 md:text-l lg:text-xl">
          {showSegmentIndex === segmentNumber && (
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
                    : segmentNumber + 1 + "."}
                </p>
              </div>
              {/* CONTENT */}
              {/* Copy BUtton */}
              {/* <button
                className="text-right"
                onClick={() => handleCopyLink(segmentNumber, episodeNumber)}
              >
                <AiOutlineShareAlt />
              </button> */}
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
                {/* Sources */}
                <div className="mt-4 ">
                  <h4 className="text-lg font-bold text-violet-400">
                    Sources:
                  </h4>
                  <div className="">
                    {/* Embed Tweet */}
                    {segment.URL &&
                      segment.URL.map((url, index) => (
                        <TweetEmbed key={url} url={url} />
                      ))}
                    <ul className="">
                      {segment.URL.map((url, idx) => (
                        <li key={url} className="flex items-center truncate">
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
              </div>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};

export default Segment;
