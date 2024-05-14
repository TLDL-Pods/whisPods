'use client';

import Link from 'next/link';
import Image from 'next/image';
import EpisodeSelect from '../components/EpisodeSelect';
import { EpisodeProps } from '@/types';
import TDG from '@/app/assets/the-daily-gwei.jpg';
import sassano from '@/app/assets/sassano_400x400.jpg';
import { useApp } from '../hooks/useApp';
import { useEffect, useState } from 'react';

export default function Podcast() {
  const [episodes, setEpisodes] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadEpisodes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/all-episodes?page=${page}&pageSize=10`,
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
    <div className="flex w-full max-w-full flex-col items-center ">
      <div className="flex flex-col space-y-6 ">
        {/* Podcast Card*/}
        <Link href={`/thedailygwei`}>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center rounded border p-4">
              {/* Image on the left */}
              <div className="mr-4">
                <Image
                  src={TDG}
                  alt={'The Daily Gwei'}
                  className="h-32 w-32"
                  width={90}
                  height={90}
                />
              </div>
              {/* Info on the right */}
              <div className="max-w-md break-words">
                <h1 className="text-center text-xl text-accent">
                  The Daily Gwei Refuel
                </h1>
                <p className="text-center text-sm text-gray-400">
                  The Daily Gwei Refuel gives you a recap every week day on
                  everything that happened in the Ethereum and crypto ecosystems
                  over the previous 24 hours - hosted by Anthony Sassano.
                </p>
              </div>
            </div>
          </div>
        </Link>
        {/* Host Card*/}
        <Link href={`/thedailygwei`}>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center rounded border p-4">
              {/* Image on the left */}
              <div className="mr-4">
                <Image
                  src={sassano}
                  alt={'The Daily Gwei'}
                  className="h-32 w-32"
                  width={90}
                  height={90}
                />
              </div>
              {/* Info on the right */}
              <div className="max-w-md break-words">
                <h1 className="text-center text-xl text-accent">
                  Anthony Sassano
                </h1>
                <p className="text-center text-sm text-gray-400">
                  Independent Ethereum educator, investor and advisor.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-32">
        {episodes.map((episode: EpisodeProps) => (
          <div key={episode._id}>
            <EpisodeSelect episode={episode} />
            {/* <EpisodeOverview episode={episode} /> */}
          </div>
        ))}
      </div>
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
  );
}
