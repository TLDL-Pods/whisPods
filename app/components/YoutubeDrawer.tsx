`use client`;

import React from 'react';
import { useApp } from '../hooks/useApp';
import { initialState } from '../contexts/StateContext';

const YoutubeDrawer: React.FC = () => {
  const { state, setState } = useApp();

  const startTimeSeconds =
    state.currentSegment && state.currentSegment.start_time_ms
      ? Math.floor(state.currentSegment.start_time_ms / 1000)
      : 0;
  const shortFormatMatch =
    state.currentEpisode && state.currentYouTubeVideo
      ? state.currentYouTubeVideo.match(/youtu.be\/([^&]+)/)
      : '';
  const videoId = shortFormatMatch ? shortFormatMatch[1] : null;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTimeSeconds}?autoplay=0?rel=0`;

  return (
    <div className="relative flex justify-center  w-full h-full">
      <div className="w-[600px] h-[350px] ">
        <iframe
          className="w-full h-full "
          src={embedUrl}
          title=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div
        className={`hidden sm:flex flex-col w-1/3 items-center justify-center bg-stone-900 text-white`}
      >
        <div className="h-1">
          <p className="pl-4 my-4 text-xl text-bold ">TLDL </p>
          <p className="pl-4 my-4 text-md ">
            {state.currentSegment && state.currentSegment.summary}{' '}
          </p>
        </div>
        <div className="h-full"></div>
      </div>
      <button
        className="absolute px-1 text-md text-red-600 border border-red-400 right-1 top-2"
        onClick={() => {
          setState({
            ...state,
            isVideoModalOpen: false,
            currentYouTubeVideo: '',
          });
        }}
        aria-label="Close Video"
      >
        X
      </button>
    </div>
  );
};

export default YoutubeDrawer;
