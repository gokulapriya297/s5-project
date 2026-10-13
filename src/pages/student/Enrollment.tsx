import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { COURSES } from '../../data/mockData';
import toast from 'react-hot-toast';

const STEPS = ['Eligibility', 'Confirm', 'Submitted'];

export default function EnrollmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === id) ?? COURSES[1];
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const ELIGIBILITY_CHECKS = [
    { label: 'Year requirement (2nd–4th year)', pass: true },
    { label: 'Department eligibility (CSE)', pass: true },
    { label: 'Semester check (Semester 5)', pass: true },
    { label: 'Active course limit (1/2 slots used)', pass: true },
    { label: 'Enrollment window open', pass: true },
    { label: 'Seats available', pass: course.enrolledCount < course.totalSeats },
  ];

  const allPass = ELIGIBILITY_CHECKS.every(c => c.pass);

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep(2);
  };

  return (
    <div className="container" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 80 }}>
      {/* Back */}
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }} onClick={() => navigate(-1)}>
        ← Back to course
      </button>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: '2rem' }}>{course.coverEmoji}</span>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{course.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{course.durationWeeks} weeks · {course.mode}</p>
          </div>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: 0, marginTop: 24 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', border: '2px solid',
                  borderColor: i <= step ? 'var(--violet)' : 'var(--surface-3)',
                  background: i < step ? 'var(--violet)' : i === step ? 'rgba(124,92,255,0.15)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i <= step ? (i < step ? '#fff' : 'var(--violet)') : 'var(--text-faint)',
                  fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.3s',
                }}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: '0.72rem', marginTop: 4, color: i <= step ? 'var(--text)' : 'var(--text-faint)', fontWeight: i === step ? 700 : 400 }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ height: 2, flex: 0.5, background: i < step ? 'var(--violet)' : 'var(--surface-3)', marginBottom: 20, transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="card" style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: 16 }}>Eligibility check</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ELIGIBILITY_CHECKS.map(check => (
                  <div key={check.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: check.pass ? 'rgba(198,244,50,0.06)' : 'rgba(255,92,138,0.08)', borderRadius: 'var(--radius-md)', border: `1px solid ${check.pass ? 'rgba(198,244,50,0.2)' : 'rgba(255,92,138,0.25)'}` }}>
                    {check.pass
                      ? <CheckCircle size={18} color="var(--lime)" />
                      : <AlertCircle size={18} color="var(--rose)" />
                    }
                    <span style={{ fontSize: '0.875rem', color: check.pass ? 'var(--text)' : 'var(--rose)' }}>{check.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`btn ${allPass ? 'btn-primary' : 'btn-ghost'}`}
              style={{ width: '100%', padding: '14px' }}
              disabled={!allPass}
              onClick={() => setStep(1)}
            >
              {allPass ? <>Continue to confirm <ArrowRight size={16} /></> : 'Eligibility check failed'}
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="card" style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: 16 }}>Confirm your enrollment</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Course', value: course.title },
                  { label: 'Duration', value: `${course.durationWeeks} weeks · ${course.durationHours}h` },
                  { label: 'Mode', value: course.mode },
                  { label: 'Partner', value: 'TechBridge India' },
                  { label: 'Fee', value: course.isFunded ? 'Fully Funded' : `₹${course.fee}` },
                  { label: 'Certificate', value: `On passing ${course.passMarkPercent}% exam + ${course.minAttendancePercent}% attendance` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(124,92,255,0.08)', border: '1px solid rgba(124,92,255,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginTop: 16, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Your request will be sent to your college coordinator. You'll receive a notification when approved.
              </div>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
              onClick={submit}
              disabled={loading}
            >
              {loading ? <><Loader size={16} className="animate-spin" /> Sending request…</> : <>Submit enrollment request <ArrowRight size={16} /></>}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
            <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                style={{ fontSize: '4rem', marginBottom: 20 }}
              >
                ✅
              </motion.div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 8 }}>Request sent!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
                Your enrollment request for <strong>{course.title}</strong> has been submitted. Your coordinator will review it shortly.
              </p>

              {/* Status timeline */}
              <div className="timeline" style={{ textAlign: 'left', marginBottom: 28 }}>
                <div className="timeline-item">
                  <div className="timeline-item__dot done" />
                  <div className="timeline-item__content">
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Request submitted</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Just now</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item__dot active" />
                  <div className="timeline-item__content">
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Coordinator review</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending · Usually within 24h</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item__dot" />
                  <div className="timeline-item__content">
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Enrollment confirmed</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>You'll get notified</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => navigate('/student/home')}>Go to Home</button>
                <button className="btn btn-ghost" onClick={() => navigate('/student/explore')}>Explore more courses</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
