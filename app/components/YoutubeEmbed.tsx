'use client';

// import { useEffect, useState } from "react";
// import "tailwindcss/tailwind.css";

// function YouTubeEmbed({
//   youtubeUrl,
//   startTimeMs,
//   maxHeight,
// }: {
//   youtubeUrl: string;
//   startTimeMs: number;
//   maxHeight: string;
// }) {
//   const [iframeHeight, setIframeHeight] = useState<string>("");

//   useEffect(() => {
//     function calculateIframeHeight() {
//       // Assuming the aspect ratio is 16:9, calculate the corresponding width
//       const aspectRatio = 16 / 9;
//       const height = Math.min(window.innerHeight * 0.33, parseInt(maxHeight)); // 33% of the viewport or the maxHeight
//       const width = height * aspectRatio;

//       // Set the height in a 16:9 aspect ratio
//       setIframeHeight(`${width}px`);
//     }

//     // Calculate the initial height
//     calculateIframeHeight();

//     // Add event listener for window resize
//     window.addEventListener("resize", calculateIframeHeight);
//     return () => {
//       window.removeEventListener("resize", calculateIframeHeight);
//     };
//   }, [maxHeight]);

//   // Convert start time from milliseconds to seconds
//   const startTimeSeconds = Math.floor(startTimeMs / 1000);
//   const shortFormatMatch = youtubeUrl.match(/youtu.be\/([^&]+)/);
//   const videoId = shortFormatMatch ? shortFormatMatch[1] : null;
//   const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTimeSeconds}`;

//   return (
//     <div
//       className={`mx-auto border aspect-w-16 aspect-h-9`}
//       style={{ maxHeight: maxHeight }}
//     >
//       <iframe
//         className="w-full h-full"
//         src={embedUrl}
//         title="YouTube video player"
//         style={{ height: iframeHeight }}
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// }

// export default YouTubeEmbed;

import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

function YouTubeEmbed({
  youtubeUrl,
  startTimeMs,
  maxWidth,
}: {
  youtubeUrl: string;
  startTimeMs: number;
  maxWidth: string;
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
