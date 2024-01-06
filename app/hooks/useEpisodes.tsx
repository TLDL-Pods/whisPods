'use client';

import { useRef, createRef, useState } from 'react';
import { useApp } from './useApp';
import { SegmentProps, EpisodeProps } from '@/types';

export function useEpisodes() {
  const { state, setState } = useApp();
  const [hasMore, setHasMore] = useState(true);

  const segmentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const fetchData = async (page: number): Promise<EpisodeProps[]> => {
    const res = await fetch(`/api/episode-page?page=${page}`, {
      cache: 'no-store',
    });
    const json = await res.json();
    return json['data'];
  };

  const getNewPage = async (page: number) => {
    if (hasMore) {
      await fetchData(page)
        .then((newEpisodes) => {
          if (newEpisodes.length === 0) {
            setHasMore(false);
          } else {
            setState(() => ({
              ...state,
              latestEpisodes: [...(state.latestEpisodes || []), ...newEpisodes],
            }));
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const getAllEpisodes = async () => {
    try {
      const res = await fetch(`/api/all-episodes`, {
        cache: 'no-store',
      });
      const json = await res.json();
      console.log(json['data']);
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
      (segment: SegmentProps) => segment.segment_number !== 0
    );
    const sortedData = {
      ...json['data'],
      episode_data: filteredSegments.sort(
        (a: SegmentProps, b: SegmentProps) =>
          b.segment_length_ms - a.segment_length_ms
      ),
    };
    segmentRefs.current = sortedData.episode_data.map(() =>
      createRef<HTMLDivElement>()
    );
    setState(() => ({ ...state, currentEpisode: sortedData }));
  };

  return { fetchData, fetchEpisodeData, getNewPage, getAllEpisodes, hasMore };
}
