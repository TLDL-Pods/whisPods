`use client`;

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../hooks/useApp';
import { RiMegaphoneLine } from 'react-icons/ri';

const YoutubeDrawer: React.FC = () => {
  const { state, setState } = useApp();
  const playerRef = useRef<YT.Player | null>(null);
  const playerReady = useRef(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

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

  // Player Initialization (Only Once)
  useEffect(() => {
    const loadYouTubeIframeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    if (!window.YT) {
      loadYouTubeIframeAPI();
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '350',
        width: '600',
        videoId: videoId,
        playerVars: {
          start: startTimeSeconds,
          autoplay: 0,
          rel: 0,
        },
        events: {
          onReady: () => {
            playerReady.current = true;
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Video Update on Segment Change
  useEffect(() => {
    if (playerRef.current && playerReady.current && videoId) {
      playerRef.current.loadVideoById({
        videoId: videoId,
        startSeconds: startTimeSeconds,
      });
    }
  }, [videoId, startTimeSeconds]);

  //Close Video
  const videoClose = () => {
    if (playerRef.current && playerReady.current) {
      playerRef.current.stopVideo(); // This stops the video playback
    }
    setState(() => ({
      ...state,
      isVideoModalOpen: false,
      currentYouTubeVideo: null,
      currentSegment: null,
    }));
  };

  //Stop Video Playing
  useEffect(() => {
    if (
      playerRef.current &&
      playerReady.current &&
      state.isVideoModalOpen === false
    ) {
      playerRef.current.stopVideo(); // This stops the video playback
    }
  }, [state.isVideoModalOpen]);

  return (
    <div className="relative flex h-full w-full justify-center">
      <div className="h-[350px] w-[600px] ">
        <div id="youtube-player" className="h-full w-full"></div>
      </div>

      <div
        className={`hidden w-1/3 flex-col items-center justify-center bg-base1 p-6 text-baseText sm:flex`}
      >
        <p className="text-bold my-4 text-2xl ">TLDL </p>
        <div className="mx-auto flex w-full max-w-2xl flex-col space-y-2">
          {state.currentSegment && state.isVideoModalOpen
            ? state.currentSegment.bullets.map((bullet, idx) => (
                <div key={idx} className="my-auto flex rounded-lg bg-base p-2">
                  <div className="text-textBase my-auto flex text-lg">
                    <RiMegaphoneLine />
                  </div>
                  <p className="ml-4">{bullet}</p>
                </div>
              ))
            : null}
        </div>
        <div className="h-full"></div>
      </div>
      <button
        className={`${
          state.isVideoModalOpen ? 'block' : 'hidden'
        } text-md absolute -top-8 right-0 h-8 w-8 border border-white border-opacity-40 bg-base1 px-1 text-center text-red-400 duration-300 hover:border-opacity-100 hover:bg-base3 md:w-16`}
        onClick={() => videoClose()}
        aria-label="Close Video"
      >
        X
      </button>
    </div>
  );
};

export default YoutubeDrawer;
