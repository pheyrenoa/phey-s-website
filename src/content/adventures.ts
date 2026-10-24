import type { AdventuresContent } from "@/lib/types";

// Page 2, "What's Phey's up to...".
// Any `date`, `location`, or `caption` set to null shows a visible TODO on
// the page. Replace null with a string to fill it in.
export const adventures: AdventuresContent = {
  intro: "Diary entries, current chapters, and a few side quests.",
  chapters: [
    {
      id: "duke",
      title: "Duke University",
      tag: "now",
      photoId: "chapter-duke",
      items: [
        "Studying Computer Science and Statistics",
        "Concentration in AI and Data Science",
        "Campus orgs: Catalyst Tech Org, Product Space, Scale & Coin, DefMo Dance Team",
        "DefMo Dance Team Treasurer",
      ],
    },
    {
      id: "building",
      title: "Building things",
      tag: "work",
      photoId: "chapter-building",
      items: [
        "Two summers as a Software Development Engineer Intern at Amazon",
        "Currently a Founding Engineer at WRAPT",
      ],
      link: { label: "The details are on page 4", href: "#hire" },
    },
    {
      id: "dance",
      title: "Dance and campus life",
      tag: "always",
      photoId: "chapter-dance",
      items: [
        "Dance performances and campus activities",
        "Making time for dance alongside school and work",
      ],
    },
    {
      id: "side-quests",
      title: "Side quests",
      tag: "weekends",
      photoId: "chapter-side-quests",
      items: [
        "Spontaneous weekend trips",
        "Hiking and exploring new places",
        "Finding random spots, restaurants, rooftops, and benches",
        "Documenting everything with photos",
      ],
    },
  ],
  featured: {
    title: "The Bridge We Never Saw",
    date: null, // TODO: add date
    location: "Blowing Rock, NC",
    intro:
      "A one-mile hike, a three-hour drive each way, and absolutely nothing going to plan.",
    photoIds: [
      "blowing-rock-drive",
      "blowing-rock-trail",
      "blowing-rock-barn",
      "blowing-rock-merch",
      "blowing-rock-dinner",
    ],
    stops: [
      {
        id: "drive-there",
        text: "Drove three hours from Durham to Blowing Rock for what was supposed to be a one-mile hike.",
        annotation: "It was supposed to be ONE mile.",
        photoId: "blowing-rock-drive",
      },
      {
        id: "detour",
        text: "Took a detour because we thought we had plenty of time and energy. The hike ended up much longer than expected.",
        annotation: "Why did we think we had so much time?",
        photoId: "blowing-rock-trail",
      },
      {
        id: "rain",
        text: "It started pouring rain. We got lost trying to find a barn to escape it. By the time we found the barn, the rain had stopped.",
        photoId: "blowing-rock-barn",
      },
      {
        id: "merch",
        text: "Back at the car, we found a random souvenir shop and bought new clothes. We now own merch from a random town.",
        annotation: "At least we got merch.",
        photoId: "blowing-rock-merch",
      },
      {
        id: "dinner",
        text: "At dinner, the restaurant wouldn't seat a party of four but would seat six, so we joined two elderly couples and ate together.",
        photoId: "blowing-rock-dinner",
      },
      {
        id: "drive-home",
        text: "Drove three hours home.",
      },
    ],
    postscript: {
      text: "There was also a plan to visit the swinging bridge. We never made it because it got too dark.",
      annotation: "Swinging bridge: unfinished side quest.",
    },
  },
  entries: [
    {
      id: "boston",
      title: "Thanksgiving break in Boston",
      caption: null, // TODO: add your caption
      date: null, // TODO: add date
      location: "Boston",
      photoIds: ["boston-1", "boston-2"],
    },
    {
      id: "seattle",
      title: "Hiking in Seattle",
      caption: null, // TODO: add your caption
      date: null, // TODO: add date
      location: "Seattle",
      photoIds: ["seattle-1", "seattle-2"],
    },
    {
      id: "westernmost",
      title: "Visiting the westernmost point of the United States",
      caption: null, // TODO: add your caption
      date: null, // TODO: add date
      location: null, // TODO: add location
      photoIds: ["westernmost-1", "westernmost-2"],
    },
    {
      id: "hoco",
      title: "My first HOCO dance performance",
      caption: null, // TODO: add your caption
      date: null, // TODO: add date
      location: null, // TODO: add location
      photoIds: ["hoco-1", "hoco-2"],
    },
    {
      id: "skydiving",
      title: "Skydiving and doing a backflip out of a plane",
      caption: null, // TODO: add your caption
      date: null, // TODO: add date
      location: null, // TODO: add location
      photoIds: ["skydiving-1", "skydiving-2"],
    },
  ],
};
