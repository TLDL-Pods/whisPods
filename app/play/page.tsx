'use client';

import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const VideoPopup: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const [startTime, setStartTime] = useState(0);

  const handleYoutubeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeId(e.target.value);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(Number(e.target.value));
  };

  const videoOptions = {
    height: '315',
    width: '500',
    playerVars: {
      autoplay: 1,
      start: startTime,
    },
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter YouTube ID"
          value={youtubeId}
          onChange={handleYoutubeIdChange}
          className="p-1 mr-2 text-black border"
        />
        <input
          type="number"
          placeholder="Start Time in Seconds"
          value={startTime}
          onChange={handleStartTimeChange}
          className="p-1 mr-2 text-black border"
        />
        <button
          onClick={() => setShowVideo(true)}
          className="px-2 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Show Video
        </button>
      </div>
      {showVideo && (
        <div
          className="w-[500px] h-[315px] bg-orange-600 block"
          style={{ backgroundColor: '#D05F27' }}
        >
          <YouTube videoId={youtubeId} opts={videoOptions} />
          <button
            onClick={() => setShowVideo(false)}
            className="px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default VideoPopup;
