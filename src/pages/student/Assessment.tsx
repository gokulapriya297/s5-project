import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { MOCK_ASSESSMENTS } from '../../data/mockData';
import toast from 'react-hot-toast';

function ProgressRing({ percent, size = 120, stroke = 10, color = 'var(--violet)' }: { percent: number; size?: number; stroke?: number; color?: string }) {
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

function CircularTimer({ total, elapsed }: { total: number; elapsed: number }) {
  const percent = ((total - elapsed) / total) * 100;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const isLow = elapsed < 120;
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <ProgressRing percent={percent} size={80} stroke={6} color={isLow ? 'var(--rose)' : 'var(--sky)'} />
      <div style={{ position: 'absolute', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', color: isLow ? 'var(--rose)' : 'var(--text)', textAlign: 'center' }}>
        {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const assessment = MOCK_ASSESSMENTS.find(a => a.id === assessmentId) ?? MOCK_ASSESSMENTS[0];
  const questions = assessment.questions;

  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(assessment.durationMinutes * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!started || submitted) return;
    timerRef.current = setInterval(() => {
      setElapsed(e => {
        if (e <= 1) { clearInterval(timerRef.current!); handleSubmit(); return 0; }
        return e - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [started, submitted]);

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current!);
    setSubmitted(true);
    toast.success('Assessment submitted!');
  };

  // Scoring
  const score = answers.reduce((acc, ans, i) => {
    return ans === questions[i].correctIndex ? acc + questions[i].points : acc;
  }, 0);
  const maxScore = questions.reduce((acc, q) => acc + q.points, 0);
  const percent = Math.round((score / maxScore) * 100);
  const passed = percent >= assessment.passMarkPercent;

  // Topic breakdown
  const topics = [...new Set(questions.map(q => q.topic ?? 'General'))];
  const topicScores = topics.map(topic => {
    const qs = questions.filter(q => q.topic === topic);
    const correct = qs.filter((q, i) => answers[questions.indexOf(q)] === q.correctIndex).length;
    return { topic, percent: Math.round((correct / qs.length) * 100) };
  });

  if (!started) {
    return (
      <div className="container" style={{ maxWidth: 600, paddingTop: 60, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div style={{ fontSize: '4rem', marginBottom: 20 }}>✏️</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 8 }}>{assessment.title}</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
            {questions.length} questions · {assessment.durationMinutes} minutes · Pass mark: {assessment.passMarkPercent}%
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
            {[
              { label: 'Questions', value: questions.length },
              { label: 'Duration', value: `${assessment.durationMinutes}m` },
              { label: 'Max attempts', value: assessment.maxAttempts },
              { label: 'Pass mark', value: `${assessment.passMarkPercent}%` },
            ].map(({ label, value }) => (
              <div key={label} className="card" style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStarted(true)}>
            Start Assessment <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container" style={{ maxWidth: 600, paddingTop: 40, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
            <ProgressRing percent={percent} size={160} stroke={12} color={passed ? 'var(--lime)' : 'var(--rose)'} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: passed ? 'var(--lime)' : 'var(--rose)' }}>{percent}%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{score}/{maxScore}</div>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }}
          >
            {passed ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 24px', background: 'rgba(198,244,50,0.12)', border: '2px solid var(--lime)', borderRadius: 'var(--radius-pill)', color: 'var(--lime)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 24 }}>
                <CheckCircle size={22} /> Passed!
              </div>
            ) : (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 24px', background: 'rgba(255,92,138,0.12)', border: '2px solid var(--rose)', borderRadius: 'var(--radius-pill)', color: 'var(--rose)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 24 }}>
                <AlertCircle size={22} /> Not passed · Needed {assessment.passMarkPercent}%
              </div>
            )}
          </motion.div>

          {/* Topic breakdown */}
          <div className="card" style={{ textAlign: 'left', marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 16, fontSize: '1rem' }}>Topic breakdown</h3>
            {topicScores.map(({ topic, percent: tp }) => (
              <div key={topic} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 4 }}>
                  <span>{topic}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: tp >= 60 ? 'var(--lime)' : 'var(--rose)' }}>{tp}%</span>
                </div>
                <div className="xp-bar">
                  <div className="xp-bar__fill" style={{ width: `${tp}%`, background: tp >= 60 ? 'var(--lime)' : 'var(--rose)' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            {!passed && (
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setSubmitted(false); setStarted(false); setQIndex(0); setAnswers(new Array(questions.length).fill(null)); setElapsed(assessment.durationMinutes * 60); }}>
                <RotateCcw size={16} /> Retry
              </button>
            )}
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/student/home')}>
              {passed ? 'Claim XP +150' : 'Back to home'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[qIndex];
  const answered = answers[qIndex];

  return (
    <div className="container" style={{ maxWidth: 640, paddingTop: 32, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{assessment.title}</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Question {qIndex + 1} of {questions.length}</p>
        </div>
        <CircularTimer total={assessment.durationMinutes * 60} elapsed={elapsed} />
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 32, flexWrap: 'wrap' }}>
        {questions.map((_, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: i === qIndex ? 'var(--violet)' : answers[i] !== null ? 'var(--lime)' : 'var(--surface-3)',
            cursor: 'pointer', transition: 'all 0.15s',
          }} onClick={() => setQIndex(i)} />
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <div className="card" style={{ marginBottom: 20 }}>
            {q.topic && <span className="chip chip-violet" style={{ marginBottom: 12 }}>{q.topic}</span>}
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>{q.text}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 'var(--radius-md)',
                  border: `2px solid ${answered === i ? 'var(--violet)' : 'var(--border)'}`,
                  background: answered === i ? 'rgba(124,92,255,0.12)' : 'var(--surface)',
                  cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
                  transition: 'all 0.15s', fontFamily: 'var(--font-body)',
                  fontWeight: answered === i ? 600 : 400,
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', border: '2px solid',
                  borderColor: answered === i ? 'var(--violet)' : 'var(--border)',
                  background: answered === i ? 'var(--violet)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: answered === i ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span style={{ fontSize: '0.925rem' }}>{opt}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setQIndex(Math.max(0, qIndex - 1))} disabled={qIndex === 0}>
          ← Prev
        </button>
        {qIndex < questions.length - 1 ? (
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setQIndex(qIndex + 1)}>
            Next →
          </button>
        ) : (
          <button className="btn btn-lime" style={{ flex: 1 }} onClick={handleSubmit}>
            Submit <CheckCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
