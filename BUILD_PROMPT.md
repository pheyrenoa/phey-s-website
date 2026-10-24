# Build Prompt: Phey Rashidova — Interactive Digital Scrapbook Website

> **For Claude Code.** Read this entire file before writing any code. Build the complete site end to end. Do not stop at a plan, wireframe, or landing page. Work through the phases in Section 14 in order and verify each one before moving on.

---

## 0. Ground rules (read first)

These rules override everything else in this file.

1. **Never invent personal facts.** Use only the personal details, stories, and résumé content provided here or in the résumé file. If something is missing (a date, a location, a keepsake's origin, a project screenshot), use a clearly labeled placeholder like `TODO: add date` rather than guessing.
2. **No external imagery.** No stock photos, AI-generated images, or images fetched from the internet. Every personal photo slot is a styled placeholder until I add real photos.
3. **The résumé is the source of truth** for anything professional. Preserve its exact wording, titles, dates, and metrics. Do not rephrase bullet points in Recruiter Mode.
4. **Content lives in data files, not components.** I must be able to add a photo or edit a caption without touching component code.
5. **No dead UI.** Every button, link, and toggle must do something. If a feature depends on content I haven't provided (e.g., a résumé PDF), hide or disable it gracefully with a visible note rather than leaving a broken control.
6. **Ask before guessing on blockers.** If the résumé file is missing, stop and tell me exactly where to put it. Continue building everything else in the meantime.

---

## 1. Inspect the project first

- List the current directory and read any existing files (`package.json`, `README.md`, config files, `app/`, `src/`, `public/`).
- If the project already has code, summarize what exists and don't overwrite working functionality without understanding it.
- If the directory is empty, initialize a new project:
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
  ```
- Look for my résumé PDF. Expected location: `public/resume/Phey-Rashidova-Resume.pdf`. Also check the project root and any `docs/` or `assets/` folders. If found, read it and extract its full text into the résumé data file (see Section 9). If not found, tell me to place it at that path.

---

## 2. Tech stack

- **Next.js** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **Framer Motion** for animation (use `useReducedMotion` everywhere motion is applied)
- **lucide-react** for icons
- **next/font/google** for fonts (no `<link>` tags to Google Fonts)
- **next/image** for all real photos
- No other dependencies unless clearly necessary. Justify any additions in a short comment in `README.md`.
- Must deploy to **Vercel** with zero extra configuration: `npm run build` must pass with no type errors and no lint errors.

---

## 3. Folder structure

Use this structure (adjust only if you have a clearly better reason, and explain it in the README):

```
src/
  app/
    layout.tsx          # fonts, metadata, global providers
    page.tsx            # renders all four scrapbook sections in order
    globals.css         # Tailwind layers, paper textures, CSS variables
  components/
    layout/             # Navbar, PageNavigation, ProgressIndicator
    scrapbook/          # ScrapbookPage, SectionHeading, HandwrittenNote, Tape, PaperClip, DateStamp, Doodle
    photos/             # Polaroid, PhotoPlaceholder, PhotoLightbox
    adventures/         # AdventureEntry, FeaturedAdventure
    keepsakes/          # KeepsakeDrawer, KeepsakeItem
    professional/       # RecruiterModeToggle, PersonalExperienceView, ResumeView
  content/
    site.ts             # name, intro text, nav labels, section order
    about.ts            # "Who is Phey?" content
    adventures.ts       # current chapters + adventure entries
    loves.ts            # hobbies, keepsakes, recurring motifs
    resume.ts           # résumé data extracted VERBATIM from the PDF
    photos.ts           # central photo registry (see Section 10)
  lib/
    types.ts            # shared TypeScript types for all content
    rotation.ts         # deterministic rotation helper
public/
  images/
    about/
    adventures/
    dance/
    food/
    keepsakes/
    professional/
  resume/
    Phey-Rashidova-Resume.pdf
```

Add a `.gitkeep` and a short `README.txt` in each `public/images/*` folder explaining what goes there.

---

## 4. Visual direction

**Theme:** a nostalgic, analog scrapbook / Polaroid photo album / travel journal, brought to life with editorial typography and restrained animation. It should feel like opening someone's personal diary: warm, playful, full of little details, but curated and polished, not a messy collage and not childish.

This is **not** a traditional portfolio. No conventional hero section, no corporate headline, no skill-badge grid on the first screen.

### Color tokens

Define these as CSS variables in `globals.css` and as named colors in the Tailwind config. Use only these colors (plus transparency variants of them).

| Token        | Hex       | Use                                  |
|--------------|-----------|--------------------------------------|
| `paper`      | `#F2EBDD` | Page background (cream)              |
| `paper-light`| `#FAF7F0` | Cards, Polaroid frames, notes        |
| `sage`       | `#A3AA91` | Tape, soft accents, placeholders     |
| `forest`     | `#455646` | Headings, active nav, links          |
| `terracotta` | `#B9785C` | Highlights, stamps, handwritten arrows |
| `brown`      | `#806D59` | Secondary text, captions, borders    |
| `ink`        | `#37342F` | Body text                            |

No bright colors, no gradients beyond subtle paper shading, no generic startup styling. Check contrast: body text and nav labels must meet WCAG AA against their backgrounds (verify `brown` on `paper` for small text; darken usage to `ink` if it fails).

### Typography (via `next/font/google`)

- **Instrument Serif** — large headings, section titles, the name
- **DM Sans** — body text, résumé, UI labels
- **Caveat** — handwritten annotations, captions, dates, sticky notes

Expose them as Tailwind font families: `font-serif`, `font-sans`, `font-hand`. Typography should feel editorial and intentional: generous heading sizes, tight leading on display text, comfortable line length (~65ch max) for body copy.

### Scrapbook elements (build as small reusable components)

- Polaroid frames with thick bottom margins and slight rotations
- Paper texture and subtle grain (CSS/SVG noise overlay, very low opacity, no image downloads)
- Masking tape strips (semi-transparent sage/terracotta with torn edges via `clip-path`)
- Paper clips (inline SVG)
- Handwritten arrows and doodles (inline SVG, stroke in terracotta or brown)
- Date stamps and location labels (rubber-stamp style; render `TODO` text if unknown)
- Ticket stubs, postcards, sticky notes, layered paper cards
- Soft, realistic shadows (layered `box-shadow`, not one heavy blur)

Rules: vary layouts between sections, avoid rounded cards everywhere (paper has mostly square corners), avoid large empty gaps, make photos the main visual focus, keep captions short.

---

## 5. Navigation and page structure

### Top navigation (sticky)

Four links, always visible at the very top while scrolling. Use these **exact** labels and punctuation:

1. `Who is Phey?`
2. `What's Phey's up to...`
3. `What Phey loves`
4. `Why hire Phey?`

- Style them as scrapbook elements (e.g., paper tabs, labeled tape strips, or index-card dividers), not a generic navbar.
- Highlight the active section based on scroll position (use `IntersectionObserver`).
- Each link targets a section ID: `#who`, `#up-to`, `#loves`, `#hire`. Deep links like `/#loves` must work on page load.
- **Desktop:** all four visible in one row.
- **Mobile:** a single horizontally scrollable row with no wrapping; keep header height small (≤ 64px).
- Keyboard accessible with visible focus styles.

### Photo-album page flipping

Each section is a "page" in the album. At the bottom of every section, include:

- **Previous / Next arrows** that move through sections in order (no previous on page 1, no next on page 4, or loop disabled with a clear end state)
- **Page number** in handwritten style, e.g. `page 2 of 4`
- A subtle **progress indicator** (e.g., a thin bookmark ribbon or row of four dots) reflecting the current section

Both navigation methods (top links and prev/next) must work together and stay in sync. Use smooth scrolling and a subtle page-turn transition (fade/slide, ≤ 400ms). Respect `prefers-reduced-motion` by disabling transitions and using instant scroll.

---

## 6. Section 1 — "Who is Phey?" (`#who`, page 1)

The site opens directly into this page. It establishes the scrapbook aesthetic immediately.

Include:
- Name: **Phey Rashidova**
- A short, personal introduction (written from the content below, casual and warm)
- A prominent photo collage area with several Polaroid placeholders
- Handwritten notes and captions
- Page number and next-page arrow

### Content to use (do not add to it)

- Born in Uzbekistan; moved to the United States during junior high school. It was a huge change that shaped her into a different, stronger person.
- That experience taught her that taking risks doesn't automatically mean something bad will happen, and that she doesn't need to know every detail before starting something.
- A jack of all trades: dances, bakes, cooks, hikes, and enjoys trying new things, especially with the people she loves.
- A core value is teaching: she loves sharing what she knows regardless of the job, helping others learn skills, understand concepts, and discover they can do things they didn't think they could.
- Key message: **"Knowledge is meant to be shared."** Present it naturally (e.g., a handwritten note pinned to the page), not as a formal mission statement.

Write the visible copy in first person ("I was born in Uzbekistan...").

### Suggested visual elements
- Polaroid placeholder for Uzbekistan
- Polaroid placeholder for moving to the US
- Sticky notes about taking risks and not needing every detail first
- Small illustrated hobby objects (inline SVG doodles: dance shoe, whisk, mountain, etc.)
- Handwritten "knowledge is meant to be shared" note with an arrow

---

## 7. Section 2 — "What's Phey's up to..." (`#up-to`, page 2)

Organize as dated diary entries, scrapbook spreads, and small updates. Leave dates as `TODO` placeholders wherever not given.

### Current chapters

**Duke University**
- Studying Computer Science and Statistics
- Concentration: AI and Data Science *(Claude Code: cross-check this wording against the résumé and use the résumé's wording if it differs)*
- Campus organizations: Catalyst Tech Org, Product Space, Scale & Coin, DefMo Dance Team
- DefMo Dance Team Treasurer

**Building things**
- Two summers as a Software Development Engineer Intern at Amazon
- Currently a Founding Engineer at WRAPT
- A link/button that jumps to "Why hire Phey?" for details

**Dance and campus life**
- Dance performances and campus activities
- Making time for dance alongside school and work

**Side quests**
- Spontaneous weekend trips
- Hiking and exploring new places
- Finding random spots, restaurants, rooftops, and benches
- Documenting everything with photos

### Featured adventure: "The Bridge We Never Saw"

Feature this prominently: a larger two-page spread with multiple Polaroids, tape, and annotations. Tone: funny, casual, authentic. Not a polished travel blog.

Facts (use only these):
1. Drove three hours from Durham to Blowing Rock for what was supposed to be a one-mile hike.
2. Took a detour because they thought they had plenty of time and energy. The hike ended up much longer than expected.
3. It started pouring rain. They got lost trying to find a barn to escape the rain. By the time they found it, the rain had stopped.
4. Back at the car, they found a random souvenir shop and bought new clothes. They now own merch from a random town.
5. At dinner, the restaurant wouldn't seat a party of four but would seat six, so they joined two elderly couples and ate together.
6. Drove three hours home.
7. There was a plan to visit the swinging bridge, but they never made it because it got too dark.

**Important:** the hike and the swinging bridge were separate activities. They did **not** visit the swinging bridge. Do not write anything implying they did.

Handwritten annotations to include:
- "It was supposed to be ONE mile."
- "Why did we think we had so much time?"
- "At least we got merch."
- "Swinging bridge: unfinished side quest."

A timeline layout (numbered stops along a dashed doodled path) works well here.

### Other adventure entries

Each gets its own entry with its own photo placeholders and a short caption. Do not invent dates, locations, or details beyond the title.

- Thanksgiving break in Boston
- Hiking in Seattle
- Visiting the westernmost point of the United States
- My first HOCO dance performance
- Skydiving and doing a backflip out of a plane

Captions for these should be short and clearly marked as editable (e.g., `TODO: add your caption` styled as a faint pencil note), or a neutral one-liner that restates only the title.

---

## 8. Section 3 — "What Phey loves" (`#loves`, page 3)

A visual collection of hobbies, interests, and small joys.

### Categories

- **Dance** — an important part of her life; dance photos and performance memories (placeholders)
- **Food** — baking and cooking; trying new food spots; meals with friends; humorous detail: she often enjoys her friends cooking, eating the food, and then washing the dishes
- **Exploring** — hiking, random day trips, discovering new places, finding interesting little spots
- **Creative things** — arts and crafts, Pinterest boards, making things, trying random new hobbies

### Recurring motifs (small labeled photo clusters)
- **"The 0.5x archive"** — funny wide-angle photos
- **"Evidence of a good meal"** — photos of empty plates
- Polaroids, random snapshots, and small handwritten notes

### Interactive feature: "Things I Couldn't Throw Away"

A digital keepsake drawer. Intro line (based on what I said): I collect small physical objects because they remind me of places I've visited and people I've spent time with.

- Render as a drawer/tray (wooden or paper-lined box) containing small keepsake items.
- Clicking (or pressing Enter/Space on) an item flips it over or opens a detail card showing: the object, a short caption, where it came from (if known), and a little story.
- Seed it with **placeholder** items based on the object types I listed: chocolate wrappers someone gave me, museum tickets, zoo maps, little notes, stickers, postcards, stones.
- Every seeded item must be visibly marked as a placeholder (e.g., a small "sample" stamp) with `origin: null` and `story: null`, which render as "Story coming soon." **Do not invent origins or stories.**
- Draw each keepsake type as an inline SVG illustration so the drawer looks good before real photos exist. If a keepsake has a real photo in `photos.ts`, show the photo instead.
- Data lives in `content/loves.ts` with this shape:

```ts
type Keepsake = {
  id: string;
  kind: "wrapper" | "ticket" | "map" | "note" | "sticker" | "postcard" | "stone" | "other";
  label: string;            // e.g. "Chocolate wrapper"
  caption: string | null;
  origin: string | null;    // where it came from; null = unknown
  story: string | null;     // null = "Story coming soon."
  photoId?: string;         // optional key into photos.ts
  isPlaceholder: boolean;
};
```

---

## 9. Section 4 — "Why hire Phey?" (`#hire`, page 4)

Balances the scrapbook aesthetic with professional credibility.

### Toggle: `Personal View | Recruiter Mode`

- Clearly visible at the top of the section, styled as a two-position paper switch or tab pair.
- Implemented as an accessible toggle (`role="radiogroup"` with two radios, or a `button` with `aria-pressed`). Keyboard operable.
- Default: **Personal View**.
- Sync the mode to the URL (`?view=recruiter`) so I can send recruiters a direct link that opens Recruiter Mode. Optionally remember the choice in `localStorage` (wrap in try/catch).

### Personal View
Scrapbook-style experience entries (like pinned work badges or ticket stubs), each with:
- Company, role, dates, location (from the résumé)
- A short introduction
- Project screenshot/photo placeholders (`public/images/professional/`)
- 2–3 meaningful accomplishments taken from the résumé bullets (verbatim or lightly trimmed, never with altered facts or metrics)

### Recruiter Mode
A clean, traditional, minimal résumé layout: high contrast, DM Sans, easy to scan, no rotations, no tape, minimal decoration. It should still sit on the paper background so the transition feels intentional.

Sections: Education, Experience, Projects, Skills, Campus Involvement, Contact.

- Build `content/resume.ts` by extracting the résumé PDF text **verbatim**. Keep exact titles, dates, bullet wording, and metrics.
- Include a **Download résumé (PDF)** button linking to `/resume/Phey-Rashidova-Resume.pdf`. Only render it if the file exists at build time (check with `fs` in a server component); otherwise hide it.
- Add `@media print` styles so Recruiter Mode prints cleanly on one or two pages.
- Contact info comes only from the résumé. If an item (email, LinkedIn, GitHub) isn't on the résumé, leave a `TODO` in the data file and don't render an empty link.

**If the résumé PDF isn't available:** stop working on this subsection, tell me to place it at `public/resume/Phey-Rashidova-Resume.pdf`, build Recruiter Mode against a typed empty structure that renders "Résumé coming soon," and continue with everything else.

---

## 10. Photo handling (very important)

I'll add my own photos later. Until then, every photo slot is a styled placeholder.

### Central registry: `src/content/photos.ts`

```ts
type Photo = {
  id: string;                      // e.g. "about-uzbekistan"
  src: string | null;              // e.g. "/images/about/uzbekistan.jpg"; null = placeholder
  alt: string;                     // descriptive alt text for when the photo exists
  aspect: "square" | "portrait" | "landscape" | "polaroid";
  caption?: string;                // handwritten caption
  section: "about" | "adventures" | "dance" | "food" | "keepsakes" | "professional";
  placeholderHint: string;         // e.g. "A photo from Uzbekistan"
};
```

- Components reference photos **only** by `id`. To add a real photo, I drop the file in the right folder and set `src` in `photos.ts`. No component edits needed.
- When `src` is `null`, render `PhotoPlaceholder`: paper-toned fill (sage/paper-light), faint grain, a small camera or pencil doodle, the hint text in Caveat, and a tiny "add photo here" label. It must keep the correct aspect ratio and look intentional, not broken.
- When `src` is set, render with `next/image` (`sizes` set appropriately, `placeholder="empty"` unless a blur is available).
- Add a comment block at the top of `photos.ts` explaining exactly how to add a photo, with one worked example.

---

## 11. Interactions and animations

Keep motion subtle and fast. Nothing should make the site feel slow.

**Polaroids**
- Slight rotation (±1° to ±4°), generated **deterministically** from the photo `id` (seeded hash in `lib/rotation.ts`) so server and client render identically. Never use `Math.random()` during render (it causes hydration mismatches).
- Hover: lift slightly and straighten a bit.
- Click/Enter: open `PhotoLightbox` (large photo or placeholder, caption, annotation). Close with Esc, the close button, or clicking the backdrop. Trap focus inside while open; return focus to the trigger on close; lock body scroll.

**Scrapbook**
- Clickable postcards that flip to show the back
- Keepsakes that flip to reveal stories
- Subtle tape/paper hover effects
- Handwritten arrows and annotations (optionally draw-on animation via SVG stroke on first view)

**Transitions**
- Smooth section scrolling
- Small fade/slide-in on entering the viewport (once per element)
- Page-turn feel between sections on prev/next

**Reduced motion:** when `prefers-reduced-motion: reduce` is set, disable rotations-on-hover, flips become instant swaps, no draw-on, instant scroll.

All interactions must work with mouse, touch, and keyboard.

---

## 12. Accessibility, responsiveness, and quality

- Semantic HTML: `header`, `nav`, `main`, one `section` per page with an `h2`, a single `h1` (the name).
- Skip-to-content link.
- Visible focus rings that match the palette.
- All interactive elements are real `button`s or `a`s with accessible names.
- Placeholder images use `alt=""` with `aria-hidden` on decorative doodles; real photos use their `alt` from `photos.ts`.
- Decorative SVGs (tape, clips, doodles) are `aria-hidden="true"`.
- Contrast meets WCAG AA.
- Breakpoints: mobile (≥ 360px), tablet, desktop. On mobile, collage layouts collapse into a clean single or two-column stack with reduced rotations. No horizontal page scrolling except the nav row.
- Test at 360px, 768px, 1024px, and 1440px widths.

---

## 13. Metadata and SEO

- `metadata` in `layout.tsx`: title "Phey Rashidova", a short description in the scrapbook voice, Open Graph and Twitter card tags.
- Generate an OG image with `next/og` (`app/opengraph-image.tsx`) using the palette and fonts. No photos.
- An emoji or simple SVG favicon in the palette.
- `robots.ts` and `sitemap.ts`.
- `lang="en"` on `<html>`.

---

## 14. Build phases (follow in order)

1. **Inspect** the project and locate the résumé (Section 1). Report what you found.
2. **Scaffold** the project, install dependencies, set up fonts, Tailwind tokens, and folder structure.
3. **Content layer:** write `lib/types.ts` and all `content/*.ts` files. Extract the résumé verbatim.
4. **Design system:** paper textures, tape, clips, stamps, notes, doodles, `Polaroid`, `PhotoPlaceholder`, `SectionHeading`.
5. **Navigation:** sticky nav, active-section tracking, prev/next, page numbers, progress indicator.
6. **Section 1** — Who is Phey?
7. **Section 2** — What's Phey's up to... (including the featured Blowing Rock spread)
8. **Section 3** — What Phey loves (including the keepsake drawer)
9. **Section 4** — Why hire Phey? (Personal View, Recruiter Mode, toggle, download button)
10. **Lightbox and interactions**, then reduced-motion handling.
11. **Responsive pass** at all four test widths.
12. **Accessibility pass:** keyboard-only walkthrough of the entire site.
13. **Verify:** run `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Then `npm run start` and check the browser console for errors and hydration warnings. Fix everything.
14. **README:** how to run locally, how to add photos, how to edit content, how to add keepsakes, how to update the résumé, and how to deploy to Vercel.

---

## 15. Definition of done

- [ ] All four sections built with real content from this file and the résumé
- [ ] Nav labels match exactly, including punctuation
- [ ] Top nav and prev/next both work and stay in sync; deep links work
- [ ] Every photo slot is a styled placeholder driven by `photos.ts`
- [ ] Adding a photo requires only dropping a file and editing `photos.ts`
- [ ] Keepsake drawer works; all sample keepsakes are marked as placeholders with no invented stories
- [ ] Blowing Rock story is accurate (no visit to the swinging bridge)
- [ ] Recruiter Mode matches the résumé verbatim; toggle is URL-linkable; print styles work
- [ ] No invented personal facts anywhere; all unknowns are visible `TODO`s
- [ ] Reduced motion respected
- [ ] Keyboard navigable; lightbox traps and restores focus
- [ ] Looks good at 360 / 768 / 1024 / 1440 px
- [ ] `npm run lint`, `tsc --noEmit`, and `npm run build` all pass with zero errors
- [ ] No console errors or hydration warnings
- [ ] README explains how to update content and deploy

When finished, give me a short summary: what was built, every `TODO` I need to fill in (grouped by file), and anything you were unsure about.
