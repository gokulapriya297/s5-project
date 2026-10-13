import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Clock, ChevronRight, CheckCircle, X, LayoutList, LayoutGrid, ArrowRight } from 'lucide-react';
import { MOCK_JOBS, MOCK_APPLICATIONS, PARTNERS } from '../../data/mockData';
import type { Job, ApplicationStatus } from '../../types';
import toast from 'react-hot-toast';

const TYPE_LABELS: Record<string, string> = {
  full_time: 'Full-time', part_time: 'Part-time', internship: 'Internship', contract: 'Contract',
};

const STATUS_ORDER: ApplicationStatus[] = ['applied', 'shortlisted', 'interview', 'offer'];
const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: 'var(--text-muted)', shortlisted: 'var(--sky)', interview: 'var(--violet)', offer: 'var(--lime)', rejected: 'var(--rose)', withdrawn: 'var(--text-faint)',
};

function JobCard({ job, fitScore, onApply, applied }: { job: Job; fitScore: number; onApply: (id: string) => void; applied: boolean }) {
  return (
    <motion.div
      className="card card-interactive"
      whileHover={{ y: -4 }}
      style={{ padding: '20px 22px' }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', border: '1px solid var(--border)' }}>🤝</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: 2 }}>{job.title}</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{job.company}</div>
        </div>
        <span className="match-badge">{fitScore}% fit</span>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <span className="chip" style={{ fontSize: '0.72rem' }}><MapPin size={10} /> {job.location}</span>
        <span className="chip" style={{ fontSize: '0.72rem' }}><Briefcase size={10} /> {TYPE_LABELS[job.type]}</span>
        {job.salaryRange && <span className="chip chip-lime" style={{ fontSize: '0.72rem' }}>{job.salaryRange}</span>}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {applied ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--lime)', fontWeight: 600, fontSize: '0.875rem' }}>
            <CheckCircle size={16} /> Applied
          </div>
        ) : (
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => onApply(job.id)}>
            Apply now <ArrowRight size={14} />
          </button>
        )}
        <button className="btn btn-ghost btn-sm">View <ChevronRight size={14} /></button>
      </div>
    </motion.div>
  );
}

export default function JobsPage() {
  const [view, setView] = useState<'cards' | 'kanban'>('cards');
  const [applications, setApplications] = useState([...MOCK_APPLICATIONS]);

  const FIT_SCORES: Record<string, number> = { job1: 82, job2: 74, job3: 65 };

  const apply = (jobId: string) => {
    const alreadyApplied = applications.some(a => a.jobId === jobId);
    if (alreadyApplied) { toast.error('Already applied!'); return; }
    setApplications(a => [...a, {
      id: 'app-new-' + jobId, jobId, studentId: 'sp1',
      status: 'applied', appliedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), fitScore: FIT_SCORES[jobId] ?? 70,
    }]);
    toast.success('Application submitted! 🎉');
  };

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 80 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 4 }}>
            💼 Jobs & Placements
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Matched to your completed courses and skills</p>
        </div>
        <div className="tabs" style={{ width: 'auto' }}>
          <button className={`tab-btn ${view === 'cards' ? 'active' : ''}`} onClick={() => setView('cards')}>
            <LayoutGrid size={15} /> Cards
          </button>
          <button className={`tab-btn ${view === 'kanban' ? 'active' : ''}`} onClick={() => setView('kanban')}>
            <LayoutList size={15} /> My Applications
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {view === 'cards' ? (
          <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Matched badge */}
            <div className="announcement-card" style={{ marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Jobs matched to you</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Based on: Communicative English (completed) · Python for Data Science (enrolled) · Skills: Python, SQL, JavaScript</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {MOCK_JOBS.map((job, i) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <JobCard
                    job={job}
                    fitScore={FIT_SCORES[job.id] ?? 70}
                    onApply={apply}
                    applied={applications.some(a => a.jobId === job.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="kanban" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 20 }}>Application Tracker</h2>
            <div className="kanban">
              {STATUS_ORDER.map(status => {
                const apps = applications.filter(a => a.status === status);
                return (
                  <div key={status} className="kanban-col">
                    <div className="kanban-col__header">
                      <span style={{ color: STATUS_COLORS[status], textTransform: 'capitalize' }}>{status}</span>
                      <span className="chip" style={{ fontSize: '0.72rem' }}>{apps.length}</span>
                    </div>
                    {apps.map(app => {
                      const job = MOCK_JOBS.find(j => j.id === app.jobId);
                      if (!job) return null;
                      return (
                        <div key={app.id} className="card" style={{ padding: '14px', cursor: 'default' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 4 }}>{job.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>{job.company}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="match-badge">{app.fitScore}% fit</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{new Date(app.appliedAt).toLocaleDateString('en-IN')}</span>
                          </div>
                        </div>
                      );
                    })}
                    {apps.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-faint)', fontSize: '0.82rem' }}>No applications</div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
