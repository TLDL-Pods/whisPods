import React, { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { getTweetIdFromUrl } from '@/app/utils/utils';
import { useSegments } from '../hooks/useSegments';

interface TweetEmbedProps {
  url: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ url }) => {
  const { isTweetLoaded, setIsTweetLoaded } = useSegments();
  const tweetId = getTweetIdFromUrl(url);

  useEffect(() => {
    // If there's no tweetId, set isTweetLoaded to true
    if (!tweetId) {
      setIsTweetLoaded(true);
    }
  }, [tweetId, setIsTweetLoaded]);

  return (
    <div className="mt-4 flex w-full justify-center">
      <div className="inline-block w-full max-w-[300px] md:max-w-[400px] lg:max-w-[560px]">
        {tweetId ? (
          <TwitterTweetEmbed
            tweetId={tweetId}
            options={{ theme: 'dark' }}
            onLoad={() => setIsTweetLoaded(true)}
          />
        ) : (
          isTweetLoaded && (
            <a
              className="h-fit"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default TweetEmbed;
