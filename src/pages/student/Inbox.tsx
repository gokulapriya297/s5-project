import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Inbox as InboxIcon } from 'lucide-react';
import { MOCK_NOTIFICATIONS, MOCK_ANNOUNCEMENTS } from '../../data/mockData';
import type { Notification } from '../../types';

const TYPE_ICONS: Record<string, string> = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '🚨' };
const TYPE_COLORS: Record<string, string> = { info: 'var(--sky)', success: 'var(--lime)', warning: 'var(--amber)', error: 'var(--rose)' };

export default function InboxPage() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const [tab, setTab] = useState<'notifs' | 'announcements'>('notifs');

  const markAllRead = () => setNotifs(n => n.map(i => ({ ...i, isRead: true })));
  const markRead = (id: string) => setNotifs(n => n.map(i => i.id === id ? { ...i, isRead: true } : i));
  const unread = notifs.filter(n => !n.isRead).length;

  return (
    <div className="container" style={{ maxWidth: 720, paddingTop: 24, paddingBottom: 80 }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 4 }}>
            📬 Inbox
          </h1>
          {unread > 0 && <span className="chip chip-rose">{unread} unread</span>}
        </div>
        {unread > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}>
            <CheckCheck size={15} /> Mark all read
          </button>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        <button className={`tab-btn ${tab === 'notifs' ? 'active' : ''}`} onClick={() => setTab('notifs')}>
          <Bell size={15} /> Notifications {unread > 0 && <span className="chip chip-rose" style={{ fontSize: '0.7rem', padding: '0 6px' }}>{unread}</span>}
        </button>
        <button className={`tab-btn ${tab === 'announcements' ? 'active' : ''}`} onClick={() => setTab('announcements')}>
          <InboxIcon size={15} /> Announcements
        </button>
      </div>

      {tab === 'notifs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {notifs.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => markRead(notif.id)}
              style={{
                display: 'flex', gap: 14, padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                background: notif.isRead ? 'var(--surface)' : 'rgba(124,92,255,0.06)',
                border: `1.5px solid ${notif.isRead ? 'var(--border)' : 'rgba(124,92,255,0.2)'}`,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{TYPE_ICONS[notif.type]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                  <div style={{ fontWeight: notif.isRead ? 500 : 700, fontSize: '0.9rem' }}>{notif.title}</div>
                  {!notif.isRead && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--violet)', flexShrink: 0, marginTop: 4 }} />}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{notif.body}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: 6 }}>
                  {new Date(notif.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_ANNOUNCEMENTS.map((ann, i) => (
            <motion.div
              key={ann.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="card"
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    {ann.isPinned && <span className="chip chip-violet" style={{ fontSize: '0.7rem' }}>📌 Pinned</span>}
                    <span className={`chip ${ann.level === 'state' ? 'chip-sky' : 'chip-amber'}`} style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>{ann.level}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: 6 }}>{ann.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{ann.body}</p>
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', display: 'flex', gap: 12 }}>
                <span>By {ann.authorName}</span>
                <span>{new Date(ann.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
