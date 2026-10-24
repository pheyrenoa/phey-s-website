import type { SiteContent } from "@/lib/types";

export const site: SiteContent = {
  name: "Phey Rashidova",
  description:
    "A scrapbook of Phey Rashidova: Uzbekistan to Duke, dance, baking, side quests, keepsakes, and the work she's building.",
  // Order here is the page order. Labels must stay exactly as written.
  sections: [
    { id: "who", label: "Who is Phey?" },
    { id: "up-to", label: "What's Phey's up to..." },
    { id: "loves", label: "What Phey loves" },
    { id: "hire", label: "Why hire Phey?" },
  ],
};

/**
 * Public URL used for metadata, the sitemap, and robots.txt.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain.
 */
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
