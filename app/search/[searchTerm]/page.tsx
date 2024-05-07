'use client';

import { useState, useEffect } from 'react';
import { SegmentProps } from '@/types';
import TLDL from '@/app/components/TLDL';

export default function Page({ params }: any) {
  // Decode searchTerm for internal use and display
  const decodedSearchTerm = decodeURIComponent(params.searchTerm);
  const [searchResults, setSearchResults] = useState<SegmentProps[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async (nextPage: number) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `/api/search/?searchTerm=${encodeURIComponent(decodedSearchTerm)}&page=${nextPage}&pageSize=10`,
      );
      if (!response.ok)
        throw new Error(`An error occurred: ${response.statusText}`);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json'))
        throw new Error('Received non-JSON response');

      const { data, totalCount, message } = await response.json();
      console.log('Fetched data:', data); // Debug log

      setTotalResults(totalCount);
      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setSearchResults((prev: SegmentProps[]) => {
          const newData = data.filter(
            (d: SegmentProps) =>
              !prev.some(
                (p: SegmentProps) => p.segment_title === d.segment_title,
              ),
          );
          console.log('New data to add:', newData);
          if (newData.length > 0) {
            const newResultsCount = prev.length + newData.length;
            setHasMore(newResultsCount < totalCount);
            return [...prev, ...newData];
          } else {
            setHasMore(false);
            return prev;
          }
        });
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
  useEffect(() => {
    loadMore(0);
  }, []); // Ensuring loadMore is called only once on component mount

  return (
    <main className="flex flex-col items-center px-1 pt-4">
      {loading ? null : (
        <p>
          {totalResults} Results for "
          <span className="font-semibold">{decodedSearchTerm}</span>"
        </p>
      )}

      <div className="w-full">
        {searchResults.map((result: SegmentProps, i: number) => (
          <div key={result._id} className="flex flex-col py-4 ">
            <TLDL segment={result} />
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLoadMoreClick();
          }}
          disabled={loading}
          className="my-4"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </main>
  );
}
