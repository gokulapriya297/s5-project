import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const COLLEGES = [
  { id: 'c1', name: 'Anna University, Chennai' },
  { id: 'c2', name: 'PSG College of Technology, Coimbatore' },
  { id: 'c3', name: 'Madurai Kamaraj University' },
  { id: 'c4', name: 'NIT Tiruchirappalli' },
  { id: 'c5', name: 'Government Polytechnic Salem' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loginAsRole } = useAuthStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', rollNumber: '', collegeId: '',
    department: '', year: '3', otp: '', password: '',
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const nextStep = () => {
    if (step === 1) {
      if (!form.name || !form.email || !form.mobile) { toast.error('Fill in all required fields'); return; }
      toast.success('OTP sent to ' + form.mobile);
    }
    if (step === 2) {
      if (!form.otp) { toast.error('Enter the OTP'); return; }
      toast.success('Mobile verified ✓');
    }
    if (step === 3) {
      // Complete registration → log in as student
      loginAsRole('student');
      toast.success('Account created! Welcome to SkillSetu 🎉');
      navigate('/student/home');
      return;
    }
    setStep(s => s + 1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,244,50,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', maxWidth: 520, background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '48px', boxShadow: 'var(--shadow-elevated)' }}
      >
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
              Skill<span style={{ color: 'var(--violet)' }}>Setu</span>
            </span>
          </Link>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1, height: 4, borderRadius: 99,
                background: s <= step ? 'var(--violet)' : 'var(--surface-3)',
                transition: 'background 0.3s',
                boxShadow: s <= step ? 'var(--glow-violet)' : 'none',
              }} />
            ))}
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: 4 }}>
            {step === 1 && 'Create your account'}
            {step === 2 && 'Verify your mobile'}
            {step === 3 && 'Connect your college'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Step {step} of 3 · {step === 1 ? 'Basic details' : step === 2 ? 'OTP verification' : 'College & academic info'}
          </p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label">Full name *</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Karthik Rajan" />
            </div>
            <div className="form-group">
              <label className="form-label">College email *</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@college.edu" />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile number *</label>
              <input type="tel" value={form.mobile} onChange={e => update('mobile', e.target.value)} placeholder="9876543210" />
              <span className="form-hint">We'll send you an OTP to verify.</span>
            </div>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min. 8 characters" />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>📲</div>
            <p style={{ color: 'var(--text-muted)' }}>
              Enter the 6-digit OTP sent to <strong style={{ color: 'var(--text)' }}>{form.mobile || '9876543XXX'}</strong>
            </p>
            <input
              value={form.otp}
              onChange={e => update('otp', e.target.value)}
              placeholder="_ _ _ _ _ _"
              maxLength={6}
              style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.4em', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-lg)' }}
            />
            <p style={{ fontSize: '0.82rem', color: 'var(--text-faint)' }}>
              Demo: any 6 digits will work. <a href="#" style={{ color: 'var(--violet)' }}>Resend OTP</a>
            </p>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label">Roll / Registration number *</label>
              <input value={form.rollNumber} onChange={e => update('rollNumber', e.target.value)} placeholder="2021CSE001" style={{ fontFamily: 'var(--font-mono)' }} />
            </div>
            <div className="form-group">
              <label className="form-label">College *</label>
              <select value={form.collegeId} onChange={e => update('collegeId', e.target.value)}>
                <option value="">Select your college</option>
                {COLLEGES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <input value={form.department} onChange={e => update('department', e.target.value)} placeholder="Computer Science & Engineering" />
            </div>
            <div className="form-group">
              <label className="form-label">Current year *</label>
              <select value={form.year} onChange={e => update('year', e.target.value)}>
                {[1,2,3,4].map(y => <option key={y} value={y}>{y}st/nd/rd/th Year</option>)}
              </select>
            </div>
            <div style={{ background: 'rgba(198,244,50,0.08)', border: '1px solid rgba(198,244,50,0.25)', borderRadius: 'var(--radius-md)', padding: '12px 16px', fontSize: '0.85rem', color: 'var(--lime)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Check size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              Your college coordinator will verify your details. You'll receive a notification once approved and can start browsing courses right away.
            </div>
          </div>
        )}

        <button
          onClick={nextStep}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: 32 }}
        >
          {step === 3 ? <>Create my account <Check size={18} /></> : <>Continue <ArrowRight size={18} /></>}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--violet)', fontWeight: 600 }}>Sign in →</Link>
        </p>
      </motion.div>
    </div>
  );
}
