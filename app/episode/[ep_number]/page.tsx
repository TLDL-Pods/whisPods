"use client";
import IndividualSegment from "@/app/components/Segment";
import Image from "next/image";

import { EpisodeProps, SegmentProps } from "@/types";
import { useState, useEffect, useRef, createRef, useContext } from "react";
import {
  RiArrowUpCircleFill,
  RiArrowUpCircleLine,
  RiArrowUpFill,
  RiArrowUpSFill,
  RiMegaphoneLine,
  RiBookLine,
} from "react-icons/ri";
import sassalImage from "@/app/assets/sassal.webp";
import creepySassalImage from "@/app/assets/creepySassal.webp";

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const [data, setData] = useState<EpisodeProps>();
  const [isELI5, setIsELI5] = useState<boolean>(false);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<
    number | null
  >(null);
  const [showSummary, setShowSummary] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const segmentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const handleMode = () => {
    setIsELI5(!isELI5);
  };

  const handleSummaryToggle = (index: number) => {
    if (showSummary === index) {
      setShowSummary(null);
    } else {
      setShowSummary(index);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const episodeNumber = parseInt(params.ep_number, 10);
      const res = await fetch(`/api/episode?episode_number=${episodeNumber}`);
      const json = await res.json();
      const filteredSegments = json["data"].episode_data.filter(
        (segment: SegmentProps) => segment.segment_number !== 0
      );
      const sortedData = {
        ...json["data"],
        episode_data: filteredSegments.sort(
          (a: SegmentProps, b: SegmentProps) =>
            b.segment_length_ms - a.segment_length_ms
        ),
      };
      segmentRefs.current = sortedData.episode_data.map(() =>
        createRef<HTMLDivElement>()
      );
      setData(sortedData);
      console.log(sortedData);
    };
    fetchData();
  }, []);

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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-screen overflow-y-auto w-3/8 bg-stone-950">
        <h3 className="mt-4 text-center text-violet-200">
          Episode {data.episode_number}
        </h3>
        <h3 className="mt-1 text-center text-violet-200">
          {data.release_date}
        </h3>
        <h4 className="text-2xl font-bold text-center text-violet-400">
          Stories
        </h4>

        <ul className="pt-2 pb-12">
          {data.episode_data.map((segment, index) => (
            <div className="border-b border-violet-200 border-opacity-40">
              <li
                key={segment.segment_number}
                className={`flex w-full h-24 my-auto text-sm align-middle transition-all duration-500 cursor-pointer hover:bg-stone-800`}
                onClick={() => {
                  setSelectedSegmentIndex(
                    selectedSegmentIndex === index ? null : index
                  );
                  const segmentRef = segmentRefs.current[index]?.current;
                  if (segmentRef) {
                    segmentRef.scrollIntoView();
                  }
                }}
              >
                <p className="mx-4 my-auto text-3xl font-semibold text-violet-400">
                  {index + 1}
                  {"."}
                </p>
                <div className="w-4/5 p-2 my-auto">
                  <span className="text-lg">
                    {isELI5 ? segment.headline_ELI5 : segment.headline}
                  </span>
                </div>
              </li>
              {index === selectedSegmentIndex && (
                <div className="relative p-4">
                  <button
                    className="absolute top-0 right-0 p-2"
                    onClick={() => handleSummaryToggle(index)}
                  >
                    {showSummary === index ? (
                      <RiMegaphoneLine size={24} />
                    ) : (
                      <RiBookLine size={24} />
                    )}
                  </button>
                  {showSummary === index ? (
                    // Display the summary when showSummary is equal to the current index
                    <>
                      <h3 className="text-lg font-bold text-violet-400">
                        TLDL:
                      </h3>
                      <div className="p-4 mt-4 rounded shadow-md bg-stone-950">
                        {segment.summary}
                      </div>
                    </>
                  ) : (
                    // Otherwise, display the bullets
                    <>
                      <h3 className="text-lg font-bold text-violet-400">
                        TLDL:
                      </h3>
                      <ul className="p-4 mt-2 w-fit bg-stone-950">
                        {(isELI5 ? segment.bullets_ELI5 : segment.bullets).map(
                          (bullet) => (
                            <li key={bullet} className="flex">
                              <div className="mt-1">
                                <RiMegaphoneLine />
                              </div>

                              <p className="ml-2">{bullet}</p>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                  </div>

                  {showVideo && (
                    <YouTubeEmbed
                      youtubeUrl={data.youtube_url}
                      startTimeMs={segment.start_time_ms}
                    />
                  )}

                  {/* Ssection for Story sources */}
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-violet-400">
                      Sources:
                    </h4>
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
