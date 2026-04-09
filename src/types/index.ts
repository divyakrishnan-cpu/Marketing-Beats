/**
 * User entity types and roles
 */
export type UserLevel = 'S0' | 'S1' | 'S2' | 'S3' | 'SP&L' | 'SE';
export type UserRole = 'admin' | 'manager' | 'designer' | 'viewer';

export interface User {
  id: string;
  employee_code: string;
  name: string;
  email?: string;
  level?: UserLevel;
  location?: string;
  designation?: string;
  department: string;
  supervisor_code?: string;
  supervisor_name?: string;
  role: UserRole;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Request entity types
 */
export type RequestType = 'Video' | 'Social Media Graphics' | 'Graphics';
export type RequestedBy = 'Social Team' | 'Management' | 'Sales Team' | 'Admin' | 'Tech' | 'HR' | 'SEO' | 'Paid Campaign' | 'Marketing' | 'Others';

export type GraphicsStage = 'Assigned' | 'Content' | 'Design In Progress' | 'Design Done' | 'Ready to Upload' | 'Change Req' | 'Done';
export type VideoStage = 'Assigned' | 'Planning' | 'Shooting Scheduled' | 'Shoot Done' | 'Editing In Progress' | 'Editing Done' | 'Ready to Upload' | 'Change Req' | 'Uploaded';

export type RequestStage = GraphicsStage | VideoStage;

export interface Request {
  id: string;
  type: RequestType;
  requested_by: RequestedBy;
  title: string;
  description?: string;
  requestor_name: string;
  requestor_id?: string;
  need_by: string; // DATE format: YYYY-MM-DD
  reference_link?: string;
  current_stage: RequestStage;
  assigned_to?: string;
  social_poc?: string;
  video_poc?: string;
  upload_poc?: string;
  shoot_date?: string; // DATE format: YYYY-MM-DD
  revisions: number;
  /** ISO timestamp when the request was raised. */
  created_at: string;
  /** ISO timestamp when the request was last touched. */
  updated_at: string;
  /** Append-only log of stage transitions. Primary source of truth for TAT. */
  transitions: StageTransition[];
  /** @deprecated Kept only for backwards-compat with older pages. Use `transitions`. */
  stage_timestamps?: Record<string, string>;
}

/**
 * Append-only record of a stage transition.
 * `from_stage` is null only for the very first entry (creation).
 */
export interface StageTransition {
  id: string;
  request_id: string;
  from_stage: RequestStage | null;
  to_stage: RequestStage;
  /** ISO 8601 with offset, e.g. "2026-03-14T11:45:00+05:30" */
  transitioned_at: string;
  /** User who triggered the transition. */
  transitioned_by: string;
  note?: string;
}

/**
 * Social calendar entity
 */
export type SocialPlatform = 'Instagram' | 'LinkedIn' | 'Facebook' | 'X/Twitter' | 'YouTube';
export type SocialContentType = 'Static' | 'Carousel' | 'Reel' | 'Story' | 'Video' | 'Thread';

export interface SocialCalendarEntry {
  id: string;
  title: string;
  platform?: SocialPlatform;
  content_type?: SocialContentType;
  scheduled_date: string; // DATE format: YYYY-MM-DD
  caption?: string;
  hashtags?: string[];
  request_id?: string;
  created_by?: string;
  created_at: string;
}

/**
 * Workflow constants and TAT categories
 */
export const REQUEST_TYPES: RequestType[] = [
  'Video',
  'Social Media Graphics',
  'Graphics'
];

export const REQUESTED_BY_OPTIONS: RequestedBy[] = [
  'Social Team',
  'Management',
  'Sales Team',
  'Admin',
  'Tech',
  'HR',
  'SEO',
  'Paid Campaign',
  'Marketing',
  'Others'
];

export const GRAPHICS_STAGES: GraphicsStage[] = [
  'Assigned',
  'Content',
  'Design In Progress',
  'Design Done',
  'Ready to Upload',
  'Change Req',
  'Done'
];

export const VIDEO_STAGES: VideoStage[] = [
  'Assigned',
  'Planning',
  'Shooting Scheduled',
  'Shoot Done',
  'Editing In Progress',
  'Editing Done',
  'Ready to Upload',
  'Change Req',
  'Uploaded'
];

export const USER_ROLES: UserRole[] = [
  'admin',
  'manager',
  'designer',
  'viewer'
];

export const USER_LEVELS: UserLevel[] = [
  'S0',
  'S1',
  'S2',
  'S3',
  'SP&L',
  'SE'
];

/**
 * TAT (Turn Around Time) Categories for each request type
 */
export interface StageTAT {
  stage: RequestStage;
  days: number;
  description: string;
}

export const GRAPHICS_TAT_CATEGORIES: StageTAT[] = [
  { stage: 'Assigned', days: 1, description: 'Assignment to team' },
  { stage: 'Content', days: 2, description: 'Content preparation' },
  { stage: 'Design In Progress', days: 3, description: 'Design execution' },
  { stage: 'Design Done', days: 1, description: 'Design completion' },
  { stage: 'Ready to Upload', days: 1, description: 'Upload preparation' },
  { stage: 'Change Req', days: 2, description: 'Revision cycle' },
  { stage: 'Done', days: 0, description: 'Final delivery' }
];

export const VIDEO_TAT_CATEGORIES: StageTAT[] = [
  { stage: 'Assigned', days: 2, description: 'Assignment to team' },
  { stage: 'Planning', days: 3, description: 'Concept & planning' },
  { stage: 'Shooting Scheduled', days: 2, description: 'Shoot scheduling' },
  { stage: 'Shoot Done', days: 2, description: 'Shoot execution' },
  { stage: 'Editing In Progress', days: 5, description: 'Video editing' },
  { stage: 'Editing Done', days: 1, description: 'Editing completion' },
  { stage: 'Ready to Upload', days: 1, description: 'Upload preparation' },
  { stage: 'Change Req', days: 3, description: 'Revision cycle' },
  { stage: 'Uploaded', days: 0, description: 'Final delivery' }
];

export const SOCIAL_MEDIA_GRAPHICS_TAT_CATEGORIES: StageTAT[] = [
  { stage: 'Assigned', days: 1, description: 'Assignment to team' },
  { stage: 'Content', days: 1, description: 'Content preparation' },
  { stage: 'Design In Progress', days: 2, description: 'Design execution' },
  { stage: 'Design Done', days: 1, description: 'Design completion' },
  { stage: 'Ready to Upload', days: 1, description: 'Upload preparation' },
  { stage: 'Change Req', days: 1, description: 'Revision cycle' },
  { stage: 'Done', days: 0, description: 'Final delivery' }
];

/**
 * Helper function to get TAT categories based on request type
 */
export function getTATCategoriesForType(type: RequestType): StageTAT[] {
  switch (type) {
    case 'Video':
      return VIDEO_TAT_CATEGORIES;
    case 'Social Media Graphics':
      return SOCIAL_MEDIA_GRAPHICS_TAT_CATEGORIES;
    case 'Graphics':
      return GRAPHICS_TAT_CATEGORIES;
    default:
      return [];
  }
}

/**
 * Helper function to get stages based on request type
 */
export function getStagesForType(type: RequestType): RequestStage[] {
  switch (type) {
    case 'Video':
      return VIDEO_STAGES;
    case 'Social Media Graphics':
      return GRAPHICS_STAGES;
    case 'Graphics':
      return GRAPHICS_STAGES;
    default:
      return [];
  }
}

/**
 * Role level hierarchy
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 4,
  manager: 3,
  designer: 2,
  viewer: 1
};

/**
 * Helper function to check if user has permission
 */
export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Map level to role
 */
export function levelToRole(level: UserLevel): UserRole {
  switch (level) {
    case 'SP&L':
      return 'admin';
    case 'S3':
      return 'manager';
    case 'S2':
      return 'manager';
    case 'S1':
      return 'designer';
    case 'S0':
    case 'SE':
    default:
      return 'viewer';
  }
}
