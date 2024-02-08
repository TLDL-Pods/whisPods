import { SegmentProps } from '@/types';

export const fetchEpisodeDataUtil = async (ep_number: string) => {
  console.log('ep_number', ep_number);
  //   const episodeNumber = parseInt(ep_number, 10);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/episode?episode_number=${ep_number}`);

  const json = await res.json();

  const filteredSegments = json['data'].episode_data.filter(
    (segment: SegmentProps) => segment.segment_number !== 0
  );
  const sortedData: SegmentProps[] = {
    ...json['data'],
    episode_data: filteredSegments.sort(
      (a: SegmentProps, b: SegmentProps) =>
        b.segment_length_ms - a.segment_length_ms
    ),
  };
  return sortedData;
};
