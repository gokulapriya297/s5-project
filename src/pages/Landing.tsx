import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Search, ArrowRight, Award, Users, BookOpen, Briefcase, Star, Zap, Globe, ChevronRight } from 'lucide-react';
import { COURSES } from '../data/mockData';
import { useAuthStore } from '../store/authStore';

const SKILL_WORLDS = [
  { name: 'Data & AI', emoji: '📊', color: '#4CC9F0', bg: 'rgba(76,201,240,0.1)', count: 12 },
  { name: 'Cloud & DevOps', emoji: '☁️', color: '#7C5CFF', bg: 'rgba(124,92,255,0.1)', count: 8 },
  { name: 'UI/UX Design', emoji: '🎨', color: '#FF5C8A', bg: 'rgba(255,92,138,0.1)', count: 6 },
  { name: 'Full-Stack Dev', emoji: '💻', color: '#C6F432', bg: 'rgba(198,244,50,0.1)', count: 10 },
  { name: 'Business & Finance', emoji: '📈', color: '#FFB347', bg: 'rgba(255,179,71,0.1)', count: 9 },
  { name: 'Language & Soft Skills', emoji: '🗣️', color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', count: 7 },
  { name: 'Core Engineering', emoji: '⚙️', color: '#4CC9F0', bg: 'rgba(76,201,240,0.08)', count: 5 },
  { name: 'Certification Prep', emoji: '🏅', color: '#FFB347', bg: 'rgba(255,179,71,0.08)', count: 11 },
];

const COUNTERS = [
  { label: 'Students Skilled', value: 98420, suffix: '+' },
  { label: 'Colleges Onboard', value: 342, suffix: '' },
  { label: 'Courses Available', value: 87, suffix: '' },
  { label: 'Placements Made', value: 8943, suffix: '+' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-heading)' }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function CourseSearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof COURSES>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    const filtered = COURSES.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.domain.includes(query.toLowerCase())
    ).slice(0, 5);
    setSuggestions(filtered);
  }, [query]);

  const handleSelect = (courseId: string) => {
    if (isAuthenticated) navigate(`/student/course/${courseId}`);
    else navigate('/register');
  };

  return (
    <div style={{ position: 'relative', maxWidth: 600, width: '100%', margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--surface)', border: '2px solid var(--border-strong)',
        borderRadius: 'var(--radius-xl)', padding: '12px 20px',
        boxShadow: 'var(--glow-violet), var(--shadow-elevated)',
      }}>
        <Search size={22} color="var(--violet)" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="What do you want to be good at?"
          style={{
            border: 'none', background: 'transparent', flex: 1,
            fontSize: '1.05rem', outline: 'none', color: 'var(--text)',
          }}
          onKeyDown={e => { if (e.key === 'Enter' && suggestions.length) handleSelect(suggestions[0].id); }}
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={() => isAuthenticated ? navigate('/student/explore') : navigate('/register')}
        >
          Explore <ArrowRight size={16} />
        </button>
      </div>

      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute', top: '110%', left: 0, right: 0,
            background: 'var(--surface)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            boxShadow: 'var(--shadow-elevated)', zIndex: 50,
          }}
        >
          {suggestions.map(c => (
            <div key={c.id} className="command-item" onClick={() => handleSelect(c.id)}
              style={{ padding: '12px 20px' }}>
              <span style={{ fontSize: '1.2rem' }}>{c.coverEmoji}</span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{c.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {c.durationWeeks} weeks · {c.mode} · {c.isFunded ? 'Funded' : `₹${c.fee}`}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const statsRef = useRef(null);

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '16px 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(11,16,32,0.8)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: 'var(--violet)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--glow-violet)',
          }}>
            <Zap size={20} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem' }}>
            Skill<span style={{ color: 'var(--violet)' }}>Setu</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {isAuthenticated ? (
            <button className="btn btn-primary btn-sm"
              onClick={() => navigate('/dashboard')}>
              Go to Dashboard <ArrowRight size={15} />
            </button>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>Sign in</button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>
                Get started free
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', textAlign: 'center', position: 'relative' }}>
        {/* Floating orbs */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%', width: 300, height: 300,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,255,0.2) 0%, transparent 70%)',
          pointerEvents: 'none', filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '8%', width: 250, height: 250,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,201,240,0.15) 0%, transparent 70%)',
          pointerEvents: 'none', filter: 'blur(30px)',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="chip chip-violet" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <Star size={12} /> Tamil Nadu's Skilling Platform — Now Open
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 700, lineHeight: 1.1, marginBottom: 20,
            maxWidth: 780, margin: '0 auto 20px',
          }}>
            Turn your skills into{' '}
            <span className="gradient-text">your future</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Pick industry-aligned courses through your college, earn verified certificates, and land your first job — all in one place.
          </p>

          <CourseSearchBar />

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            {['Python for Data Science', 'AWS Cloud', 'UI/UX Design', 'Full-Stack Dev'].map(tag => (
              <span key={tag} className="chip" style={{ cursor: 'pointer' }}
                onClick={() => navigate('/register')}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skill Worlds */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 12 }}>
              Explore <span className="gradient-text">Skill Worlds</span>
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Pick a world. Build your expertise. Earn your badge.</p>
          </motion.div>

          <div className="scroll-x" style={{ padding: '8px 0 16px' }}>
            <div style={{ display: 'flex', gap: 16, width: 'max-content' }}>
              {SKILL_WORLDS.map((world, i) => (
                <motion.div
                  key={world.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => navigate('/register')}
                  style={{
                    width: 180, padding: '24px 20px', borderRadius: 'var(--radius-lg)',
                    background: world.bg, border: `1.5px solid ${world.color}33`,
                    cursor: 'pointer', textAlign: 'center',
                    transition: 'all 0.25s',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{world.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 4 }}>{world.name}</div>
                  <div style={{ fontSize: '0.78rem', color: world.color, fontWeight: 600 }}>{world.count} courses</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats counters */}
      <section ref={statsRef} style={{ padding: '60px 24px', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
            {COUNTERS.map(({ label, value, suffix }) => (
              <motion.div key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 700, color: 'var(--violet)' }}>
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 12 }}>
              Your journey, <span className="gradient-text">step by step</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: <Users size={28} />, step: '01', title: 'Join with your college ID', desc: 'Sign up in 2 minutes. Your coordinator verifies you automatically.', color: 'var(--violet)' },
              { icon: <BookOpen size={28} />, step: '02', title: 'Pick your next skill', desc: 'Browse 80+ industry-aligned courses. Filter by domain, level and schedule.', color: 'var(--sky)' },
              { icon: <Zap size={28} />, step: '03', title: 'Learn and level up', desc: 'Attend sessions, complete quizzes, earn XP, and unlock badges.', color: 'var(--lime)' },
              { icon: <Award size={28} />, step: '04', title: 'Earn a verified certificate', desc: 'Pass the final exam, get a certificate with a unique QR code.', color: 'var(--rose)' },
              { icon: <Briefcase size={28} />, step: '05', title: 'Land your dream job', desc: 'Apply to matched opportunities from 200+ hiring partners.', color: 'var(--amber)' },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                className="card card-interactive"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <div style={{
                  position: 'absolute', top: -10, right: -10, fontSize: '4rem',
                  fontFamily: 'var(--font-heading)', fontWeight: 900,
                  color: step.color, opacity: 0.08, lineHeight: 1,
                }}>
                  {step.step}
                </div>
                <div style={{
                  width: 52, height: 52, borderRadius: 'var(--radius-md)',
                  background: `${step.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step.color, marginBottom: 16,
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,255,0.2) 0%, rgba(76,201,240,0.15) 50%, rgba(198,244,50,0.1) 100%)',
              border: '1.5px solid var(--border-strong)',
              borderRadius: 'var(--radius-xl)', padding: '64px 48px',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}
          >
            <Globe size={80} style={{ position: 'absolute', right: -20, top: -20, opacity: 0.05 }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: 16 }}>
              Ready to <span className="gradient-text">skill up</span>?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
              Join 98,000+ students already building their future on SkillSetu.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-lime btn-lg" onClick={() => navigate('/register')}>
                Create free account <ArrowRight size={18} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('/login')}>
                Sign in to continue <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '32px 24px',
        textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.85rem',
      }}>
        <div style={{ marginBottom: 8 }}>
          <strong style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            <Zap size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />SkillSetu
          </strong>
        </div>
        <div>Independent project. Not affiliated with any government body.</div>
        <div style={{ marginTop: 8 }}>
          © {new Date().getFullYear()} SkillSetu. Built with ♥ for Tamil Nadu students.
        </div>
      </footer>
    </div>
  );
}
