export const getTweetIdFromUrl = (url: string): string | null => {
  if (url.includes("twitter.com")) {
    // Decode URL to handle any encoded characters
    const decodedUrl = decodeURIComponent(url);

    // Remove any query parameters
    const urlWithoutQuery = decodedUrl.split('?')[0];

    // Extract the potential tweet ID
    const potentialTweetId = urlWithoutQuery.split('/').pop();

    // Check if the extracted ID is a numeric string
    if (potentialTweetId && /^\d+$/.test(potentialTweetId)) {
      return potentialTweetId;
    }
  }
  return null;
};
