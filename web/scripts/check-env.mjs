#!/usr/bin/env node
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  for (const line of readFileSync(join(__dirname, "../.env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
} catch {
  // .env.local optional for CI; Next.js loads it at build time
}

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_SITE_URL",
];

const optional = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
];

let missing = 0;

console.log("RendezVous AI — environment check\n");

for (const key of required) {
  const ok = Boolean(process.env[key]?.trim());
  console.log(`${ok ? "✓" : "✗"} ${key}${ok ? "" : " (required for production)"}`);
  if (!ok) missing++;
}

console.log("\nOptional (Phase 1):");
for (const key of optional) {
  const ok = Boolean(process.env[key]?.trim());
  console.log(`${ok ? "✓" : "○"} ${key}`);
}

if (missing > 0) {
  console.log(`\n${missing} required variable(s) missing. Copy web/.env.local.example → web/.env.local`);
  process.exit(1);
}

console.log("\nAll required variables set.");
process.exit(0);