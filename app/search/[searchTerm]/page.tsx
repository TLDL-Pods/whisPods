'use client';

import { useState, useEffect } from 'react';
import { SegmentProps } from '@/types';
import TLDL from '@/app/components/TLDL';

export default function Page({ params }: any) {
  const decodedSearchTerm = decodeURIComponent(params.searchTerm);

  const [searchResults, setSearchResults] = useState<SegmentProps[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [sortField, setSortField] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split('|');
    setSortField(field);
    setSortOrder(order);
    setSearchResults([]);
    setPage(0);
    loadMore(0, field, order); // Pass field and order directly
    console.log(`Fetching with sortField: ${field}, sortOrder: ${order}`);
  };

  const loadMore = async (
    nextPage: number,
    field = sortField,
    order = sortOrder,
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `/api/search/?searchTerm=${encodeURIComponent(decodedSearchTerm)}&page=${nextPage}&pageSize=10&sortField=${field}&sortOrder=${order}`,
      );
      if (!response.ok)
        throw new Error(`An error occurred: ${response.statusText}`);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json'))
        throw new Error('Received non-JSON response');

      const { data, totalCount } = await response.json();

      setTotalResults(totalCount);
      setSearchResults((prev) => {
        const newResults = [...prev, ...data];
        setHasMore(newResults.length < totalCount);
        return newResults;
      });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreClick = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMore(nextPage);
  };

  useEffect(() => {
    loadMore(0);
  }, []);

  return (
    <main className="flex flex-col items-center px-1 pt-4">
      {loading ? null : (
        <p>
          {totalResults} Results for "
          <span className="font-semibold">{decodedSearchTerm}</span>"
        </p>
      )}

      <select
        className="mt-4 rounded-lg border border-base5 bg-base2 p-1"
        onChange={handleSortChange}
        value={`${sortField}|${sortOrder}`}
      >
        <option value="score|desc">Sort by Relevance Desc</option>
        <option value="score|asc">Sort by Relevance Asc</option>
        <option value="release_date|desc">Sort by Date Desc</option>
        <option value="release_date|asc">Sort by Date Asc</option>
      </select>

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
