'use client';
import { useState, useEffect } from 'react';

import { useEpisodes } from '@/app/hooks/useEpisodes';
import SegmentsList from './components/SegmentsList';
import EpisodeHeader from './components/EpisodeHeader';
import { useApp } from '@/app/hooks/useApp';

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const { fetchEpisodeData } = useEpisodes();
  const { state, setState } = useApp();

  const [isOrganizedByLength, setIsOrganizedByLength] = useState<boolean>(true);

  const toggleOrganization = () => {
    setIsOrganizedByLength(!isOrganizedByLength);
  };

  useEffect(() => {
    fetchEpisodeData(params.ep_number);
  }, []);

  if (!state.currentEpisode) {
    return (
      <div className="w-full flex h-screen justify-center align-middle items-center">
        <div className="w-full text-center h-1/2">
          <div className="spinner"></div>
          <p className="m-auto mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-center h-full min-w-screen max-w-screen">
      <EpisodeHeader
        isOrganizedByLength={isOrganizedByLength}
        currentEpisode={state.currentEpisode}
        toggleOrganization={toggleOrganization}
      />
      <SegmentsList
        isOrganizedByLength={isOrganizedByLength}
        currentEpisode={state.currentEpisode}
      />
    </div>
  );
}
