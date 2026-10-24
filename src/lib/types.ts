// Shared types for everything in src/content. Components only ever read
// these shapes, so editing content never requires touching component code.

/* ---------- Site ---------- */

export type SectionId = "who" | "up-to" | "loves" | "hire";

export type NavItem = {
  id: SectionId;
  label: string;
};

export type SiteContent = {
  name: string;
  /** One-line description used for metadata and the OG image. */
  description: string;
  /** Sections in page order; nav labels must match exactly. */
  sections: NavItem[];
};

/* ---------- Photos ---------- */

export type PhotoAspect = "square" | "portrait" | "landscape" | "polaroid";

export type PhotoSection =
  | "about"
  | "adventures"
  | "dance"
  | "food"
  | "loves"
  | "keepsakes"
  | "professional";

export type Photo = {
  id: string;
  /** e.g. "/images/about/uzbekistan.jpg"; null renders a placeholder. */
  src: string | null;
  /** Describes the real photo once `src` is set. */
  alt: string;
  aspect: PhotoAspect;
  /** Short handwritten caption under the photo. */
  caption?: string;
  section: PhotoSection;
  /** Shown on the placeholder, e.g. "A photo from Uzbekistan". */
  placeholderHint: string;
};

/* ---------- Page 1: Who is Phey? ---------- */

export type StickyNote = {
  id: string;
  text: string;
  color: "paper" | "sage" | "terracotta";
};

export type AboutContent = {
  greeting: string;
  /** First-person intro paragraphs. */
  paragraphs: string[];
  /** The pinned handwritten note. */
  keyMessage: string;
  stickyNotes: StickyNote[];
  /** Photo ids for the collage, in display order. */
  collage: string[];
  hobbies: { doodle: DoodleName; label: string }[];
};

/* ---------- Page 2: What's Phey's up to... ---------- */

export type Chapter = {
  id: string;
  title: string;
  /** Handwritten tag on the card, e.g. "now". */
  tag?: string;
  items: string[];
  photoId?: string;
  /** Optional in-page link, e.g. to #hire. */
  link?: { label: string; href: string };
};

export type TimelineStop = {
  id: string;
  text: string;
  /** Handwritten annotation pinned next to this stop. */
  annotation?: string;
  photoId?: string;
};

export type FeaturedAdventure = {
  title: string;
  /** null renders a visible TODO stamp. */
  date: string | null;
  location: string | null;
  intro: string;
  stops: TimelineStop[];
  /** The swinging bridge P.S.: a plan, not a stop. */
  postscript: { text: string; annotation: string };
  photoIds: string[];
};

export type AdventureEntry = {
  id: string;
  title: string;
  /** null renders "TODO: add your caption" as a faint pencil note. */
  caption: string | null;
  date: string | null;
  location: string | null;
  /** First id goes on the postcard front, the rest become Polaroids. */
  photoIds: string[];
};

export type AdventuresContent = {
  intro: string;
  chapters: Chapter[];
  featured: FeaturedAdventure;
  entries: AdventureEntry[];
};

/* ---------- Page 3: What Phey loves ---------- */

export type LoveCategory = {
  id: string;
  title: string;
  doodle: DoodleName;
  blurb: string;
  details: string[];
  photoIds: string[];
  /** A small handwritten aside. */
  note?: string;
};

export type Motif = {
  id: string;
  title: string;
  description: string;
  photoIds: string[];
};

export type Keepsake = {
  id: string;
  kind:
    | "wrapper"
    | "ticket"
    | "map"
    | "note"
    | "sticker"
    | "postcard"
    | "stone"
    | "other";
  /** e.g. "Chocolate wrapper" */
  label: string;
  caption: string | null;
  /** Where it came from; null = unknown. */
  origin: string | null;
  /** null renders "Story coming soon." */
  story: string | null;
  /** Optional key into photos.ts; shows the photo instead of the drawing. */
  photoId?: string;
  isPlaceholder: boolean;
};

export type LovesContent = {
  intro: string;
  categories: LoveCategory[];
  motifs: Motif[];
  drawer: {
    title: string;
    intro: string;
    keepsakes: Keepsake[];
  };
};

/* ---------- Page 4: Why hire Phey? ---------- */

export type ResumeLink = {
  label: string;
  href: string;
};

export type ResumeEducation = {
  school: string;
  location: string;
  degree: string;
  date: string;
  coursework: string;
};

export type ResumeExperience = {
  id: string;
  company: string;
  location: string;
  role: string;
  dates: string;
  bullets: string[];
};

export type ResumeProject = {
  id: string;
  name: string;
  dates?: string;
  bullets: string[];
};

export type ResumeSkillGroup = {
  label: string;
  items: string;
};

export type Resume = {
  name: string;
  contact: {
    email: string | null;
    /** Kept in data; only rendered when `publishPhone` is true. */
    phone: string | null;
    publishPhone: boolean;
    linkedin: ResumeLink | null;
    github: ResumeLink | null;
  };
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: ResumeSkillGroup[];
  campusInvolvement: string[];
};

/** Personal View extras layered on top of a résumé entry. */
export type PersonalExperience = {
  /** Matches ResumeExperience.id. */
  resumeId: string;
  intro: string;
  /** Indexes into the résumé entry's bullets (2–3 of them). */
  highlights: number[];
  photoId: string;
  style: "ticket" | "badge";
};

/* ---------- Doodles ---------- */

export type DoodleName =
  | "dance-shoe"
  | "whisk"
  | "mountain"
  | "pan"
  | "compass"
  | "scissors"
  | "camera"
  | "pencil"
  | "heart"
  | "star"
  | "sparkle"
  | "plane"
  | "book";
