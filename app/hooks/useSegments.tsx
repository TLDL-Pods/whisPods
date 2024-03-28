'use client';

import { useEffect, useState } from 'react';
import { useApp } from './useApp';
import { SegmentProps } from '@/types';

interface HandleShareProps {
  segment: SegmentProps;
  setCopySuccess: (isCopied: boolean) => void;
}

export function useSegments() {
  //-----> App Context
  const { state, setState } = useApp();

  //-----> Toggling Segment Organization
  const toggleOrganization = () => {
    setState((prevState) => ({
      ...prevState,
      segmentsByLength: !prevState.segmentsByLength,
    }));
  };

  //-----> Copying & Sharing Segments
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleShare = ({ segment, setCopySuccess }: HandleShareProps) => {
    const bulletsText = segment.bullets
      .map((bullet) => `- ${bullet}`)
      .join('\n');
    const twitterLinks = segment.URL ? segment.URL.join('\n') : '';

    // Calculate the start time in seconds and append it to the YouTube URL
    const startTimeInSeconds = Math.floor(segment.start_time_ms / 1000);
    const youtubeLinkWithTimestamp = `${state.currentEpisode?.youtube_url}&t=${startTimeInSeconds}s`;

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

  //-----> Toggle Segment Expand
  const handleSegmentToggle = (
    segmentNumber: number,
    segment: SegmentProps,
  ) => {
    if (state.currentSegmentIndex === segmentNumber) {
      setState(() => ({
        ...state,
        currentSegmentIndex: null,
        currentSegment: null,
      }));
    } else {
      setState(() => ({
        ...state,
        currentSegmentIndex: segmentNumber,
        currentSegment: segment,
      }));
    }
  };

  const toggleVideoDrawer = (segment: SegmentProps) => {
    if (!state.isVideoModalOpen) {
      setState(() => ({
        ...state,
        isVideoModalOpen: true,
        currentYouTubeVideo: state.currentEpisode?.youtube_url || '',
        currentSegment: segment,
      }));
    } else {
      setState(() => ({
        ...state,
        isVideoModalOpen: false,
      }));
    }
  };

  return {
    toggleOrganization,
    handleShare,
    copySuccess,
    setCopySuccess,
    handleSegmentToggle,
    toggleVideoDrawer,
  };
}
