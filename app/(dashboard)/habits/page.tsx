'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import WaterTracker from './WaterTracker'
import SleepTracker from './SleepTracker'
import TipsList from './TipsList'

const tabs = [
  { id: 'agua', label: '💧 Agua' },
  { id: 'sono', label: '🌙 Sueño' },
  { id: 'dicas', label: '✨ Consejos' },
]

function HabitsContent() {
  const searchParams = useSearchParams()
  const [active, setActive] = useState('agua')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'sono') setActive('sono')
    else if (tab === 'dicas') setActive('dicas')
  }, [searchParams])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="px-4 pt-10 pb-4" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-light)' }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Hábitos</h1>
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className="flex-1 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200"
              style={active === t.id
                ? { background: 'var(--primary)', color: 'white' }
                : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {active === 'agua' && <WaterTracker />}
        {active === 'sono' && <SleepTracker />}
        {active === 'dicas' && <TipsList />}
      </div>
    </div>
  )
}

export default function HabitsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>Cargando...</div>}>
      <HabitsContent />
    </Suspense>
  )
}
