import type { Photo } from "@/lib/types";

/*
 * ───────────────────────── HOW TO ADD A PHOTO ─────────────────────────
 *
 * Every photo on the site is listed here. Components only reference photos
 * by `id`, so you never need to touch component code.
 *
 * 1. Put the image file in the folder that matches its `section`:
 *      public/images/<section>/
 * 2. Find the entry below and set `src` to the file's public path.
 * 3. Update `alt` so it describes what's actually in the photo.
 *
 * Worked example — adding the Uzbekistan photo:
 *
 *   1. Save it as  public/images/about/uzbekistan.jpg
 *   2. Change      src: null,
 *      to          src: "/images/about/uzbekistan.jpg",
 *   3. Change alt to something like
 *                  "Me as a kid standing in front of my grandparents' house"
 *
 * While `src` is null, a styled placeholder showing `placeholderHint` is
 * rendered instead. `caption` (optional) is the handwritten text under a
 * Polaroid. `aspect` controls the frame shape: "polaroid" (square photo
 * in a Polaroid frame), "square", "portrait" (4:5), or "landscape" (4:3).
 * ───────────────────────────────────────────────────────────────────────
 */
export const photos: Photo[] = [
  {
    id: "about-uzbekistan",
    src: null,
    alt: "A photo from Uzbekistan",
    aspect: "polaroid",
    caption: "where it started",
    section: "about",
    placeholderHint: "A photo from Uzbekistan",
  },
  {
    id: "about-moving",
    src: null,
    alt: "Moving to the US in junior high",
    aspect: "polaroid",
    caption: "a huge change",
    section: "about",
    placeholderHint: "Moving to the US in junior high",
  },
  {
    id: "about-me",
    src: null,
    alt: "A photo of me",
    aspect: "portrait",
    section: "about",
    placeholderHint: "A photo of me",
  },
  {
    id: "about-people",
    src: null,
    alt: "Trying new things with the people I love",
    aspect: "landscape",
    section: "about",
    placeholderHint: "Trying new things with the people I love",
  },
  {
    id: "chapter-duke",
    src: null,
    alt: "A photo from Duke",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "A photo from Duke",
  },
  {
    id: "chapter-building",
    src: null,
    alt: "A photo from work",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "A photo from work",
  },
  {
    id: "chapter-dance",
    src: null,
    alt: "DefMo or a campus moment",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "DefMo or a campus moment",
  },
  {
    id: "chapter-side-quests",
    src: null,
    alt: "A weekend side quest",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "A weekend side quest",
  },
  {
    id: "blowing-rock-drive",
    src: null,
    alt: "The three-hour drive",
    aspect: "polaroid",
    caption: "Durham to Blowing Rock",
    section: "adventures",
    placeholderHint: "The three-hour drive",
  },
  {
    id: "blowing-rock-trail",
    src: null,
    alt: "The (much longer) trail",
    aspect: "polaroid",
    caption: "the detour",
    section: "adventures",
    placeholderHint: "The (much longer) trail",
  },
  {
    id: "blowing-rock-barn",
    src: null,
    alt: "The barn, after the rain stopped",
    aspect: "polaroid",
    caption: "we found it!",
    section: "adventures",
    placeholderHint: "The barn, after the rain stopped",
  },
  {
    id: "blowing-rock-merch",
    src: null,
    alt: "Our new random-town merch",
    aspect: "polaroid",
    caption: "new outfits",
    section: "adventures",
    placeholderHint: "Our new random-town merch",
  },
  {
    id: "blowing-rock-dinner",
    src: null,
    alt: "Dinner for six",
    aspect: "polaroid",
    caption: "party of six",
    section: "adventures",
    placeholderHint: "Dinner for six",
  },
  {
    id: "boston-1",
    src: null,
    alt: "Thanksgiving break in Boston",
    aspect: "landscape",
    section: "adventures",
    placeholderHint: "Thanksgiving break in Boston",
  },
  {
    id: "boston-2",
    src: null,
    alt: "Another Boston photo",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "Another Boston photo",
  },
  {
    id: "seattle-1",
    src: null,
    alt: "Hiking in Seattle",
    aspect: "landscape",
    section: "adventures",
    placeholderHint: "Hiking in Seattle",
  },
  {
    id: "seattle-2",
    src: null,
    alt: "Another Seattle hike photo",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "Another Seattle hike photo",
  },
  {
    id: "westernmost-1",
    src: null,
    alt: "The westernmost point of the US",
    aspect: "landscape",
    section: "adventures",
    placeholderHint: "The westernmost point of the US",
  },
  {
    id: "westernmost-2",
    src: null,
    alt: "Another westernmost-point photo",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "Another westernmost-point photo",
  },
  {
    id: "hoco-1",
    src: null,
    alt: "My first HOCO performance",
    aspect: "landscape",
    section: "adventures",
    placeholderHint: "My first HOCO performance",
  },
  {
    id: "hoco-2",
    src: null,
    alt: "Another HOCO photo",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "Another HOCO photo",
  },
  {
    id: "skydiving-1",
    src: null,
    alt: "Skydiving",
    aspect: "landscape",
    section: "adventures",
    placeholderHint: "Skydiving",
  },
  {
    id: "skydiving-2",
    src: null,
    alt: "The backflip out of the plane",
    aspect: "polaroid",
    section: "adventures",
    placeholderHint: "The backflip out of the plane",
  },
  {
    id: "dance-1",
    src: null,
    alt: "A dance performance",
    aspect: "portrait",
    section: "dance",
    placeholderHint: "A dance performance",
  },
  {
    id: "dance-2",
    src: null,
    alt: "A performance memory",
    aspect: "polaroid",
    section: "dance",
    placeholderHint: "A performance memory",
  },
  {
    id: "dance-3",
    src: null,
    alt: "Dance with the team",
    aspect: "polaroid",
    section: "dance",
    placeholderHint: "Dance with the team",
  },
  {
    id: "food-baking",
    src: null,
    alt: "Something I baked",
    aspect: "polaroid",
    section: "food",
    placeholderHint: "Something I baked",
  },
  {
    id: "food-cooking",
    src: null,
    alt: "Something I cooked",
    aspect: "polaroid",
    section: "food",
    placeholderHint: "Something I cooked",
  },
  {
    id: "food-friends",
    src: null,
    alt: "A meal with friends",
    aspect: "landscape",
    section: "food",
    placeholderHint: "A meal with friends",
  },
  {
    id: "exploring-1",
    src: null,
    alt: "A hike or day trip",
    aspect: "polaroid",
    section: "loves",
    placeholderHint: "A hike or day trip",
  },
  {
    id: "exploring-2",
    src: null,
    alt: "An interesting little spot",
    aspect: "polaroid",
    section: "loves",
    placeholderHint: "An interesting little spot",
  },
  {
    id: "creative-1",
    src: null,
    alt: "Arts and crafts",
    aspect: "polaroid",
    section: "loves",
    placeholderHint: "Arts and crafts",
  },
  {
    id: "creative-2",
    src: null,
    alt: "A Pinterest-board project",
    aspect: "polaroid",
    section: "loves",
    placeholderHint: "A Pinterest-board project",
  },
  {
    id: "half-x-1",
    src: null,
    alt: "A 0.5x photo",
    aspect: "square",
    section: "loves",
    placeholderHint: "A 0.5x photo",
  },
  {
    id: "half-x-2",
    src: null,
    alt: "Another 0.5x photo",
    aspect: "square",
    section: "loves",
    placeholderHint: "Another 0.5x photo",
  },
  {
    id: "half-x-3",
    src: null,
    alt: "One more 0.5x photo",
    aspect: "square",
    section: "loves",
    placeholderHint: "One more 0.5x photo",
  },
  {
    id: "plate-1",
    src: null,
    alt: "An empty plate",
    aspect: "square",
    section: "food",
    placeholderHint: "An empty plate",
  },
  {
    id: "plate-2",
    src: null,
    alt: "Another empty plate",
    aspect: "square",
    section: "food",
    placeholderHint: "Another empty plate",
  },
  {
    id: "plate-3",
    src: null,
    alt: "A very empty plate",
    aspect: "square",
    section: "food",
    placeholderHint: "A very empty plate",
  },
  {
    id: "pro-wrapt",
    src: null,
    alt: "A WRAPT screenshot",
    aspect: "landscape",
    section: "professional",
    placeholderHint: "A WRAPT screenshot",
  },
  {
    id: "pro-amazon-2026",
    src: null,
    alt: "A photo from Amazon, 2026",
    aspect: "landscape",
    section: "professional",
    placeholderHint: "A photo from Amazon, 2026",
  },
  {
    id: "pro-amazon-2025",
    src: null,
    alt: "A photo from Amazon, 2025",
    aspect: "landscape",
    section: "professional",
    placeholderHint: "A photo from Amazon, 2025",
  },
  {
    id: "pro-bofa-jevs",
    src: null,
    alt: "A photo from Bank of America x JEVS",
    aspect: "landscape",
    section: "professional",
    placeholderHint: "A photo from Bank of America x JEVS",
  },
  {
    id: "pro-empowering-minds",
    src: null,
    alt: "A photo from Empowering Minds",
    aspect: "landscape",
    section: "professional",
    placeholderHint: "A photo from Empowering Minds",
  },
];

const byId = new Map(photos.map((p) => [p.id, p]));

/** Looks up a photo by id. Unknown ids render a generic placeholder. */
export function getPhoto(id: string): Photo {
  return (
    byId.get(id) ?? {
      id,
      src: null,
      alt: "",
      aspect: "polaroid",
      section: "about",
      placeholderHint: `TODO: add "${id}" to photos.ts`,
    }
  );
}
