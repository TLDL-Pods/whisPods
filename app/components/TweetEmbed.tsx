import React, { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { getTweetIdFromUrl } from '@/app/utils/utils';

interface TweetEmbedProps {
  url: string;
  isTweetLoaded: boolean;
  setIsTweetLoaded: (isTweetLoaded: boolean) => void;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({
  url,
  isTweetLoaded,
  setIsTweetLoaded,
}) => {
  const tweetId = getTweetIdFromUrl(url);

  useEffect(() => {
    // If there's no tweetId, set isTweetLoaded to true
    if (!tweetId) {
      setIsTweetLoaded(true);
    }
  }, [tweetId, setIsTweetLoaded]);

  return (
    <div className="flex justify-center w-full mt-4">
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
