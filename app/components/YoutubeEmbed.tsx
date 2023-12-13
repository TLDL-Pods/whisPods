"use client";

import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

function YouTubeEmbed({
  youtubeUrl,
  startTimeMs,
  maxWidth,
}: {
  youtubeUrl: string;
  startTimeMs: number;
  maxWidth: string;
}) {
  // Initialize state with undefined during server rendering
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Only add event listener if window is available
    if (window) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Convert start time from milliseconds to seconds
  const startTimeSeconds = Math.floor(startTimeMs / 1000);
  const shortFormatMatch = youtubeUrl.match(/youtu.be\/([^&]+)/);
  const videoId = shortFormatMatch ? shortFormatMatch[1] : null;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTimeSeconds}`;

  return (
    <div className={`flex w-full justify-center align-middle`}>
      <iframe
        className="h-[225px] w-[400px] sm:w-[600px] mx-auto"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="w-1/2"></div>
    </div>
  );
}

export default YouTubeEmbed;
