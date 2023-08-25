"use client";
import { useState, FC } from "react";
import { SearchBar } from "@/app/components/SearchBar";
import { EpisodeProps } from "@/types";

const SearchPage: FC = () => {
  const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);

  const handleEpisodeSelect = (episode: EpisodeProps) => {
    // Assuming a function like this makes sense based on your structure
    // to process the selected episode or do some action with it
    setEpisodes([...episodes, episode]);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-xl font-bold">Search Episodes</h1>

      <SearchBar onEpisodesSearch={setEpisodes} />

      <div className="mt-8">
        {episodes.map((episode, index) => (
          <div key={index} className="p-2 mb-3 border rounded shadow">
            <h2 className="text-lg font-semibold">{episode.episode_title}</h2>
            <p>{episode.episode_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
