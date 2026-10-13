import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { DEMO_CREDENTIALS } from '../data/mockData';
import type { UserRole } from '../types';
import toast from 'react-hot-toast';

const ROLE_LABELS: Record<UserRole, string> = {
  student: '🎓 Student',
  coordinator: '🏫 Coordinator',
  trainer: '👨‍🏫 Trainer',
  partner: '🤝 Partner',
  district_admin: '🏛️ District Admin',
  state_admin: '🌐 State Admin',
  super_admin: '⚡ Super Admin',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsRole, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    loginAsRole(role);
    toast.success(`Logged in as ${ROLE_LABELS[role]}`);
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '24px' }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,201,240,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ width: '100%', maxWidth: 900, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-elevated)' }}
        className="hide-mobile-grid"
      >
        {/* Left panel */}
        <div style={{ background: 'linear-gradient(135deg, #1C2444 0%, #0B1020 100%)', padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow-violet)' }}>
                <Zap size={20} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)' }}>
                Skill<span style={{ color: 'var(--violet)' }}>Setu</span>
              </span>
            </Link>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 16, color: 'var(--text)' }}>
              Your skills.<br />Your story.<br /><span className="gradient-text">Your future.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Sign in to continue your learning journey, track your progress, and unlock new opportunities.
            </p>
          </div>

          {/* Quick login demo panel */}
          <div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
              <Shield size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />Demo — Try any role
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DEMO_CREDENTIALS.filter(c => c.role !== 'state_admin').map(cred => (
                <button
                  key={cred.role}
                  onClick={() => handleQuickLogin(cred.role)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 'var(--radius-md)',
                    background: 'rgba(124,92,255,0.08)', border: '1px solid rgba(124,92,255,0.2)',
                    color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(124,92,255,0.18)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(124,92,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                >
                  <span>{ROLE_LABELS[cred.role]}</span>
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel – form */}
        <div style={{ background: 'var(--surface)', padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 36, fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--violet)', fontWeight: 600 }}>Sign up free →</Link>
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="karthik@college.edu"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ fontSize: '0.82rem', color: 'var(--violet)' }}>Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: 4 }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Signing in…
                </span>
              ) : (
                <>Sign in <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.78rem', color: 'var(--text-faint)' }}>
            Demo password for all accounts: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>demo123</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
