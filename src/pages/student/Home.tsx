import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Trophy, Zap, ChevronRight, Clock, Calendar, AlertCircle, BookOpen, Star } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { MOCK_ENROLLMENTS, COURSES, MOCK_SESSIONS, MOCK_ANNOUNCEMENTS, MOCK_NOTIFICATIONS } from '../../data/mockData';

function ProgressRing({ percent, size = 80, stroke = 7, color = 'var(--violet)' }: { percent: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-ring">
      <circle className="progress-ring__track" cx={size/2} cy={size/2} r={r} strokeWidth={stroke} />
      <circle className="progress-ring__fill" cx={size/2} cy={size/2} r={r} strokeWidth={stroke}
        stroke={color} strokeDasharray={circ} strokeDashoffset={offset} />
    </svg>
  );
}

const BADGES = [
  { icon: '⚡', label: 'Quick Start', earned: true },
  { icon: '🔥', label: '7-Day Streak', earned: true },
  { icon: '📊', label: 'Data Wizard', earned: false },
  { icon: '☁️', label: 'Cloud Walker', earned: false },
  { icon: '🏆', label: 'Top Scorer', earned: false },
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const STREAK_STATUS = ['done','done','done','done','done','done','today'];

export default function StudentHome() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const approvedEnrollments = MOCK_ENROLLMENTS.filter(e => e.status === 'approved');
  const activeEnrollments = approvedEnrollments.map(enr => {
    const course = COURSES.find(c => c.id === enr.courseId);
    return { ...enr, course };
  });

  const todaySession = MOCK_SESSIONS[0];
  const todayCourse = COURSES.find(c => c.id === COURSES[0].id);
  const unreadNotifs = MOCK_NOTIFICATIONS.filter(n => !n.isRead);

  // XP and Level
  const xp = 2840;
  const level = 7;
  const xpToNext = 3200;
  const xpPercent = Math.round((xp / xpToNext) * 100);

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 32 }}>
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
      >
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>Good morning 👋</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 4 }}>
            {user?.name?.split(' ')[0] ?? 'Student'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span className="chip chip-violet"><Zap size={11} /> Level {level}</span>
            <span className="chip chip-lime"><Flame size={11} /> 12-day streak</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{xp} XP</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {unreadNotifs.length > 0 && (
            <div style={{ background: 'rgba(255,92,138,0.12)', border: '1px solid rgba(255,92,138,0.3)', borderRadius: 'var(--radius-md)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--rose)', cursor: 'pointer' }}
              onClick={() => navigate('/student/inbox')}>
              <AlertCircle size={16} /> {unreadNotifs.length} new notifications
            </div>
          )}
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* XP Progress Card */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, rgba(124,92,255,0.15) 0%, rgba(76,201,240,0.08) 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Level {level} · Skill Seeker</p>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginTop: 2 }}><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--violet)' }}>{xp.toLocaleString()}</span> XP</h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>{xpToNext - xp} XP to Level {level + 1}</p>
              </div>
              <div style={{ position: 'relative' }}>
                <ProgressRing percent={xpPercent} size={88} stroke={8} color="var(--violet)" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem' }}>{xpPercent}%</div>
              </div>
            </div>
            <div className="xp-bar"><div className="xp-bar__fill" style={{ width: `${xpPercent}%` }} /></div>
          </motion.div>

          {/* Weekly streak */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
                <Flame size={18} color="var(--rose)" style={{ marginRight: 6, verticalAlign: 'middle' }} />
                Weekly Streak
              </h3>
              <span className="chip chip-rose">12 days 🔥</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {DAYS.map((day, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div className={`streak-dot ${STREAK_STATUS[i]}`}>{day}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
                <Trophy size={16} color="var(--amber)" style={{ marginRight: 6, verticalAlign: 'middle' }} />
                Badges
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2 / {BADGES.length} earned</span>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {BADGES.map(badge => (
                <div key={badge.label} className="badge-card">
                  <div className={`badge-icon ${badge.earned ? 'earned' : ''}`} title={badge.label}>{badge.icon}</div>
                  <span style={{ fontSize: '0.68rem', color: badge.earned ? 'var(--text-muted)' : 'var(--text-faint)', fontWeight: badge.earned ? 600 : 400 }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Today card */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            style={{ background: 'linear-gradient(135deg, rgba(198,244,50,0.08) 0%, rgba(76,201,240,0.05) 100%)', border: '1.5px solid rgba(198,244,50,0.2)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span className="chip chip-lime"><Calendar size={11} /> Today</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Oct 14, 2024</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: 4 }}>
              {todaySession.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              <Clock size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {todaySession.startTime} – {todaySession.endTime} · Online
            </p>
            <button
              className="btn btn-lime btn-sm"
              onClick={() => navigate('/student/learn/enr1')}
              style={{ width: '100%' }}
            >
              Join session <ChevronRight size={16} />
            </button>
          </motion.div>

          {/* Active courses / Quest path */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
                <BookOpen size={16} color="var(--violet)" style={{ marginRight: 6, verticalAlign: 'middle' }} />
                My Path
              </h3>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/student/certificates')}>
                View all <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {activeEnrollments.map((enr, i) => (
                <div
                  key={enr.id}
                  style={{ display: 'flex', gap: 14, cursor: 'pointer', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--surface-2)', transition: 'background 0.15s' }}
                  onClick={() => navigate(`/student/learn/${enr.id}`)}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'}
                >
                  <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{enr.course?.coverEmoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{enr.course?.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{enr.progressPercent}% done</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>·</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{enr.attendancePercent}% attendance</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${enr.progressPercent}%`, background: 'var(--violet)', borderRadius: 99 }} />
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <ProgressRing percent={enr.progressPercent} size={44} stroke={4} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{enr.progressPercent}%</div>
                  </div>
                </div>
              ))}

              {/* Completed */}
              <div style={{ display: 'flex', gap: 14, padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(198,244,50,0.08)', border: '1px solid rgba(198,244,50,0.2)' }}>
                <div style={{ fontSize: '1.8rem' }}>🗣️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>Communicative English</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="chip chip-lime" style={{ fontSize: '0.7rem' }}>✓ Completed</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Score: 82%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: 16 }}>
              📢 Announcements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_ANNOUNCEMENTS.map(a => (
                <div key={a.id} className="announcement-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{a.title}</div>
                    {a.isPinned && <span className="chip chip-violet" style={{ fontSize: '0.68rem', flexShrink: 0 }}>📌 Pinned</span>}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{a.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
