"use client";
import { FC, useState } from "react";
import { EpisodeProps } from "@/types";
import debounce from "lodash.debounce";
import { IoSendSharp } from "react-icons/io5";

interface SearchBarProps {
  onEpisodesSearch: (episodes: EpisodeProps[]) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onEpisodesSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const searchEpisodes = debounce(async (searchTerm) => {
    console.log("Search Term:", searchTerm);
    try {
      const response = await fetch(`/api/search?term=${searchTerm}`);
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        onEpisodesSearch(data.data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, 300);

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Input on Enter:", inputValue);
      searchEpisodes(inputValue);
    }
  };

  return (
    <div className="relative w-1/2 mx-auto">
      <input
        type="text"
        placeholder="Search for episodes..."
        className="w-full pl-4 pr-10 text-black"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputChange}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center p-2 bg-stone-500"
        onClick={() => {
          if (inputValue) {
            searchEpisodes(inputValue);
          }
        }}
      >
        <IoSendSharp />
      </button>
    </div>
  );
};

export default SearchBar;
