'use client';
import { useEffect } from 'react';

import { useEpisodes } from '@/app/hooks/useEpisodes';
import SegmentsList from './components/SegmentsList';
import EpisodeHeader from './components/episodeHeader/EpisodeHeader';
import { useApp } from '@/app/hooks/useApp';

export default function EpisodePage({
  params,
}: {
  params: { ep_number: string };
}) {
  const { fetchEpisodeData } = useEpisodes();
  const { state } = useApp();

  useEffect(() => {
    fetchEpisodeData(params.ep_number);
  }, []);

  if (!state.currentEpisode) {
    return (
      <div className="flex h-screen w-full items-center justify-center align-middle">
        <div className="h-1/2 w-full text-center">
          <div className="spinner"></div>
          <p className="m-auto mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-screen max-w-screen relative flex h-full w-full flex-col items-center justify-center pb-16">
      <p>{state.currentEpisode.episode_date}</p>
      <EpisodeHeader currentEpisode={state.currentEpisode} />
      <SegmentsList currentEpisode={state.currentEpisode} />
    </div>
  );
}
