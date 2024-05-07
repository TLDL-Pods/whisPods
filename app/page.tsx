'use client';

import { useEffect, useState } from 'react';
import EpisodeSelect from './components/EpisodeSelect';
import Link from 'next/link';
import logoBannerWide from '@/app/assets/TLDL_wide.png';
import logoBanner from '@/app/assets/TLDL.png';
import Image from 'next/image';
import { EpisodeProps } from '@/types';
import EpisodeOverview from './components/EpisodeOverview';

export default function Home() {
  const [episodes, setEpisodes] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

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
    <div className="mx-auto h-full w-full flex-col justify-center">
      <div className="relative w-full lg:hidden">
        <div className="absolute top-0 h-full w-full bg-gradient-to-r from-black via-transparent to-black"></div>
        <Image
          src={logoBanner}
          alt={'TLDL Logo'}
          className="mx-auto w-full lg:hidden"
        />{' '}
      </div>

      <div className="absolute top-0 mt-24 w-full">
        <div className="relative hidden h-[800px] w-full object-cover lg:block">
          <div className="absolute top-0 h-full w-full bg-gradient-to-r from-black via-transparent to-black"></div>
          <Image
            src={logoBannerWide}
            alt={'TLDL Logo'}
            className="h-[800px] w-full object-cover"
          />
        </div>
      </div>
      <div className="lg:h-[780px]"></div>
      <div>
        <div className="mx-auto text-center lg:max-w-7xl">
          <Link href={`/thedailygwei`}>
            <div className="mt-2 py-4 text-center text-3xl font-thin text-secondary duration-300 hover:opacity-90 md:my-8 md:text-xl lg:block lg:text-5xl">
              WHAT'S NEW?{' '}
            </div>
          </Link>
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
      </div>
    </div>
  );
}
