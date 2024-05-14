'use client';

import { useState, useEffect } from 'react';
import { SegmentProps } from '@/types';
import TLDL from '@/app/components/tldl/TLDL';
import DateRangePicker from '@/app/components/DateRangePicker';

export default function Page({ params }: any) {
  const decodedSearchTerm = decodeURIComponent(params.searchTerm);

  const [searchResults, setSearchResults] = useState<SegmentProps[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [sortField, setSortField] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');

  const [selectedRange, setSelectedRange] = useState<any>({
    from: undefined,
    to: undefined,
  });

  const handleRangeSelect = (range: any | undefined) => {
    if (range) {
      setSelectedRange(range);
      setSearchResults([]); // Clear existing results
      setPage(0); // Reset to the first page
      loadMore(0, sortField, sortOrder, range.from, range.to); // Fetch with new date range
      console.log(`Fetching with range: ${range.from}, sortOrder: ${range.to}`);
    }
  };

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
    from = selectedRange.from,
    to = selectedRange.to,
  ) => {
    if (loading) return;
    setLoading(true);

    let apiUrl = `/api/search/?searchTerm=${encodeURIComponent(decodedSearchTerm)}&page=${nextPage}&pageSize=10&sortField=${field}&sortOrder=${order}`;
    if (from && to) {
      // Add date filtering to the API endpoint if dates are set
      apiUrl += `&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(`An error occurred: ${response.statusText}`);

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
    <main className="relative flex flex-col items-center px-1 pt-28">
      {loading ? null : (
        <p>
          {totalResults} Results for "
          <span className="font-semibold">{decodedSearchTerm}</span>"
        </p>
      )}
      <div className="flex flex-col">
        <select
          className="mx-auto mt-4 max-w-fit rounded-lg border border-base5 bg-base2 p-1 px-4"
          onChange={handleSortChange}
          value={`${sortField}|${sortOrder}`}
        >
          <option value="score|desc">Sort by Relevance Desc</option>
          <option value="score|asc">Sort by Relevance Asc</option>
          <option value="release_date|desc">Sort by Date Desc</option>
          <option value="release_date|asc">Sort by Date Asc</option>
        </select>
        {/* <DateRangePicker
          selectedRange={selectedRange}
          handleRangeSelect={handleRangeSelect}
        /> */}
      </div>
      <div className="mt-4 flex w-full flex-col overflow-y-clip bg-base lg:w-3/4 lg:gap-8">
        {searchResults.map((result: SegmentProps, i: number) => (
          <div key={result._id} className="flex flex-col ">
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
