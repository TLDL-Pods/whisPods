"use client";
import { FC, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: (term: string) => void;
  hasSearched: boolean;
  clearSearchResults: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  hasSearched,
  clearSearchResults,
}) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      onSearch(inputValue);
      console.log("inputValue", inputValue);
      // router.push(`/thedailygwei/search/${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div className="relative flex items-center w-full bg-[#1b1b1b]">
      <input
        type="text"
        placeholder="Search for episodes..."
        className="w-full py-2 pl-10 pr-10 bg-[#1b1b1b] text-#9c22ee transition-colors duration-150 border border-gray-300 rounded-md focus:border-[#9c22ee] focus:outline-none hover:bg-gray-50"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputChange}
      />

      {inputValue && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 py-2 transition-colors duration-150 rounded-r-md focus:outline-none"
          onClick={() => {
            setInputValue("");
            clearSearchResults();
          }}
        >
          <IoClose className="text-[#9c22ee]" />
        </button>
      )}

      <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
        <IoSearch className="text-[#9c22ee]" />
      </div>
    </div>
  );
};

export default SearchBar;
