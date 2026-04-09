import { User, Request, RequestType, RequestStage, StageTransition, RequestedBy } from '@/types';
import { addBusinessHours, BUSINESS_HOURS } from './tat';

/**
 * Sample user data based on real team CSV
 */
export const SAMPLE_USERS: User[] = [
  {
    id: 'user-divya-krishnan',
    employee_code: 'EMP001',
    name: 'Divya Krishnan',
    email: 'divya.krishnan@squareyards.com',
    level: 'SP&L',
    location: 'Dubai',
    designation: 'Head of Design',
    department: 'Marketing',
    supervisor_code: '',
    supervisor_name: '',
    role: 'admin',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-lalit-bhardwaj',
    employee_code: 'EMP002',
    name: 'Lalit Bhardwaj',
    email: 'lalit.bhardwaj@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AVP - Brand Design',
    department: 'Marketing',
    supervisor_code: 'EMP001',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sukhmani',
    employee_code: 'EMP003',
    name: 'Sukhmani',
    email: 'sukhmani@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AVP',
    department: 'Marketing',
    supervisor_code: 'EMP001',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sunita-mishra',
    employee_code: 'EMP004',
    name: 'Sunita Mishra',
    email: 'sunita.mishra@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Content Strategy Head',
    department: 'Marketing',
    supervisor_code: 'EMP001',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rohit-rajoriya',
    employee_code: 'EMP005',
    name: 'Rohit Rajoriya',
    email: 'rohit.rajoriya@squareyards.com',
    level: 'S2',
    location: 'Mumbai',
    designation: 'Senior Manager',
    department: 'Marketing',
    supervisor_code: 'EMP001',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-kunal-sachdeva',
    employee_code: 'EMP006',
    name: 'Kunal Sachdeva',
    email: 'kunal.sachdeva@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AGM - Content',
    department: 'Marketing',
    supervisor_code: 'EMP004',
    supervisor_name: 'Sunita Mishra',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-shivam-chanana',
    employee_code: 'EMP007',
    name: 'Shivam Chanana',
    email: 'shivam.chanana@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AGM - SEO',
    department: 'Marketing',
    supervisor_code: 'EMP001',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-namita-aggarwal',
    employee_code: 'EMP008',
    name: 'Namita Aggarwal',
    email: 'namita.aggarwal@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Sr. Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'EMP002',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sandeep-chaurasia',
    employee_code: 'EMP009',
    name: 'Sandeep Chaurasia',
    email: 'sandeep.chaurasia@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Brand Design Lead',
    department: 'Marketing',
    supervisor_code: 'EMP002',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-john-antony',
    employee_code: 'EMP010',
    name: 'John Westly Antony',
    email: 'john.antony@squareyards.com',
    level: 'S1',
    location: 'Dubai',
    designation: 'Sr. Videographer',
    department: 'Marketing',
    supervisor_code: 'EMP001',
    supervisor_name: 'Divya Krishnan',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-ankit-rawat',
    employee_code: 'EMP011',
    name: 'Ankit Rawat',
    email: 'ankit.rawat@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Sr. Video Editor',
    department: 'Marketing',
    supervisor_code: 'EMP005',
    supervisor_name: 'Rohit Rajoriya',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rahul-chatterjee',
    employee_code: 'EMP012',
    name: 'Rahul Chatterjee',
    email: 'rahul.chatterjee@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Video Editor',
    department: 'Marketing',
    supervisor_code: 'EMP011',
    supervisor_name: 'Ankit Rawat',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-aaryan-sharma',
    employee_code: 'EMP013',
    name: 'Aaryan Sharma',
    email: 'aaryan.sharma@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Social Media Executive',
    department: 'Marketing',
    supervisor_code: 'EMP004',
    supervisor_name: 'Sunita Mishra',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-prakriti-singh',
    employee_code: 'EMP014',
    name: 'Prakriti Singh',
    email: 'prakriti.singh@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Social Media Executive',
    department: 'Marketing',
    supervisor_code: 'EMP004',
    supervisor_name: 'Sunita Mishra',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-garima-banwala',
    employee_code: 'EMP015',
    name: 'Garima Banwala',
    email: 'garima.banwala@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Sr. Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'EMP002',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rishabh-singh',
    employee_code: 'EMP016',
    name: 'Rishabh Singh',
    email: 'rishabh.singh@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'EMP002',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sidharth-bharti',
    employee_code: 'EMP017',
    name: 'Sidharth Bharti',
    email: 'sidharth.bharti@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'EMP002',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-akash-bhatt',
    employee_code: 'EMP018',
    name: 'Akash Bhatt',
    email: 'akash.bhatt@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Video Editor',
    department: 'Marketing',
    supervisor_code: 'EMP011',
    supervisor_name: 'Ankit Rawat',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-himani-rajput',
    employee_code: 'EMP019',
    name: 'Himani Rajput',
    email: 'himani.rajput@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Video Editor',
    department: 'Marketing',
    supervisor_code: 'EMP011',
    supervisor_name: 'Ankit Rawat',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-abhay-gupta',
    employee_code: 'EMP020',
    name: 'Abhay Gupta',
    email: 'abhay.gupta@squareyards.com',
    level: 'S1',
    location: 'Mumbai',
    designation: 'Sr. Videographer',
    department: 'Marketing',
    supervisor_code: 'EMP005',
    supervisor_name: 'Rohit Rajoriya',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper exports (used by existing pages + new performance pages)
// ─────────────────────────────────────────────────────────────────────────────

/** Format a Date/ISO string as YYYY-MM-DD. */
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return date.toISOString().split('T')[0];
}

export function getStagesForType(type: RequestType): RequestStage[] {
  switch (type) {
    case 'Video':
      return [
        'Assigned', 'Planning', 'Shooting Scheduled', 'Shoot Done',
        'Editing In Progress', 'Editing Done', 'Ready to Upload',
        'Change Req', 'Uploaded',
      ];
    case 'Social Media Graphics':
    case 'Graphics':
      return [
        'Assigned', 'Content', 'Design In Progress', 'Design Done',
        'Ready to Upload', 'Change Req', 'Done',
      ];
    default:
      return [];
  }
}

export function getUserById(userId?: string): User | undefined {
  if (!userId) return undefined;
  return SAMPLE_USERS.find((u) => u.id === userId);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function isFinal(req: Request): boolean {
  return req.current_stage === 'Done' || req.current_stage === 'Uploaded' ||
    req.current_stage === 'Ready to Upload';
}

export function isFinalStage(req: Request): boolean {
  return isFinal(req);
}

export function isOverdue(needBy: string | Request): boolean {
  let needByDate: Date;
  let finalRequest = false;

  if (typeof needBy === 'string') {
    needByDate = new Date(needBy);
  } else {
    needByDate = new Date(needBy.need_by);
    finalRequest = isFinal(needBy);
  }

  if (finalRequest) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return needByDate < today;
}

export function getDaysUntilDue(needBy: string): number {
  const needByDate = new Date(needBy);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  needByDate.setHours(0, 0, 0, 0);
  const diffTime = needByDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculate days spent in a given stage (approximation for legacy pages).
 * Prefer the business-hours functions in `@/lib/tat` for real calculations.
 */
export function getStageTAT(
  req: Request,
  fromStage: string,
  toStage: string
): number {
  const transitions = req.transitions ?? [];
  const fromT = transitions.find((t) => t.to_stage === fromStage);
  const toT = transitions.find((t) => t.to_stage === toStage);
  if (!fromT || !toT) return 0;
  const diff = new Date(toT.transitioned_at).getTime() - new Date(fromT.transitioned_at).getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Total calendar days from creation to latest transition (legacy helper).
 */
export function getTotalTAT(req: Request): number {
  const created = new Date(req.created_at).getTime();
  const transitions = req.transitions ?? [];
  const last = transitions.length
    ? new Date(transitions[transitions.length - 1].transitioned_at).getTime()
    : new Date(req.updated_at).getTime();
  const diff = Math.max(0, last - created);
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic data generator for Q1 2026 (+ in-flight April 2026)
// ─────────────────────────────────────────────────────────────────────────────

/** Mulberry32 — tiny deterministic PRNG. */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260109); // fixed seed for reproducible data

function randBetween(min: number, max: number): number {
  return min + rand() * (max - min);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(randBetween(min, max + 1));
}

function idFor(prefix: string, n: number): string {
  return `${prefix}-${String(n).padStart(4, '0')}`;
}

/**
 * Maker speed/quality profiles.
 *
 * speedMul   — multiplier against baseline active hours (1.0 = baseline).
 *              <1 means faster, >1 means slower.
 * crRate     — probability a delivered request receives a Change Req afterward.
 * volWeight  — relative share of total deliveries for this maker.
 */
interface MakerProfile {
  userId: string;
  type: 'Graphics' | 'Video';
  speedMul: number;
  crRate: number;
  volWeight: number;
  label: 'top' | 'average' | 'low';
}

const MAKER_PROFILES: MakerProfile[] = [
  // Graphics — 5 makers (handle both 'Graphics' and 'Social Media Graphics')
  { userId: 'user-namita-aggarwal',  type: 'Graphics', speedMul: 0.55, crRate: 0.08, volWeight: 1.3, label: 'top' },
  { userId: 'user-sandeep-chaurasia', type: 'Graphics', speedMul: 0.75, crRate: 0.18, volWeight: 1.1, label: 'average' },
  { userId: 'user-garima-banwala',    type: 'Graphics', speedMul: 0.85, crRate: 0.22, volWeight: 1.0, label: 'average' },
  { userId: 'user-rishabh-singh',     type: 'Graphics', speedMul: 1.00, crRate: 0.28, volWeight: 0.9, label: 'average' },
  { userId: 'user-sidharth-bharti',   type: 'Graphics', speedMul: 1.55, crRate: 0.42, volWeight: 0.8, label: 'low' },

  // Video — 6 makers
  { userId: 'user-john-antony',      type: 'Video', speedMul: 0.60, crRate: 0.08, volWeight: 1.3, label: 'top' },
  { userId: 'user-ankit-rawat',      type: 'Video', speedMul: 0.78, crRate: 0.16, volWeight: 1.2, label: 'average' },
  { userId: 'user-rahul-chatterjee', type: 'Video', speedMul: 0.90, crRate: 0.22, volWeight: 1.0, label: 'average' },
  { userId: 'user-akash-bhatt',      type: 'Video', speedMul: 1.00, crRate: 0.28, volWeight: 0.9, label: 'average' },
  { userId: 'user-himani-rajput',    type: 'Video', speedMul: 1.65, crRate: 0.38, volWeight: 0.8, label: 'low' },
  { userId: 'user-abhay-gupta',      type: 'Video', speedMul: 1.85, crRate: 0.44, volWeight: 0.7, label: 'low' },
];

const GRAPHICS_TITLES = [
  'Product Launch Graphics Set',
  'Email Campaign Header Banner',
  'Google Ads Banner Set',
  'Facebook Ads Creatives',
  'LinkedIn Carousel — Market Report',
  'Instagram Story Templates',
  'Blog Post Featured Images',
  'Festival Season Campaign Graphics',
  'Newsletter Hero Banners',
  'Twitter Campaign Graphics',
  'Landing Page Hero Banner',
  'Event Invite Graphics',
  'Sales Deck Title Slide',
  'Display Ad Retargeting Set',
  'Brochure Refresh',
  'Quarterly Report Infographics',
  'Podcast Episode Art',
  'Referral Program Banner',
  'Dubai Expo Creative Kit',
  'Mumbai Project Launch Creative',
  'Gurugram Listing Carousel',
  'Property of the Week Graphic',
  'Price Cut Alert Banner',
  'EMI Offer Social Tile',
];

const VIDEO_TITLES = [
  'Company Culture Video',
  'Product Demo Video',
  'Employee Testimonial Videos',
  'Office Tour Video',
  'Annual Report Video',
  'Sales Pitch Video',
  'Client Success Story',
  'Investor Update Reel',
  'Founder Message — Q1',
  'New Hire Welcome Video',
  'Brand Anthem Short',
  'Expo Highlights Reel',
  'Builder Interview — Dubai',
  'Property Walkthrough — Gurgaon',
  'Market Outlook Explainer',
  'Campaign Launch Teaser',
  'Festival Greetings Reel',
  'Behind the Scenes',
];

const REQUESTORS: readonly RequestedBy[] = [
  'Social Team', 'Management', 'Sales Team', 'Marketing',
  'Paid Campaign', 'SEO', 'HR',
];

const REQUESTOR_NAMES: Record<string, string> = {
  'Social Team': 'Aaryan Sharma',
  'Management': 'Divya Krishnan',
  'Sales Team': 'Rohit Rajoriya',
  'Marketing': 'Sunita Mishra',
  'Paid Campaign': 'Kunal Sachdeva',
  'SEO': 'Shivam Chanana',
  'HR': 'Lalit Bhardwaj',
  'Admin': 'Divya Krishnan',
  'Tech': 'Divya Krishnan',
  'Others': 'Divya Krishnan',
};

const REQUESTOR_IDS: Record<string, string> = {
  'Social Team': 'user-aaryan-sharma',
  'Management': 'user-divya-krishnan',
  'Sales Team': 'user-rohit-rajoriya',
  'Marketing': 'user-sunita-mishra',
  'Paid Campaign': 'user-kunal-sachdeva',
  'SEO': 'user-shivam-chanana',
  'HR': 'user-lalit-bhardwaj',
  'Admin': 'user-divya-krishnan',
  'Tech': 'user-divya-krishnan',
  'Others': 'user-divya-krishnan',
};

/**
 * Pick a random business-hour start timestamp within the given date range
 * (inclusive). Returns ISO with IST offset.
 */
function pickBusinessStart(fromISO: string, toISO: string): string {
  const from = new Date(fromISO).getTime();
  const to = new Date(toISO).getTime();
  // Try up to 30 times to find a weekday
  for (let i = 0; i < 30; i++) {
    const t = from + rand() * (to - from);
    const d = new Date(t);
    // Project to IST wall clock
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: BUSINESS_HOURS.timezone,
      year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
    });
    const parts = fmt.formatToParts(d);
    const get = (k: string) => parts.find((p) => p.type === k)?.value ?? '';
    const wdMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const wd = wdMap[get('weekday')] ?? 0;
    if (wd >= 1 && wd <= 5) {
      const y = get('year');
      const m = get('month');
      const dd = get('day');
      const startHour = 10 + randInt(0, 2); // 10am-12pm start
      const startMin = randInt(0, 59);
      return `${y}-${m}-${dd}T${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}:00+05:30`;
    }
  }
  // Fallback — Monday start of range
  return fromISO;
}

/** Build a transition log event. */
function mkTransition(
  reqId: string,
  from: RequestStage | null,
  to: RequestStage,
  at: string,
  by: string,
  note?: string
): StageTransition {
  return {
    id: `tr-${reqId}-${to.replace(/\s+/g, '-').toLowerCase()}-${rand().toString(36).slice(2, 8)}`,
    request_id: reqId,
    from_stage: from,
    to_stage: to,
    transitioned_at: at,
    transitioned_by: by,
    note,
  };
}

// Baseline active hours per stage (before speedMul).
// These are tuned so that an "average" maker (speedMul=1) lands close to SLA.
const GRAPHICS_STAGE_BASELINE: Array<{
  stage: RequestStage;
  hours: [number, number]; // min/max active business hours
  pause?: [number, number]; // optional waiting hours (pauses the clock)
}> = [
  { stage: 'Assigned',           hours: [0.25, 0.75] },
  { stage: 'Content',            hours: [0.25, 0.5], pause: [0.5, 3] }, // waiting for content
  { stage: 'Design In Progress', hours: [3, 5] },
  { stage: 'Design Done',        hours: [0.25, 1] },
];

const VIDEO_STAGE_BASELINE: Array<{
  stage: RequestStage;
  hours: [number, number];
  pause?: [number, number];
}> = [
  { stage: 'Assigned',            hours: [0.5, 1.5] },
  { stage: 'Planning',            hours: [4, 8] },
  { stage: 'Shooting Scheduled',  hours: [0.25, 0.5], pause: [9, 18] }, // wait for shoot date
  { stage: 'Shoot Done',          hours: [1, 3] },
  { stage: 'Editing In Progress', hours: [14, 22] },
  { stage: 'Editing Done',        hours: [1, 3] },
];

interface GenerateContext {
  counter: number;
}

function generateRequest(
  profile: MakerProfile,
  startISO: string,
  ctx: GenerateContext,
  opts: { stopAt?: RequestStage; withChangeReq?: boolean } = {}
): Request & { transitions: StageTransition[] } {
  ctx.counter += 1;
  const reqId = idFor('req', ctx.counter);

  // Choose type: graphics makers split between 'Graphics' and 'Social Media Graphics'
  const type: RequestType =
    profile.type === 'Video'
      ? 'Video'
      : rand() < 0.45
      ? 'Social Media Graphics'
      : 'Graphics';

  const title =
    profile.type === 'Video' ? pick(VIDEO_TITLES) : pick(GRAPHICS_TITLES);
  const requestedBy = pick(REQUESTORS);
  const requestorName = REQUESTOR_NAMES[requestedBy] ?? 'Divya Krishnan';
  const requestorId = REQUESTOR_IDS[requestedBy] ?? 'user-divya-krishnan';

  const baseline = profile.type === 'Video' ? VIDEO_STAGE_BASELINE : GRAPHICS_STAGE_BASELINE;
  const transitions: StageTransition[] = [];

  // Start in Assigned
  let cursor = startISO;
  transitions.push(mkTransition(reqId, null, 'Assigned', cursor, profile.userId));

  // Walk through the work stages
  for (let i = 0; i < baseline.length; i++) {
    const step = baseline[i];
    const active = randBetween(step.hours[0], step.hours[1]) * profile.speedMul;

    // Time the maker spends IN this stage (active work)
    const endOfStage = addBusinessHours(cursor, active);

    // If there is a pause component (e.g. 'Content' or 'Shooting Scheduled'),
    // the pause HOURS are added as wall-clock (not business hours) after
    // the active portion. We model this by jumping the cursor forward.
    let nextCursor = endOfStage;
    if (step.pause) {
      const pauseHours = randBetween(step.pause[0], step.pause[1]) * profile.speedMul;
      // Pause is wall-clock time, not business-adjusted (waiting clock)
      nextCursor = new Date(new Date(endOfStage).getTime() + pauseHours * 3_600_000).toISOString();
    }

    // Transition INTO next stage
    const nextStage = baseline[i + 1]?.stage ?? (profile.type === 'Video' ? 'Ready to Upload' : 'Ready to Upload') as RequestStage;
    cursor = nextCursor;
    if (opts.stopAt && step.stage === opts.stopAt) {
      // We've passed the target; return early with current_stage = opts.stopAt
      break;
    }
    transitions.push(mkTransition(reqId, step.stage, nextStage, cursor, profile.userId));

    if (opts.stopAt && nextStage === opts.stopAt) {
      break;
    }
  }

  // Handle explicit early-stop (in-flight request that never reached Ready to Upload)
  const lastStage = transitions[transitions.length - 1].to_stage;

  // If not stopped early, the last stage is Ready to Upload. Optionally add a
  // change request loop, then finalize.
  const reachedDelivery = lastStage === 'Ready to Upload';
  let revisions = 0;

  if (reachedDelivery && opts.withChangeReq !== false) {
    const willHaveCR = rand() < profile.crRate;
    if (willHaveCR) {
      revisions = 1 + (rand() < 0.25 ? 1 : 0);
      // Reviewer raises a change request ~4-10 wall hours after delivery
      const crStart = new Date(
        new Date(cursor).getTime() + randBetween(4, 10) * 3_600_000
      ).toISOString();
      transitions.push(
        mkTransition(reqId, 'Ready to Upload', 'Change Req', crStart, requestorId, 'Reviewer feedback')
      );

      // Rework — active hours against maker
      const reworkActive = randBetween(1, 3) * profile.speedMul;
      const reworkEnd = addBusinessHours(crStart, reworkActive);
      const backStage: RequestStage = profile.type === 'Video' ? 'Editing In Progress' : 'Design In Progress';
      transitions.push(mkTransition(reqId, 'Change Req', backStage, crStart, profile.userId));
      transitions.push(mkTransition(reqId, backStage, 'Ready to Upload', reworkEnd, profile.userId));
      cursor = reworkEnd;

      // Second CR round for some of them
      if (revisions === 2) {
        const cr2Start = new Date(
          new Date(cursor).getTime() + randBetween(3, 8) * 3_600_000
        ).toISOString();
        transitions.push(
          mkTransition(reqId, 'Ready to Upload', 'Change Req', cr2Start, requestorId, 'Second pass feedback')
        );
        const r2End = addBusinessHours(cr2Start, randBetween(0.5, 2) * profile.speedMul);
        transitions.push(mkTransition(reqId, 'Change Req', backStage, cr2Start, profile.userId));
        transitions.push(mkTransition(reqId, backStage, 'Ready to Upload', r2End, profile.userId));
        cursor = r2End;
      }
    }
  }

  // Determine current_stage from the last transition
  const currentStage = transitions[transitions.length - 1].to_stage;

  // need_by = 2-5 wall days after created, kept in past for delivered requests
  const createdAt = transitions[0].transitioned_at;
  const needByMs = new Date(createdAt).getTime() + randInt(2, 7) * 24 * 3_600_000;
  const needBy = formatDate(new Date(needByMs));

  return {
    id: reqId,
    type,
    requested_by: requestedBy,
    title,
    description: `${title} — requested by ${requestorName}.`,
    requestor_name: requestorName,
    requestor_id: requestorId,
    need_by: needBy,
    reference_link: rand() < 0.5 ? `https://brief.squareyards.com/${reqId}` : undefined,
    current_stage: currentStage,
    assigned_to: profile.userId,
    social_poc: requestedBy === 'Social Team' ? 'user-aaryan-sharma' : undefined,
    video_poc: profile.type === 'Video' ? profile.userId : undefined,
    upload_poc: profile.userId,
    revisions,
    created_at: createdAt,
    updated_at: cursor,
    transitions,
  };
}

/**
 * Weighted distribution of deliveries per maker across a time window.
 */
function distributeDeliveries(
  totalDeliveries: number,
  profiles: MakerProfile[]
): Map<string, number> {
  const totalWeight = profiles.reduce((s, p) => s + p.volWeight, 0);
  const result = new Map<string, number>();
  let allocated = 0;
  profiles.forEach((p, i) => {
    const share = Math.round((totalDeliveries * p.volWeight) / totalWeight);
    // Last one absorbs rounding
    const count = i === profiles.length - 1 ? totalDeliveries - allocated : share;
    allocated += count;
    result.set(p.userId, count);
  });
  return result;
}

/**
 * Build the full sample set:
 *   • ~90 delivered requests across Q1 2026
 *   • ~15 in-flight requests in early April 2026
 */
export function generateSampleRequests(): Request[] {
  const ctx: GenerateContext = { counter: 0 };
  const requests: Request[] = [];

  // ── Q1 2026 delivered ────────────────────────────────────────────────────
  const Q1_START = '2026-01-05T10:00:00+05:30';
  const Q1_END = '2026-03-27T19:00:00+05:30';
  const TOTAL_Q1 = 92;

  const distribution = distributeDeliveries(TOTAL_Q1, MAKER_PROFILES);

  for (const profile of MAKER_PROFILES) {
    const count = distribution.get(profile.userId) ?? 0;
    for (let i = 0; i < count; i++) {
      const start = pickBusinessStart(Q1_START, Q1_END);
      const req = generateRequest(profile, start, ctx);
      requests.push(req);
    }
  }

  // ── April 2026 in-flight (current quarter) ───────────────────────────────
  const APRIL_START = '2026-04-01T10:00:00+05:30';
  const APRIL_END = '2026-04-08T17:00:00+05:30';

  const IN_FLIGHT_TARGETS: Array<{
    profile: MakerProfile;
    stopAt: RequestStage;
  }> = [
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-namita-aggarwal')!,  stopAt: 'Design In Progress' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-sandeep-chaurasia')!, stopAt: 'Content' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-garima-banwala')!,    stopAt: 'Design Done' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-rishabh-singh')!,     stopAt: 'Assigned' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-sidharth-bharti')!,   stopAt: 'Design In Progress' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-john-antony')!,       stopAt: 'Shooting Scheduled' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-ankit-rawat')!,       stopAt: 'Editing In Progress' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-rahul-chatterjee')!,  stopAt: 'Planning' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-akash-bhatt')!,       stopAt: 'Editing In Progress' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-himani-rajput')!,     stopAt: 'Shoot Done' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-abhay-gupta')!,       stopAt: 'Editing In Progress' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-namita-aggarwal')!,   stopAt: 'Assigned' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-john-antony')!,       stopAt: 'Planning' },
    { profile: MAKER_PROFILES.find((p) => p.userId === 'user-sandeep-chaurasia')!, stopAt: 'Design In Progress' },
  ];

  for (const target of IN_FLIGHT_TARGETS) {
    const start = pickBusinessStart(APRIL_START, APRIL_END);
    const req = generateRequest(target.profile, start, ctx, {
      stopAt: target.stopAt,
      withChangeReq: false,
    });
    requests.push(req);
  }

  // Sort newest first
  requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return requests;
}

export const SAMPLE_REQUESTS: Request[] = generateSampleRequests();
