import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Briefcase, Award, HelpCircle, Command } from 'lucide-react';
import { COURSES, MOCK_JOBS } from '../data/mockData';

interface Props { onClose: () => void; }

const ALL_COMMANDS = [
  { id: 'home', label: 'Go to Home', icon: '🏠', path: '/student/home', category: 'Navigation' },
  { id: 'explore', label: 'Explore Courses', icon: '🔭', path: '/student/explore', category: 'Navigation' },
  { id: 'jobs', label: 'Browse Jobs', icon: '💼', path: '/student/jobs', category: 'Navigation' },
  { id: 'profile', label: 'My Profile', icon: '👤', path: '/student/profile', category: 'Navigation' },
  { id: 'certs', label: 'My Certificates', icon: '🏆', path: '/student/certificates', category: 'Navigation' },
  { id: 'helpdesk', label: 'Raise a Ticket', icon: '🎫', path: '/student/helpdesk', category: 'Support' },
  ...COURSES.map(c => ({ id: 'crs-' + c.id, label: c.title, icon: c.coverEmoji, path: '/student/course/' + c.id, category: 'Course' })),
  ...MOCK_JOBS.map(j => ({ id: 'job-' + j.id, label: j.title + ' — ' + j.company, icon: '💼', path: '/student/jobs', category: 'Job' })),
];

export default function CommandPalette({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = query.length < 1
    ? ALL_COMMANDS.slice(0, 8)
    : ALL_COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setSelected(0); }, [query]);

  const go = (path: string) => { navigate(path); onClose(); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && filtered[selected]) go(filtered[selected].path);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [filtered, selected]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 200 }}
        onClick={onClose}
      />

      {/* Palette box */}
      <div className="command-palette">
        <motion.div
          className="command-palette__box"
          initial={{ opacity: 0, scale: 0.94, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1.5px solid var(--border)' }}>
            <Search size={18} color="var(--violet)" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search courses, jobs, pages…"
              style={{ border: 'none', background: 'transparent', flex: 1, fontSize: '1rem', outline: 'none', color: 'var(--text)' }}
            />
            <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-faint)', background: 'var(--surface-2)', padding: '2px 8px', borderRadius: 6 }}>ESC</kbd>
          </div>

          {/* Results */}
          <div style={{ maxHeight: 360, overflowY: 'auto', padding: '8px 0' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-faint)' }}>No results for "{query}"</div>
            ) : (
              filtered.map((item, i) => (
                <div
                  key={item.id}
                  className={`command-item ${i === selected ? 'selected' : ''}`}
                  onClick={() => go(item.path)}
                >
                  <span style={{ fontSize: '1rem', width: 24, textAlign: 'center' }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.label}</div>
                  </div>
                  <span className="chip" style={{ fontSize: '0.7rem', padding: '1px 8px' }}>{item.category}</span>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 16, fontSize: '0.75rem', color: 'var(--text-faint)' }}>
            <span><kbd style={{ fontFamily: 'var(--font-mono)' }}>↑↓</kbd> navigate</span>
            <span><kbd style={{ fontFamily: 'var(--font-mono)' }}>↵</kbd> open</span>
            <span><kbd style={{ fontFamily: 'var(--font-mono)' }}>Esc</kbd> close</span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
