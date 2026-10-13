// Mock seed data for SkillSetu
import type {
  User, College, District, Department, Partner, Course, StudentProfile,
  Batch, Session, Enrollment, Assessment, Certificate, Job, Application,
  Announcement, Ticket, Notification
} from '../types';

export const DISTRICTS: District[] = [
  { id: 'd1', name: 'Chennai', code: 'CHE', stateId: 's1' },
  { id: 'd2', name: 'Coimbatore', code: 'CBE', stateId: 's1' },
  { id: 'd3', name: 'Madurai', code: 'MDU', stateId: 's1' },
  { id: 'd4', name: 'Tiruchirappalli', code: 'TRY', stateId: 's1' },
  { id: 'd5', name: 'Salem', code: 'SLM', stateId: 's1' },
];

export const COLLEGES: College[] = [
  { id: 'c1', name: 'Anna University', code: 'AU001', districtId: 'd1', principalName: 'Dr. K. Rajan', address: 'Guindy, Chennai', email: 'info@annauniv.edu', phone: '044-22357004', type: 'engineering', isActive: true },
  { id: 'c2', name: 'PSG College of Technology', code: 'PSG001', districtId: 'd2', principalName: 'Dr. R. Rudramoorthy', address: 'Peelamedu, Coimbatore', email: 'info@psgtech.edu', phone: '0422-4344000', type: 'engineering', isActive: true },
  { id: 'c3', name: 'Madurai Kamaraj University', code: 'MKU001', districtId: 'd3', principalName: 'Dr. M. Selvam', address: 'Palkalai Nagar, Madurai', email: 'info@mkuniversity.org', phone: '0452-2459181', type: 'arts_science', isActive: true },
  { id: 'c4', name: 'NIT Tiruchirappalli', code: 'NIT001', districtId: 'd4', principalName: 'Dr. S. Sundaramoorthy', address: 'Tanjore Main Road, Tiruchirappalli', email: 'office@nitt.edu', phone: '0431-2503000', type: 'engineering', isActive: true },
  { id: 'c5', name: 'Government Polytechnic Salem', code: 'GPS001', districtId: 'd5', principalName: 'Dr. P. Krishnamurthy', address: 'Hasthampatti, Salem', email: 'info@gpsalem.edu', phone: '0427-2233001', type: 'polytechnic', isActive: true },
];

export const DEPARTMENTS: Department[] = [
  { id: 'dep1', name: 'Computer Science & Engineering', code: 'CSE', collegeId: 'c1' },
  { id: 'dep2', name: 'Electronics & Communication Engineering', code: 'ECE', collegeId: 'c1' },
  { id: 'dep3', name: 'Mechanical Engineering', code: 'MECH', collegeId: 'c1' },
  { id: 'dep4', name: 'Computer Science & Engineering', code: 'CSE', collegeId: 'c2' },
  { id: 'dep5', name: 'Information Technology', code: 'IT', collegeId: 'c2' },
  { id: 'dep6', name: 'Mathematics', code: 'MATH', collegeId: 'c3' },
  { id: 'dep7', name: 'Physics', code: 'PHY', collegeId: 'c3' },
  { id: 'dep8', name: 'Civil Engineering', code: 'CIVIL', collegeId: 'c4' },
];

export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'TechBridge India', logoUrl: '', description: 'Premier tech upskilling partner', domain: 'data', isActive: true },
  { id: 'p2', name: 'CloudNow Academy', logoUrl: '', description: 'Cloud computing training experts', domain: 'cloud', isActive: true },
  { id: 'p3', name: 'DesignCraft Studio', logoUrl: '', description: 'UI/UX and product design training', domain: 'design', isActive: true },
  { id: 'p4', name: 'FinEdge Training', logoUrl: '', description: 'Business and finance courses', domain: 'business', isActive: true },
  { id: 'p5', name: 'CodeForge Labs', logoUrl: '', description: 'Full-stack and DevOps training', domain: 'engineering', isActive: true },
];

export const COURSES: Course[] = [
  {
    id: 'crs1', title: 'Python for Data Science', slug: 'python-data-science',
    description: 'Master Python programming and data analysis with pandas, NumPy, and matplotlib. Build real-world projects.',
    outcomes: ['Analyse data with Python', 'Build ML pipelines', 'Create data visualisations', 'Deploy models to production'],
    syllabus: [
      { id: 's1', title: 'Python Foundations', topics: ['Variables', 'Control flow', 'Functions', 'OOP'], durationHours: 8 },
      { id: 's2', title: 'Data Manipulation', topics: ['NumPy', 'Pandas', 'Data cleaning'], durationHours: 12 },
      { id: 's3', title: 'Visualisation & ML', topics: ['Matplotlib', 'Seaborn', 'Scikit-learn basics'], durationHours: 10 },
    ],
    category: 'skill_development', domain: 'data', level: 'beginner', mode: 'online',
    language: 'en', durationHours: 30, durationWeeks: 6, partnerId: 'p1',
    isFunded: true, fee: 0, totalSeats: 200, enrolledCount: 143,
    minAttendancePercent: 75, passMarkPercent: 60,
    eligibleDepartments: ['dep1', 'dep4', 'dep5'], eligibleYears: [2, 3, 4], eligibleSemesters: [3, 4, 5, 6, 7, 8],
    prerequisites: [], coverGradient: 'linear-gradient(135deg,#4CC9F0 0%,#0B1020 100%)',
    coverEmoji: '📊', isPublished: true, createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'crs2', title: 'AWS Cloud Practitioner', slug: 'aws-cloud-practitioner',
    description: 'Get certified on AWS fundamentals. Covers core services, security, pricing and support.',
    outcomes: ['Understand cloud concepts', 'Navigate AWS console', 'Pass AWS CCP exam', 'Design basic architectures'],
    syllabus: [
      { id: 's4', title: 'Cloud Concepts', topics: ['What is cloud', 'Deployment models', 'AWS global infra'], durationHours: 6 },
      { id: 's5', title: 'Core Services', topics: ['EC2', 'S3', 'RDS', 'Lambda'], durationHours: 10 },
      { id: 's6', title: 'Security & Pricing', topics: ['IAM', 'Well-Architected', 'Pricing models'], durationHours: 8 },
    ],
    category: 'job_oriented', domain: 'cloud', level: 'beginner', mode: 'hybrid',
    language: 'en', durationHours: 24, durationWeeks: 4, partnerId: 'p2',
    isFunded: true, fee: 0, totalSeats: 150, enrolledCount: 89,
    minAttendancePercent: 80, passMarkPercent: 70,
    eligibleDepartments: ['dep1', 'dep2', 'dep4', 'dep5'], eligibleYears: [3, 4], eligibleSemesters: [5, 6, 7, 8],
    prerequisites: [], coverGradient: 'linear-gradient(135deg,#7C5CFF 0%,#4CC9F0 100%)',
    coverEmoji: '☁️', isPublished: true, createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'crs3', title: 'UI/UX Design Fundamentals', slug: 'ui-ux-design-fundamentals',
    description: 'Learn user-centred design thinking, Figma prototyping, and usability testing.',
    outcomes: ['Design wireframes', 'Build Figma prototypes', 'Conduct usability tests', 'Create design systems'],
    syllabus: [
      { id: 's7', title: 'Design Thinking', topics: ['Empathy mapping', 'User research', 'Ideation'], durationHours: 8 },
      { id: 's8', title: 'Figma Mastery', topics: ['Components', 'Auto layout', 'Prototyping'], durationHours: 12 },
    ],
    category: 'skill_development', domain: 'design', level: 'beginner', mode: 'online',
    language: 'both', durationHours: 20, durationWeeks: 4, partnerId: 'p3',
    isFunded: true, fee: 0, totalSeats: 120, enrolledCount: 94,
    minAttendancePercent: 70, passMarkPercent: 55,
    eligibleDepartments: [], eligibleYears: [1, 2, 3, 4], eligibleSemesters: [1, 2, 3, 4, 5, 6, 7, 8],
    prerequisites: [], coverGradient: 'linear-gradient(135deg,#FF5C8A 0%,#7C5CFF 100%)',
    coverEmoji: '🎨', isPublished: true, createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'crs4', title: 'Full-Stack Web Development', slug: 'fullstack-web-dev',
    description: 'Build modern web apps with React, Node.js, and PostgreSQL from scratch.',
    outcomes: ['Build REST APIs', 'Develop React frontends', 'Deploy to cloud', 'Implement auth & security'],
    syllabus: [
      { id: 's9', title: 'HTML & CSS Mastery', topics: ['Flexbox', 'Grid', 'Animations'], durationHours: 10 },
      { id: 's10', title: 'JavaScript & React', topics: ['ES6+', 'Hooks', 'State management'], durationHours: 20 },
      { id: 's11', title: 'Node & Database', topics: ['Express', 'PostgreSQL', 'REST API'], durationHours: 20 },
    ],
    category: 'job_oriented', domain: 'engineering', level: 'intermediate', mode: 'online',
    language: 'en', durationHours: 50, durationWeeks: 10, partnerId: 'p5',
    isFunded: true, fee: 0, totalSeats: 100, enrolledCount: 67,
    minAttendancePercent: 80, passMarkPercent: 65,
    eligibleDepartments: ['dep1', 'dep4', 'dep5'], eligibleYears: [2, 3, 4], eligibleSemesters: [3, 4, 5, 6, 7, 8],
    prerequisites: ['crs-html-basics'], coverGradient: 'linear-gradient(135deg,#C6F432 0%,#0B1020 100%)',
    coverEmoji: '💻', isPublished: true, createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 'crs5', title: 'Digital Marketing & Analytics', slug: 'digital-marketing-analytics',
    description: 'Master SEO, social media, Google Ads, and web analytics to drive business growth.',
    outcomes: ['Run Google Ads campaigns', 'Analyse web traffic', 'Create content strategy', 'Measure ROI'],
    syllabus: [
      { id: 's12', title: 'SEO & Content', topics: ['On-page SEO', 'Content marketing', 'Keyword research'], durationHours: 10 },
      { id: 's13', title: 'Paid Ads', topics: ['Google Ads', 'Meta Ads', 'Budget optimisation'], durationHours: 10 },
      { id: 's14', title: 'Analytics', topics: ['Google Analytics 4', 'Dashboards', 'Reporting'], durationHours: 8 },
    ],
    category: 'skill_development', domain: 'business', level: 'beginner', mode: 'online',
    language: 'both', durationHours: 28, durationWeeks: 5, partnerId: 'p4',
    isFunded: true, fee: 0, totalSeats: 180, enrolledCount: 112,
    minAttendancePercent: 70, passMarkPercent: 55,
    eligibleDepartments: [], eligibleYears: [1, 2, 3, 4], eligibleSemesters: [1, 2, 3, 4, 5, 6, 7, 8],
    prerequisites: [], coverGradient: 'linear-gradient(135deg,#FFB347 0%,#FF5C8A 100%)',
    coverEmoji: '📈', isPublished: true, createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'crs6', title: 'Communicative English', slug: 'communicative-english',
    description: 'Build confidence in spoken and written English for workplace and interviews.',
    outcomes: ['Speak confidently at work', 'Write professional emails', 'Perform well in interviews', 'Give presentations'],
    syllabus: [
      { id: 's15', title: 'Spoken English', topics: ['Pronunciation', 'Conversation', 'Presentations'], durationHours: 12 },
      { id: 's16', title: 'Business Writing', topics: ['Emails', 'Reports', 'Proposals'], durationHours: 8 },
    ],
    category: 'foundation', domain: 'language', level: 'beginner', mode: 'hybrid',
    language: 'ta', durationHours: 20, durationWeeks: 4, partnerId: 'p4',
    isFunded: true, fee: 0, totalSeats: 300, enrolledCount: 241,
    minAttendancePercent: 75, passMarkPercent: 50,
    eligibleDepartments: [], eligibleYears: [1, 2, 3, 4], eligibleSemesters: [1, 2, 3, 4, 5, 6, 7, 8],
    prerequisites: [], coverGradient: 'linear-gradient(135deg,#A78BFA 0%,#4CC9F0 100%)',
    coverEmoji: '🗣️', isPublished: true, createdAt: '2024-03-01T00:00:00Z',
  },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', email: 'student@skillsetu.in', mobile: '9876543210', name: 'Karthik Rajan', role: 'student', isVerified: true, isActive: true, createdAt: '2024-01-15T00:00:00Z' },
  { id: 'u2', email: 'coordinator@skillsetu.in', mobile: '9876543211', name: 'Dr. Priya Nair', role: 'coordinator', isVerified: true, isActive: true, createdAt: '2024-01-10T00:00:00Z' },
  { id: 'u3', email: 'trainer@skillsetu.in', mobile: '9876543212', name: 'Arun Kumar', role: 'trainer', isVerified: true, isActive: true, createdAt: '2024-01-12T00:00:00Z' },
  { id: 'u4', email: 'partner@skillsetu.in', mobile: '9876543213', name: 'Meena Sundaram', role: 'partner', isVerified: true, isActive: true, createdAt: '2024-01-08T00:00:00Z' },
  { id: 'u5', email: 'admin@skillsetu.in', mobile: '9876543214', name: 'Vijayalakshmi P.', role: 'district_admin', isVerified: true, isActive: true, twoFactorEnabled: true, createdAt: '2024-01-05T00:00:00Z' },
  { id: 'u6', email: 'superadmin@skillsetu.in', mobile: '9876543215', name: 'Rajesh Kumar', role: 'super_admin', isVerified: true, isActive: true, twoFactorEnabled: true, createdAt: '2024-01-01T00:00:00Z' },
];

export const STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'sp1', userId: 'u1', collegeId: 'c1', departmentId: 'dep1',
    rollNumber: '2021CSE001', year: 3, semester: 5,
    skills: ['Python', 'JavaScript', 'SQL'],
    languagePref: 'en', xpPoints: 2840, level: 7, streakDays: 12,
    lastActiveDate: '2024-10-12', coordinatorVerified: true,
    verifiedAt: '2024-01-20T00:00:00Z',
  },
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr1', studentId: 'sp1', courseId: 'crs1', batchId: 'b1',
    status: 'approved', requestedAt: '2024-06-01T00:00:00Z', approvedAt: '2024-06-03T00:00:00Z',
    progressPercent: 65, attendancePercent: 83, term: '2024-ODD',
  },
  {
    id: 'enr2', studentId: 'sp1', courseId: 'crs3', batchId: 'b2',
    status: 'approved', requestedAt: '2024-06-05T00:00:00Z', approvedAt: '2024-06-07T00:00:00Z',
    progressPercent: 40, attendancePercent: 77, term: '2024-ODD',
  },
  {
    id: 'enr3', studentId: 'sp1', courseId: 'crs6',
    status: 'completed', requestedAt: '2024-01-10T00:00:00Z', approvedAt: '2024-01-12T00:00:00Z',
    completedAt: '2024-05-20T00:00:00Z',
    progressPercent: 100, attendancePercent: 90, finalScore: 82, term: '2024-EVEN',
  },
];

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: 'asmnt1', courseId: 'crs1', title: 'Python Basics Quiz', type: 'quiz',
    durationMinutes: 30, maxAttempts: 2, passMarkPercent: 60, isPublished: true,
    questions: [
      { id: 'q1', assessmentId: 'asmnt1', text: 'What is the output of print(type([]))?', options: ["<class 'list'>", "<class 'array'>", "list", "None"], correctIndex: 0, topic: 'Python Basics', points: 2 },
      { id: 'q2', assessmentId: 'asmnt1', text: 'Which keyword is used to define a function in Python?', options: ['function', 'def', 'fn', 'func'], correctIndex: 1, topic: 'Python Basics', points: 2 },
      { id: 'q3', assessmentId: 'asmnt1', text: 'What does .shape return on a pandas DataFrame?', options: ['Number of columns', 'Tuple of (rows, cols)', 'List of column names', 'Index values'], correctIndex: 1, topic: 'Pandas', points: 3 },
      { id: 'q4', assessmentId: 'asmnt1', text: 'Which function is used to read a CSV file in pandas?', options: ['pd.load_csv()', 'pd.read_csv()', 'pd.import_csv()', 'pd.open_csv()'], correctIndex: 1, topic: 'Pandas', points: 3 },
      { id: 'q5', assessmentId: 'asmnt1', text: 'NumPy arrays are mutable. True or False?', options: ['True', 'False', 'Depends on dtype', 'Only for 1D arrays'], correctIndex: 0, topic: 'NumPy', points: 2 },
    ],
  },
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert1', enrollmentId: 'enr3', studentId: 'sp1', courseId: 'crs6',
    studentName: 'Karthik Rajan', courseName: 'Communicative English',
    partnerName: 'FinEdge Training',
    issuedAt: '2024-05-22T00:00:00Z',
    certificateCode: 'SKS-2024-CE-001847',
    qrData: 'https://skillsetu.in/verify/SKS-2024-CE-001847',
    isValid: true,
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job1', partnerId: 'p1', title: 'Junior Data Analyst', company: 'DataWorks Chennai',
    location: 'Chennai (Hybrid)', type: 'full_time', salaryRange: '₹3.5–5 LPA',
    description: 'Analyse customer data and build dashboards for business insights.',
    requirements: ['Python proficiency', '6 months internship experience', 'SQL knowledge'],
    requiredCourses: ['crs1'], requiredSkills: ['Python', 'SQL', 'Pandas'],
    openUntil: '2024-11-30T00:00:00Z', totalPositions: 5, appliedCount: 23,
    isActive: true, postedAt: '2024-10-01T00:00:00Z',
  },
  {
    id: 'job2', partnerId: 'p5', title: 'Frontend Developer Intern', company: 'CodeForge Labs',
    location: 'Remote', type: 'internship', salaryRange: '₹10,000/month',
    description: 'Build React components and contribute to open-source projects.',
    requirements: ['React basics', 'TypeScript knowledge', 'Git proficiency'],
    requiredCourses: ['crs4'], requiredSkills: ['React', 'TypeScript', 'CSS'],
    openUntil: '2024-11-15T00:00:00Z', totalPositions: 10, appliedCount: 47,
    isActive: true, postedAt: '2024-10-05T00:00:00Z',
  },
  {
    id: 'job3', partnerId: 'p2', title: 'Cloud Support Engineer', company: 'CloudNow India',
    location: 'Bangalore (On-site)', type: 'full_time', salaryRange: '₹4–6 LPA',
    description: 'Support AWS infrastructure, handle incidents and automate operations.',
    requirements: ['AWS CCP certification preferred', 'Linux basics', 'Scripting skills'],
    requiredCourses: ['crs2'], requiredSkills: ['AWS', 'Linux', 'Python'],
    openUntil: '2024-12-15T00:00:00Z', totalPositions: 3, appliedCount: 15,
    isActive: true, postedAt: '2024-10-08T00:00:00Z',
  },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app1', jobId: 'job1', studentId: 'sp1',
    status: 'shortlisted', appliedAt: '2024-10-02T00:00:00Z', updatedAt: '2024-10-05T00:00:00Z',
    fitScore: 82,
  },
  {
    id: 'app2', jobId: 'job2', studentId: 'sp1',
    status: 'applied', appliedAt: '2024-10-06T00:00:00Z', updatedAt: '2024-10-06T00:00:00Z',
    fitScore: 74,
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann1', title: 'New Batch Starting for AWS Cloud Practitioner',
    body: 'A new batch for the AWS Cloud Practitioner course begins on 1st November. Enroll by 25th October to secure your seat.',
    level: 'state', authorId: 'u5', authorName: 'Vijayalakshmi P.',
    publishedAt: '2024-10-10T00:00:00Z', isPinned: true,
  },
  {
    id: 'ann2', title: 'Campus Placement Drive – DataWorks Chennai',
    body: 'DataWorks Chennai will be visiting Anna University on 15th November. Students who have completed Python for Data Science are eligible to apply.',
    level: 'college', targetId: 'c1', authorId: 'u2', authorName: 'Dr. Priya Nair',
    publishedAt: '2024-10-12T00:00:00Z', isPinned: false,
  },
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'tkt1', raisedById: 'u1', raisedByName: 'Karthik Rajan',
    category: 'enrollment', subject: 'Unable to enroll in AWS course',
    description: 'I am getting an eligibility error when trying to enroll in AWS Cloud Practitioner.',
    status: 'in_progress', priority: 'medium',
    createdAt: '2024-10-11T00:00:00Z', updatedAt: '2024-10-12T00:00:00Z',
    replies: [
      { id: 'rpl1', ticketId: 'tkt1', authorId: 'u2', authorName: 'Dr. Priya Nair', message: 'Hi Karthik, I have escalated this to the admin. Please wait 24 hours.', createdAt: '2024-10-12T09:00:00Z' },
    ],
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', userId: 'u1', title: 'Enrollment Approved!', body: 'Your enrollment in Python for Data Science has been approved.', type: 'success', isRead: false, createdAt: '2024-06-03T10:00:00Z' },
  { id: 'n2', userId: 'u1', title: 'You\'ve been shortlisted', body: 'DataWorks Chennai shortlisted you for Junior Data Analyst.', type: 'info', isRead: false, createdAt: '2024-10-05T14:00:00Z' },
  { id: 'n3', userId: 'u1', title: 'Session Tomorrow', body: 'Python for Data Science – Module 3 session is tomorrow at 10:00 AM.', type: 'info', isRead: true, createdAt: '2024-10-11T18:00:00Z' },
];

export const MOCK_BATCHES: Batch[] = [
  {
    id: 'b1', courseId: 'crs1', trainerId: 'u3', collegeId: 'c1',
    name: 'Batch A – Oct 2024', startDate: '2024-10-01', endDate: '2024-11-15',
    schedule: 'Mon, Wed, Fri  10:00–12:00', maxStudents: 40, enrolledCount: 34, isActive: true,
  },
  {
    id: 'b2', courseId: 'crs3', trainerId: 'u3', collegeId: 'c1',
    name: 'Batch B – Oct 2024', startDate: '2024-10-07', endDate: '2024-11-04',
    schedule: 'Tue, Thu  14:00–16:00', maxStudents: 30, enrolledCount: 22, isActive: true,
  },
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: 'sess1', batchId: 'b1', title: 'Python – NumPy Deep Dive',
    date: '2024-10-14', startTime: '10:00', endTime: '12:00',
    mode: 'online', venueOrLink: 'https://meet.skillsetu.in/room/sess1',
    attendanceMarked: false, qrCheckInCode: 'QR-SESS1-2024',
  },
  {
    id: 'sess2', batchId: 'b1', title: 'Python – Pandas DataFrames',
    date: '2024-10-16', startTime: '10:00', endTime: '12:00',
    mode: 'online', venueOrLink: 'https://meet.skillsetu.in/room/sess2',
    attendanceMarked: false,
  },
];

// Admin KPIs mock
export const ADMIN_KPIs = {
  totalStudents: 98420,
  totalColleges: 342,
  totalEnrollments: 187650,
  completionRate: 64.2,
  certificatesIssued: 54321,
  placements: 8943,
  activeTrainers: 1240,
  activeCourses: 87,
};

export const DISTRICT_STATS = [
  { districtId: 'd1', districtName: 'Chennai', students: 24300, enrollments: 47200, completions: 30100, certifications: 18900, placements: 3200 },
  { districtId: 'd2', districtName: 'Coimbatore', students: 18900, enrollments: 35100, completions: 22700, certifications: 14100, placements: 2100 },
  { districtId: 'd3', districtName: 'Madurai', students: 15200, enrollments: 28400, completions: 18000, certifications: 11200, placements: 1600 },
  { districtId: 'd4', districtName: 'Tiruchirappalli', students: 12400, enrollments: 23100, completions: 14800, certifications: 9200, placements: 1300 },
  { districtId: 'd5', districtName: 'Salem', students: 9800, enrollments: 18200, completions: 11600, certifications: 7200, placements: 900 },
];

export const FUNNEL_DATA = {
  registered: 98420, enrolled: 187650, completed: 120340, certified: 54321, placed: 8943,
};

// Demo credentials for each role
export const DEMO_CREDENTIALS = [
  { role: 'student' as const, email: 'student@skillsetu.in', password: 'demo123', name: 'Karthik Rajan' },
  { role: 'coordinator' as const, email: 'coordinator@skillsetu.in', password: 'demo123', name: 'Dr. Priya Nair' },
  { role: 'trainer' as const, email: 'trainer@skillsetu.in', password: 'demo123', name: 'Arun Kumar' },
  { role: 'partner' as const, email: 'partner@skillsetu.in', password: 'demo123', name: 'Meena Sundaram' },
  { role: 'district_admin' as const, email: 'admin@skillsetu.in', password: 'demo123', name: 'Vijayalakshmi P.' },
  { role: 'super_admin' as const, email: 'superadmin@skillsetu.in', password: 'demo123', name: 'Rajesh Kumar' },
];
