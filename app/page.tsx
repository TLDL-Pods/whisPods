'use client';

import { useEffect, useState } from 'react';
import { EpisodeProps } from '@/types';
import PageSelect from '@/app/components/PageSelect';
import { SearchBar } from '@/app/components/SearchBar';
import SearchResults from '@/app/components/SearchResults';
import { useApp } from './hooks/useApp';

export default function Home() {
  const { state, setState } = useApp();
  const [hasSearched, setHasSearched] = useState(false);
  const performSearch = async (term: string) => {
    try {
      console.log('term', term);
      const response = await fetch(`/api/search/${encodeURIComponent(term)}`);
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setState(() => ({
          ...state,
          searchResultEpisodes: data.data,
        }));
      }
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const clearSearchResults = () => {
    setState(() => ({
      ...state,
      searchResultEpisodes: [],
    }));
    setHasSearched(false);
  };

  useEffect(() => {
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
              hasSearched={hasSearched}
              clearSearchResults={clearSearchResults}
            />
          </div>
        </div>
      </header>

      {/* Episodes or Search Results */}
      <div className="">
        {/* <div className="pb-32"> */}
        <div className="">
          {hasSearched ? (
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
