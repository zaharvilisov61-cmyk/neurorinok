'use client'

import { useState } from 'react'
import { Camera, Save, Eye, EyeOff } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl overflow-hidden mb-4">
      <div className="px-5 py-4 border-b border-[#2a2a45]">
        <h2 className="text-white font-semibold text-sm">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function Field({
  label, id, type = 'text', value, onChange, placeholder, hint,
}: {
  label: string; id: string; type?: string
  value: string; onChange: (v: string) => void
  placeholder?: string; hint?: string
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  return (
    <div>
      <label htmlFor={id} className="block text-white/60 text-xs mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && !show ? 'password' : 'text'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#96daff]/50 transition-colors"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {hint && <p className="text-white/30 text-xs mt-1">{hint}</p>}
    </div>
  )
}

export default function SettingsPage() {
  // Profile fields
  const [name,     setName]     = useState('Demo User')
  const [username, setUsername] = useState('demouser')
  const [email,    setEmail]    = useState('demo@example.com')
  const [bio,      setBio]      = useState('')
  const [website,  setWebsite]  = useState('')

  // Password fields
  const [currentPw, setCurrentPw] = useState('')
  const [newPw,      setNewPw]      = useState('')
  const [confirmPw,  setConfirmPw]  = useState('')

  // Notifications
  const [notifPurchase, setNotifPurchase] = useState(true)
  const [notifReview,   setNotifReview]   = useState(true)
  const [notifNewsletter, setNotifNewsletter] = useState(false)

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <DashboardShell>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/40 text-sm mt-1">Manage your account preferences</p>
        </div>

        {/* ── Profile ── */}
        <Section title="Profile">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#3a3a5c] flex items-center justify-center text-white text-2xl font-bold">
                {name[0]?.toUpperCase() || 'U'}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#96daff] flex items-center justify-center text-[#1a1a2e] hover:bg-[#7fcfff] transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <p className="text-white text-sm font-medium">{name || 'Your Name'}</p>
              <p className="text-white/40 text-xs">@{username || 'username'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name"   id="name"     value={name}     onChange={setName}     placeholder="Your full name" />
            <Field label="Username"    id="username" value={username} onChange={setUsername} placeholder="username" hint="Letters, numbers, underscores only" />
            <Field label="Email"       id="email"    value={email}    onChange={setEmail}    placeholder="you@example.com" />
            <Field label="Website"     id="website"  value={website}  onChange={setWebsite}  placeholder="https://yoursite.com" />
          </div>

          <div className="mt-4">
            <label htmlFor="bio" className="block text-white/60 text-xs mb-1.5">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell people a bit about yourself..."
              rows={3}
              maxLength={200}
              className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#96daff]/50 transition-colors resize-none"
            />
            <p className="text-white/25 text-xs text-right mt-1">{bio.length}/200</p>
          </div>
        </Section>

        {/* ── Password ── */}
        <Section title="Change Password">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Current Password"  id="cur-pw"  type="password" value={currentPw} onChange={setCurrentPw} placeholder="••••••••" />
            <Field label="New Password"      id="new-pw"  type="password" value={newPw}      onChange={setNewPw}      placeholder="••••••••" hint="Min. 8 characters" />
            <Field label="Confirm Password"  id="con-pw"  type="password" value={confirmPw}  onChange={setConfirmPw}  placeholder="••••••••" />
          </div>
        </Section>

        {/* ── Notifications ── */}
        <Section title="Notifications">
          {[
            { label: 'Purchase notifications',  hint: 'Email when someone buys your prompt',   value: notifPurchase,    set: setNotifPurchase },
            { label: 'Review notifications',     hint: 'Email when someone reviews your prompt', value: notifReview,    set: setNotifReview },
            { label: 'Newsletter & updates',     hint: 'Tips, news and platform updates',        value: notifNewsletter, set: setNotifNewsletter },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#2a2a45]/50 last:border-0">
              <div>
                <p className="text-white text-sm">{item.label}</p>
                <p className="text-white/35 text-xs mt-0.5">{item.hint}</p>
              </div>
              <button
                onClick={() => item.set(!item.value)}
                className={`relative w-10 h-5.5 rounded-full transition-colors ${item.value ? 'bg-[#96daff]' : 'bg-[#3a3a5c]'}`}
                style={{ height: '22px', width: '40px' }}
              >
                <span
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                  style={{ transform: item.value ? 'translateX(20px)' : 'translateX(2px)' }}
                />
              </button>
            </div>
          ))}
        </Section>

        {/* ── Danger zone ── */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
          <h2 className="text-red-400 font-semibold text-sm mb-1">Danger Zone</h2>
          <p className="text-white/40 text-xs mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
            Delete Account
          </button>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 mt-6">
          {saved && <span className="text-green-400 text-sm">✓ Changes saved</span>}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </DashboardShell>
  )
}
