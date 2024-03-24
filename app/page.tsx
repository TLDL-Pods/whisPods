'use client';

import { useEffect, useState } from 'react';
import EpisodeSelect from './components/EpisodeSelect';
import { useApp } from './hooks/useApp';
import { useEpisodes } from './hooks/useEpisodes';
import Link from 'next/link';

export default function Home() {
  const [page, setPage] = useState(1);
  const { state } = useApp();
  const { getAllEpisodes } = useEpisodes();

  useEffect(() => {
    getAllEpisodes();
  }, []);

  return (
    <div className="mx-auto h-full w-full flex-col justify-center p-4 xl:w-[1200px]">
      {/* Episodes or Search Results */}
      <div className="">
        <Link href={`/thedailygwei`}>
          <div className="py-4 text-center text-xl text-secondary duration-300 hover:opacity-90 md:text-xl lg:text-3xl">
            The Daily Gwei Refuel
          </div>
        </Link>
        {/* <div className="pb-32"> */}
        <div className="">
          {state.latestEpisodes &&
            state.latestEpisodes.map((episode) => (
              <EpisodeSelect key={episode._id} episode={episode} />
            ))}
        </div>
      </div>
    </div>
  );
}
