'use client'

import { useState } from 'react'
import { useWaterLog } from '@/hooks/useWaterLog'

const QUICK_ADD = [150, 200, 300, 500]

export default function WaterTracker() {
  const { consumed, goal, entries, addWater, removeLastEntry, setGoal, last7Days } = useWaterLog()
  const [editGoal, setEditGoal] = useState(false)
  const [goalInput, setGoalInput] = useState(String(goal))

  const percent = Math.min(100, Math.round((consumed / goal) * 100))
  const maxDay = Math.max(...last7Days.map((d) => d.total), goal)
  const waveY = 100 - percent

  return (
    <div className="space-y-4 fade-up">
      <div className="card p-5 text-center overflow-hidden relative">
        <div className="relative mx-auto mb-4" style={{ width: 160, height: 160 }}>
          <svg viewBox="0 0 160 160" width="160" height="160" className="absolute inset-0">
            <defs>
              <clipPath id="circle-clip">
                <circle cx="80" cy="80" r="74" />
              </clipPath>
            </defs>
            <circle cx="80" cy="80" r="74" fill="var(--blue-light)" />
            <g clipPath="url(#circle-clip)">
              <rect x="0" y={waveY * 1.6} width="160" height="160" fill="#38BDF8" opacity="0.7"
                style={{ transition: 'y 0.8s ease' }} />
              <rect x="0" y={waveY * 1.6 + 4} width="160" height="160" fill="#0EA5E9" opacity="0.5"
                style={{ transition: 'y 0.8s ease' }} />
            </g>
            <circle cx="80" cy="80" r="74" fill="none" stroke="#E0F2FE" strokeWidth="4" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: percent > 50 ? 'white' : 'var(--blue-dark)' }}>
              {consumed >= 1000 ? `${(consumed / 1000).toFixed(1)}L` : `${consumed}ml`}
            </span>
            <span className="text-sm font-medium" style={{ color: percent > 50 ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
              {percent}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-1">
          {editGoal ? (
            <div className="flex items-center gap-2">
              <input type="number" value={goalInput} onChange={(e) => setGoalInput(e.target.value)}
                className="w-24 text-center text-sm font-medium rounded-xl px-2 py-1 border outline-none"
                style={{ borderColor: 'var(--primary)', color: 'var(--text)' }} />
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>ml</span>
              <button onClick={() => { const v = parseInt(goalInput); if (v > 0) setGoal(v); setEditGoal(false) }}
                className="text-xs font-bold px-3 py-1 rounded-xl text-white"
                style={{ background: 'var(--primary)' }}>
                OK
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Meta: <strong style={{ color: 'var(--text)' }}>{goal >= 1000 ? `${(goal / 1000).toFixed(1)}L` : `${goal}ml`}</strong>
              </p>
              <button onClick={() => setEditGoal(true)} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                editar
              </button>
            </>
          )}
        </div>
        {percent >= 100 && (
          <p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>🎉 ¡Felicitaciones! Meta alcanzada hoy.</p>
        )}
      </div>

      <div className="card p-4">
        <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Agregar agua</p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {QUICK_ADD.map((ml) => (
            <button key={ml} onClick={() => addWater(ml)}
              className="py-3 rounded-2xl flex flex-col items-center gap-0.5 active:scale-95 transition-transform"
              style={{ background: 'var(--blue-light)', color: 'var(--blue-dark)' }}>
              <span className="text-base">💧</span>
              <span className="text-xs font-bold">+{ml}ml</span>
            </button>
          ))}
        </div>
        {entries.length > 0 && (
          <button onClick={removeLastEntry}
            className="w-full py-2.5 rounded-xl text-sm font-medium active:scale-98 transition-transform"
            style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}>
            ↩ Deshacer último ({entries[entries.length - 1]}ml)
          </button>
        )}
      </div>

      {entries.length > 0 && (
        <div className="card p-4">
          <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Registros de hoy</p>
          <div className="flex flex-wrap gap-2">
            {entries.map((e, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: 'var(--blue-light)', color: 'var(--blue-dark)' }}>
                💧 {e}ml
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card p-4">
        <p className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Últimos 7 días</p>
        <div className="flex items-end gap-2 h-24">
          {last7Days.map((d, i) => {
            const h = maxDay > 0 ? (d.total / maxDay) * 100 : 0
            const isToday = i === 6
            const hitGoal = d.total >= goal
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: 72, background: 'var(--surface-2)' }}>
                  <div className="absolute bottom-0 w-full rounded-t-lg transition-all duration-700"
                    style={{ height: `${h}%`, background: hitGoal ? 'var(--primary)' : isToday ? 'var(--blue)' : '#93C5FD' }} />
                </div>
                <span className="text-[10px] font-medium capitalize"
                  style={{ color: isToday ? 'var(--primary)' : 'var(--text-light)' }}>
                  {d.label}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: '1px solid var(--border-light)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--primary)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Meta alcanzada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#93C5FD' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Parcial</span>
          </div>
        </div>
      </div>
    </div>
  )
}
