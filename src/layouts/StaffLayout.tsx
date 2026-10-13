import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { LogOut, Sun, Moon, Menu, X, Zap, ChevronRight } from 'lucide-react';
import type { UserRole } from '../types';

type NavItem = { to: string; icon: string; label: string };

const COORDINATOR_NAV: NavItem[] = [
  { to: '/coordinator/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/coordinator/students', icon: '👥', label: 'Students' },
  { to: '/coordinator/enrollments', icon: '📋', label: 'Enrollments' },
  { to: '/coordinator/attendance', icon: '✅', label: 'Attendance' },
  { to: '/coordinator/helpdesk', icon: '🎫', label: 'Helpdesk' },
];

const TRAINER_NAV: NavItem[] = [
  { to: '/trainer/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/trainer/batches', icon: '👥', label: 'Batches' },
  { to: '/trainer/sessions', icon: '🎯', label: 'Sessions' },
  { to: '/trainer/helpdesk', icon: '🎫', label: 'Helpdesk' },
];

const PARTNER_NAV: NavItem[] = [
  { to: '/partner/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/partner/courses', icon: '📚', label: 'Courses' },
  { to: '/partner/jobs', icon: '💼', label: 'Job Postings' },
  { to: '/partner/helpdesk', icon: '🎫', label: 'Helpdesk' },
];

const NAV_BY_ROLE: Record<string, NavItem[]> = {
  coordinator: COORDINATOR_NAV,
  trainer: TRAINER_NAV,
  partner: PARTNER_NAV,
};

export default function StaffLayout() {
  const { user, logout, theme, setTheme } = useAuthStore();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const navItems = NAV_BY_ROLE[user?.role ?? 'coordinator'] ?? COORDINATOR_NAV;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Command rail */}
      <div className={`command-rail ${expanded ? 'expanded' : ''}`}>
        {/* Logo/toggle */}
        <button
          onClick={() => setExpanded(e => !e)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px', borderRadius: 'var(--radius-md)', marginBottom: 16, background: 'rgba(124,92,255,0.08)', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          {expanded && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap' }}>SkillSetu</span>}
        </button>

        {/* Nav items */}
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to}
            className={({ isActive }) => `rail-item${isActive ? ' active' : ''}`}
            title={!expanded ? item.label : undefined}
          >
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
            {expanded && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* Bottom actions */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <button
            className="rail-item"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle theme"
          >
            <span style={{ flexShrink: 0 }}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</span>
            {expanded && <span>Toggle theme</span>}
          </button>
          <button className="rail-item" onClick={handleLogout} title="Sign out">
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {expanded && <span>Sign out</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: expanded ? 220 : 64, transition: 'margin 0.25s', minWidth: 0, overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: 64, borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', background: 'var(--surface)',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
              {user?.role?.replace('_', ' ')}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
              {user?.name?.[0] ?? 'U'}
            </div>
          </div>
        </div>

        <main style={{ padding: '32px', minHeight: 'calc(100vh - 64px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
