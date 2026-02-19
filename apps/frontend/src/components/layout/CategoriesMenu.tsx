'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Bot, Palette, Diamond, LayoutGrid, Zap, TrendingUp, Camera, Gamepad2, ChevronRight } from 'lucide-react'
import { CATEGORY_TABS, MODEL_GROUPS, type ModelGroup } from '@/lib/constants/nav-categories'

const ICON_MAP: Record<string, React.ElementType> = {
  Bot, Palette, Diamond, LayoutGrid, Zap, TrendingUp, Camera, Gamepad2,
}

// Header height constant (h-15 = 3.75rem = 60px)
const HEADER_H = 60
// Tab bar height
const TAB_BAR_H = 44

export function CategoriesMenu() {
  const [showBar, setShowBar] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [hoveredModel, setHoveredModel] = useState('all-models')
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancel = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
  }, [])

  const schedule = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setShowBar(false)
      setActiveTab(null)
    }, 160)
  }, [])

  const openBar = useCallback(() => {
    cancel()
    setShowBar(true)
  }, [cancel])

  const openTab = useCallback((tabId: string) => {
    cancel()
    setActiveTab(tabId)
    setHoveredModel('all-models')
  }, [cancel])

  const closeAll = useCallback(() => {
    setShowBar(false)
    setActiveTab(null)
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeAll])

  const activeTabData = CATEGORY_TABS.find(t => t.id === activeTab)
  const activeModel = MODEL_GROUPS.find(m => m.slug === hoveredModel) ?? MODEL_GROUPS[0]

  return (
    <>
      {/* ── Categories button ── */}
      <button
        onMouseEnter={openBar}
        onMouseLeave={schedule}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
          transition-colors select-none
          ${showBar ? 'bg-bg-tertiary text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'}
        `}
      >
        <Menu className="w-4 h-4" />
        Categories
      </button>

      {/* ── Tab bar (fixed, below header) ── */}
      {showBar && (
        <>
          {/* invisible backdrop to detect leave */}
          <div
            className="fixed inset-0 z-[98]"
            style={{ top: HEADER_H }}
            onMouseEnter={schedule}
            onClick={closeAll}
          />

          <div
            className="fixed left-0 right-0 z-[99] bg-[#232339] border-b border-[#2a2a45]"
            style={{
              top: HEADER_H,
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={cancel}
            onMouseLeave={schedule}
          >
            <div className="container-custom">
              <div className="flex items-center h-11 gap-1 overflow-x-auto no-scrollbar">
                {CATEGORY_TABS.map(tab => {
                  const Icon = ICON_MAP[tab.iconName]
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onMouseEnter={() => openTab(tab.id)}
                      onClick={() => openTab(tab.id)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                        whitespace-nowrap flex-shrink-0 transition-colors select-none
                        ${isActive
                          ? 'bg-[#96daff]/20 text-[#96daff]'
                          : 'text-white/60 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Mega dropdown (fixed, below tab bar) ── */}
      {showBar && activeTab && activeTabData && (
        <div
          className="fixed left-0 right-0 z-[100] bg-[#232339] border-b border-[#2a2a45]"
          style={{
            top: HEADER_H + TAB_BAR_H,
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={cancel}
          onMouseLeave={schedule}
        >
          <div className="container-custom py-5">
            {activeTabData.modelGroups ? (
              <ModelsMegaMenu
                modelGroups={activeTabData.modelGroups}
                hoveredModel={hoveredModel}
                onModelHover={setHoveredModel}
                activeModel={activeModel}
                onClose={closeAll}
              />
            ) : (
              <CategoryGrid
                title={`All ${activeTabData.label} prompts`}
                categories={activeTabData.categories ?? []}
                tabId={activeTabData.id}
                onClose={closeAll}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Models two-panel mega menu ─── */
function ModelsMegaMenu({
  modelGroups,
  hoveredModel,
  onModelHover,
  activeModel,
  onClose,
}: {
  modelGroups: ModelGroup[]
  hoveredModel: string
  onModelHover: (slug: string) => void
  activeModel: ModelGroup
  onClose: () => void
}) {
  return (
    <div className="flex gap-0 min-h-[260px] max-h-[65vh] overflow-hidden">
      {/* Left: model list */}
      <div className="w-[240px] flex-shrink-0 border-r border-[#2a2a45] pr-4 overflow-y-auto no-scrollbar space-y-0.5">
        {modelGroups.map(model => {
          const isSelected = hoveredModel === model.slug
          return (
            <Link
              key={model.slug}
              href={`/category/${model.slug}`}
              onMouseEnter={() => onModelHover(model.slug)}
              onClick={onClose}
              className={`
                flex items-center justify-between px-3 py-2 rounded text-sm transition-colors
                ${isSelected
                  ? 'bg-[#96daff]/15 text-[#96daff]'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'}
              `}
            >
              <span>{model.label}</span>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
            </Link>
          )
        })}
      </div>

      {/* Right: subcategory grid */}
      <div className="flex-1 pl-6 overflow-y-auto no-scrollbar">
        <Link
          href={`/category/${activeModel.slug}`}
          onClick={onClose}
          className="block text-sm font-semibold text-white mb-3 hover:text-[#96daff] transition-colors"
        >
          All {activeModel.label}
        </Link>
        <div
          className="grid gap-x-8 gap-y-1.5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
        >
          {activeModel.categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${activeModel.slug}?category=${encodeURIComponent(cat)}`}
              onClick={onClose}
              className="text-sm text-white/55 hover:text-white transition-colors truncate"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Flat grid for Art / Logos / etc. ─── */
function CategoryGrid({
  title,
  categories,
  tabId,
  onClose,
}: {
  title: string
  categories: string[]
  tabId: string
  onClose: () => void
}) {
  return (
    <div>
      <Link
        href={`/category/${tabId}`}
        onClick={onClose}
        className="block text-sm font-semibold text-white mb-3 hover:text-[#96daff] transition-colors"
      >
        {title}
      </Link>
      <div
        className="grid gap-x-8 gap-y-1.5"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
      >
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/category/${tabId}?category=${encodeURIComponent(cat)}`}
            onClick={onClose}
            className="text-sm text-white/55 hover:text-white transition-colors truncate"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  )
}
