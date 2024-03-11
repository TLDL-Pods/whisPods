'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useApp } from '../hooks/useApp';
import { useSearch } from '../hooks/useSearch';

export const SearchBar = () => {
  const { state, setState } = useApp();
  const { performSearch, clearSearchResults, debounce } = useSearch();
  const [inputValue, setInputValue] = useState<string>('');

  const debouncedSearch = useMemo(
    () => debounce((term: string) => performSearch(term), 500),
    [performSearch],
  );

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      performSearch(inputValue);
    }
  };
  // Use useEffect to call the debounced search function whenever inputValue changes
  useEffect(() => {
    if (inputValue) {
      debouncedSearch(inputValue);
    } else {
      clearSearchResults();
    }
  }, [inputValue, debouncedSearch, clearSearchResults]);

  return (
    <div className="relative flex w-full items-center">
      <input
        type="text"
        placeholder="Search for episodes..."
        className=" h-12 w-full rounded-md border border-gray-200 bg-black bg-opacity-[96%] py-2 pl-10 pr-10 transition-colors duration-150 hover:bg-gray-50 hover:text-black focus:border-[#9c22ee] focus:outline-none md:shadow-lg md:shadow-base"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputChange}
      />

      {inputValue && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 py-2 transition-colors duration-150 focus:outline-none"
          onClick={() => {
            setInputValue('');
            clearSearchResults();
          }}
        >
          <IoClose className="text-[#9c22ee]" />
        </button>
      )}

      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <IoSearch className="text-[#9c22ee]" />
      </div>
      {state.searchResultEpisodes && state.searchResultEpisodes.length > 0 && (
        <div className="absolute top-full z-10 mt-1 h-72 w-full overflow-y-scroll rounded-md border border-gray-200 bg-base shadow-lg">
          {state.searchResultEpisodes.map((episode) => (
            <div className="cursor-pointer bg-base p-4 hover:bg-gray-100">
              <h3 className="text-lg font-semibold">{episode.episode_title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
