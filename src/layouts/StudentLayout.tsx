import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, MapPin, Briefcase, Inbox, User, LogOut, Sun, Moon, Zap, Bell, Search, Command } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { MOCK_NOTIFICATIONS } from '../data/mockData';
import CommandPalette from '../components/CommandPalette';

const NAV_ITEMS = [
  { to: '/student/home', icon: <Home size={22} />, label: 'Home' },
  { to: '/student/explore', icon: <Compass size={22} />, label: 'Explore' },
  { to: '/student/certificates', icon: <MapPin size={22} />, label: 'My Path' },
  { to: '/student/jobs', icon: <Briefcase size={22} />, label: 'Jobs' },
  { to: '/student/inbox', icon: <Inbox size={22} />, label: 'Inbox' },
];

export default function StudentLayout() {
  const { user, logout, theme, setTheme } = useAuthStore();
  const navigate = useNavigate();
  const [showPalette, setShowPalette] = useState(false);
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette(p => !p);
      }
      if (e.key === 'Escape') setShowPalette(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Desktop pill nav */}
      <div className="pill-nav hide-mobile" style={{ display: 'flex' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid var(--border)', marginRight: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>SkillSetu</span>
        </div>

        {/* Nav items */}
        {NAV_ITEMS.map(item => (
          <NavLink key={item.to} to={item.to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 'var(--radius-pill)',
              fontWeight: 600, fontSize: '0.875rem',
              color: isActive ? 'var(--violet)' : 'var(--text-muted)',
              background: isActive ? 'rgba(124,92,255,0.12)' : 'transparent',
              transition: 'all 0.15s',
            })}
          >
            {item.icon} <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, borderLeft: '1px solid var(--border)', marginLeft: 4 }}>
          <button
            className="btn-icon btn btn-ghost"
            onClick={() => setShowPalette(true)}
            title="Command palette (Ctrl+K)"
          >
            <Search size={18} />
          </button>
          <button
            className="btn-icon btn btn-ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div style={{ position: 'relative' }}>
            <button className="btn-icon btn btn-ghost" onClick={() => navigate('/student/inbox')}>
              <Bell size={18} />
              {unread > 0 && <span className="notification-dot" />}
            </button>
          </div>
          <button
            onClick={() => navigate('/student/profile')}
            style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}
          >
            {user?.name?.[0] ?? 'U'}
          </button>
        </div>
      </div>

      {/* Page content */}
      <main style={{ paddingTop: 72, paddingBottom: 100, minHeight: '100vh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom dock */}
      <div className="bottom-dock hide-desktop">
        {NAV_ITEMS.map(item => (
          <NavLink key={item.to} to={item.to}
            className={({ isActive }) => `dock-item${isActive ? ' active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Command palette */}
      <AnimatePresence>
        {showPalette && (
          <CommandPalette onClose={() => setShowPalette(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
