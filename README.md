# Phey Rashidova: a digital scrapbook

A personal website built like a photo album: four "pages" (Who is Phey?, What's Phey's up to..., What Phey loves, Why hire Phey?) with Polaroids, tape, sticky notes, a keepsake drawer, and a Recruiter Mode that turns page 4 into a plain résumé.

Built with Next.js (App Router), TypeScript (strict), Tailwind CSS v4, Framer Motion, and lucide-react.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # type check
npm run build      # production build (what Vercel runs)
npm run start      # serve the production build
```

## Where things live

Everything you'll want to edit is in `src/content/`. Components never hold content, so you shouldn't have to touch `src/components/`.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Your name, the site description, and the four nav labels (in page order) |
| `src/content/about.ts` | Page 1: intro paragraphs, sticky notes, the "Knowledge is meant to be shared" note, hobby doodles |
| `src/content/adventures.ts` | Page 2: current chapters, the Blowing Rock spread, and the postcard adventures |
| `src/content/loves.ts` | Page 3: hobby categories, the 0.5x / empty-plate clusters, and the keepsake drawer |
| `src/content/resume.ts` | Page 4: the résumé (verbatim from the PDF) plus the Personal View intros |
| `src/content/photos.ts` | Every photo on the site |

### Add a photo

1. Put the file in the matching folder under `public/images/` (`about`, `adventures`, `dance`, `food`, `loves`, `keepsakes`, `professional`). Each folder has a `README.txt`.
2. In `src/content/photos.ts`, find the photo's `id` and set `src`, for example `src: "/images/about/uzbekistan.jpg"`.
3. Update `alt` so it describes what's actually in the photo.

That's it. While `src` is `null`, the slot shows a styled "add photo here" placeholder. The comment at the top of `photos.ts` has a worked example.

### Edit a caption or date

- Polaroid captions: the `caption` field in `photos.ts`.
- Adventure postcards: `caption`, `date`, and `location` in `adventures.ts`. Anything left as `null` shows a visible `TODO` on the page so you can spot what's missing.

### Add a keepsake

In `src/content/loves.ts`, copy an entry in `drawer.keepsakes` and change it:

```ts
{
  id: "ticket-louvre",          // unique
  kind: "ticket",               // picks the drawing: wrapper, ticket, map, note, sticker, postcard, stone, other
  label: "Museum ticket",
  caption: "A short caption",
  origin: "Where it came from", // null hides this line
  story: "The little story.",   // null shows "Story coming soon."
  isPlaceholder: false,         // false removes the "sample" stamp
}
```

To show a real photo instead of the drawing, add the photo to `photos.ts` (with `section: "keepsakes"`) and set `photoId` on the keepsake.

All seven keepsakes in the drawer right now are samples. Replace them, or delete the ones you don't want.

### Update the résumé

1. Replace `public/resume/Phey-Rashidova-Resume.pdf` with the new PDF (keep the file name). The "Download résumé (PDF)" button only appears when this file exists at build time.
2. Update `src/content/resume.ts` to match the PDF **word for word**. Recruiter Mode shows it exactly as written.
3. For Personal View, `personalExperience` in the same file holds a short intro per role and which bullets to highlight (by index into that role's `bullets`).

Notes:
- The phone number is in the data but hidden on the site (`publishPhone: false`) so scrapers can't pick it up. Set it to `true` to show it.
- The current résumé has no Projects section, so Recruiter Mode skips it. Add entries to `projects` and it appears.

### Recruiter Mode links

`/?view=recruiter` opens page 4 in Recruiter Mode, which is handy to send to recruiters. The last choice is also remembered in the browser. Printing the page (or using the Print button) always prints the clean résumé, on two pages.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project**, import the repo, and accept the defaults (Framework: Next.js). No environment variables are required.
3. Optional: once you have a custom domain, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://pheyrashidova.com`) so share previews, the sitemap, and robots.txt use it. Without it, the Vercel production URL is used.

## Notes on structure and dependencies

- The layout follows the folder plan from `BUILD_PROMPT.md`, with three additions:
  - `src/components/sections/` holds one component per album page, which keeps `app/page.tsx` short.
  - `public/images/loves/` (and the `"loves"` photo section) holds exploring, creative, and 0.5x photos, which didn't fit the other folders.
  - `src/assets/og-fonts/` holds TTF copies of Instrument Serif, Caveat, and DM Sans (SIL Open Font License). The share-image generator (`next/og`) can't read the web-font files `next/font` uses.
- Tailwind v4 is configured in CSS, not in a `tailwind.config` file. The palette (`paper`, `paper-light`, `sage`, `forest`, `terracotta`, `brown`, `ink`) and the `font-serif` / `font-sans` / `font-hand` families are defined in the `@theme` block of `src/app/globals.css`.
- No dependencies were added beyond the ones in the brief (Next.js, React, Tailwind, Framer Motion, lucide-react).
- Contrast: `brown` text on the cream `paper` background is 4.17:1, below WCAG AA for small text. Small text on `paper` therefore uses `ink`, and `brown` is used for small text only on the lighter `paper-light` cards (4.62:1).
- `AGENTS.md` was generated by `create-next-app` and is rewritten by `next dev`. It's guidance for AI coding tools and doesn't affect the site.
