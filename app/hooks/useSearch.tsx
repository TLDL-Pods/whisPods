'use client';

import { useApp } from './useApp';

export function useSearch() {
  const { state, setState } = useApp();

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>): void {
      const later = () => {
        timeout = null;
        func(...args);
      };

      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  }

  const performSearch = async (term: string) => {
    try {
      const response = await fetch(`/api/search/${encodeURIComponent(term)}`);
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setState(() => ({
          ...state,
          searchResultEpisodes: data.data,
        }));
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const clearSearchResults = () => {
    setState(() => ({
      ...state,
      searchResultEpisodes: [],
    }));
    setState(() => ({
      ...state,
      hasSearched: false,
    }));
  };

  return { performSearch, clearSearchResults, debounce };
}
