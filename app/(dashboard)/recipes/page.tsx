'use client'

import { useState } from 'react'
import Link from 'next/link'
import { recipes } from '@/data/recipes'
import { RecipeCategory } from '@/types'

const categories: (RecipeCategory | 'Todas')[] = [
  'Todas', 'Desayuno', 'Almuerzo', 'Cena', 'Merienda', 'Bebidas saludables',
]

const catConfig: Record<string, { emoji: string; gradient: string; badge: string; badgeText: string }> = {
  'Desayuno':          { emoji: '☕', gradient: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', badge: '#FEF3C7', badgeText: '#92400E' },
  'Almuerzo':          { emoji: '🥗', gradient: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)', badge: '#D1FAE5', badgeText: '#065F46' },
  'Cena':              { emoji: '🍽️', gradient: 'linear-gradient(135deg,#E0F2FE,#BAE6FD)', badge: '#E0F2FE', badgeText: '#075985' },
  'Merienda':          { emoji: '🥙', gradient: 'linear-gradient(135deg,#FCE7F3,#FBCFE8)', badge: '#FCE7F3', badgeText: '#9D174D' },
  'Bebidas saludables': { emoji: '🥤', gradient: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)', badge: '#EDE9FE', badgeText: '#5B21B6' },
}

export default function RecipesPage() {
  const [active, setActive] = useState<RecipeCategory | 'Todas'>('Todas')
  const [search, setSearch] = useState('')

  const filtered = recipes.filter((r) => {
    const matchCat = active === 'Todas' || r.category === active
    const matchSearch = search.trim() === '' ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="px-4 pt-10 pb-4" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-light)' }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Recetas</h1>
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none"
            stroke="var(--text-light)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar receta o ingrediente..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none border"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border-light)', color: 'var(--text)' }} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={active === cat
                ? { background: 'var(--primary)', color: 'white' }
                : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
              {cat !== 'Todas' && catConfig[cat]?.emoji + ' '}{cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
          {filtered.length} receta{filtered.length !== 1 ? 's' : ''}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((r) => {
            const c = catConfig[r.category]
            return (
              <Link key={r.id} href={`/recipes/${r.id}`}
                className="card overflow-hidden block active:scale-[0.97] transition-transform">
                <div className="h-20 flex items-center justify-center text-4xl" style={{ background: c.gradient }}>{c.emoji}</div>
                <div className="p-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: c.badge, color: c.badgeText }}>{r.category}</span>
                  <h3 className="text-sm font-bold mt-1.5 mb-1 line-clamp-2 leading-tight" style={{ color: 'var(--text)' }}>{r.title}</h3>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l3 3" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs" style={{ color: 'var(--text-light)' }}>{r.prepTimeMin}min</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-base font-semibold mb-1" style={{ color: 'var(--text)' }}>No se encontraron recetas</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Prueba otro término o categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
