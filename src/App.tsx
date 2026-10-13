import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Pages
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

// Student pages
import StudentHome from './pages/student/Home';
import ExplorePage from './pages/student/Explore';
import CourseDetailPage from './pages/student/CourseDetail';
import EnrollmentPage from './pages/student/Enrollment';
import LearningRoom from './pages/student/LearningRoom';
import AssessmentPage from './pages/student/Assessment';
import CertificatePage from './pages/student/Certificate';
import JobsPage from './pages/student/Jobs';
import StudentProfile from './pages/student/Profile';
import InboxPage from './pages/student/Inbox';

// Coordinator pages
import CoordinatorDashboard from './pages/coordinator/Dashboard';
import StudentVerification from './pages/coordinator/StudentVerification';
import CoordinatorEnrollments from './pages/coordinator/Enrollments';
import AttendanceManagement from './pages/coordinator/Attendance';

// Trainer pages
import TrainerDashboard from './pages/trainer/Dashboard';
import BatchManagement from './pages/trainer/Batches';
import SessionManagement from './pages/trainer/Sessions';

// Partner pages
import PartnerDashboard from './pages/partner/Dashboard';
import CourseManagement from './pages/partner/Courses';
import JobPostings from './pages/partner/Jobs';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import CollegeManagement from './pages/admin/Colleges';
import ReportsPage from './pages/admin/Reports';
import AnnouncementsPage from './pages/admin/Announcements';
import AuditLogPage from './pages/admin/AuditLog';

// Super Admin
import SuperAdminDashboard from './pages/superadmin/Dashboard';

// Shared
import CertificateVerify from './pages/CertificateVerify';
import HelpDesk from './pages/HelpDesk';
import NotFound from './pages/NotFound';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import StaffLayout from './layouts/StaffLayout';
import AdminLayout from './layouts/AdminLayout';

import type { UserRole } from './types';

// Route guard
function RequireAuth({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: UserRole[] }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
}

function RoleRedirect() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  switch (user.role) {
    case 'student': return <Navigate to="/student/home" replace />;
    case 'coordinator': return <Navigate to="/coordinator/dashboard" replace />;
    case 'trainer': return <Navigate to="/trainer/dashboard" replace />;
    case 'partner': return <Navigate to="/partner/dashboard" replace />;
    case 'district_admin':
    case 'state_admin': return <Navigate to="/admin/dashboard" replace />;
    case 'super_admin': return <Navigate to="/superadmin/dashboard" replace />;
    default: return <Navigate to="/login" replace />;
  }
}

export default function App() {
  const { theme } = useAuthStore();

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--surface-2)',
            color: 'var(--text)',
            border: '1.5px solid var(--border)',
            borderRadius: '16px',
            fontFamily: 'var(--font-body)',
          },
        }}
      />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify/:code" element={<CertificateVerify />} />
        <Route path="/dashboard" element={<RequireAuth><RoleRedirect /></RequireAuth>} />

        {/* Student */}
        <Route path="/student" element={<RequireAuth allowedRoles={['student']}><StudentLayout /></RequireAuth>}>
          <Route path="home" element={<StudentHome />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="course/:id" element={<CourseDetailPage />} />
          <Route path="enroll/:id" element={<EnrollmentPage />} />
          <Route path="learn/:enrollmentId" element={<LearningRoom />} />
          <Route path="assess/:assessmentId" element={<AssessmentPage />} />
          <Route path="certificates" element={<CertificatePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="helpdesk" element={<HelpDesk />} />
        </Route>

        {/* Coordinator */}
        <Route path="/coordinator" element={<RequireAuth allowedRoles={['coordinator']}><StaffLayout /></RequireAuth>}>
          <Route path="dashboard" element={<CoordinatorDashboard />} />
          <Route path="students" element={<StudentVerification />} />
          <Route path="enrollments" element={<CoordinatorEnrollments />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="helpdesk" element={<HelpDesk />} />
        </Route>

        {/* Trainer */}
        <Route path="/trainer" element={<RequireAuth allowedRoles={['trainer']}><StaffLayout /></RequireAuth>}>
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="batches" element={<BatchManagement />} />
          <Route path="sessions" element={<SessionManagement />} />
          <Route path="helpdesk" element={<HelpDesk />} />
        </Route>

        {/* Partner */}
        <Route path="/partner" element={<RequireAuth allowedRoles={['partner']}><StaffLayout /></RequireAuth>}>
          <Route path="dashboard" element={<PartnerDashboard />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="jobs" element={<JobPostings />} />
          <Route path="helpdesk" element={<HelpDesk />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<RequireAuth allowedRoles={['district_admin', 'state_admin']}><AdminLayout /></RequireAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="colleges" element={<CollegeManagement />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="audit" element={<AuditLogPage />} />
        </Route>

        {/* Super Admin */}
        <Route path="/superadmin" element={<RequireAuth allowedRoles={['super_admin']}><AdminLayout /></RequireAuth>}>
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="colleges" element={<CollegeManagement />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="audit" element={<AuditLogPage />} />
        </Route>

        <Route path="/helpdesk" element={<HelpDesk />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
