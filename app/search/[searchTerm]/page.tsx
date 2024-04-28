'use client';

import EpisodeSelect from '@/app/components/EpisodeSelect';
import SegmentsList from '@/app/thedailygwei/[ep_number]/components/SegmentsList';
import EpisodeSegment from '@/app/thedailygwei/[ep_number]/components/episodeSegment/EpisodeSegment';
import { useState } from 'react';

export default function Page({ params }: any) {
  const searchTerm = params.searchTerm;
  const [searchResults, setSearchResults] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async (nextPage: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search/?searchTerm=${encodeURIComponent(searchTerm)}&page=${nextPage}&pageSize=10`,
      );

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }

      const { data, message } = await response.json();

      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setSearchResults((prev: any) => [...prev, ...data]);
      }
    } catch (error: any) {
      console.error('Fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreClick = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    // Fetch the new page of results
    await loadMore(nextPage);
  };

  // Load initial results
  useState(() => {
    loadMore(0);
  });

  return (
    <main className="flex flex-col items-center">
      {loading ? null : (
        <p className="my-2">
          Results for "<span className="font-semibold">{searchTerm}</span>"
        </p>
      )}

      <div>
        {searchResults.map((result: any, i: number) => (
          <div key={result._id} className="flex flex-col">
            {' '}
            <EpisodeSegment segment={result} segmentNumber={i} />
            <p>{result.episode_number}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={handleLoadMoreClick}
          disabled={loading}
          className="my-4"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </main>
  );
}
