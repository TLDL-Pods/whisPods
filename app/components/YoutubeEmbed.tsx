import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

function YouTubeEmbed({
  youtubeUrl,
  startTimeMs,
}: {
  youtubeUrl: string;
  startTimeMs: number;
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Convert start time from milliseconds to seconds
  const startTimeSeconds = Math.floor(startTimeMs / 1000);
  const shortFormatMatch = youtubeUrl.match(/youtu.be\/([^&]+)/);
  const videoId = shortFormatMatch ? shortFormatMatch[1] : null;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTimeSeconds}`;

  return (
    <div className="max-w-full mx-auto border aspect-w-16 aspect-h-9">
      <iframe
        className="aspect-content"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;
