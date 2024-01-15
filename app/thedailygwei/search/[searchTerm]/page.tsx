'use client';
import { useState, useEffect, FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/app/components/SearchBar';
import { EpisodeProps } from '@/types';
import SearchSegment from '@/app/components/SearchSegment';
import { FaWindowMinimize } from 'react-icons/fa';
import { useSearch } from '@/app/hooks/useSearch';

export default function SearchTermPage({
  params,
}: {
  params: { searchTerm: string };
}) {
  const { performSearch } = useSearch();

  const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<
    number | null
  >(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');

  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm as string);
    }
  }, [searchTerm]);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-xl font-bold">Search Episodes</h1>

      {/* <SearchBar onSearch={performSearch} /> */}

      <div className="mt-8">
        {episodes.map((episode, index) => (
          <div
            key={index}
            className="relative p-2 mb-3 border rounded shadow"
            onClick={() =>
              setSelectedEpisodeIndex(
                index === selectedEpisodeIndex ? null : index,
              )
            }
          >
            {/* Minimize (or toggle) button */}
            {selectedEpisodeIndex === index && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedEpisodeIndex(null);
                }}
                className="absolute text-white rounded shadow top-1 right-2"
              >
                <FaWindowMinimize />
              </button>
            )}

            <div className="p-2 bg-baseText2 rounded">
              <h1 className="text-xl font-semibold">
                {episode.episode_number}: {episode.episode_title}
              </h1>
              <h3 className="font-semibold text-m">{episode.release_date}</h3>
            </div>

            {episode.matchedSegmentNumbers.map((segmentNumber) => {
              const matchedSegment = episode.episode_data.find(
                (segment) => segment.segment_number === segmentNumber,
              );

              return (
                <div key={segmentNumber}>
                  <h3 className="text-lg font-bold text-primary">Title:</h3>

                  <h2 className="pt-1 text-lg font-semibold ">
                    {matchedSegment?.headline}
                  </h2>

                  {/* Render expanded segment details if episode is selected */}
                  {selectedEpisodeIndex === index && matchedSegment && (
                    <li
                      onClick={(event) => event.stopPropagation()}
                      className="pl-0 list-none"
                    >
                      <SearchSegment
                        segment={matchedSegment}
                        showVideo={showVideo}
                        setShowVideo={setShowVideo}
                        youtube_url={episode.youtube_url}
                      />
                    </li>
                  )}
                  {/* White separator line */}
                  {segmentNumber !==
                    episode.matchedSegmentNumbers[
                      episode.matchedSegmentNumbers.length - 1
                    ] && <div className="separator my-4 bg-white h-0.5 "></div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
