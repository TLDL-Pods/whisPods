import React from "react";
import { useApp } from "../hooks/useApp";
import { initialState } from "../contexts/StateContext";

const YoutubeVideo: React.FC = () => {
  const { state, setState } = useApp();

  const startTimeSeconds = state.youtubeStartTimeMS
    ? Math.floor(state.youtubeStartTimeMS / 1000)
    : 0;
  const shortFormatMatch = state.youtubeURL
    ? state.youtubeURL.match(/youtu.be\/([^&]+)/)
    : "";
  const videoId = shortFormatMatch ? shortFormatMatch[1] : null;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTimeSeconds}`;

  return (
    <div className="relative flex justify-between w-full h-full">
      <div className="w-[900px] h-[350px]">
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div
        className={`hidden sm:flex flex-col w-full items-center justify-center bg-stone-900 text-white`}
      >
        <div className="h-12">
          <p className="my-4 text-xl font-bold">TLDL</p>
        </div>
        <div className="h-full"></div>
      </div>
      <div
        className="absolute px-2 text-xl text-red-600 border border-red-400 right-4 top-2"
        onClick={() => {
          setState(initialState);
        }}
      >
        X
      </div>
    </div>
  );
};

export default YoutubeVideo;
