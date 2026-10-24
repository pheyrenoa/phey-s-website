import type { LovesContent } from "@/lib/types";

// Page 3, "What Phey loves".
//
// Adding a keepsake: copy one of the objects in `drawer.keepsakes`, give it
// a new unique `id`, pick a `kind` (it decides the drawing), and fill in
// caption / origin / story. Set `isPlaceholder: false` so the "sample"
// stamp goes away. To show a real photo, add it to photos.ts and set
// `photoId` here.
export const loves: LovesContent = {
  intro: "Hobbies, small joys, and things I keep coming back to.",
  categories: [
    {
      id: "dance",
      title: "Dance",
      doodle: "dance-shoe",
      blurb: "Dance is an important part of my life.",
      details: ["Dance photos", "Performance memories"],
      photoIds: ["dance-1", "dance-2", "dance-3"],
    },
    {
      id: "food",
      title: "Food",
      doodle: "whisk",
      blurb: "Baking, cooking, trying new food spots, and meals with friends.",
      details: ["Baking", "Cooking", "New food spots", "Meals with friends"],
      photoIds: ["food-baking", "food-cooking", "food-friends"],
      note: "Honestly, a favorite: my friends cook, I eat, and then I wash the dishes.",
    },
    {
      id: "exploring",
      title: "Exploring",
      doodle: "compass",
      blurb: "Hiking, random day trips, and discovering new places.",
      details: ["Hiking", "Random day trips", "Interesting little spots"],
      photoIds: ["exploring-1", "exploring-2"],
    },
    {
      id: "creative",
      title: "Creative things",
      doodle: "scissors",
      blurb: "Arts and crafts, Pinterest boards, and making things.",
      details: ["Arts and crafts", "Pinterest boards", "Random new hobbies"],
      photoIds: ["creative-1", "creative-2"],
    },
  ],
  motifs: [
    {
      id: "half-x",
      title: "The 0.5x archive",
      description: "Funny wide-angle photos.",
      photoIds: ["half-x-1", "half-x-2", "half-x-3"],
    },
    {
      id: "good-meal",
      title: "Evidence of a good meal",
      description: "Empty plates only.",
      photoIds: ["plate-1", "plate-2", "plate-3"],
    },
  ],
  drawer: {
    title: "Things I Couldn't Throw Away",
    intro:
      "I collect small physical objects because they remind me of places I've visited and people I've spent time with.",
    // Every item below is a SAMPLE. Replace origin/story with the real ones.
    keepsakes: [
      {
        id: "wrapper-1",
        kind: "wrapper",
        label: "Chocolate wrapper",
        caption: "Chocolate wrappers someone gave me",
        origin: null,
        story: null,
        isPlaceholder: true,
      },
      {
        id: "ticket-1",
        kind: "ticket",
        label: "Museum ticket",
        caption: null,
        origin: null,
        story: null,
        isPlaceholder: true,
      },
      {
        id: "map-1",
        kind: "map",
        label: "Zoo map",
        caption: null,
        origin: null,
        story: null,
        isPlaceholder: true,
      },
      {
        id: "note-1",
        kind: "note",
        label: "Little note",
        caption: null,
        origin: null,
        story: null,
        isPlaceholder: true,
      },
      {
        id: "sticker-1",
        kind: "sticker",
        label: "Sticker",
        caption: null,
        origin: null,
        story: null,
        isPlaceholder: true,
      },
      {
        id: "postcard-1",
        kind: "postcard",
        label: "Postcard",
        caption: null,
        origin: null,
        story: null,
        isPlaceholder: true,
      },
      {
        id: "stone-1",
        kind: "stone",
        label: "Stone",
        caption: null,
        origin: null,
        story: null,
        isPlaceholder: true,
      },
    ],
  },
};
