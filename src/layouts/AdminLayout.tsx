import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { LogOut, Sun, Moon, Zap } from 'lucide-react';

const ADMIN_NAV = [
  { to: '', icon: '🎛️', label: 'Dashboard' },
  { to: 'colleges', icon: '🏫', label: 'Colleges & Districts' },
  { to: 'reports', icon: '📊', label: 'Reports' },
  { to: 'announcements', icon: '📢', label: 'Announcements' },
  { to: 'audit', icon: '🔍', label: 'Audit Log' },
];

export default function AdminLayout() {
  const { user, logout, theme, setTheme } = useAuthStore();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const basePath = user?.role === 'super_admin' ? '/superadmin' : '/admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <div style={{
        width: expanded ? 240 : 72,
        background: 'var(--surface)',
        borderRight: '1.5px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '20px 12px',
        position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50,
        transition: 'width 0.25s var(--ease-smooth)',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px',
            borderRadius: 'var(--radius-md)', marginBottom: 24,
            background: 'rgba(124,92,255,0.08)', border: 'none', cursor: 'pointer', width: '100%',
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--glow-violet)' }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          {expanded && (
            <div style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>SkillSetu</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', textTransform: 'capitalize' }}>
                {user?.role?.replace(/_/g, ' ')}
              </div>
            </div>
          )}
        </button>

        {/* Nav */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ADMIN_NAV.map(item => (
            <NavLink
              key={item.label}
              to={`${basePath}${item.to ? '/' + item.to : '/dashboard'}`}
              end={item.to === ''}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--violet)' : 'var(--text-muted)',
                background: isActive ? 'rgba(124,92,255,0.12)' : 'transparent',
                fontWeight: 600, fontSize: '0.875rem',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              })}
              title={!expanded ? item.label : undefined}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
              {expanded && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap', background: 'none', border: 'none' }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} style={{ flexShrink: 0 }} /> : <Moon size={18} style={{ flexShrink: 0 }} />}
            {expanded && <span>Toggle theme</span>}
          </button>
          {expanded && (
            <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-2)', marginBottom: 4 }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{user?.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
            </div>
          )}
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius-md)', color: 'var(--rose)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap', background: 'none', border: 'none' }}
            onClick={handleLogout}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {expanded && <span>Sign out</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: expanded ? 240 : 72, transition: 'margin 0.25s', minWidth: 0 }}>
        <main style={{ padding: '32px', minHeight: '100vh' }}>
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
