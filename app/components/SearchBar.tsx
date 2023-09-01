"use client";
import { FC, useState } from "react";
import { EpisodeProps } from "@/types";
import debounce from "lodash.debounce";
import { IoSendSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      onSearch(inputValue);
      console.log("inputValue", inputValue);
      router.push(`/thedailygwei/search/${encodeURIComponent(inputValue)}`);
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
        type="button"
        className="absolute inset-y-0 right-0 flex items-center p-2 bg-stone-500"
        onClick={() => {
          if (inputValue) {
            onSearch(inputValue);
            router.push(
              `/thedailygwei/search/${encodeURIComponent(inputValue)}`
            );
          }
        }}
      >
        <IoSendSharp />
      </button>
    </div>
  );
};

export default SearchBar;
