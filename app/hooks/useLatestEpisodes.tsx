'use client';

import { useApp } from './useApp';

export function useLatestEpisodes() {
  const { state, setState } = useApp();

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
      console.log('latest', json['data']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { fetchData };
}
