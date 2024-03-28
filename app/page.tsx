'use client';

import { useEffect, useState } from 'react';
import EpisodeSelect from './components/EpisodeSelect';
import Link from 'next/link';

export default function Home() {
  const [episodes, setEpisodes] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadEpisodes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/all-episodes?page=${page}&pageSize=25`,
      );

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const { data } = await response.json();
      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setEpisodes((prev: any) => [...prev, ...data]);
      }
    } catch (error: any) {
      console.error('Fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Load initial episodes
  useEffect(() => {
    loadEpisodes();
  }, [page]);

  return (
    <div className="mx-auto h-full w-full flex-col justify-center p-4 xl:w-[1200px]">
      <Link href={`/thedailygwei`}>
        <div className="py-4 text-center text-xl text-secondary duration-300 hover:opacity-90 md:text-xl lg:text-3xl">
          The Daily Gwei Refuel
        </div>
      </Link>
      <div className="text-center">
        {episodes.map((episode: any) => (
          <EpisodeSelect key={episode._id} episode={episode} />
        ))}
        {hasMore && (
          <button
            onClick={handleLoadMoreClick}
            disabled={loading}
            className="my-4"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
}
