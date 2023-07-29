export interface SegmentProps {
  segment_number: number;
  complete_transcript: string;
  timestamp: string;
  story: string;
  URL: string;
  start_time_ms: number;
  end_time_ms: number;
  headline: string;
  headline_ELI5: string;
  summary: string;
  summary_ELI5: string;
  bullets: string[];
  bullets_ELI5: string[];
}

export interface EpisodeProps {
  item_title: string;
  release_date: string;
  full_item_url: string;
  item_body: string;
  episode_title: string;
  episode_number: number;
  episode_date: number;
  episode_year: number;
  episode_month: number;
  episode_day: number;
  episode_day_of_week: number;
  episode_data: SegmentProps[];
}
