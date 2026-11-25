/**
 * Everything the site says lives here, so updating the portfolio means
 * editing this file only.
 *
 * Honesty rule (agreed 2026-11-25): only skills Sikanderpreet can explain in an
 * interview without AI go in CORE_SKILLS. Other tech appears only as facts
 * about a project, or under PROJECT_SKILLS. Move a skill up when its topic is
 * studied and re-tested.
 */

export const SITE = {
  name: "Sikanderpreet Singh",
  shortName: "sikander",
  title: "Backend Developer (Node.js)",
  tagline: "Node.js backend developer building production APIs for web and mobile apps.",
  location: "Faridabad, Delhi NCR, India",
  openTo: "Remote or Delhi NCR",
  email: "sikanderpreetsingh01@gmail.com",
  linkedin: "https://linkedin.com/in/sikander-io",
  github: "https://github.com/Sikanderpreet",
  resume: "/resume.pdf",
  url: "https://sikanderpreet.vercel.app",
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

/** Hero fact stickers. */
export const FACTS = [
  { big: "4+ yrs", small: "Node.js backend, production APIs" },
  { big: "20,000+", small: "registered customers on LoopDeco" },
  { big: "~600", small: "drivers on the same platform" },
  { big: "iOS + Android", small: "SideXSide is live in both stores" },
] as const;

/** Hero motion graphic: a LoopDeco pickup job, start to finish. */
export const JOB_STAGES = [
  { label: "Estimate approved", note: "Customer accepts the price, pays a deposit" },
  { label: "Driver assigned", note: "First matching driver to accept gets it" },
  { label: "Items collected", note: "Tracked to resale, donation or disposal" },
  { label: "Paid in full", note: "Balance charged to the saved card" },
] as const;

export type DemoKind = "no-double-booking" | "live-tracking" | "queue-workers" | "three-portals";

export interface Project {
  id: string;
  name: string;
  kind: string;
  period: string;
  role: string;
  summary: string;
  stories: { title: string; body: string }[];
  stack: string[];
  demo: DemoKind;
  demoCaption: string;
}

export const PROJECTS: Project[] = [
  {
    id: "loopdeco",
    name: "LoopDeco",
    kind: "Junk-removal, donation and resale logistics · USA",
    period: "Feb 2024 – now",
    role: "Lead backend developer",
    summary:
      "A US platform where customers book junk pickups and drivers collect items for resale, donation or disposal. 20,000+ registered customers and about 600 drivers.",
    stories: [
      {
        title: "Deposit now, balance later",
        body: "Stripe saved cards: a deposit is taken when the customer approves the estimate, and the balance is charged after the job, with no one doing it by hand.",
      },
      {
        title: "No double-booking",
        body: "A job is offered to every matching driver by region, ZIP code and vehicle type. The moment one accepts, it disappears for everyone else.",
      },
      {
        title: "The batch jobs that never ran",
        body: "Found that the scheduled jobs had never run in any environment. Moved scheduling into the app with protection against two runs overlapping.",
      },
      {
        title: "Rebuilt without breaking phones",
        body: "Led the 2026 rebuild from Express to NestJS. The driver apps already installed on phones kept working, checked by 1,200+ tests.",
      },
    ],
    stack: ["Node.js", "Express", "NestJS", "MySQL", "Prisma", "Stripe", "Twilio", "Firebase"],
    demo: "no-double-booking",
    demoCaption: "One job, three drivers: the first to accept gets it.",
  },
  {
    id: "sidexside",
    name: "SideXSide",
    kind: "Trip-matching app · live on iOS and Android",
    period: "Jun – Aug 2026",
    role: "Lead backend developer",
    summary:
      "An app that matches people travelling the same way. The backend is 17 small services behind separate admin and user API gateways.",
    stories: [
      {
        title: "Most of the services",
        body: "Built most of them: auth, users, trips, payments, notifications, content, analytics and audit, talking to each other through RabbitMQ.",
      },
      {
        title: "Live trip tracking",
        body: "Location and messages travel over Socket.io. A Redis adapter passes each update between servers, so it works with more than one server running.",
      },
      {
        title: "Locked-down gateways",
        body: "JWT auth, rate limiting and security headers at both gateways; every service secret moved to AWS Secrets Manager.",
      },
    ],
    stack: ["NestJS", "PostgreSQL", "Prisma", "RabbitMQ", "Redis", "Socket.io", "AWS"],
    demo: "live-tracking",
    demoCaption: "A location update reaches the rider, whichever server they're on.",
  },
  {
    id: "boostplug",
    name: "Boost!Plug",
    kind: "AI matching marketplace · suppliers, jobs and contracts",
    period: "Apr 2025 – May 2026",
    role: "Developer on a 12-person team",
    summary:
      "A marketplace that matches businesses, job seekers and government contracts by meaning, not just keywords.",
    stories: [
      {
        title: "Opportunities that import themselves",
        body: "Scheduled imports of federal contracts from SAM.gov and jobs from Adzuna, with duplicate detection, so new listings became searchable without manual entry.",
      },
      {
        title: "Heavy AI work off the request",
        body: "Moved embedding generation onto RabbitMQ background workers, so the API answers straight away and the slow work happens behind it.",
      },
      {
        title: "Survives rate limits",
        body: "Throttling plus retries with growing waits, so big re-processing runs finish instead of failing halfway when OpenAI says \"too many requests\".",
      },
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "RabbitMQ", "OpenAI", "Pinecone", "Azure"],
    demo: "queue-workers",
    demoCaption: "The API answers at once; the slow work goes through a queue.",
  },
  {
    id: "k9stays",
    name: "K9 Stays",
    kind: "Dog-boarding marketplace",
    period: "May 2024 – May 2025",
    role: "Main developer",
    summary:
      "Pet hotels list their boarding services and pet owners book them. Three portals share one Express API.",
    stories: [
      {
        title: "One API, three portals",
        body: "Admin panel, business portal for pet hotels, and the customer website, each seeing only what its role allows.",
      },
      {
        title: "Admin on the owner's behalf",
        body: "Admins can safely step into any business profile to manage it for the owner.",
      },
      {
        title: "Listings that look alive",
        body: "Each kennel's Instagram posts and Google reviews appear on its listing, through the Instagram Graph API and Google Places.",
      },
    ],
    stack: ["Node.js", "Express", "MySQL", "JWT", "Next.js", "Stripe", "AWS S3"],
    demo: "three-portals",
    demoCaption: "Each request is checked against the role that sent it.",
  },
];

export interface Job {
  company: string;
  role: string;
  period: string;
  where: string;
  points: string[];
}

export const EXPERIENCE: Job[] = [
  {
    company: "Wegile",
    role: "Backend Developer (Node.js)",
    period: "Jan 2023 – now",
    where: "Software agency · remote",
    points: [
      "Backend developer on 10+ client projects for web and mobile apps, mostly for US clients.",
      "Designed 200+ REST endpoints with central validation and clear, consistent errors.",
      "Built JWT login with refresh tokens, role-based access and OTP verification, reused across projects.",
      "LoopDeco, SideXSide, Boost!Plug and K9 Stays (see Work).",
    ],
  },
  {
    company: "Edana Farms",
    role: "Web Solutions Executive",
    period: "Jan 2022 – Jan 2023",
    where: "E-commerce · Jalandhar",
    points: [
      "Ran the online store: Razorpay payments and Shiprocket deliveries, 20,000 orders a month.",
      "Built internal tools in Node.js, React and MySQL for the HR, Accounts and Sales teams.",
      "Handled SEO, analytics and Meta pixel tracking.",
    ],
  },
  {
    company: "St. Soldier Mgmt. & Technical Institute",
    role: "Assistant Professor, CSE",
    period: "Aug 2021 – Dec 2021",
    where: "Jalandhar",
    points: ["Taught web development, DBMS and SQL, and programming labs."],
  },
  {
    company: "Anand College of Engg. & Mgmt.",
    role: "Assistant Professor, CSE",
    period: "Sep 2020 – Aug 2021",
    where: "Kapurthala",
    points: ["Taught undergraduate Computer Science and mentored students on programming."],
  },
];

/** Only what can be explained in an interview without AI. */
export const CORE_SKILLS = ["Node.js", "Express.js", "JavaScript", "REST API design", "JWT auth", "MySQL", "Git"];

/** Used in real project work. Move one to CORE_SKILLS once it can be explained without AI. */
export const PROJECT_SKILLS = [
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "RabbitMQ",
  "Socket.io",
  "Docker",
  "AWS (S3, SES)",
  "OpenAI API",
  "Pinecone",
];

export const INTEGRATIONS = [
  "Stripe",
  "Razorpay",
  "Shiprocket",
  "Twilio",
  "SendGrid",
  "Firebase",
  "Google Places",
  "Instagram Graph API",
  "Zoom",
  "Mixpanel",
];

export type PrincipleDemo = "no-break" | "same-click" | "really-ran" | "explain";

/** "How I work": each rule is backed by something that really happened. */
export const PRINCIPLES: { title: string; proof: string; demo: PrincipleDemo; label: string }[] = [
  {
    title: "Live apps don't break.",
    proof:
      "When I led the LoopDeco rebuild from Express to NestJS, the driver apps already installed on phones kept working the whole time, checked by 1,200+ tests, including ones that compare the old and new API's answers.",
    demo: "no-break",
    label: "The phone keeps getting answers while the API behind it changes from Express to NestJS.",
  },
  {
    title: "Two people will click at the same time.",
    proof:
      "On LoopDeco a job goes out to every matching driver. The moment one accepts, it's gone for everyone else, so two drivers never turn up for the same pickup.",
    demo: "same-click",
    label: "Two drivers press Accept together; one gets the job, the other sees it's taken.",
  },
  {
    title: "Scheduled isn't the same as running.",
    proof:
      "On LoopDeco I found scheduled batch jobs that had never run in any environment. Now I check that a job actually ran, not just that it's set up.",
    demo: "really-ran",
    label: "A job marked as scheduled shows zero runs before the fix, and real runs after it.",
  },
  {
    title: "If I can't explain it simply, I don't understand it yet.",
    proof:
      "I taught Computer Science for 1.5 years before moving to industry. Explaining something plainly is still how I check that I really get it.",
    demo: "explain",
    label: "A simple diagram draws itself, and a question mark turns into 'got it'.",
  },
];
