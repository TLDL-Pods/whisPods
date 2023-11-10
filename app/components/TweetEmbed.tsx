import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { getTweetIdFromUrl } from "@/app/utils/utils";

interface TweetEmbedProps {
  url: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ url }) => {
  const tweetId = getTweetIdFromUrl(url);

  return (
    <div className="flex justify-center w-full">
      <div className="inline-block w-full  max-w-[300px] md:max-w-[400px] lg:max-w-[560px]">
        {tweetId ? (
          <TwitterTweetEmbed tweetId={tweetId} options={{ theme: "dark" }} />
        ) : (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        )}
      </div>
    </div>
  );
};

export default TweetEmbed;
