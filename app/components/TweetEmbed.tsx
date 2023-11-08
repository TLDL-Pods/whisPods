import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { getTweetIdFromUrl } from "@/app/utils/utils";

interface TweetEmbedProps {
  url: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ url }) => {
  const tweetId = getTweetIdFromUrl(url);

  return (
    <div>
      {tweetId ? (
        <TwitterTweetEmbed tweetId={tweetId} options={{ theme: "dark" }} />
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      )}
    </div>
  );
};

export default TweetEmbed;
