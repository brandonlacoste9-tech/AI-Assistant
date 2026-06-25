import { NextResponse } from 'next/server';
import { generateMarketingContent } from '@/lib/marketing/generator';
import { postToTwitter } from '@/lib/marketing/social/twitter';
import { postToLinkedIn } from '@/lib/marketing/social/linkedin';
import { postToFacebook } from '@/lib/marketing/social/facebook';
import { postToInstagram } from '@/lib/marketing/social/instagram';

export async function GET(req: Request) {
  // In production, verify the Vercel cron auth header
  const authHeader = req.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log("Starting autonomous marketing cycle...");

    // Generate and post for Twitter
    const twitterContent = await generateMarketingContent('twitter');
    await postToTwitter(twitterContent.text);

    // Generate and post for LinkedIn
    const linkedinContent = await generateMarketingContent('linkedin');
    await postToLinkedIn(linkedinContent.text);

    // Generate and post for Facebook
    const fbContent = await generateMarketingContent('facebook');
    await postToFacebook(fbContent.text);

    // Generate and post for Instagram
    // Note: Instagram requires an image URL. For a fully autonomous bot, you'd integrate DALL-E to generate one.
    // For now, we'll pass a placeholder or let the implementation skip if no image.
    const igContent = await generateMarketingContent('instagram');
    await postToInstagram(igContent.text, "https://justbookme.ca/og-image.png");

    console.log("Autonomous marketing cycle complete.");
    return NextResponse.json({ success: true, message: "Posted to all platforms successfully." });
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: "Failed to run marketing cycle." }, { status: 500 });
  }
}
