'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { authApi, tokenStorage } from '@/lib/auth'

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
]

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const result = await authApi.register(name.trim(), email, password)
      tokenStorage.set(result.accessToken)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center px-4 py-10">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
        >
          <span className="text-[#1a1a2e] font-bold text-sm">P</span>
        </div>
        <span className="text-white font-semibold text-lg">PromptBase</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[400px] bg-[#232339] border border-[#2a2a45] rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
        <p className="text-white/50 text-sm mb-7">Join thousands of prompt engineers</p>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white/70 text-sm mb-1.5">Full name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-[#96daff]/50 transition-colors"
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/70 text-sm mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-[#96daff]/50 transition-colors"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/70 text-sm mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setShowRules(true)}
                placeholder="••••••••"
                className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-white/25 outline-none focus:border-[#96daff]/50 transition-colors"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength rules */}
            {showRules && password && (
              <div className="mt-2 space-y-1">
                {PASSWORD_RULES.map(rule => {
                  const passed = rule.test(password)
                  return (
                    <div key={rule.label} className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${passed ? 'bg-green-500/20' : 'bg-white/5'}`}>
                        {passed && <Check className="w-2.5 h-2.5 text-green-400" />}
                      </div>
                      <span className={`text-xs ${passed ? 'text-green-400' : 'text-white/35'}`}>
                        {rule.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Terms */}
          <p className="text-white/35 text-xs leading-relaxed">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-[#96daff] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-[#96daff] hover:underline">Privacy Policy</Link>.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-[#1a1a2e] text-sm transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#2a2a45]" />
          <span className="text-white/25 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-[#2a2a45]" />
        </div>

        {/* Google OAuth (UI only) */}
        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[#2a2a45] text-white/70 text-sm hover:border-[#3a3a5c] hover:text-white transition-colors bg-[#1a1a2e]">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Login link */}
        <p className="text-center text-white/40 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#96daff] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
