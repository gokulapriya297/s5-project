import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, BarChart2, Globe, CheckCircle, ArrowRight, BookOpen, Award, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { COURSES, PARTNERS, MOCK_ENROLLMENTS } from '../../data/mockData';

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'var(--lime)',
  intermediate: 'var(--sky)',
  advanced: 'var(--rose)',
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === id) ?? COURSES[0];
  const partner = PARTNERS.find(p => p.id === course.partnerId);
  const enrollment = MOCK_ENROLLMENTS.find(e => e.courseId === course.id);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const seatsLeft = course.totalSeats - course.enrolledCount;
  const seatsPercent = Math.round((course.enrolledCount / course.totalSeats) * 100);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero banner */}
      <div style={{ height: 280, background: course.coverGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.3))' }}
        >
          {course.coverEmoji}
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, var(--bg) 100%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 20 }}>
          <button className="btn btn-ghost btn-sm glass" onClick={() => navigate(-1)}>← Back</button>
        </div>
        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 8 }}>
          {course.isFunded && <span className="chip chip-lime">🆓 Fully Funded</span>}
          <span className="chip" style={{ background: LEVEL_COLORS[course.level] + '20', borderColor: LEVEL_COLORS[course.level], color: LEVEL_COLORS[course.level] }}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Content + sticky sidebar */}
      <div className="container" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
          {/* Main content – story scroll */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Hook */}
              <div style={{ marginBottom: 36 }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 12 }}>{course.title}</h1>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{course.description}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <Clock size={15} /> {course.durationHours}h · {course.durationWeeks} weeks
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <Globe size={15} /> {course.mode}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <Users size={15} /> {course.enrolledCount} enrolled
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <BarChart2 size={15} /> Pass mark: {course.passMarkPercent}%
                  </span>
                </div>
              </div>

              {/* What you'll build */}
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 16 }}>🎯 What you'll achieve</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                  {course.outcomes.map((outcome, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                      <CheckCircle size={16} color="var(--lime)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap / Syllabus */}
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 16 }}>📍 Roadmap</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {course.syllabus.map((mod, i) => (
                    <div key={mod.id} style={{ border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      <button
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--surface-2)', cursor: 'pointer', border: 'none', color: 'var(--text)', fontFamily: 'var(--font-body)', fontWeight: 600 }}
                        onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{i + 1}</div>
                          <span>{mod.title}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{mod.durationHours}h</span>
                          {expandedModule === mod.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>
                      {expandedModule === mod.id && (
                        <div style={{ padding: '12px 18px 14px', background: 'var(--surface)' }}>
                          {mod.topics.map((topic, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: '0.875rem', color: 'var(--text-muted)', borderBottom: j < mod.topics.length - 1 ? '1px solid var(--border)' : 'none' }}>
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--violet)', flexShrink: 0 }} />
                              {topic}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner */}
              <div className="card" style={{ marginBottom: 36, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--border)' }}>🤝</div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Training Partner</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem' }}>{partner?.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{partner?.description}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sticky sidebar */}
          <div style={{ position: 'sticky', top: 88 }}>
            <motion.div
              className="card"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              style={{ padding: '24px' }}
            >
              {/* Seat meter */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Seats available</span>
                  <span style={{ fontWeight: 600, color: seatsLeft < 20 ? 'var(--rose)' : 'var(--lime)' }}>{seatsLeft} left</span>
                </div>
                <div className="seat-meter" style={{ height: 10 }}>
                  <div className={`seat-meter__fill ${seatsPercent >= 80 ? 'high' : seatsPercent >= 50 ? 'mid' : 'low'}`} style={{ width: `${seatsPercent}%` }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: 4 }}>{course.enrolledCount}/{course.totalSeats} enrolled</div>
              </div>

              {/* Quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'Duration', value: `${course.durationWeeks}w` },
                  { label: 'Hours', value: `${course.durationHours}h` },
                  { label: 'Min. attendance', value: `${course.minAttendancePercent}%` },
                  { label: 'Pass mark', value: `${course.passMarkPercent}%` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>{value}</div>
                  </div>
                ))}
              </div>

              {enrollment ? (
                <div>
                  <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(198,244,50,0.08)', border: '1px solid rgba(198,244,50,0.25)', borderRadius: 'var(--radius-md)', marginBottom: 12 }}>
                    <div style={{ color: 'var(--lime)', fontWeight: 700, fontSize: '0.9rem' }}>✓ Already Enrolled</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Progress: {enrollment.progressPercent}%</div>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/student/learn/${enrollment.id}`)}>
                    Continue Learning <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <button className="btn btn-lime" style={{ width: '100%', padding: '14px' }} onClick={() => navigate(`/student/enroll/${course.id}`)}>
                  Enroll Now — It's Free <ArrowRight size={16} />
                </button>
              )}

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: 12 }}>
                Coordinator approval required · Usually within 24h
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
