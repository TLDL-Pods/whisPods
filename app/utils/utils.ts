export const getTweetIdFromUrl = (url: string): string | null => {
  if (url.includes("twitter.com")) {
    return url.split("/").pop() || null;
  }
  return null;
};
