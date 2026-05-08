'use client'

import { useState } from 'react'
import { tips } from '@/data/tips'
import { useTips } from '@/hooks/useTips'
import { TipCategory } from '@/types'

const categories: (TipCategory | 'Todas')[] = [
  'Todas', 'Respiración', 'Sueño', 'Hidratación', 'Alimentación', 'Movimiento suave', 'Organización de rutina'
]

const catEmoji: Record<string, string> = {
  'Respiración': '🌬️', 'Sueño': '🌙', 'Hidratación': '💧',
  'Alimentación': '🥦', 'Movimiento suave': '🚶', 'Organización de rutina': '📋',
}

const catColor: Record<string, { bg: string; text: string }> = {
  'Respiración':          { bg: '#E0F2FE', text: '#0369A1' },
  'Sueño':                { bg: '#EDE9FE', text: '#5B21B6' },
  'Hidratación':          { bg: '#DBEAFE', text: '#1D4ED8' },
  'Alimentación':         { bg: '#D1FAE5', text: '#065F46' },
  'Movimiento suave':     { bg: '#FEF3C7', text: '#92400E' },
  'Organización de rutina': { bg: '#FCE7F3', text: '#9D174D' },
}

export default function TipsList() {
  const { toggle, isCompleted } = useTips()
  const [activeCategory, setActiveCategory] = useState<TipCategory | 'Todas'>('Todas')

  const filtered = activeCategory === 'Todas' ? tips : tips.filter((t) => t.category === activeCategory)
  const completedCount = filtered.filter((t) => isCompleted(t.id)).length

  return (
    <div className="space-y-4 fade-up">
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Tu progreso</p>
          <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{completedCount}/{filtered.length}</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${filtered.length > 0 ? (completedCount / filtered.length) * 100 : 0}%`, background: 'var(--primary)' }} />
        </div>
        <p className="text-xs mt-1.5" style={{ color: 'var(--text-light)' }}>
          {completedCount === filtered.length && filtered.length > 0
            ? '🎉 ¡Todos los consejos completados!'
            : `${filtered.length - completedCount} consejo${filtered.length - completedCount !== 1 ? 's' : ''} pendiente${filtered.length - completedCount !== 1 ? 's' : ''}`}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={activeCategory === cat
              ? { background: 'var(--primary)', color: 'white' }
              : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            {cat !== 'Todas' && catEmoji[cat] + ' '}{cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((tip) => {
          const done = isCompleted(tip.id)
          const style = catColor[tip.category]
          return (
            <div key={tip.id} className="card p-4 transition-all" style={{ opacity: done ? 0.65 : 1 }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: style.bg }}>{catEmoji[tip.category]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: style.bg, color: style.text }}>{tip.category}</span>
                      <h3 className="text-sm font-bold mt-1.5 mb-1"
                        style={{ color: 'var(--text)', textDecoration: done ? 'line-through' : 'none' }}>
                        {tip.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{tip.body}</p>
                    </div>
                    <button onClick={() => toggle(tip.id)}
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                      style={done
                        ? { background: 'var(--primary)', borderColor: 'var(--primary)' }
                        : { background: 'transparent', borderColor: 'var(--border)' }}>
                      {done && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
