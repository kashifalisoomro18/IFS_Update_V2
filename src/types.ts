/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MainView =
  | "home"
  | "about"
  | "admissions"
  | "academics"
  | "facilities"
  | "activities"
  | "news-events"
  | "gallery"
  | "careers"
  | "contact"
  | "lms-portal";

export type AboutSubView =
  | "who-we-are"
  | "vision-mission"
  | "principal"
  | "management"
  | "faculty";

export type AdmissionsSubView = "overview" | "process" | "registration-form" | "scholarships";

export type AcademicsSubView = "curriculum" | "timings" | "calendar";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: "Announcement" | "Notice" | "Achievement" | "Event";
  date: string;
  content: string;
  isImportant?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: "Academic" | "Co-curricular" | "Sports" | "Holiday";
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  imagePlaceholderColor: string; // Tailwinds bg color for realistic visual placeholders
  iconName: string;
  highlights: string[];
}

export interface FacultyMember {
  name: string;
  designation: string;
  qualifications: string;
  department: string;
  photoColor: string; // Tailwinds bg color for avatar fallback
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  grade: string;
  message: string;
}

export interface AdmissionFormData {
  // Student Information
  studentName: string;
  dob: string;
  gender: string;
  gradeApplied: string;
  previousSchool: string;
  previousGrade: string;
  // Parent / Guardian Information
  parentName: string;
  parentCNIC: string;
  parentPhone: string;
  parentWhatsApp: string;
  parentEmail: string;
  parentOccupation: string;
  address: string;
  // Documents (Simulated upload state)
  birthCertificateUploaded: boolean;
  fatherCnicUploaded: boolean;
  reportCardUploaded: boolean;
}
