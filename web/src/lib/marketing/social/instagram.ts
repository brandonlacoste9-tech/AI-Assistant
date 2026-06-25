export async function postToInstagram(text: string, imageUrl?: string) {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const igAccountId = process.env.IG_ACCOUNT_ID;

  if (!accessToken || !igAccountId) {
    console.warn("Meta API keys not set. Skipping Instagram post.");
    return;
  }

  if (!imageUrl) {
    console.warn("Instagram requires an image URL for feed posts. Skipping.");
    return;
  }

  try {
    const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igAccountId}/media?image_url=${encodeURIComponent(imageUrl)}&caption=${encodeURIComponent(text)}&access_token=${accessToken}`, { method: 'POST' });
    const containerData = await containerRes.json();
    
    if (containerData.id) {
      await fetch(`https://graph.facebook.com/v19.0/${igAccountId}/media_publish?creation_id=${containerData.id}&access_token=${accessToken}`, { method: 'POST' });
      console.log("Posted to Instagram successfully.");
    } else {
      console.error("Instagram container creation failed:", containerData);
    }
  } catch (error) {
    console.error("Failed to post to Instagram:", error);
  }
}
