'use client';

import { useEffect, useState, useRef } from 'react';
import EpisodeSelect from './components/EpisodeSelect';
import { SearchBar } from '@/app/components/SearchBar';
import SearchResults from '@/app/components/SearchResults';
import { useApp } from './hooks/useApp';
import { useEpisodes } from './hooks/useEpisodes';
import { useSearch } from './hooks/useSearch';
import Link from 'next/link';

export default function Home() {
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const { state, setState } = useApp();
  const { performSearch, clearSearchResults } = useSearch();
  const { getAllEpisodes, getNewPage, hasMore } = useEpisodes();

  useEffect(() => {
    getAllEpisodes();
  }, []);

  // Intersection Observer to detect when the user has scrolled to the bottom
  // useEffect(() => {
  //   getNewPage(page);
  // }, [page, hasMore]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPage((prevPage) => prevPage + 1);
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (loader.current) {
  //     observer.observe(loader.current);
  //   }

  //   return () => {
  //     if (loader.current) {
  //       observer.unobserve(loader.current);
  //     }
  //   };
  // }, [hasMore]);

  return (
    <div className="flex-col justify-center w-full h-full p-4 mx-auto xl:w-[1200px]">
      {/* Episodes or Search Results */}
      <div className="">
        <Link href={`/thedailygwei`}>
          <div className="py-4 text-xl text-center duration-300 md:text-xl lg:text-3xl text-secondary hover:opacity-90">
            The Daily Gwei Refuel
          </div>
        </Link>
        {/* <div className="pb-32"> */}
        <div className="">
          {state.hasSearched ? (
            <SearchResults episodes={state.searchResultEpisodes} />
          ) : state.latestEpisodes ? (
            state.latestEpisodes.map((episode) => (
              <EpisodeSelect key={episode._id} episode={episode} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-screen align-middle">
              <div className="w-full mt-10 text-center h-1/2">
                <div className="spinner"></div>
                <p className="m-auto mt-3">Loading...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div ref={loader} style={{ height: '1px' }} />
    </div>
  );
}
