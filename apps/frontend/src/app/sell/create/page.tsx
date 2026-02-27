'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Check, ChevronRight, ChevronLeft, Upload, X, Loader2, DollarSign } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { api } from '@/lib/api'
import { slugify } from '@/lib/utils'

// ── Constants ─────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { id: 'Midjourney',       emoji: '⛵', desc: 'Image generation' },
  { id: 'ChatGPT',          emoji: '🖌️', desc: 'Text & images' },
  { id: 'DALL·E',           emoji: '🎨', desc: 'Image generation' },
  { id: 'Stable Diffusion', emoji: '🎭', desc: 'Open-source images' },
  { id: 'Gemini',           emoji: '💎', desc: 'Google multimodal' },
  { id: 'Gemini Image',     emoji: '🌟', desc: 'Google image gen' },
  { id: 'FLUX',             emoji: '⚡', desc: 'Photorealistic images' },
  { id: 'Claude',           emoji: '🤖', desc: 'Long-form text' },
  { id: 'Veo',              emoji: '✨', desc: 'Video generation' },
  { id: 'Sora',             emoji: '🎬', desc: 'Video generation' },
]

const CATEGORIES_BY_PLATFORM: Record<string, string[]> = {
  'Midjourney':       ['3D', 'Abstract', 'Animal', 'Anime', 'Architecture', 'Art', 'Avatar', 'Cartoon', 'Character', 'Concept Art', 'Cyberpunk', 'Dark Art', 'Fantasy', 'Fashion', 'Illustration', 'Interior', 'Landscape', 'Logo', 'Nature', 'Painting', 'Pattern', 'People', 'Photographic', 'Portrait', 'Poster', 'Product', 'Retro', 'Sci-Fi', 'Space', 'Steampunk', 'Street Art', 'Surrealism', 'Vehicle', 'Watercolor'],
  'ChatGPT':          ['Business', 'Code', 'Content Marketing', 'Copywriting', 'Creative Writing', 'Education', 'Email', 'Legal', 'Marketing', 'Productivity', 'Research', 'Sales', 'SEO', 'Social Media', 'Storytelling', 'Technical Writing'],
  'DALL·E':           ['3D', 'Abstract', 'Animal', 'Architecture', 'Art', 'Avatar', 'Cartoon', 'Character', 'Fantasy', 'Illustration', 'Landscape', 'Logo', 'Nature', 'People', 'Photographic', 'Poster', 'Product', 'Retro', 'Space'],
  'Stable Diffusion': ['3D', 'Abstract', 'Anime', 'Art', 'Avatar', 'Character', 'Cyberpunk', 'Fantasy', 'Illustration', 'Landscape', 'People', 'Photographic', 'Portrait', 'Sci-Fi', 'Surrealism'],
  'Gemini':           ['Analysis', 'Blog Writing', 'Business', 'Code', 'Creative Writing', 'Data Science', 'Education', 'Marketing', 'Productivity', 'Research', 'SEO', 'Social Media'],
  'Gemini Image':     ['3D', 'Abstract', 'Animal', 'Art', 'Avatar', 'Fantasy', 'Illustration', 'Landscape', 'Nature', 'People', 'Photographic', 'Portrait'],
  'FLUX':             ['3D', 'Abstract', 'Animal', 'Architecture', 'Art', 'Avatar', 'Character', 'Concept Art', 'Cyberpunk', 'Fantasy', 'Illustration', 'Landscape', 'Nature', 'People', 'Photographic', 'Portrait', 'Product', 'Sci-Fi', 'Surrealism'],
  'Claude':           ['Academic Writing', 'Analysis', 'Blog Writing', 'Business', 'Code', 'Content Marketing', 'Copywriting', 'Creative Writing', 'Education', 'Email', 'Legal', 'Marketing', 'Productivity', 'Research', 'SEO', 'Social Media', 'Storytelling', 'Technical Writing'],
  'Veo':              ['Action', 'Animation', 'Cinematic', 'Comedy', 'Documentary', 'Drama', 'Explainer', 'Fantasy', 'Nature', 'Product', 'Sci-Fi', 'Sports'],
  'Sora':             ['Action', 'Animation', 'Cinematic', 'Comedy', 'Documentary', 'Drama', 'Explainer', 'Fantasy', 'Nature', 'Product', 'Sci-Fi'],
}

const CONTENT_TYPES = [
  { id: 'image', label: 'Image',     emoji: '🖼️' },
  { id: 'text',  label: 'Text',      emoji: '📝' },
  { id: 'video', label: 'Video',     emoji: '🎬' },
  { id: 'code',  label: 'Code',      emoji: '💻' },
]

const STEP_LABELS = ['AI Model', 'Details', 'Media', 'Pricing']

// ── Form state ────────────────────────────────────────────────────────────────

interface FormData {
  platform:     string
  title:        string
  description:  string
  category:     string
  contentType:  string
  promptText:   string
  notes:        string
  thumbnail:    string
  examples:     string[]
  isFree:       boolean
  price:        string
  discount:     string
}

const INITIAL: FormData = {
  platform: '', title: '', description: '', category: '', contentType: 'image',
  promptText: '', notes: '', thumbnail: '', examples: [],
  isFree: false, price: '4.99', discount: '',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEP_LABELS.map((label, i) => {
        const idx   = i + 1
        const done  = idx < current
        const active = idx === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${done   ? 'bg-[#96daff] text-[#1a1a2e]' : ''}
                  ${active ? 'bg-gradient-to-br from-[#ffd7a5] to-[#ff7676] text-[#1a1a2e]' : ''}
                  ${!done && !active ? 'bg-[#2a2a45] text-white/30' : ''}`}
              >
                {done ? <Check className="w-4 h-4" /> : idx}
              </div>
              <span className={`text-[10px] mt-1 whitespace-nowrap ${active ? 'text-white' : 'text-white/30'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`h-px w-12 sm:w-20 mx-1 mb-4 ${done ? 'bg-[#96daff]/50' : 'bg-[#2a2a45]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-white/60 text-xs mb-1.5">{children}</p>
}

function Input({ id, value, onChange, placeholder, maxLength }: {
  id?: string; value: string; onChange: (v: string) => void
  placeholder?: string; maxLength?: number
}) {
  return (
    <input
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#96daff]/40 transition-colors"
    />
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CreatePromptPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (key: keyof FormData, val: any) => {
    setForm(prev => ({ ...prev, [key]: val }))
    setErrors(prev => { const e = { ...prev }; delete e[key]; return e })
  }

  // Drag & drop cover
  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file || !file.type.startsWith('image/')) return
    uploadCover(file)
  }, [])

  const onFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    uploadCover(file)
  }

  const uploadCover = async (file: File) => {
    setUploading(true)
    try {
      const res = await api.upload.uploadImage(file, 'prompts')
      set('thumbnail', res.url)
    } catch {
      // fallback — use a placeholder
      set('thumbnail', URL.createObjectURL(file))
    } finally {
      setUploading(false)
    }
  }

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {}
    if (s === 1 && !form.platform)       e.platform    = 'Please select an AI model'
    if (s === 2) {
      if (!form.title.trim())             e.title       = 'Title is required'
      if (form.title.length < 10)         e.title       = 'Title must be at least 10 characters'
      if (!form.category)                 e.category    = 'Please select a category'
      if (!form.promptText.trim())        e.promptText  = 'Prompt text is required'
      if (form.description.length > 0 && form.description.length < 20)
                                          e.description = 'Description must be at least 20 characters'
    }
    if (s === 3 && !form.thumbnail)       e.thumbnail   = 'Cover image is required'
    if (s === 4 && !form.isFree) {
      const p = parseFloat(form.price)
      if (isNaN(p) || p < 0.99)          e.price       = 'Price must be at least $0.99'
      if (p > 99.99)                      e.price       = 'Maximum price is $99.99'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validate(step)) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)

  const submit = async () => {
    if (!validate(4)) return
    setSubmitting(true)
    try {
      await api.prompts.create({
        title:       form.title,
        description: form.description || `High-quality ${form.platform} prompt for ${form.category}`,
        platform:    form.platform,
        category:    form.category,
        contentType: form.contentType,
        price:       form.isFree ? 0 : parseFloat(form.price),
        thumbnail:   form.thumbnail,
        promptText:  form.promptText,
      })
      router.push('/dashboard/prompts?created=1')
    } catch {
      setErrors({ submit: 'Failed to publish. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const categories = CATEGORIES_BY_PLATFORM[form.platform] || []

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      <main className="flex-1 container-custom py-8 max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Create a Prompt Listing</h1>
          <p className="text-white/40 text-sm mt-1">Fill in the details to publish your prompt on the marketplace</p>
        </div>

        <StepIndicator current={step} />

        {/* ── Step 1: AI Model ── */}
        {step === 1 && (
          <div>
            <h2 className="text-white font-semibold mb-4">Which AI model is this prompt for?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => { set('platform', p.id); set('category', '') }}
                  className={`flex flex-col items-center p-4 rounded-2xl border transition-all text-center
                    ${form.platform === p.id
                      ? 'border-[#96daff]/60 bg-[#96daff]/10 text-white'
                      : 'border-[#2a2a45] bg-[#232339] text-white/60 hover:border-[#3a3a5c] hover:text-white'}`}
                >
                  <span className="text-2xl mb-2">{p.emoji}</span>
                  <span className="text-sm font-medium leading-tight">{p.id}</span>
                  <span className="text-[10px] text-white/35 mt-0.5">{p.desc}</span>
                </button>
              ))}
            </div>
            {errors.platform && <p className="text-red-400 text-xs mt-3">{errors.platform}</p>}
          </div>
        )}

        {/* ── Step 2: Details ── */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Title */}
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={v => set('title', v)}
                placeholder="e.g. Cinematic Portrait Photography Prompt"
                maxLength={80}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.title
                  ? <p className="text-red-400 text-xs">{errors.title}</p>
                  : <p className="text-white/25 text-xs">Clear and descriptive titles rank higher</p>
                }
                <span className="text-white/25 text-xs">{form.title.length}/80</span>
              </div>
            </div>

            {/* Content type */}
            <div>
              <Label>Output Type *</Label>
              <div className="flex gap-2 flex-wrap">
                {CONTENT_TYPES.map(ct => (
                  <button
                    key={ct.id}
                    onClick={() => set('contentType', ct.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all
                      ${form.contentType === ct.id
                        ? 'border-[#96daff]/60 bg-[#96daff]/10 text-white'
                        : 'border-[#2a2a45] bg-[#232339] text-white/50 hover:text-white'}`}
                  >
                    <span>{ct.emoji}</span> {ct.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <Label>Category *</Label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#96daff]/40 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select a category...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Explain what this prompt does and what results buyers can expect..."
                rows={3}
                maxLength={500}
                className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#96daff]/40 transition-colors resize-none"
              />
              <div className="flex items-center justify-between mt-1">
                {errors.description
                  ? <p className="text-red-400 text-xs">{errors.description}</p>
                  : <span />
                }
                <span className="text-white/25 text-xs">{form.description.length}/500</span>
              </div>
            </div>

            {/* Prompt text */}
            <div>
              <Label>Prompt Text *</Label>
              <textarea
                value={form.promptText}
                onChange={e => set('promptText', e.target.value)}
                placeholder="Paste your full prompt here. Buyers will receive this after purchase..."
                rows={6}
                className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#96daff]/40 transition-colors resize-none font-mono"
              />
              {errors.promptText && <p className="text-red-400 text-xs mt-1">{errors.promptText}</p>}
            </div>

            {/* Notes / usage instructions */}
            <div>
              <Label>Usage Notes <span className="text-white/25">(optional)</span></Label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder="Any special instructions, tips, or variables buyers should know about..."
                rows={3}
                className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#96daff]/40 transition-colors resize-none"
              />
            </div>
          </div>
        )}

        {/* ── Step 3: Media ── */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Cover image */}
            <div>
              <Label>Cover Image *</Label>
              <p className="text-white/30 text-xs mb-3">This is the main thumbnail buyers see. Use an example output or a branded image.</p>

              {form.thumbnail ? (
                <div className="relative inline-block">
                  <div className="w-64 h-44 rounded-2xl overflow-hidden border border-[#2a2a45]">
                    <Image src={form.thumbnail} alt="Cover" fill className="object-cover" sizes="256px" />
                  </div>
                  <button
                    onClick={() => set('thumbnail', '')}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#1a1a2e] border border-[#2a2a45] flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label
                  onDrop={onDrop}
                  onDragOver={e => e.preventDefault()}
                  className="flex flex-col items-center justify-center w-full h-44 rounded-2xl border-2 border-dashed border-[#2a2a45] hover:border-[#96daff]/40 transition-colors cursor-pointer bg-[#232339]"
                >
                  <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-white/30 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-white/20 mb-2" />
                      <p className="text-white/40 text-sm">Drop image here or <span className="text-[#96daff]">browse</span></p>
                      <p className="text-white/20 text-xs mt-1">PNG, JPG, WEBP · Max 5MB</p>
                    </>
                  )}
                </label>
              )}
              {errors.thumbnail && <p className="text-red-400 text-xs mt-2">{errors.thumbnail}</p>}
            </div>

            {/* Example images hint */}
            <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-4">
              <p className="text-white/60 text-sm font-medium mb-1">💡 Tip: Show example outputs</p>
              <p className="text-white/35 text-xs leading-relaxed">
                Prompts with high-quality example images sell <span className="text-white/60">3× more</span> than those without.
                Your cover image should be a real output generated by this prompt.
              </p>
            </div>
          </div>
        )}

        {/* ── Step 4: Pricing ── */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-white font-semibold">Set your price</h2>

            {/* Free toggle */}
            <div className="flex items-center justify-between p-4 bg-[#232339] border border-[#2a2a45] rounded-2xl">
              <div>
                <p className="text-white text-sm font-medium">Make it free</p>
                <p className="text-white/35 text-xs mt-0.5">Great for building your reputation and getting first reviews</p>
              </div>
              <button
                onClick={() => set('isFree', !form.isFree)}
                className="relative rounded-full transition-colors flex-shrink-0"
                style={{
                  width: '44px', height: '24px',
                  background: form.isFree ? '#96daff' : '#3a3a5c',
                }}
              >
                <span
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform"
                  style={{ transform: form.isFree ? 'translateX(22px)' : 'translateX(4px)' }}
                />
              </button>
            </div>

            {!form.isFree && (
              <>
                {/* Price */}
                <div>
                  <Label>Price (USD) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="number"
                      min="0.99"
                      max="99.99"
                      step="0.01"
                      value={form.price}
                      onChange={e => set('price', e.target.value)}
                      className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl pl-8 pr-4 py-2.5 text-sm text-white outline-none focus:border-[#96daff]/40 transition-colors"
                    />
                  </div>
                  {errors.price
                    ? <p className="text-red-400 text-xs mt-1">{errors.price}</p>
                    : <p className="text-white/25 text-xs mt-1">Most popular prices: $2.99 · $4.99 · $7.99 · $9.99</p>
                  }
                </div>

                {/* Discount */}
                <div>
                  <Label>Launch Discount % <span className="text-white/25">(optional)</span></Label>
                  <input
                    type="number"
                    min="5"
                    max="80"
                    value={form.discount}
                    onChange={e => set('discount', e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#96daff]/40 transition-colors"
                  />
                  {form.discount && !isNaN(parseFloat(form.discount)) && form.price && (
                    <p className="text-white/40 text-xs mt-1">
                      Discounted price: <span className="text-white">${(parseFloat(form.price) * (1 - parseFloat(form.discount) / 100)).toFixed(2)}</span>
                      {' '}(was ${form.price})
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Summary card */}
            <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-5 space-y-2 text-sm">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Listing Preview</p>
              {[
                { label: 'Model',    value: form.platform },
                { label: 'Category', value: form.category },
                { label: 'Title',    value: form.title },
                { label: 'Slug',     value: slugify(form.title) },
                { label: 'Price',    value: form.isFree ? 'Free' : `$${form.price}` },
              ].map(r => (
                <div key={r.label} className="flex items-start justify-between gap-4">
                  <span className="text-white/35 flex-shrink-0">{r.label}</span>
                  <span className="text-white text-right truncate max-w-xs">{r.value || '—'}</span>
                </div>
              ))}
            </div>

            {errors.submit && (
              <p className="text-red-400 text-sm text-center">{errors.submit}</p>
            )}
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#2a2a45]">
          {step > 1 ? (
            <button
              onClick={back}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white border border-[#2a2a45] hover:border-[#3a3a5c] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={next}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              {submitting
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
                : <><Check className="w-4 h-4" /> Publish Prompt</>
              }
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
