import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface TweetEmbedProps {
  url: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ url }) => {
  const isTwitterUrl = url.includes("twitter.com");
  const tweetId = isTwitterUrl ? url.split("/").pop() : null;

  return (
    <div>
      {isTwitterUrl && tweetId ? (
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
