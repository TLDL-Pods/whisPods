import { EpisodeContext } from "../contexts/dataContext";
import { EpisodeContextType } from "@/types";
import { useContext } from "react";

export function useEpisodeContext(): EpisodeContextType {
  const context = useContext(EpisodeContext);
  if (!context) {
    throw new Error("useEpisodeContext must be used within an EpisodeProvider");
  }
  return context;
}
