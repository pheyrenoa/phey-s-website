import type { AboutContent } from "@/lib/types";

// Page 1, "Who is Phey?". Edit the words here; layout lives in
// src/components/sections/WhoSection.tsx.
export const about: AboutContent = {
  greeting: "Hi, I'm Phey.",
  paragraphs: [
    "I was born in Uzbekistan and moved to the United States during junior high school. It was a huge change, and it shaped me into a different, stronger person.",
    "That move taught me that taking a risk doesn't automatically mean something bad will happen, and that I don't need to know every detail before I start something.",
    "I'm a bit of a jack of all trades: I dance, bake, cook, hike, and love trying new things, especially with the people I love.",
    "Whatever the job, I love teaching. Helping someone learn a skill, understand a concept, or discover they can do something they didn't think they could is my favorite part.",
  ],
  keyMessage: "Knowledge is meant to be shared.",
  stickyNotes: [
    {
      id: "note-risk",
      text: "Taking a risk doesn't mean something bad will happen.",
      color: "sage",
    },
    {
      id: "note-details",
      text: "You don't need every detail before you start.",
      color: "paper",
    },
  ],
  collage: ["about-uzbekistan", "about-moving", "about-me", "about-people"],
  hobbies: [
    { doodle: "dance-shoe", label: "dance" },
    { doodle: "whisk", label: "bake" },
    { doodle: "pan", label: "cook" },
    { doodle: "mountain", label: "hike" },
    { doodle: "sparkle", label: "new things" },
  ],
};
