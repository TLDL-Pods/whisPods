'use client';
import { FC, useState } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';

interface SearchBarProps {
  onSearch: (term: string) => void;
  clearSearchResults: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  clearSearchResults,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      onSearch(inputValue);
    }
  };

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
    </div>
  );
};

export default SearchBar;
