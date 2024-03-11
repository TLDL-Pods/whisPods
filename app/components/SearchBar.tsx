'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useApp } from '../hooks/useApp';
import { useSearch } from '../hooks/useSearch';
import { EpisodeProps } from '@/types';
import debounce from 'lodash.debounce';

export const SearchBar = () => {
  const { state, setState } = useApp();
  const [inputValue, setInputValue] = useState<string>('');
  const [quickSearchResults, setQuickSearchResults] = useState<EpisodeProps[]>(
    [],
  );
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term.trim()) {
        performSearch(term);
      } else {
        // Clear search results if the term is empty or only whitespace
        setQuickSearchResults([]);
        setIsSearching(false);
      }
    }, 300),
    [], // Removed dependency on `performSearch` here to avoid re-creation on every render
  );

  useEffect(() => {
    setIsSearching(!!inputValue.trim());
    debouncedSearch(inputValue); // This will handle searching and clearing results

    // Cleanup function to cancel debounced calls on component unmount
    return () => debouncedSearch.cancel();
  }, [inputValue, debouncedSearch]);

  const performSearch = async (term: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/search/${encodeURIComponent(term)}`);
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setQuickSearchResults(data.data);
        setState((prevState) => ({
          ...prevState,
          searchResultEpisodes: data.data,
          hasSearched: true,
        }));
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setQuickSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearchResults = () => {
    setInputValue('');
    setQuickSearchResults([]);
    setIsSearching(false);
    setState((prevState) => ({
      ...prevState,
      searchResultEpisodes: [],
      hasSearched: false,
    }));
  };

  // Adjust the logic to not hide results on empty space input but clear on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuickSearchResults([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div ref={searchRef} className="relative z-20 flex w-full items-center">
      <input
        type="text"
        placeholder="Search for episodes..."
        className="h-12 w-full rounded-md border border-gray-200 bg-black bg-opacity-[96%] py-2 pl-10 pr-10 transition-colors duration-150 hover:bg-base2 focus:border-[#9c22ee] focus:bg-black focus:outline-none md:shadow-lg md:shadow-base"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {inputValue && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 py-2 transition-colors duration-150 focus:outline-none"
          onClick={clearSearchResults}
        >
          <IoClose className="text-[#9c22ee]" />
        </button>
      )}

      <div className="absolute inset-y-0 left-3 flex cursor-pointer items-center">
        <IoSearch className="text-[#9c22ee]" />
      </div>

      {quickSearchResults.length > 0 && (
        <div className="absolute top-full z-10 mt-1 h-72 w-full overflow-y-scroll rounded-md border border-gray-200 bg-base2 shadow-lg">
          {quickSearchResults.map((episode, index) => (
            <div
              key={index}
              className="cursor-pointer bg-base p-4 duration-300 hover:bg-base2"
            >
              <h3 className="text-lg font-semibold">{episode.episode_title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
