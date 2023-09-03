import { useState } from "react";
import { EpisodeProps } from "@/types";
import { FaWindowMinimize } from "react-icons/fa";
import Segment from "@/app/components/Segment";

interface SearchResultsProps {
  episodes: EpisodeProps[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ episodes }) => {
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<
    number | null
  >(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  return (
    <div className="container p-4 mx-auto">
      <div className="mt-8">
        {episodes.map((episode, index) => (
          <div
            key={index}
            className="relative p-2 mb-3 border rounded shadow"
            onClick={() =>
              setSelectedEpisodeIndex(
                index === selectedEpisodeIndex ? null : index
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

            <div className="p-2 bg-gray-800 rounded">
              <h1 className="text-xl font-semibold">
                {episode.episode_number}: {episode.episode_title}
              </h1>
              <h3 className="font-semibold text-m">{episode.release_date}</h3>
            </div>

            {episode.matchedSegmentNumbers.map((segmentNumber) => {
              const matchedSegment = episode.episode_data.find(
                (segment) => segment.segment_number === segmentNumber
              );

              return (
                <div key={segmentNumber}>
                  <h3 className="text-lg font-bold text-violet-400">
                    Segment:
                  </h3>

                  <h2 className="pt-1 text-lg font-semibold ">
                    {matchedSegment?.headline}
                  </h2>

                  {/* Render expanded segment details if episode is selected */}
                  {selectedEpisodeIndex === index && matchedSegment && (
                    <li
                      onClick={(event) => event.stopPropagation()}
                      className="pl-0 list-none"
                    >
                      <Segment
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
};

export default SearchResults;
