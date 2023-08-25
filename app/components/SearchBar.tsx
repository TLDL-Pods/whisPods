"use client";
import { FC } from "react";
import { EpisodeProps } from "@/types";
import debounce from "lodash.debounce";

interface SearchBarProps {
  onEpisodesSearch: (episodes: EpisodeProps[]) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onEpisodesSearch }) => {
  const searchEpisodes = debounce(async (searchTerm) => {
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
      const inputValue = (event.target as HTMLInputElement).value;
      if (inputValue) {
        searchEpisodes(inputValue);
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for episodes..."
      className="w-1/2 mx-auto text-black rounded-lg"
      onKeyDown={handleInputChange}
    />
  );
};

export default SearchBar;
