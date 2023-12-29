'use client';
import { useState, useEffect } from 'react';

import { useEpisodes } from '@/app/hooks/useEpisodes';
import SegmentsList from './components/SegmentsList';
import EpisodeHeader from './components/EpisodeHeader';

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const { fetchEpisodeData, currentEpisode } = useEpisodes();
  const [isOrganizedByLength, setIsOrganizedByLength] = useState<boolean>(true);

  const toggleOrganization = () => {
    setIsOrganizedByLength(!isOrganizedByLength);
  };

  useEffect(() => {
    fetchEpisodeData(params.ep_number);
  }, []);

  if (!currentEpisode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col justify-center h-full min-w-screen max-w-screen">
      <EpisodeHeader
        isOrganizedByLength={isOrganizedByLength}
        currentEpisode={currentEpisode}
        toggleOrganization={toggleOrganization}
      />
      <SegmentsList
        isOrganizedByLength={isOrganizedByLength}
        currentEpisode={currentEpisode}
      />
    </div>
  );
}
