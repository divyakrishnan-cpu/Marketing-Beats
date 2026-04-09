'use client';

import { useState, useMemo } from 'react';
import { User, UserRole, levelToRole } from '@/types';
import EditUserModal from '@/components/user-management/EditUserModal';
import { ChevronUp, ChevronDown, Edit2, Search } from 'lucide-react';

// All 69 employees from the CSV
const ALL_USERS: User[] = [
  {
    id: 'user-lalit-bhardwaj',
    employee_code: 'SBL0055',
    name: 'Lalit Bhardwaj',
    email: 'lalit.bhardwaj@squareyards.com',
    level: 'S3',
    location: 'Gurugram',
    designation: 'AVP - Brand Design',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-nitin-kumar',
    employee_code: 'SBL0065',
    name: 'Nitin Kumar',
    email: 'nitin.kumar@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Manager - SEO',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rohit-rajoriya',
    employee_code: 'SBL0105',
    name: 'Rohit Rajoriya',
    email: 'rohit.rajoriya@squareyards.com',
    level: 'S2',
    location: 'Mumbai',
    designation: 'Senior Manager',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sukhmani',
    employee_code: 'SDC4035',
    name: 'Sukhmani',
    email: 'sukhmani@squareyards.com',
    level: 'S3',
    location: 'Gurugram',
    designation: 'Associate Vice President',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sunita-kumari',
    employee_code: 'SDC4564',
    name: 'Sunita Kumari',
    email: 'sunita.kumari@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Manager - Brand Design',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sandeep-chaurasia',
    employee_code: 'SDC4682',
    name: 'Sandeep Chaurasia',
    email: 'sandeep.chaurasia@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Brand Design Lead',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-divya-garg',
    employee_code: 'SDC4963',
    name: 'Divya Garg',
    email: 'divya.garg@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Manager - Brand Design',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-shiv-kumar-gupta',
    employee_code: 'SDC5026',
    name: 'Shiv Kumar Gupta',
    email: 'shiv.kumar@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Manager - SEO',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-gaurav-dhiman',
    employee_code: 'SDC5216',
    name: 'Gaurav Dhiman',
    email: 'gaurav.dhiman@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'SEO Executive',
    department: 'Marketing',
    supervisor_code: 'SDC5674',
    supervisor_name: 'Vikesh Verma',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-ashish-singh',
    employee_code: 'SDC5405',
    name: 'Ashish Singh',
    email: 'ashish.singh@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Product Manager',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-kunal-sachdeva',
    employee_code: 'SDC5595',
    name: 'Kunal Sachdeva',
    email: 'kunal.sachdeva@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AGM - Content',
    department: 'Marketing',
    supervisor_code: 'SQY59401',
    supervisor_name: 'Sunita Mishra',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-vimal-vijayan',
    employee_code: 'SDC5596',
    name: 'Vimal Vijayan',
    email: 'vimal.vijayan@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Senior Content Editor',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-supriya-boruah',
    employee_code: 'SBL2166',
    name: 'Supriya Boruah',
    email: 'supriya.boruah@squareyards.com',
    level: 'S1',
    location: 'Mumbai',
    designation: 'Sr Executive - Marketing',
    department: 'Marketing',
    supervisor_code: 'SBL0105',
    supervisor_name: 'Rohit Rajoriya',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-vikesh-verma',
    employee_code: 'SDC5674',
    name: 'Vikesh Verma',
    email: 'vikesh.verma@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AGM - SEO',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-abhishek-kumar-singh',
    employee_code: 'SQY35817',
    name: 'Abhishek Kumar Singh',
    email: 'abhishek.singh@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AGM - SEO',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-karan-deep',
    employee_code: 'SQY36075',
    name: 'Karan Deep',
    email: 'karan.deep@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Web Developer',
    department: 'Marketing',
    supervisor_code: 'SQY56122',
    supervisor_name: 'Paramjeet',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-ankur-rawat',
    employee_code: 'SQY38120',
    name: 'Ankur Rawat',
    email: 'ankur.rawat@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Associate Manager - CMS',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-chaitali-manjrekar',
    employee_code: 'SBL2609',
    name: 'Chaitali Sudhir Manjrekar',
    email: 'chaitali.manjrekar@squareyards.com',
    level: 'S1',
    location: 'Mumbai',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SBL0105',
    supervisor_name: 'Rohit Rajoriya',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-shweta-tawade',
    employee_code: 'SBL2638',
    name: 'Shweta Tawade',
    email: 'shweta.tawade@squareyards.com',
    level: 'S1',
    location: 'Mumbai',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SBL0105',
    supervisor_name: 'Rohit Rajoriya',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rishabh-baisoy',
    employee_code: 'SQY42700',
    name: 'Rishabh Baisoy',
    email: 'rishabh.baisoy@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Senior Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-divya-krishnan',
    employee_code: 'SQY44089',
    name: 'Divya Krishnan',
    email: 'divya.krishnan@squareyards.com',
    level: 'SP&L',
    location: 'Dubai',
    designation: 'Head of Design',
    department: 'Marketing',
    supervisor_code: 'SYME001',
    supervisor_name: 'Kanika Gupta',
    role: 'admin',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-shubham-sandhu',
    employee_code: 'SQY46789',
    name: 'Shubham Sandhu',
    email: 'shubham.sandhu@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-thejus-k-s',
    employee_code: 'SQY46790',
    name: 'Thejus K S',
    email: 'thejus.ks@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rahul-gautam',
    employee_code: 'SQY51435',
    name: 'Rahul Gautam',
    email: 'rahul.gautam@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-john-antony',
    employee_code: 'SDC6287',
    name: 'John Westly Antony',
    email: 'john.antony@squareyards.com',
    level: 'S1',
    location: 'Dubai',
    designation: 'Sr Videographer and Editor',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-bhavika-modsing',
    employee_code: 'SQY54135',
    name: 'Bhavika Anant Modsing',
    email: 'bhavika.modsing@squareyards.com',
    level: 'S1',
    location: 'Mumbai',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SBL0105',
    supervisor_name: 'Rohit Rajoriya',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-devansh-sharma',
    employee_code: 'SQY54136',
    name: 'Devansh Sharma',
    email: 'devansh.sharma@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Assoc Manager - Google Analytics',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-ritika-tyagi',
    employee_code: 'SQY54370',
    name: 'Ritika Tyagi',
    email: 'ritika.tyagi@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-bharath-subramani',
    employee_code: 'SQY55352',
    name: 'Bharath Subramani',
    email: 'bharath.subramani@squareyards.com',
    level: 'S1',
    location: 'Dubai',
    designation: 'Sr Executive - Performance Marketing',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-aaryan-sharma',
    employee_code: 'SQY55706',
    name: 'Aaryan Sharma',
    email: 'aaryan.sharma@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Social Media Executive',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-ankit-rawat',
    employee_code: 'SQY55707',
    name: 'Ankit Rawat',
    email: 'ankit.rawat@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Senior Video Editor',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-prakriti-singh',
    employee_code: 'SQY55708',
    name: 'Prakriti Singh',
    email: 'prakriti.singh@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Social Media Executive',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-abhay-gupta',
    employee_code: 'SQY55953',
    name: 'Abhay Gupta',
    email: 'abhay.gupta@squareyards.com',
    level: 'S1',
    location: 'Mumbai',
    designation: 'Sr Videographer and Editor',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-namita-aggarwal',
    employee_code: 'SQY55954',
    name: 'Namita Aggarwal',
    email: 'namita.aggarwal@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Senior Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sudhir',
    employee_code: 'SQY56101',
    name: 'Sudhir',
    email: 'sudhir@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Manager Performance Marketing',
    department: 'Marketing',
    supervisor_code: 'SQY56122',
    supervisor_name: 'Paramjeet',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-paramjeet',
    employee_code: 'SQY56122',
    name: 'Paramjeet',
    email: 'paramjeet@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Manager Performance Marketing',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-raj-gaurav',
    employee_code: 'SIN3939',
    name: 'Raj Gaurav',
    email: 'raj.gaurav@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Intern',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-parth-sharma',
    employee_code: 'SQY56333',
    name: 'Parth Sharma',
    email: 'parth.sharma@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Marketing Lead',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-garima-banwala',
    employee_code: 'SQY56416',
    name: 'Garima Banwala',
    email: 'garima.banwala@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Senior Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-akash-bhatt',
    employee_code: 'SQY56773',
    name: 'Akash Bhatt',
    email: 'akash.bhatt@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Video Editor',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-ashish-kumar',
    employee_code: 'SQY56974',
    name: 'Ashish Kumar',
    email: 'ashish.kumar@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Senior Investment Manager',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-piyush-sharma',
    employee_code: 'SQY57146',
    name: 'Piyush Sharma',
    email: 'piyush.sharma@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SQY56333',
    supervisor_name: 'Parth Sharma',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rishabh-singh',
    employee_code: 'SQY57180',
    name: 'Rishabh Singh',
    email: 'rishabh.singh@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sidharth-bharti',
    employee_code: 'SQY57973',
    name: 'Sidharth Bharti',
    email: 'sidharth.bharti@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Graphic Designer',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-pranjal-sapra',
    employee_code: 'SQY58633',
    name: 'Pranjal Sapra',
    email: 'pranjal.sapra@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Senior Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-mitesh-singh',
    employee_code: 'SQY58651',
    name: 'Mitesh Kumar Singh',
    email: 'mitesh.singh@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AGM - SEO',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-abheet-chawla',
    employee_code: 'SQY58858',
    name: 'Abheet Chawla',
    email: 'abheet.chawla@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Content Manager',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-rahul-chatterjee',
    employee_code: 'SQY58916',
    name: 'Rahul Chatterjee',
    email: 'rahul.chatterjee@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Video Editor',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sakshi-saxena',
    employee_code: 'SDC6596',
    name: 'Sakshi Saxena',
    email: 'sakshi.saxena@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Sr Manager: Research & Media',
    department: 'Marketing',
    supervisor_code: 'SQY59401',
    supervisor_name: 'Sunita Mishra',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-abigail-venessa',
    employee_code: 'SQY59196',
    name: 'Abigail Venessa Simmons',
    email: 'abigail.venessa@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-drishti-katyal',
    employee_code: 'SQY59215',
    name: 'Drishti Katyal',
    email: 'drishti.katyal@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sunita-mishra',
    employee_code: 'SQY59401',
    name: 'Sunita Mishra',
    email: 'sunita.mishra@squareyards.com',
    level: 'S3',
    location: 'Gurugram',
    designation: 'Content Strategy Head',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-muskan-shafi',
    employee_code: 'SQY59407',
    name: 'Muskan Shafi',
    email: 'muskan.shafi@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Senior Content Writer',
    department: 'Marketing',
    supervisor_code: 'SDC5595',
    supervisor_name: 'Kunal Sachdeva',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-shivam-chanana',
    employee_code: 'SQY59542',
    name: 'Shivam Chanana',
    email: 'shivam.chanana@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'AGM - SEO',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-diva-bindal',
    employee_code: 'SIN3981',
    name: 'Diva Bindal',
    email: 'diva.bindal@squareyards.com',
    level: 'SE',
    location: 'Gurugram',
    designation: 'Intern',
    department: 'Marketing',
    supervisor_code: 'SQY60797',
    supervisor_name: 'Dhruv Thakur',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-aditi-arora',
    employee_code: 'SQY59715',
    name: 'Aditi Arora',
    email: 'aditi.arora@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SQY60797',
    supervisor_name: 'Dhruv Thakur',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-jyotsna-chudji',
    employee_code: 'SQY59917',
    name: 'Jyotsna Santosh Chudji',
    email: 'jyotsna.chudji@squareyards.com',
    level: 'S0',
    location: 'Mumbai',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SBL0105',
    supervisor_name: 'Rohit Rajoriya',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-tanishka-jamwal',
    employee_code: 'SQY59928',
    name: 'Tanishka Jamwal',
    email: 'tanishka.jamwal@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SDC5405',
    supervisor_name: 'Ashish Singh',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-aditya-mishra',
    employee_code: 'SIN3991',
    name: 'Aditya Kumar Mishra',
    email: 'aditya.mishra@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'SEO Intern',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-chinmay-gaur',
    employee_code: 'SQY60167',
    name: 'Chinmay Gaur',
    email: 'chinmay.gaur@squareyards.com',
    level: 'S1',
    location: 'Gurugram',
    designation: 'Generative Engine Optimization',
    department: 'Marketing',
    supervisor_code: 'SQY44089',
    supervisor_name: 'Divya Krishnan',
    role: 'designer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-prateek-jain',
    employee_code: 'SIN3994',
    name: 'Prateek Jain',
    email: 'prateek.jain@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Intern',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-riddhi-chatterji',
    employee_code: 'SQY60210',
    name: 'Riddhi Chatterji',
    email: 'riddhi.chatterji@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Content Writer',
    department: 'Marketing',
    supervisor_code: 'SQY59401',
    supervisor_name: 'Sunita Mishra',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-abhilasa-bhattacharya',
    employee_code: 'SQY60413',
    name: 'Abhilasa Bhattacharya',
    email: 'abhilasa.bhattacharya@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Senior Marketing Strategist',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-simran-shankar',
    employee_code: 'SQY60437',
    name: 'Simran Shankar',
    email: 'simran.shankar@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Marketing Executive',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-vishesh-paliwal',
    employee_code: 'SQY60597',
    name: 'Vishesh Paliwal',
    email: 'vishesh.paliwal@squareyards.com',
    level: 'S2',
    location: 'Gurugram',
    designation: 'Marketing Lead',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'manager',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-dhruv-thakur',
    employee_code: 'SQY60797',
    name: 'Dhruv Thakur',
    email: 'dhruv.thakur@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Copy Lead',
    department: 'Marketing',
    supervisor_code: 'SDC4035',
    supervisor_name: 'Sukhmani',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-harshita-bansal',
    employee_code: 'SIN4006',
    name: 'Harshita Bansal',
    email: 'harshita.bansal@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Intern',
    department: 'Marketing',
    supervisor_code: 'SQY59542',
    supervisor_name: 'Shivam Chanana',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-himani-rajput',
    employee_code: 'SQY60844',
    name: 'Himani Rajput',
    email: 'himani.rajput@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Video Editor',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-amit-kumar',
    employee_code: 'SQY60845',
    name: 'Amit Kumar',
    email: 'amit.kumar@squareyards.com',
    level: 'S0',
    location: 'Gurugram',
    designation: 'Video Editor',
    department: 'Marketing',
    supervisor_code: 'SBL0055',
    supervisor_name: 'Lalit Bhardwaj',
    role: 'viewer',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const ITEMS_PER_PAGE = 20;

type SortKey = 'name' | 'employee_code' | 'designation' | 'location' | 'level' | 'role' | 'is_active';
type SortOrder = 'asc' | 'desc';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(ALL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and search
  const filteredUsers = useMemo(() => {
    let result = users;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term) ||
          user.designation?.toLowerCase().includes(term)
      );
    }

    // Role filter
    if (selectedRole !== 'all') {
      result = result.filter((user) => user.role === selectedRole);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      result = result.filter((user) => user.location === selectedLocation);
    }

    // Sort
    result.sort((a, b) => {
      const aVal: any = a[sortKey];
      const bVal: any = b[sortKey];

      if (aVal === undefined || bVal === undefined) return 0;

      let comparison = 0;
      if (typeof aVal === 'string') {
        comparison = aVal.localeCompare(bVal as string);
      } else if (typeof aVal === 'boolean') {
        comparison = (aVal ? 1 : 0) - (bVal ? 1 : 0);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [users, searchTerm, selectedRole, selectedLocation, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Stats calculations
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.is_active).length,
      managers: users.filter(
        (u) => u.role === 'manager' || u.role === 'admin'
      ).length,
      designers: users.filter(
        (u) => u.role === 'designer'
      ).length,
    };
  }, [users]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleToggleActive = (user: User) => {
    const updated = { ...user, is_active: !user.is_active };
    handleSaveUser(updated);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      case 'designer':
        return 'bg-green-100 text-green-700';
      case 'viewer':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvatarColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500';
      case 'manager':
        return 'bg-blue-500';
      case 'designer':
        return 'bg-green-500';
      case 'viewer':
        return 'bg-gray-500';
    }
  };

  const SortIndicator = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  const locations = ['all', ...Array.from(new Set(users.map((u) => u.location).filter((loc) => loc !== undefined)))];


  return (
    <div className="space-y-6 p-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-sm text-[var(--text-muted)] font-medium">
            Total Users
          </div>
          <div className="text-3xl font-bold text-[var(--text-primary)] mt-2">
            {stats.total}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-[var(--text-muted)] font-medium">
            Active
          </div>
          <div className="text-3xl font-bold text-[var(--success)] mt-2">
            {stats.active}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-[var(--text-muted)] font-medium">
            Managers
          </div>
          <div className="text-3xl font-bold text-[var(--accent)] mt-2">
            {stats.managers}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-[var(--text-muted)] font-medium">
            Designers
          </div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {stats.designers}
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="card p-4 space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2 input-base bg-[var(--bg-primary)]">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by name, email, or designation..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 bg-transparent border-0 outline-none text-[var(--text-primary)]"
          />
        </div>

        {/* Role Filters */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'admin', 'manager', 'designer', 'viewer'] as const).map(
            (role) => (
              <button
                key={role}
                onClick={() => {
                  setSelectedRole(role);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Location Filters */}
        <div className="flex gap-2 flex-wrap">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => {
                setSelectedLocation(location);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLocation === location
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              {location === 'all'
                ? 'All Locations'
                : location}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="text-sm text-[var(--text-muted)]">
        Showing {paginatedUsers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{' '}
        {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{' '}
        {filteredUsers.length} users
      </div>

      {/* Users Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-[var(--border)]">
            <tr className="bg-[var(--bg-secondary)]">
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1"
                >
                  Name
                  <SortIndicator column="name" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('employee_code')}
                  className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1"
                >
                  Code
                  <SortIndicator column="employee_code" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('designation')}
                  className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1"
                >
                  Designation
                  <SortIndicator column="designation" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('location')}
                  className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1"
                >
                  Location
                  <SortIndicator column="location" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('level')}
                  className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1"
                >
                  Level
                  <SortIndicator column="level" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('role')}
                  className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1"
                >
                  Role
                  <SortIndicator column="role" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Supervisor
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('is_active')}
                  className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1"
                >
                  Status
                  <SortIndicator column="is_active" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${getAvatarColor(user.role)}`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {user.name}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[var(--text-primary)]">
                    {user.employee_code}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[var(--text-primary)]">
                    {user.designation}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[var(--text-primary)]">
                    {user.location}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {user.level === 'SP&L' ? (
                      <span className="badge bg-purple-100 text-purple-700">
                        SP&L
                      </span>
                    ) : (
                      user.level
                    )}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`badge text-xs font-semibold capitalize ${getRoleColor(user.role)}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[var(--text-primary)]">
                    {user.supervisor_name || '-'}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleToggleActive(user)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      user.is_active ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.is_active ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-[var(--text-muted)]">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const pageNum = currentPage <= 3 ? i + 1 : Math.max(1, currentPage - 2) + i;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? 'bg-[var(--accent)] text-white'
                    : 'border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Permission Management Section */}
      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Role Permissions
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">Admin</h4>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Full access to all features, user management, and settings
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-semibold text-blue-700">Manager</h4>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Can assign tasks, view all team analytics, and manage pipeline
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h4 className="font-semibold text-green-700">Designer</h4>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Can view assigned tasks, update status, and upload deliverables
            </p>
          </div>
          <div className="border-l-4 border-gray-500 pl-4 py-2">
            <h4 className="font-semibold text-gray-700">Viewer</h4>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Read-only access to dashboards and reports
            </p>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
