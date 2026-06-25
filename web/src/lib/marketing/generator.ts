import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MARKETING_ANGLES = [
  "How much money are you losing to missed calls?",
  "Customer success story (Local Bakery)",
  "The future of salons: AI booking",
  "Stop paying $15/hr for a receptionist to just answer the phone.",
  "Your business should run 24/7. Now it can.",
];

export async function generateMarketingContent(platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook'): Promise<{ text: string }> {
  const angle = MARKETING_ANGLES[Math.floor(Math.random() * MARKETING_ANGLES.length)];
  
  let systemPrompt = `You are the lead marketer for JustBookMe, an AI phone receptionist startup. 
We provide AI voice agents for local businesses (salons, bakeries, medical clinics, barbershops).
Write an engaging, high-converting social media post based on this angle: "${angle}".
End with a call to action to visit justbookme.ca.`;

  if (platform === 'twitter') {
    systemPrompt += `\nKeep it under 280 characters. Punchy, viral style. No hashtags.`;
  } else if (platform === 'linkedin') {
    systemPrompt += `\nProfessional, narrative-driven. Use spacing. Talk about ROI and business operations. 3-4 short paragraphs.`;
  } else if (platform === 'instagram') {
    systemPrompt += `\nHighly visual, use emojis. Add 5-7 relevant hashtags at the bottom.`;
  } else if (platform === 'facebook') {
    systemPrompt += `\nConversational and community-focused. Ask a question to drive engagement.`;
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate today's ${platform} post.` }
    ],
    temperature: 0.7,
  });

  return { text: response.choices[0].message.content || 'Failed to generate content.' };
}
