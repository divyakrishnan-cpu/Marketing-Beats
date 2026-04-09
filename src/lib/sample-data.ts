import { User, Request, RequestType } from '@/types';

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

/**
 * Helper function to generate a simple ID
 */
function generateId(): string {
  return 'req-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Helper function to add/subtract days from a date
 */
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Helper to format date to ISO string (YYYY-MM-DD)
 */
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return date.toISOString().split('T')[0];
}

/**
 * Generate sample request data
 */
export function generateSampleRequests(): Request[] {
  const today = new Date();
  const requests: Request[] = [];

  // Request 1: Completed Graphics Request
  requests.push({
    id: generateId(),
    type: 'Graphics',
    requested_by: 'Social Team',
    title: 'Product Launch Graphics Set',
    description: 'Design graphics for new product launch campaign across social media',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, -5)),
    reference_link: 'https://example.com/product-launch',
    current_stage: 'Done',
    assigned_to: 'user-namita-aggarwal',
    social_poc: 'user-aaryan-sharma',
    upload_poc: 'user-namita-aggarwal',
    revisions: 1,
    created_at: formatDate(addDays(today, -15)),
    updated_at: formatDate(addDays(today, -5)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -15)),
      'Content': formatDate(addDays(today, -14)),
      'Design In Progress': formatDate(addDays(today, -12)),
      'Design Done': formatDate(addDays(today, -8)),
      'Ready to Upload': formatDate(addDays(today, -6)),
      'Change Req': formatDate(addDays(today, -6)),
      'Done': formatDate(addDays(today, -5)),
    },
  });

  // Request 2: Completed Video Request
  requests.push({
    id: generateId(),
    type: 'Video',
    requested_by: 'Management',
    title: 'Company Culture Video',
    description: 'Create a 2-minute video showcasing company culture and values',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, -3)),
    reference_link: 'https://example.com/culture-video-brief',
    current_stage: 'Uploaded',
    assigned_to: 'user-john-antony',
    video_poc: 'user-john-antony',
    upload_poc: 'user-ankit-rawat',
    shoot_date: formatDate(addDays(today, -10)),
    revisions: 0,
    created_at: formatDate(addDays(today, -20)),
    updated_at: formatDate(addDays(today, -3)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -20)),
      'Planning': formatDate(addDays(today, -19)),
      'Shooting Scheduled': formatDate(addDays(today, -15)),
      'Shoot Done': formatDate(addDays(today, -10)),
      'Editing In Progress': formatDate(addDays(today, -8)),
      'Editing Done': formatDate(addDays(today, -4)),
      'Ready to Upload': formatDate(addDays(today, -3)),
      'Change Req': formatDate(addDays(today, -3)),
      'Uploaded': formatDate(addDays(today, -3)),
    },
  });

  // Request 3: Overdue Graphics Request
  requests.push({
    id: generateId(),
    type: 'Social Media Graphics',
    requested_by: 'Social Team',
    title: 'Instagram Story Templates',
    description: 'Design 10 reusable Instagram story templates for regular posting',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, -8)),
    reference_link: 'https://example.com/ig-templates',
    current_stage: 'Design In Progress',
    assigned_to: 'user-sandeep-chaurasia',
    social_poc: 'user-prakriti-singh',
    upload_poc: 'user-aaryan-sharma',
    revisions: 2,
    created_at: formatDate(addDays(today, -12)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -12)),
      'Content': formatDate(addDays(today, -11)),
      'Design In Progress': formatDate(addDays(today, -10)),
    },
  });

  // Request 4: In Progress Video Request
  requests.push({
    id: generateId(),
    type: 'Video',
    requested_by: 'Marketing',
    title: 'Product Demo Video',
    description: 'Create a 60-second product demo video for website landing page',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 7)),
    reference_link: 'https://example.com/product-demo',
    current_stage: 'Editing In Progress',
    assigned_to: 'user-abhay-gupta',
    video_poc: 'user-abhay-gupta',
    upload_poc: 'user-ankit-rawat',
    shoot_date: formatDate(addDays(today, -2)),
    revisions: 0,
    created_at: formatDate(addDays(today, -8)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -8)),
      'Planning': formatDate(addDays(today, -7)),
      'Shooting Scheduled': formatDate(addDays(today, -5)),
      'Shoot Done': formatDate(addDays(today, -2)),
      'Editing In Progress': formatDate(addDays(today, -1)),
    },
  });

  // Request 5: In Progress Graphics Request
  requests.push({
    id: generateId(),
    type: 'Graphics',
    requested_by: 'Sales Team',
    title: 'Email Campaign Header Banner',
    description: 'Design header banners for upcoming email marketing campaign',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 5)),
    reference_link: 'https://example.com/email-campaign',
    current_stage: 'Design In Progress',
    assigned_to: 'user-namita-aggarwal',
    social_poc: 'user-sunita-mishra',
    upload_poc: 'user-namita-aggarwal',
    revisions: 0,
    created_at: formatDate(addDays(today, -4)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -4)),
      'Content': formatDate(addDays(today, -3)),
      'Design In Progress': formatDate(addDays(today, -2)),
    },
  });

  // Request 6: Change Request
  requests.push({
    id: generateId(),
    type: 'Social Media Graphics',
    requested_by: 'Social Team',
    title: 'LinkedIn Article Graphics',
    description: 'Design graphics to accompany LinkedIn article posts',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, -2)),
    reference_link: 'https://example.com/linkedin-posts',
    current_stage: 'Change Req',
    assigned_to: 'user-sandeep-chaurasia',
    social_poc: 'user-aaryan-sharma',
    upload_poc: 'user-aaryan-sharma',
    revisions: 3,
    created_at: formatDate(addDays(today, -10)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -10)),
      'Content': formatDate(addDays(today, -9)),
      'Design In Progress': formatDate(addDays(today, -7)),
      'Design Done': formatDate(addDays(today, -4)),
      'Ready to Upload': formatDate(addDays(today, -2)),
      'Change Req': formatDate(addDays(today, -1)),
    },
  });

  // Request 7: Just Assigned
  requests.push({
    id: generateId(),
    type: 'Video',
    requested_by: 'Management',
    title: 'Employee Testimonial Videos',
    description: 'Record and edit 3 employee testimonial videos for recruitment campaign',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 14)),
    reference_link: 'https://example.com/recruitment-campaign',
    current_stage: 'Assigned',
    assigned_to: 'user-john-antony',
    video_poc: 'user-john-antony',
    upload_poc: 'user-ankit-rawat',
    revisions: 0,
    created_at: formatDate(addDays(today, -1)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -1)),
    },
  });

  // Request 8: Assigned Graphics
  requests.push({
    id: generateId(),
    type: 'Graphics',
    requested_by: 'Paid Campaign',
    title: 'Google Ads Banner Set',
    description: 'Design multiple banner sizes for Google Ads campaigns',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 8)),
    reference_link: 'https://example.com/google-ads',
    current_stage: 'Assigned',
    assigned_to: 'user-namita-aggarwal',
    social_poc: 'user-sunita-mishra',
    upload_poc: 'user-namita-aggarwal',
    revisions: 0,
    created_at: formatDate(addDays(today, -1)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -1)),
    },
  });

  // Request 9: Content Stage Graphics
  requests.push({
    id: generateId(),
    type: 'Social Media Graphics',
    requested_by: 'Social Team',
    title: 'Twitter Campaign Graphics',
    description: 'Design graphics for Twitter/X campaign launch',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 4)),
    reference_link: 'https://example.com/twitter-campaign',
    current_stage: 'Content',
    assigned_to: 'user-sandeep-chaurasia',
    social_poc: 'user-prakriti-singh',
    upload_poc: 'user-aaryan-sharma',
    revisions: 0,
    created_at: formatDate(addDays(today, -3)),
    updated_at: formatDate(addDays(today, -2)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -3)),
      'Content': formatDate(addDays(today, -2)),
    },
  });

  // Request 10: Planning Stage Video
  requests.push({
    id: generateId(),
    type: 'Video',
    requested_by: 'Management',
    title: 'Annual Report Video',
    description: 'Create comprehensive annual report video with animations',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 21)),
    reference_link: 'https://example.com/annual-report',
    current_stage: 'Planning',
    assigned_to: 'user-abhay-gupta',
    video_poc: 'user-abhay-gupta',
    upload_poc: 'user-ankit-rawat',
    revisions: 0,
    created_at: formatDate(addDays(today, -2)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -2)),
      'Planning': formatDate(addDays(today, -1)),
    },
  });

  // Request 11: Design Done - Ready to Upload
  requests.push({
    id: generateId(),
    type: 'Graphics',
    requested_by: 'Marketing',
    title: 'Blog Post Featured Images',
    description: 'Design featured images for upcoming blog posts',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 2)),
    reference_link: 'https://example.com/blog',
    current_stage: 'Ready to Upload',
    assigned_to: 'user-namita-aggarwal',
    social_poc: 'user-sunita-mishra',
    upload_poc: 'user-namita-aggarwal',
    revisions: 1,
    created_at: formatDate(addDays(today, -5)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -5)),
      'Content': formatDate(addDays(today, -4)),
      'Design In Progress': formatDate(addDays(today, -3)),
      'Design Done': formatDate(addDays(today, -2)),
      'Ready to Upload': formatDate(addDays(today, -1)),
    },
  });

  // Request 12: Overdue Video
  requests.push({
    id: generateId(),
    type: 'Video',
    requested_by: 'Sales Team',
    title: 'Sales Pitch Video',
    description: 'Create a 3-minute sales pitch video for prospects',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, -3)),
    reference_link: 'https://example.com/sales-pitch',
    current_stage: 'Editing In Progress',
    assigned_to: 'user-ankit-rawat',
    video_poc: 'user-john-antony',
    upload_poc: 'user-ankit-rawat',
    shoot_date: formatDate(addDays(today, -5)),
    revisions: 1,
    created_at: formatDate(addDays(today, -10)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -10)),
      'Planning': formatDate(addDays(today, -9)),
      'Shooting Scheduled': formatDate(addDays(today, -7)),
      'Shoot Done': formatDate(addDays(today, -5)),
      'Editing In Progress': formatDate(addDays(today, -3)),
    },
  });

  // Request 13: Completed Graphics
  requests.push({
    id: generateId(),
    type: 'Social Media Graphics',
    requested_by: 'Social Team',
    title: 'Festival Season Campaign Graphics',
    description: 'Design campaign graphics for festival season promotions',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, -2)),
    reference_link: 'https://example.com/festival-campaign',
    current_stage: 'Done',
    assigned_to: 'user-sandeep-chaurasia',
    social_poc: 'user-prakriti-singh',
    upload_poc: 'user-aaryan-sharma',
    revisions: 2,
    created_at: formatDate(addDays(today, -8)),
    updated_at: formatDate(addDays(today, -2)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -8)),
      'Content': formatDate(addDays(today, -7)),
      'Design In Progress': formatDate(addDays(today, -5)),
      'Design Done': formatDate(addDays(today, -3)),
      'Ready to Upload': formatDate(addDays(today, -2)),
      'Change Req': formatDate(addDays(today, -2)),
      'Done': formatDate(addDays(today, -2)),
    },
  });

  // Request 14: Shooting Scheduled
  requests.push({
    id: generateId(),
    type: 'Video',
    requested_by: 'Management',
    title: 'Office Tour Video',
    description: 'Create a video tour of company offices',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 10)),
    reference_link: 'https://example.com/office-tour',
    current_stage: 'Shooting Scheduled',
    assigned_to: 'user-john-antony',
    video_poc: 'user-john-antony',
    upload_poc: 'user-ankit-rawat',
    shoot_date: formatDate(addDays(today, 3)),
    revisions: 0,
    created_at: formatDate(addDays(today, -4)),
    updated_at: formatDate(addDays(today, -1)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -4)),
      'Planning': formatDate(addDays(today, -3)),
      'Shooting Scheduled': formatDate(addDays(today, -1)),
    },
  });

  // Request 15: Graphics Content Stage
  requests.push({
    id: generateId(),
    type: 'Graphics',
    requested_by: 'Paid Campaign',
    title: 'Facebook Ads Creatives',
    description: 'Design multiple ad creatives for Facebook advertising',
    requestor_name: 'Divya Krishnan',
    requestor_id: 'user-divya-krishnan',
    need_by: formatDate(addDays(today, 6)),
    reference_link: 'https://example.com/facebook-ads',
    current_stage: 'Content',
    assigned_to: 'user-sandeep-chaurasia',
    social_poc: 'user-sunita-mishra',
    upload_poc: 'user-sandeep-chaurasia',
    revisions: 0,
    created_at: formatDate(addDays(today, -3)),
    updated_at: formatDate(addDays(today, -2)),
    stage_timestamps: {
      'Assigned': formatDate(addDays(today, -3)),
      'Content': formatDate(addDays(today, -2)),
    },
  });

  return requests;
}

export const SAMPLE_REQUESTS = generateSampleRequests();

/**
 * Get stages for a request type
 */
export function getStagesForType(type: RequestType): string[] {
  switch (type) {
    case 'Video':
      return ['Assigned', 'Planning', 'Shooting Scheduled', 'Shoot Done', 'Editing In Progress', 'Editing Done', 'Ready to Upload', 'Change Req', 'Uploaded'];
    case 'Social Media Graphics':
    case 'Graphics':
      return ['Assigned', 'Content', 'Design In Progress', 'Design Done', 'Ready to Upload', 'Change Req', 'Done'];
    default:
      return [];
  }
}

/**
 * Calculate TAT between two stages
 */
export function getStageTAT(req: Request & { stage_timestamps?: Record<string, string> }, fromStage: string, toStage: string): number {
  const timestamps = req.stage_timestamps;
  if (!timestamps || !timestamps[fromStage] || !timestamps[toStage]) {
    return 0;
  }

  const from = new Date(timestamps[fromStage]);
  const to = new Date(timestamps[toStage]);
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Calculate total TAT from creation to current stage
 */
export function getTotalTAT(req: Request & { stage_timestamps?: Record<string, string> }): number {
  const timestamps = req.stage_timestamps;
  if (!timestamps || !timestamps['Assigned']) {
    return 0;
  }

  const created = new Date(req.created_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Check if request is in final stage
 */
export function isFinal(req: Request): boolean {
  return req.current_stage === 'Done' || req.current_stage === 'Uploaded';
}

/**
 * Check if request is overdue
 */
export function isOverdue(needBy: string | Request): boolean {
  let needByDate: Date;
  let isFinalRequest = false;

  if (typeof needBy === 'string') {
    needByDate = new Date(needBy);
  } else {
    needByDate = new Date(needBy.need_by);
    isFinalRequest = isFinal(needBy);
  }

  if (isFinalRequest) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return needByDate < today;
}

/**
 * Get user by ID
 */
export function getUserById(userId?: string): User | undefined {
  if (!userId) return undefined;
  return SAMPLE_USERS.find(u => u.id === userId);
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Calculate days until due date
 */
export function getDaysUntilDue(needBy: string): number {
  const needByDate = new Date(needBy);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  needByDate.setHours(0, 0, 0, 0);

  const diffTime = needByDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Check if request is in final stage (alias for isFinal)
 */
export function isFinalStage(req: Request): boolean {
  return isFinal(req);
}
