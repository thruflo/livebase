import type { LeadStage, LeadStatus, SubjectType } from "~/db/schema";
import type { Tone } from "~/lib/types";

// The app has no authentication yet: every browser shares this seeded
// workspace and user.
export const DEMO_WORKSPACE_ID = "0199a000-0000-7000-8000-000000000001";
export const DEMO_WORKSPACE_NAME = "Livebase demo";
export const DEMO_USER_ID = "0199a000-0000-7000-8000-000000000002";
export const DEMO_USER_NAME = "Demo user";
export const DEMO_USER_EMAIL = "demo@livebase.example";

export const LEAD_STAGES = ["new", "contacted", "qualified", "won", "lost"] as const satisfies readonly LeadStage[];

export const STAGE_LABELS: Record<LeadStage, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  won: "Won",
  lost: "Lost",
};

export const STAGE_TONES: Record<LeadStage, Tone> = {
  new: "neutral",
  contacted: "blue",
  qualified: "purple",
  won: "green",
  lost: "red",
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  extracting: "Extracting",
  enriching: "Enriching",
  ready: "Ready",
  failed: "Failed",
};

export const PROCESSING_STATUSES = ["extracting", "enriching"] as const satisfies readonly LeadStatus[];

// Editing any of these restarts the lead's enrichment. Stage and archived
// don't.
export const LEAD_DATA_FIELDS = ["title", "value", "summary", "nextStep"] as const;

export const AGENT_IDS = {
  extraction: "extraction-agent",
  enrichment: "enrichment-agent",
} as const;

export const MAX_INPUT_LENGTH = 10_000;

// Shared by the server's validation and the editors' `maxLength`. `field` is
// any other free-text person or company field. `url` caps the URLs that only
// enrichment writes (image URLs, finding sources): they're never edited, and
// CDN image URLs often carry long query strings.
export const MAX_LENGTHS = { title: 200, nextStep: 500, summary: 2000, field: 500, url: 2000 } as const;

// Enrichment findings

// What enrichment may record about each subject, as `findings.label`.
// `finding-mapping.ts` gives each label's value format and the column it
// fills.
export const FINDING_LABELS = {
  company: [
    "name",
    "domain",
    "description",
    "industry",
    "size_band",
    "hq_location",
    "founded_year",
    "logo_url",
    "social_links",
    "recent_news",
    "funding",
  ],
  person: ["name", "title", "seniority", "public_profiles", "avatar_url"],
  lead: ["fit_score", "next_step"],
} as const satisfies Record<SubjectType, readonly string[]>;

export type FindingLabel = (typeof FINDING_LABELS)[SubjectType][number];

// A subject-qualified label, such as "company.domain".
export type FindingKey = { [S in SubjectType]: `${S}.${(typeof FINDING_LABELS)[S][number]}` }[SubjectType];

// Labels that hold several values, one finding per value. The others keep
// only their latest finding.
export const MULTI_VALUED_FINDINGS: ReadonlySet<FindingKey> = new Set<FindingKey>([
  "company.social_links",
  "company.recent_news",
  "person.public_profiles",
]);

// Employee-count bands for `company.size_band`.
export const SIZE_BANDS = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10001+"] as const;

export const SENIORITIES = ["founder", "c_level", "vp", "director", "manager", "individual_contributor"] as const;

// Colleagues one enrichment run may add. The record tool enforces it through
// the run budget's "colleague" counter.
export const MAX_COLLEAGUES = 6;

// One-click demo inputs, one per input shape: notes with a company domain and
// a GitHub URL, a name plus a LinkedIn URL, and a name and company with no
// domain. None gives an email address. The people are real; the notes around
// them are made up and attribute nothing to them.
export const SAMPLE_INPUTS: readonly { readonly label: string; readonly text: string }[] = [
  {
    label: "Meeting notes",
    text: "call w/ james arthur, ceo & co-founder at electric (electric.ax) — github.com/thruflo. small team, moves fast. wants realtime dashboards for sync events, maybe 20 seats. send a demo invite this month",
  },
  {
    label: "LinkedIn profile",
    text: "Stas Kelvich — https://www.linkedin.com/in/kelvich — accepted my connection request, open to a short intro call next week",
  },
  {
    label: "Name and company",
    text: "Sam Bhagwat, CEO & co-founder at Mastra, previously Gatsby — asked about pricing for a team of five, wants a short technical call",
  },
];
