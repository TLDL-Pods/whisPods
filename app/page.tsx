"use client";
import { useState, useEffect } from "react";
import PageSelect from "./components/PageSelect";
import { EpisodeProps } from "@/types";

export default function Home() {
  const [data, setData] = useState<EpisodeProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/all-episodes`);
      const json = await res.json();
      setData(json["data"]);
    };
    fetchData();
  }, []);

  // Get current episodes
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = data.slice(indexOfFirstEpisode, indexOfLastEpisode);

  return (
    <div className="min-h-screen w-full">
      {currentEpisodes.map((episode: EpisodeProps, index: number) => (
        <PageSelect index={index} episode={episode} />
      ))}
    </div>
  );
}
