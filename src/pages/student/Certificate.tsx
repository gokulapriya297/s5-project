import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Share2, QrCode, CheckCircle, ExternalLink } from 'lucide-react';
import { MOCK_CERTIFICATES, MOCK_ENROLLMENTS, COURSES } from '../../data/mockData';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

function HoloCertificate({ cert }: { cert: typeof MOCK_CERTIFICATES[0] }) {
  return (
    <motion.div
      className="holo-border"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      style={{
        borderRadius: 'var(--radius-xl)', padding: '40px',
        background: 'linear-gradient(135deg, #151B33 0%, #1C2444 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Holographic shimmer overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(124,92,255,0.04) 0%, rgba(76,201,240,0.03) 50%, rgba(198,244,50,0.04) 100%)', pointerEvents: 'none' }} />

      <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏆</div>
      <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8 }}>Certificate of Completion</div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 4 }}>{cert.studentName}</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.9rem' }}>has successfully completed</p>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--violet)', marginBottom: 4 }}>{cert.courseName}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 24 }}>offered by {cert.partnerName}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        {/* QR Code placeholder */}
        <div style={{ width: 72, height: 72, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
          <QrCode size={52} color="#0B1020" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: 4 }}>Certificate ID</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text)', letterSpacing: '0.04em' }}>{cert.certificateCode}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: 6 }}>Issued: {new Date(cert.issuedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: 'rgba(198,244,50,0.1)', border: '1px solid rgba(198,244,50,0.3)', borderRadius: 'var(--radius-pill)', color: 'var(--lime)', fontSize: '0.8rem', fontWeight: 700 }}>
        <CheckCircle size={14} /> Verified by SkillSetu
      </div>
    </motion.div>
  );
}

export default function CertificatePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const completed = MOCK_ENROLLMENTS.filter(e => e.status === 'completed');
  const inProgress = MOCK_ENROLLMENTS.filter(e => e.status === 'approved');

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 80 }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 8 }}>
          🏆 My Path
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Your learning journey — completed, in progress and coming up.</p>
      </motion.div>

      {/* Earned Certificates */}
      {MOCK_CERTIFICATES.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🎓</span> Earned Certificates
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
            {MOCK_CERTIFICATES.map(cert => (
              <div key={cert.id}>
                <HoloCertificate cert={cert} />
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => toast.success('PDF download started!')}>
                    <Download size={14} /> Download PDF
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => window.open(`/verify/${cert.certificateCode}`, '_blank')}>
                    <ExternalLink size={14} /> Verify
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { navigator.clipboard.writeText(`https://skillsetu.in/verify/${cert.certificateCode}`); toast.success('Link copied!'); }}>
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 20 }}>📚 In Progress</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {inProgress.map(enr => {
            const course = COURSES.find(c => c.id === enr.courseId);
            if (!course) return null;
            const certEligible = enr.attendancePercent >= course.minAttendancePercent;
            return (
              <motion.div
                key={enr.id}
                className="card"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', gap: 16, alignItems: 'center', cursor: 'pointer' }}
                onClick={() => navigate(`/student/learn/${enr.id}`)}
              >
                <div style={{ fontSize: '2.5rem' }}>{course.coverEmoji}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: 4 }}>{course.title}</h3>
                  <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                    <span>Progress: {enr.progressPercent}%</span>
                    <span>Attendance: {enr.attendancePercent}%</span>
                    <span>Min. req: {course.minAttendancePercent}%</span>
                  </div>
                  <div className="xp-bar"><div className="xp-bar__fill" style={{ width: `${enr.progressPercent}%` }} /></div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  {certEligible
                    ? <span className="chip chip-lime">✓ Cert eligible</span>
                    : <span className="chip chip-amber">Needs {course.minAttendancePercent - enr.attendancePercent}% more</span>
                  }
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quest Path visualization */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 20 }}>🗺️ Quest Path</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative', maxWidth: 300, margin: '0 auto' }}>
          {[
            { label: 'Communicative English', icon: '🗣️', status: 'completed' },
            { label: 'Python for Data Science', icon: '📊', status: 'active' },
            { label: 'UI/UX Design', icon: '🎨', status: 'active' },
            { label: 'AWS Cloud Practitioner', icon: '☁️', status: 'locked' },
            { label: 'Full-Stack Dev', icon: '💻', status: 'locked' },
          ].map((node, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div
                className={`quest-node ${node.status}`}
                whileHover={node.status !== 'locked' ? { scale: 1.15 } : {}}
                style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', cursor: node.status !== 'locked' ? 'pointer' : 'default' }}
              >
                {node.status === 'completed' ? '✓' : node.icon}
              </motion.div>
              <p style={{ fontSize: '0.78rem', textAlign: 'center', maxWidth: 120, marginTop: 6, color: node.status === 'locked' ? 'var(--text-faint)' : 'var(--text-muted)', fontWeight: node.status === 'active' ? 700 : 400 }}>
                {node.label}
              </p>
              {i < 4 && (
                <div className={`quest-connector ${node.status === 'completed' ? 'done' : ''}`} style={{ height: 40, width: 3, borderRadius: 99, margin: '4px 0' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
