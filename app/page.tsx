'use client';

import { useEffect, useState } from 'react';
import EpisodeSelect from './components/EpisodeSelect';
import Link from 'next/link';
import logoBannerWide from '@/app/assets/TLDL_wide.png';
import logoBanner from '@/app/assets/TLDL.png';
import Image from 'next/image';

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
    <div className="mx-auto h-full w-full flex-col justify-center">
      <div className="relative w-full lg:hidden">
        <div className="absolute top-0 h-full w-full bg-gradient-to-r from-black via-transparent to-black"></div>
        <Image
          src={logoBanner}
          alt={'TLDL Logo'}
          className="mx-auto w-full lg:hidden"
        />{' '}
      </div>

      <div className="absolute top-0 w-full">
        <div className="relative hidden h-[800px] w-full object-cover lg:block">
          <div className="absolute top-0 h-full w-full bg-gradient-to-r from-black via-transparent to-black"></div>
          <Image
            src={logoBannerWide}
            alt={'TLDL Logo'}
            className="h-[800px] w-full object-cover"
          />
        </div>
        <Link href={`/thedailygwei`}>
          <div className="mt-8 hidden py-4 text-center text-xl text-secondary duration-300 hover:opacity-90 md:text-xl lg:block lg:text-3xl">
            Latest Episodes
          </div>
        </Link>
      </div>
      <div className="lg:h-[780px]"></div>
      <div>
        <Link href={`/thedailygwei`}>
          <div className="py-4 text-center text-xl text-secondary duration-300 hover:opacity-90 md:text-xl lg:mt-8 lg:hidden lg:text-3xl">
            Latest Episodes
          </div>
        </Link>
        <div className="mx-auto text-center lg:max-w-7xl">
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
    </div>
  );
}
