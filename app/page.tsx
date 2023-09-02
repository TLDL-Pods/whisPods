"use client";

import { useState, useEffect } from "react";
import { EpisodeProps } from "@/types";
import PageSelect from "@/app/components/PageSelect";
import { useEpisodeContext } from "@/app/hooks/useEpisodeContext";
import { SearchBar } from "@/app/components/SearchBar";
import SearchResults from "@/app/components/SearchResults";

export default function Home() {
  const [latestEpisode, setLatestEpisode] = useState<EpisodeProps>();
  const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const performSearch = async (term: string) => {
    try {
      console.log("term", term);
      // const response = await fetch(`/api/search/${term}`);
      const response = await fetch(`/api/search/${encodeURIComponent(term)}`);
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setEpisodes(data.data);
      }
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/latest-episode`);
      const json = await res.json();
      console.log(json);
      setLatestEpisode(json["data"]);
      console.log(json);
    };
    fetchData();
    console.log("data", latestEpisode);
  }, []);

  const { data, setData } = useEpisodeContext();

  return (
    <div className="flex-col justify-center w-full p-4">
      {/* Header */}
      <header className="p-4 text-white bg-gray-800">
        <h1 className="text-2xl font-bold">Too Long Didn't Listen</h1>
        <p className="mt-2">Summarize, trends, and references for Podcasts</p>
      </header>
      <div className="w-full max-w-full">
        {/* Search Bar */}
        <div className="flex items-center pt-4 justify-left">
          <SearchBar onSearch={performSearch} />
        </div>

        <div className="pb-32">
          {hasSearched ? (
            <SearchResults episodes={episodes} />
          ) : (
            data.map((episode, index) => (
              <PageSelect key={episode._id} episode={episode} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
