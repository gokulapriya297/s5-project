import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckSquare, FileText, MessageSquare, Volume2, BookOpen, X } from 'lucide-react';
import { MOCK_ENROLLMENTS, COURSES, MOCK_SESSIONS } from '../../data/mockData';
import toast from 'react-hot-toast';

const CURRICULUM = [
  { id: 'm1', title: 'Python Foundations', sessions: [
    { id: 's1', title: 'Variables & Types', done: true, type: 'video' as const },
    { id: 's2', title: 'Control Flow', done: true, type: 'video' as const },
    { id: 's3', title: 'Functions & Scope', done: false, type: 'video' as const },
    { id: 's4', title: 'Module Quiz', done: false, type: 'quiz' as const },
  ]},
  { id: 'm2', title: 'Data Manipulation', sessions: [
    { id: 's5', title: 'NumPy Arrays', done: false, type: 'video' as const },
    { id: 's6', title: 'Pandas DataFrames', done: false, type: 'video' as const },
    { id: 's7', title: 'Data Cleaning', done: false, type: 'video' as const },
    { id: 's8', title: 'Assignment 1', done: false, type: 'assignment' as const },
  ]},
];

export default function LearningRoom() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const navigate = useNavigate();
  const enrollment = MOCK_ENROLLMENTS.find(e => e.id === enrollmentId) ?? MOCK_ENROLLMENTS[0];
  const course = COURSES.find(c => c.id === enrollment.courseId) ?? COURSES[0];

  const [showCurriculum, setShowCurriculum] = useState(true);
  const [activeSession, setActiveSession] = useState(CURRICULUM[0].sessions[2]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const handleCheckIn = () => {
    setCheckedIn(true);
    toast.success('Attendance marked ✓ +10 XP');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', paddingTop: 0 }}>
      {/* Curriculum panel */}
      <AnimatePresence>
        {showCurriculum && (
          <motion.div
            initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
            style={{ background: 'var(--surface)', borderRight: '1.5px solid var(--border)', overflow: 'hidden', flexShrink: 0 }}
          >
            <div style={{ height: '100%', overflowY: 'auto', padding: '20px 0' }}>
              <div style={{ padding: '0 16px 16px', borderBottom: '1px solid var(--border)' }}>
                <button className="btn btn-ghost btn-sm" style={{ marginBottom: 10 }} onClick={() => navigate(-1)}>← Exit</button>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', lineHeight: 1.3 }}>{course.title}</h2>
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    <span>Progress</span><span>{enrollment.progressPercent}%</span>
                  </div>
                  <div className="xp-bar"><div className="xp-bar__fill" style={{ width: `${enrollment.progressPercent}%` }} /></div>
                </div>
              </div>

              {CURRICULUM.map(module => (
                <div key={module.id}>
                  <div style={{ padding: '12px 16px 8px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {module.title}
                  </div>
                  {module.sessions.map(session => (
                    <button
                      key={session.id}
                      onClick={() => setActiveSession(session)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 16px', background: activeSession.id === session.id ? 'rgba(124,92,255,0.12)' : 'transparent',
                        border: 'none', cursor: 'pointer', textAlign: 'left', borderLeft: activeSession.id === session.id ? '3px solid var(--violet)' : '3px solid transparent',
                        color: 'var(--text)',
                      }}
                    >
                      <span style={{ fontSize: '0.8rem' }}>
                        {session.type === 'video' ? '▶' : session.type === 'quiz' ? '✏️' : '📝'}
                      </span>
                      <span style={{ fontSize: '0.85rem', flex: 1 }}>{session.title}</span>
                      {session.done && <CheckSquare size={14} color="var(--lime)" />}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main player area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowCurriculum(!showCurriculum)}>
              <BookOpen size={16} />
            </button>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{activeSession.title}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {!checkedIn && (
              <button className="btn btn-lime btn-sm" onClick={handleCheckIn}>
                <CheckSquare size={14} /> Mark Attendance
              </button>
            )}
            {checkedIn && <span className="chip chip-lime">✓ Attended</span>}
            <button className="btn btn-ghost btn-sm" onClick={() => setShowNotes(!showNotes)}>
              <MessageSquare size={16} /> Notes
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/student/assess/asmnt1`)}>
              <FileText size={16} /> Quiz
            </button>
          </div>
        </div>

        {/* Video player area */}
        <div style={{ flex: 1, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(124,92,255,0.15) 0%, rgba(11,16,32,0.95) 60%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20
          }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(124,92,255,0.3)', border: '2px solid var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '2rem' }}>▶</span>
            </motion.div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 8, color: '#fff' }}>{activeSession.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                {course.title} · Session video (mock — connect real content provider)
              </p>
            </div>
          </div>
        </div>

        {/* Progress controls */}
        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderTop: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0 }}>
          <button className="btn btn-ghost btn-sm"><ChevronLeft size={16} /> Previous</button>
          <div style={{ display: 'flex', gap: 4 }}>
            {[...CURRICULUM[0].sessions, ...CURRICULUM[1].sessions].map((s, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: s.done ? 'var(--lime)' : s.id === activeSession.id ? 'var(--violet)' : 'var(--surface-3)' }} />
            ))}
          </div>
          <button className="btn btn-primary btn-sm">Next <ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Notes panel */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
            style={{ background: 'var(--surface)', borderLeft: '1.5px solid var(--border)', flexShrink: 0, overflow: 'hidden' }}
          >
            <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>📝 Notes</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowNotes(false)}><X size={16} /></button>
              </div>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Jot down your notes here…"
                style={{ flex: 1, resize: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', lineHeight: 1.6, border: '1.5px solid var(--border)', background: 'var(--surface-2)' }}
              />
              <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={() => toast.success('Notes saved!')}>Save notes</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
