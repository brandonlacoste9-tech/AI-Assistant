import { TwitterApi } from 'twitter-api-v2';

export async function postToTwitter(text: string) {
  if (!process.env.TWITTER_API_KEY) {
    console.warn("Twitter API keys not set. Skipping Twitter post.");
    return;
  }

  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  });

  try {
    const rwClient = client.readWrite;
    const tweet = await rwClient.v2.tweet(text);
    console.log("Posted to Twitter:", tweet.data.id);
    return tweet;
  } catch (error) {
    console.error("Failed to post to Twitter:", error);
  }
}
