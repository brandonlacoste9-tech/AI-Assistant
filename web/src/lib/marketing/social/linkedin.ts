export async function postToLinkedIn(text: string) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN; 

  if (!accessToken || !personUrn) {
    console.warn("LinkedIn API keys not set. Skipping LinkedIn post.");
    return;
  }

  try {
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        author: personUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text },
            shareMediaCategory: "NONE"
          }
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
      })
    });

    if (response.ok) {
      console.log("Posted to LinkedIn successfully.");
    } else {
      console.error("LinkedIn post failed:", await response.text());
    }
  } catch (error) {
    console.error("Failed to post to LinkedIn:", error);
  }
}
