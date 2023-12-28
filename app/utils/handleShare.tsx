import { SegmentProps } from '@/types';

interface HandleShareProps {
  segment: SegmentProps;
  youtube_url: string;
  setCopySuccess: (isCopied: boolean) => void;
}

export const handleShare = ({
  segment,
  youtube_url,
  setCopySuccess,
}: HandleShareProps) => {
  const bulletsText = segment.bullets.map((bullet) => `- ${bullet}`).join('\n');
  const twitterLinks = segment.URL ? segment.URL.join('\n') : '';

  // Calculate the start time in seconds and append it to the YouTube URL
  const startTimeInSeconds = Math.floor(segment.start_time_ms / 1000);
  const youtubeLinkWithTimestamp = `${youtube_url}&t=${startTimeInSeconds}s`;

  const shareText = `TLDL:\n${bulletsText}\n\nSources:\n${twitterLinks}\n\nYouTube:\n${youtubeLinkWithTimestamp}`;

  navigator.clipboard.writeText(shareText).then(
    () => {
      setCopySuccess(true);
    },
    (err) => {
      console.error('Could not copy text: ', err);
    },
  );
};
