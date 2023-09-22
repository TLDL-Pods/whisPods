"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import { EpisodeProps } from "@/types";

interface EpisodeContextType {
  data: EpisodeProps[];
  setData: (data: EpisodeProps[]) => void;
}

export const EpisodeContext = createContext<EpisodeContextType | undefined>(
  undefined
);

export const EpisodeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<EpisodeProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // revalidate at most every hour
      const res = await fetch(`/api/all-episodes`, {
        next: { revalidate: 3600 },
      });
      // Query will always force a revalidate
      // const res = await fetch(`/api/all-episodes?${Date.now()}`, {});
      const json = await res.json();
      setData(json["data"]);
    };
    fetchData();

    // refetch data
    const id = setInterval(fetchData, 100000);
    return () => clearInterval(id);
  }, []);

  return (
    <EpisodeContext.Provider value={{ data, setData }}>
      {children}
    </EpisodeContext.Provider>
  );
};
