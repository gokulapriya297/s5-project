import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react';
import { COURSES, PARTNERS } from '../../data/mockData';
import type { CourseDomain, CourseLevel, CourseMode } from '../../types';

const DOMAINS: { label: string; value: CourseDomain | ''; emoji: string; color: string }[] = [
  { label: 'All', value: '', emoji: '🌐', color: 'var(--violet)' },
  { label: 'Data & AI', value: 'data', emoji: '📊', color: '#4CC9F0' },
  { label: 'Cloud', value: 'cloud', emoji: '☁️', color: '#7C5CFF' },
  { label: 'Design', value: 'design', emoji: '🎨', color: '#FF5C8A' },
  { label: 'Engineering', value: 'engineering', emoji: '💻', color: '#C6F432' },
  { label: 'Business', value: 'business', emoji: '📈', color: '#FFB347' },
  { label: 'Language', value: 'language', emoji: '🗣️', color: '#A78BFA' },
];

const SEAT_COLOR = (pct: number) => pct >= 80 ? 'high' : pct >= 50 ? 'mid' : 'low';

function CourseCard({ course, matchPercent }: { course: typeof COURSES[0]; matchPercent: number }) {
  const navigate = useNavigate();
  const seatsPercent = Math.round((course.enrolledCount / course.totalSeats) * 100);

  return (
    <motion.div
      className="card card-interactive"
      whileHover={{ y: -6, boxShadow: 'var(--glow-violet), var(--shadow-elevated)' }}
      onClick={() => navigate(`/student/course/${course.id}`)}
      style={{ cursor: 'pointer', overflow: 'hidden', padding: 0 }}
    >
      {/* Cover */}
      <div style={{ height: 120, background: course.coverGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
        {course.coverEmoji}
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
          {course.isFunded && <span className="chip chip-lime" style={{ fontSize: '0.7rem' }}>🆓 Funded</span>}
          <span className="match-badge">{matchPercent}% match</span>
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
          <span className="chip" style={{ fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', borderColor: 'transparent', color: '#fff' }}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px 20px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: 6, lineHeight: 1.3 }}>{course.title}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.description}
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <span className="chip" style={{ fontSize: '0.72rem' }}>{course.durationWeeks}w</span>
          <span className="chip" style={{ fontSize: '0.72rem' }}>{course.mode}</span>
          <span className="chip" style={{ fontSize: '0.72rem' }}>{course.language === 'ta' ? '🇮🇳 Tamil' : course.language === 'both' ? '🌐 EN+TA' : '🇬🇧 English'}</span>
        </div>

        {/* Seat meter */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
            <span>Seats filled</span>
            <span>{course.enrolledCount}/{course.totalSeats}</span>
          </div>
          <div className="seat-meter">
            <div className={`seat-meter__fill ${SEAT_COLOR(seatsPercent)}`} style={{ width: `${seatsPercent}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState<CourseDomain | ''>('');
  const [mode, setMode] = useState<CourseMode | ''>('');
  const [level, setLevel] = useState<CourseLevel | ''>('');
  const [fundedOnly, setFundedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const MATCH_PERCENTS: Record<string, number> = {
    crs1: 94, crs2: 78, crs3: 85, crs4: 88, crs5: 62, crs6: 71,
  };

  const filtered = COURSES.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (domain && c.domain !== domain) return false;
    if (mode && c.mode !== mode) return false;
    if (level && c.level !== level) return false;
    if (fundedOnly && !c.isFunded) return false;
    return true;
  });

  const toggleCompare = (id: string) => {
    setCompareIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : ids.length < 3 ? [...ids, id] : ids);
  };

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 120 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 8 }}>
          Explore <span className="gradient-text">Courses</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {filtered.length} courses found · Matched to your profile
        </p>
      </motion.div>

      {/* Search + filter bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, skill, domain…"
            style={{ paddingLeft: 44 }}
          />
        </div>
        <button
          className={`btn ${showFilters ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={16} /> Filters {(mode || level || fundedOnly) && '•'}
        </button>
      </div>

      {/* Domain pills */}
      <div className="scroll-x" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, width: 'max-content', paddingBottom: 4 }}>
          {DOMAINS.map(d => (
            <button
              key={d.value}
              className={`chip ${domain === d.value ? 'active' : ''}`}
              onClick={() => setDomain(domain === d.value ? '' : d.value as CourseDomain | '')}
            >
              {d.emoji} {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter slide-over */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: 24 }}
          >
            <div className="card" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ minWidth: 140 }}>
                <label className="form-label">Mode</label>
                <select value={mode} onChange={e => setMode(e.target.value as CourseMode | '')}>
                  <option value="">All modes</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="form-group" style={{ minWidth: 140 }}>
                <label className="form-label">Level</label>
                <select value={level} onChange={e => setLevel(e.target.value as CourseLevel | '')}>
                  <option value="">All levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                <input type="checkbox" checked={fundedOnly} onChange={e => setFundedOnly(e.target.checked)} style={{ width: 16, height: 16 }} />
                Funded / Free only
              </label>
              <button className="btn btn-ghost btn-sm" onClick={() => { setMode(''); setLevel(''); setFundedOnly(false); }}>
                <X size={14} /> Clear filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🔭</div>
          <h3 style={{ fontFamily: 'var(--font-heading)' }}>No courses match your filters</h3>
          <p>Try adjusting your search or clearing filters.</p>
          <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setDomain(''); setMode(''); setLevel(''); setFundedOnly(false); }}>
            Clear all filters
          </button>
        </div>
      ) : (
        <div style={{ columns: '280px', gap: 20 }}>
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ breakInside: 'avoid', marginBottom: 20 }}
            >
              <CourseCard course={course} matchPercent={MATCH_PERCENTS[course.id] ?? 70} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Compare tray */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            style={{ position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)', background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '12px 20px', boxShadow: 'var(--shadow-elevated)', display: 'flex', gap: 12, alignItems: 'center', zIndex: 90 }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Compare {compareIds.length} courses</span>
            {compareIds.map(id => {
              const c = COURSES.find(c => c.id === id);
              return c ? <span key={id} className="chip chip-violet">{c.coverEmoji} {c.title.split(' ').slice(0,2).join(' ')}</span> : null;
            })}
            <button className="btn btn-primary btn-sm">Compare</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setCompareIds([])}><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
