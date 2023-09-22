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
      try {
        const res = await fetch(`/api/all-episodes`, {
          cache: "no-store",
        });
        const json = await res.json();
        setData(json["data"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // refetch data
    const id = setInterval(fetchData, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <EpisodeContext.Provider value={{ data, setData }}>
      {children}
    </EpisodeContext.Provider>
  );
};
