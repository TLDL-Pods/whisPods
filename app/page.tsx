'use client';

import { useEffect } from 'react';
import PageSelect from '@/app/components/PageSelect';
import { SearchBar } from '@/app/components/SearchBar';
import SearchResults from '@/app/components/SearchResults';
import { useApp } from './hooks/useApp';
import { useLatestEpisodes } from './hooks/useLatestEpisodes';
import { useSearch } from './hooks/useSearch';

export default function Home() {
  const { state } = useApp();
  const { performSearch, clearSearchResults } = useSearch();
  const { fetchData } = useLatestEpisodes();

  useEffect(() => {
    fetchData();
    // refetch data
    const id = setInterval(fetchData, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex-col justify-center w-full h-full p-4 ">
      {/* Header */}
      <header className="p-4 text-white bg-gray-800">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          {/* Title */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Too Long Didn't Listen</h1>
            <p className="mt-2">
              Summarize, trends, and references for Podcasts
            </p>
          </div>
          {/* Search Content */}
          <div className="flex items-center w-full md:w-1/2">
            <SearchBar
              onSearch={performSearch}
              hasSearched={state.hasSearched}
              clearSearchResults={clearSearchResults}
            />
          </div>
        </div>
      </header>

      {/* Episodes or Search Results */}
      <div className="">
        {/* <div className="pb-32"> */}
        <div className="">
          {state.hasSearched ? (
            <SearchResults episodes={state.searchResultEpisodes} />
          ) : (
            state.latestEpisodes &&
            state.latestEpisodes.map((episode) => (
              <PageSelect key={episode._id} episode={episode} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
