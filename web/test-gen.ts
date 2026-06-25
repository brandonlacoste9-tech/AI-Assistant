import { generateMarketingContent } from "./src/lib/marketing/generator.ts";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  console.log("Testing generation for Twitter...");
  const tw = await generateMarketingContent('twitter');
  console.log(tw.text);

  console.log("\nTesting generation for LinkedIn...");
  const li = await generateMarketingContent('linkedin');
  console.log(li.text);
}

test();
