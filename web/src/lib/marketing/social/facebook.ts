export async function postToFacebook(text: string) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !pageAccessToken) {
    console.warn("Facebook API keys not set. Skipping Facebook post.");
    return;
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        access_token: pageAccessToken
      })
    });

    if (response.ok) {
      console.log("Posted to Facebook successfully.");
    } else {
      console.error("Facebook post failed:", await response.text());
    }
  } catch (error) {
    console.error("Failed to post to Facebook:", error);
  }
}
