'use client';

import { useRef, createRef, useState } from 'react';
import { useApp } from './useApp';
import { EpisodeProps, SegmentProps } from '@/types';

export function useEpisodes() {
  const { state, setState } = useApp();

  const segmentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/all-episodes`, {
        cache: 'no-store',
      });
      const json = await res.json();
      setState(() => ({
        ...state,
        latestEpisodes: json['data'],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchEpisodeData = async (ep_number: string) => {
    const episodeNumber = parseInt(ep_number, 10);
    const res = await fetch(`/api/episode?episode_number=${episodeNumber}`);
    const json = await res.json();
    const filteredSegments = json['data'].episode_data.filter(
      (segment: SegmentProps) => segment.segment_number !== 0,
    );
    const sortedData = {
      ...json['data'],
      episode_data: filteredSegments.sort(
        (a: SegmentProps, b: SegmentProps) =>
          b.segment_length_ms - a.segment_length_ms,
      ),
    };
    segmentRefs.current = sortedData.episode_data.map(() =>
      createRef<HTMLDivElement>(),
    );
    setState(() => ({ ...state, currentEpisode: sortedData }));
  };

  return { fetchData, fetchEpisodeData };
}
