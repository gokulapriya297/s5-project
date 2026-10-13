// SkillSetu – Core Type Definitions

export type UserRole =
  | 'student'
  | 'coordinator'
  | 'trainer'
  | 'partner'
  | 'district_admin'
  | 'state_admin'
  | 'super_admin';

export interface User {
  id: string;
  email: string;
  mobile: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  twoFactorEnabled?: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface District {
  id: string;
  name: string;
  code: string;
  stateId: string;
}

export interface College {
  id: string;
  name: string;
  code: string;
  districtId: string;
  district?: District;
  principalName: string;
  address: string;
  email: string;
  phone: string;
  type: 'engineering' | 'arts_science' | 'polytechnic' | 'medical' | 'law';
  isActive: boolean;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  collegeId: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  user?: User;
  collegeId: string;
  college?: College;
  departmentId: string;
  department?: Department;
  rollNumber: string;
  year: 1 | 2 | 3 | 4;
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  skills: string[];
  resumeUrl?: string;
  languagePref: 'en' | 'ta';
  xpPoints: number;
  level: number;
  streakDays: number;
  lastActiveDate?: string;
  coordinatorVerified: boolean;
  verifiedAt?: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  website?: string;
  domain: CourseDomain;
  isActive: boolean;
}

export type CourseDomain =
  | 'data'
  | 'cloud'
  | 'design'
  | 'engineering'
  | 'business'
  | 'language'
  | 'foundation'
  | 'certification';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseMode = 'online' | 'offline' | 'hybrid';
export type CourseCategory =
  | 'foundation'
  | 'skill_development'
  | 'higher_education'
  | 'arts_science'
  | 'polytechnic'
  | 'job_oriented';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  outcomes: string[];
  syllabus: SyllabusModule[];
  category: CourseCategory;
  domain: CourseDomain;
  level: CourseLevel;
  mode: CourseMode;
  language: 'en' | 'ta' | 'both';
  durationHours: number;
  durationWeeks: number;
  partnerId: string;
  partner?: Partner;
  isFunded: boolean;
  fee: number;
  totalSeats: number;
  enrolledCount: number;
  minAttendancePercent: number;
  passMarkPercent: number;
  eligibleDepartments: string[];
  eligibleYears: number[];
  eligibleSemesters: number[];
  prerequisites: string[];
  coverGradient: string;
  coverEmoji: string;
  sampleCertificateUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface SyllabusModule {
  id: string;
  title: string;
  topics: string[];
  durationHours: number;
}

export interface Batch {
  id: string;
  courseId: string;
  course?: Course;
  trainerId: string;
  trainer?: User;
  collegeId: string;
  name: string;
  startDate: string;
  endDate: string;
  schedule: string; // e.g. "Mon, Wed 10:00–12:00"
  maxStudents: number;
  enrolledCount: number;
  isActive: boolean;
}

export interface Session {
  id: string;
  batchId: string;
  batch?: Batch;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  mode: CourseMode;
  venueOrLink?: string;
  materialsUrl?: string[];
  qrCheckInCode?: string;
  attendanceMarked: boolean;
}

export type EnrollmentStatus =
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'waitlisted'
  | 'completed'
  | 'withdrawn';

export interface Enrollment {
  id: string;
  studentId: string;
  student?: StudentProfile;
  courseId: string;
  course?: Course;
  batchId?: string;
  batch?: Batch;
  status: EnrollmentStatus;
  requestedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  completedAt?: string;
  progressPercent: number;
  attendancePercent: number;
  finalScore?: number;
  term: string; // e.g. "2024-ODD"
}

export interface Attendance {
  id: string;
  sessionId: string;
  enrollmentId: string;
  studentId: string;
  isPresent: boolean;
  method: 'manual' | 'qr' | 'link';
  markedAt: string;
  markedBy?: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  type: 'quiz' | 'assignment' | 'final_exam';
  questions: Question[];
  durationMinutes: number;
  maxAttempts: number;
  passMarkPercent: number;
  isPublished: boolean;
  openFrom?: string;
  openUntil?: string;
}

export interface Question {
  id: string;
  assessmentId: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  topic?: string;
  points: number;
}

export interface Attempt {
  id: string;
  assessmentId: string;
  enrollmentId: string;
  studentId: string;
  answers: number[]; // index of selected option per question
  score: number;
  maxScore: number;
  percentScore: number;
  passed: boolean;
  startedAt: string;
  submittedAt: string;
  topicScores?: Record<string, number>; // topic -> percent
}

export interface Certificate {
  id: string;
  enrollmentId: string;
  studentId: string;
  courseId: string;
  studentName: string;
  courseName: string;
  partnerName: string;
  issuedAt: string;
  certificateCode: string; // e.g. SKS-2024-XXXXXX
  qrData: string;
  pdfUrl?: string;
  isValid: boolean;
}

export interface Job {
  id: string;
  partnerId: string;
  partner?: Partner;
  title: string;
  company: string;
  location: string;
  type: 'full_time' | 'part_time' | 'internship' | 'contract';
  salaryRange?: string;
  description: string;
  requirements: string[];
  requiredCourses: string[]; // course IDs
  requiredSkills: string[];
  openUntil: string;
  totalPositions: number;
  appliedCount: number;
  isActive: boolean;
  postedAt: string;
}

export type ApplicationStatus =
  | 'applied'
  | 'shortlisted'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export interface Application {
  id: string;
  jobId: string;
  job?: Job;
  studentId: string;
  student?: StudentProfile;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  fitScore: number; // 0–100
  notes?: string;
}

export type AnnouncementLevel = 'state' | 'district' | 'college';
export interface Announcement {
  id: string;
  title: string;
  body: string;
  level: AnnouncementLevel;
  targetId?: string; // districtId or collegeId
  authorId: string;
  authorName: string;
  publishedAt: string;
  expiresAt?: string;
  isPinned: boolean;
}

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'escalated';
export type TicketCategory = 'enrollment' | 'technical' | 'certificate' | 'payment' | 'other';
export interface Ticket {
  id: string;
  raisedById: string;
  raisedByName: string;
  category: TicketCategory;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  replies: TicketReply[];
}

export interface TicketReply {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  resource: string;
  resourceId: string;
  before?: unknown;
  after?: unknown;
  ip?: string;
  timestamp: string;
}

// Analytics / Dashboard Types
export interface AdminKPIs {
  totalStudents: number;
  totalColleges: number;
  totalEnrollments: number;
  completionRate: number;
  certificatesIssued: number;
  placements: number;
  activeTrainers: number;
  activeCourses: number;
}

export interface DistrictStat {
  districtId: string;
  districtName: string;
  students: number;
  enrollments: number;
  completions: number;
  certifications: number;
  placements: number;
}

export interface FunnelData {
  registered: number;
  enrolled: number;
  completed: number;
  certified: number;
  placed: number;
}

// Auth types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginPayload {
  email: string;
  password: string;
  role?: UserRole;
}

export interface OTPPayload {
  mobile: string;
  otp: string;
}
