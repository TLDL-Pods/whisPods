'use client';
import React, { FC, useCallback, useState, useEffect } from 'react';
import { RiMegaphoneLine } from 'react-icons/ri';
import Image from 'next/image';
import { FaRegCopy, FaCheck } from 'react-icons/fa';

import sassalImage from '@/app/assets/sassal.webp';
import creepySassalImage from '@/app/assets/creepySassal.webp';

interface SegmentProps {
  segment: {
    bullets: string[];
    bullets_ELI5: string[];
    URL: string[];
    start_time_ms: number;
  };
  showVideo: boolean;
  setShowVideo: (value: boolean) => void;
  youtube_url: string;
}

const SearchSegment: FC<SegmentProps> = ({
  segment,
  showVideo,
  setShowVideo,
  youtube_url,
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

  const handleCopy = useCallback(
    (textToCopy: string, type: 'youtube' | 'segment') => {
      navigator.clipboard.writeText(textToCopy);
      setCopySuccess(type);
    },
    [],
  );

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(null);
      }, 1000); // Revert back after 1 second

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [copySuccess]);

  return (
    <>
      <h3 className="pt-2 text-lg font-bold text-textBase">TLDL:</h3>
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
      <h3 className="text-lg font-bold text-textBase">Video:</h3>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          style={{ border: 'none', background: 'transparent' }}
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
          href={`${youtube_url}&t=${Math.floor(segment.start_time_ms / 1000)}`}
          style={{
            marginLeft: '10px',
            color: 'blue',
            textDecoration: 'underline',
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
            border: 'none',
            background: 'transparent',
            marginLeft: '10px',
          }}
          onClick={() =>
            handleCopy(
              `${youtube_url}&t=${Math.floor(segment.start_time_ms / 1000)}`,
              'youtube',
            )
          }
        >
          {copySuccess === 'youtube' ? <FaCheck /> : <FaRegCopy />}
        </button>
      </div>

      {showVideo && (
        <YouTubeEmbed
          youtubeUrl={youtube_url}
          startTimeMs={segment.start_time_ms}
        />
      )}
      <div className="mt-4">
        <h4 className="text-lg font-bold text-textBase">Sources:</h4>
        <ul>
          {segment.URL.map((url, idx) => (
            <li key={idx}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue' }}
              >
                {url}
              </a>
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  marginLeft: '10px',
                }}
                onClick={() => handleCopy(url, 'segment')}
              >
                {copySuccess === 'segment' ? <FaCheck /> : <FaRegCopy />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchSegment;
