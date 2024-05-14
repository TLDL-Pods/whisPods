export interface SegmentProps {
  URL: string[];
  bullets: string[];
  bullets_ELI5: string[];
  complete_transcript: string;
  end_time_ms: number;
  headline: string;
  headline_ELI5: string;
  segment_length_ms: number;
  segment_number: number;
  start_time_ms: number;
  story: string;
  summary: string;
  summary_ELI5: string;
  timestamp: string;
  segment_title: string;
  tweet_embed?: string[];
  keywords?: string[];
  _id?: string;
  episode_number?: number;
  episode_title?: string;
  release_date?: string;
  score?: number;
  highlights?: string[];
}

export interface EpisodeProps {
  episode_data: SegmentProps[];
  episode_date: number;
  episode_day: number;
  episode_day_of_week: number;
  episode_keywords: string[];
  episode_month: number;
  episode_number: number;
  episode_title: string;
  episode_title_generated: string;
  episode_year: number;
  full_item_url: string;
  item_body: string;
  item_title: string;
  release_date: string;
  youtube_url: string;
  _id: string;
  matchedSegmentNumbers: number[];
}

export interface EpisodeContextType {
  data: EpisodeProps[];
  setData: (data: EpisodeProps[]) => void;
}

export interface AppState {
  isVideoModalOpen: boolean;
  searchResultEpisodes: EpisodeProps[] | null;
  latestEpisodes: EpisodeProps[] | null;
  currentEpisode: EpisodeProps | null;
  currentSegment: SegmentProps | null;
  currentSegmentIndex: number | null;
  segmentsByLength: boolean;
  currentYouTubeVideo: string | null;
  hasSearched: boolean;
  searchTerm: string;
  isMenuModalOpen: boolean;
  scrollYLock: boolean;
}

export interface YouTubePlayerEvent {
  target: {
    playVideo: () => void;
  };
}

// Define the type for each data item
export type DuneDataItem = {
  N: number;
  donor_name: string;
  historical_value: number;
  current_value: number;
  value_percentage_change: number;
  donations: number;
  tx_hashes: string;
};

// Define the type for the entire API response, incorporating the nested structure
export type ApiResponse = {
  status: number;
  message: string;
  data: {
    metadata: {
      column_names: string[];
      datapoint_count: number;
      execution_time_millis: number;
      pending_time_millis: number;
      result_set_bytes: number;
      row_count: number;
      total_result_set_bytes: number;
      total_row_count: number;
    };
    rows: DuneDataItem[];
  };
};
