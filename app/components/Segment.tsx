"use client";
import React, { FC, useCallback, useState, useEffect, useRef } from "react";
import { RiMegaphoneLine, RiBookLine } from "react-icons/ri";

import Image from "next/image";
import { FaRegCopy, FaCheck } from "react-icons/fa";

import sassalImage from "@/app/assets/sassal.webp";
import creepySassalImage from "@/app/assets/creepySassal.webp";

interface SegmentProps2 {
  segment: {
    headline: string;
    bullets: string[];
    bullets_ELI5: string[];
    URL: string[];
    start_time_ms: number;
    summary: string;
    segment_length_ms: number;
    segment_number: number;
  };
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
  function YouTubeEmbed({
    youtubeUrl,
    startTimeMs,
  }: {
    youtubeUrl: string;
    startTimeMs: number;
  }) {
    // Convert start time from milliseconds to seconds
    const startTimeSeconds = Math.floor(startTimeMs / 1000);

    // Extract the video ID from the youtube URL
    console.log("youtubeUrl", youtubeUrl);
    const shortFormatMatch = youtubeUrl.match(/youtu.be\/([^&]+)/);
    const videoId = shortFormatMatch ? shortFormatMatch[1] : null;
    // Construct the embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTimeSeconds}`;

    return (
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }
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
    <div className="relative p-4">
      <li
        key={segment.segment_number}
        className="flex w-full h-24 my-auto text-sm align-middle transition-all duration-500 cursor-pointer hover:bg-stone-800"
        onClick={() => handleSegmentToggle(index)}
      >
        <p className="mx-4 my-auto text-3xl font-semibold text-violet-400">
          {isOrganizedByLength
            ? `${Math.floor(segment.segment_length_ms / 60000)}:${(
                (segment.segment_length_ms % 60000) /
                1000
              )
                .toFixed(0)
                .padStart(2, "0")}`
            : index + 1 + "."}
        </p>
        <div className="w-4/5 p-2 my-auto">
          <span className="text-lg">{segment.headline}</span>
        </div>
      </li>
      {showSegmentIndex === index && (
        <div className="relative p-4">
          <button
            className="absolute top-0 right-0 p-2"
            onClick={handleSummaryToggle} // Use it here
          >
            {showSummary ? (
              <RiMegaphoneLine size={24} />
            ) : (
              <RiBookLine size={24} />
            )}
          </button>
          {showSummary ? (
            <>
              <h3 className="text-lg font-bold text-violet-400">TLDL2:</h3>
              <div className="p-4 mt-4 rounded shadow-md bg-stone-950">
                {segment.summary}
              </div>
            </>
          ) : (
            <>
              <h3 className="pt-2 text-lg font-bold text-violet-400">TLDL:</h3>
              <ul className="p-4 mt-2 w-fit bg-stone-950">
                {segment.bullets.map((bullet) => (
                  <li key={bullet} className="flex">
                    <div className="mt-1">
                      <RiMegaphoneLine />
                    </div>
                    <p className="ml-2">{bullet}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
          <>
            <h3 className="text-lg font-bold text-violet-400">Video:</h3>

            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                style={{ border: "none", background: "transparent" }}
                onClick={() => setShowVideo(!showVideo)}
              >
                <Image
                  src={showVideo ? creepySassalImage : sassalImage}
                  alt="Toggle Video"
                  width={40}
                  height={40}
                />
              </button>
              <a
                href={`${youtube_url}&t=${Math.floor(
                  segment.start_time_ms / 1000
                )}`}
                style={{
                  marginLeft: "10px",
                  color: "blue",
                  textDecoration: "underline",
                }}
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
            </div>

            {showVideo && (
              <YouTubeEmbed
                youtubeUrl={youtube_url}
                startTimeMs={segment.start_time_ms}
              />
            )}
            <div className="mt-4">
              <h4 className="text-lg font-bold text-violet-400">Sources:</h4>
              <ul>
                {segment.URL.map((url, idx) => (
                  <li key={idx}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue" }}
                    >
                      {url}
                    </a>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleCopy(url, "segment")}
                    >
                      {copySuccess === "segment" ? <FaCheck /> : <FaRegCopy />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Segment;
