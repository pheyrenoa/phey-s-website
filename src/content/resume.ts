import type { PersonalExperience, Resume } from "@/lib/types";

// Extracted VERBATIM from public/resume/Phey-Rashidova-Resume.pdf.
// Keep wording, titles, dates, and metrics exactly as they appear on the
// PDF. When the résumé changes, replace the PDF and update this file to
// match it word for word.
export const resume: Resume = {
  name: "Phey Rashidova",
  contact: {
    email: "pheyrashidova@gmail.com",
    phone: "267-595-7539",
    // The phone number is on the PDF but hidden on the public site by
    // default to keep it away from scrapers. Set to true to show it.
    publishPhone: false,
    // Link targets come from the hyperlinks embedded in the résumé PDF.
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohinur-rashidova-172a73261",
    },
    github: { label: "GitHub", href: "https://github.com/pheyrenoa" },
  },
  education: [
    {
      school: "Duke University",
      location: "Durham, NC",
      degree:
        "B.S. in Computer Science and Statistics, Concentration in AI and Data Science",
      date: "May 2028",
      coursework:
        "Database Systems, Probability, Machine Learning, Regression Analysis, Data Mining and AI",
    },
  ],
  experience: [
    {
      id: "wrapt",
      company: "WRAPT",
      location: "Remote",
      role: "Founding Engineer",
      dates: "Oct. 2026 – Present",
      bullets: [
        "Scoped a launchable MVP within a 1.5-month timeline by converting the founders’ brief into a 6-milestone roadmap, deprioritizing payment-dependent group gifting and delivering Secret Santa as a lower-risk alternative",
        "Aligned founders on a React Native + Supabase stack by evaluating 5 frontend and 5 backend options in an architecture, data model, and risk memo",
        "Kept inference cost and latency low for personalized gift recommendations by building a rule-based engine ranking gifts across 7 weighted taste signals and restricting LLM use to one-time onboarding parsing",
        "Building the app from zero to TestFlight beta, including onboarding, authentication, user profiles, and a PostgreSQL data model with row-level security",
      ],
    },
    {
      id: "amazon-2026",
      company: "Amazon",
      location: "Seattle, WA",
      role: "Software Development Engineer Intern",
      dates: "May 2026 – Aug. 2026",
      bullets: [
        "Defined problem scope and requirements for an AWS Network Load Balancer incident-analysis tool by interviewing on-call operators and engineers and analyzing COE reports and tickets; owned milestones and timeline",
        "Cut incident investigation from hours to minutes and reduced data latency 92% (1 hour to 5 minutes) by delivering a 50K+ events/sec data lake that operators query via Athena SQL across 150K targets per region",
        "Enabled multi-source data ingestion, eliminating all 22 Kafka dependencies, by designing a source-agnostic ingestion layer deployable across all AWS regions",
      ],
    },
    {
      id: "amazon-2025",
      company: "Amazon",
      location: "Seattle, WA",
      role: "Software Development Engineer Intern",
      dates: "May 2025 – Aug. 2025",
      bullets: [
        "Automated recovery of unhealthy Kafka aggregators by building a self-healing module that terminates degraded hosts for Auto Scaling replacement",
        "Prevented cascading failures with a concurrency-safe lock limiting simultaneous instance self-terminations",
        "Avoided false-positive terminations by implementing low-latency health evaluation logic to handle noisy, incomplete metric streams",
      ],
    },
    {
      id: "bofa-jevs",
      company: "Bank of America x JEVS",
      location: "Philadelphia, PA",
      role: "Data Analyst Student Intern",
      dates: "Jun. 2024 – Aug. 2024",
      bullets: [
        "Increased program commitment ∼70% through phone outreach targeted by drop-off findings from demographic analysis across 8K+ Salesforce records",
        "Cut daily report update time from up to 1 hour to 5 minutes by automating Excel reporting templates with pivot tables and formulas for cross-functional teams",
      ],
    },
    {
      id: "empowering-minds",
      company: "Empowering Minds",
      location: "Remote",
      role: "Founder and Math Tutor",
      dates: "May 2021 – Present",
      bullets: [
        "Scaled a tutoring business to 20 students globally by recruiting, training, and managing 7 Math and English tutors",
        "Saved 5+ hours/week and eliminated missed lessons by building a Telegram bot that automates scheduling, confirmations, rescheduling, and parent progress updates",
      ],
    },
  ],
  // TODO: the résumé has no Projects section. Add projects here (verbatim
  // from a future résumé) and the section appears in Recruiter Mode.
  projects: [],
  skills: [
    {
      label: "Product",
      items:
        "User Interviews, Requirements Definition, Roadmapping, Funnel Analysis, Stakeholder Management",
    },
    { label: "Languages", items: "Python, Java, JavaScript, SQL, R, C++" },
    {
      label: "Frameworks",
      items: "React Native, Expo, Node.js, Flask, TensorFlow/Keras",
    },
    {
      label: "Developer Tools",
      items:
        "AWS (S3, Athena, CloudWatch, EC2), Kafka, PostgreSQL, Supabase, Docker, Git, VS Code, IntelliJ, Google Colab",
    },
  ],
  campusInvolvement: [
    "Catalyst Tech Org (New Member Education Chair)",
    "Product Space",
    "Scale & Coin (Former New Member Education Chair)",
    "DefMo Dance Team (Treasurer)",
  ],
};

// Personal View: a short, casual intro per role plus which résumé bullets
// to highlight (by index into that role's `bullets`). The intros only
// restate what the résumé says; edit them freely.
export const personalExperience: PersonalExperience[] = [
  {
    resumeId: "wrapt",
    intro:
      "Building a personalized gift-recommendation app from zero, as a founding engineer.",
    highlights: [0, 2, 3],
    photoId: "pro-wrapt",
    style: "ticket",
  },
  {
    resumeId: "amazon-2026",
    intro:
      "My second Amazon summer: an incident-analysis tool for AWS Network Load Balancer operators.",
    highlights: [0, 1, 2],
    photoId: "pro-amazon-2026",
    style: "badge",
  },
  {
    resumeId: "amazon-2025",
    intro:
      "My first Amazon summer: helping unhealthy Kafka aggregators recover on their own.",
    highlights: [0, 1, 2],
    photoId: "pro-amazon-2025",
    style: "badge",
  },
  {
    resumeId: "bofa-jevs",
    intro: "Digging into program data to find where people were dropping off.",
    highlights: [0, 1],
    photoId: "pro-bofa-jevs",
    style: "ticket",
  },
  {
    resumeId: "empowering-minds",
    intro:
      "My own tutoring business, where teaching and running a team meet.",
    highlights: [0, 1],
    photoId: "pro-empowering-minds",
    style: "ticket",
  },
];
