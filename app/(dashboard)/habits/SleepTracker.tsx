'use client'

import { useState } from 'react'
import { useSleepLog } from '@/hooks/useSleepLog'
import { SleepLog } from '@/types'

type Feeling = SleepLog['feeling']
type Quality = SleepLog['quality']

const feelings: { value: Feeling; label: string; emoji: string }[] = [
  { value: 'bien', label: 'Bien', emoji: '😊' },
  { value: 'normal', label: 'Normal', emoji: '😐' },
  { value: 'cansado', label: 'Cansado', emoji: '😴' },
]

export default function SleepTracker() {
  const { todayLog, saveLog, last7Days } = useSleepLog()
  const [showForm, setShowForm] = useState(!todayLog)
  const [bedTime, setBedTime] = useState('22:30')
  const [sleepTime, setSleepTime] = useState('23:00')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [feeling, setFeeling] = useState<Feeling>('bien')
  const [quality, setQuality] = useState<Quality>(4)

  const maxHours = Math.max(...last7Days.map((d) => d.hours), 8)

  const handleSave = () => {
    saveLog({ bedTime, sleepTime, wakeTime, feeling, quality })
    setShowForm(false)
  }

  const getDuration = (sleepT: string, wakeT: string) => {
    const [sh, sm] = sleepT.split(':').map(Number)
    const [wh, wm] = wakeT.split(':').map(Number)
    const sm2 = sh * 60 + sm
    const wm2 = wh * 60 + wm
    const dur = wm2 >= sm2 ? wm2 - sm2 : (24 * 60 - sm2) + wm2
    return `${Math.floor(dur / 60)}h${dur % 60 > 0 ? ` ${dur % 60}min` : ''}`
  }

  return (
    <div className="space-y-4 fade-up">
      {todayLog && !showForm ? (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Sueño de hoy</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
                {getDuration(todayLog.sleepTime, todayLog.wakeTime)}
              </p>
            </div>
            <div className="text-5xl">{feelings.find(f => f.value === todayLog.feeling)?.emoji}</div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Se acostó', value: todayLog.bedTime },
              { label: 'Durmió', value: todayLog.sleepTime },
              { label: 'Se despertó', value: todayLog.wakeTime },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--violet-light)' }}>
                <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                <p className="text-sm font-bold" style={{ color: 'var(--violet)' }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Calidad del sueño</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 h-2.5 rounded-full"
                  style={{ background: i <= todayLog.quality ? 'var(--violet)' : 'var(--surface-2)' }} />
              ))}
            </div>
          </div>
          <button onClick={() => setShowForm(true)}
            className="w-full py-3 rounded-2xl text-sm font-semibold"
            style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            Editar registro
          </button>
        </div>
      ) : (
        <div className="card p-5">
          <p className="text-base font-bold mb-4" style={{ color: 'var(--text)' }}>
            {todayLog ? 'Editar sueño' : 'Registrar sueño'}
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Te acostaste', value: bedTime, set: setBedTime },
                { label: 'Te dormiste', value: sleepTime, set: setSleepTime },
                { label: 'Te despertaste', value: wakeTime, set: setWakeTime },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                  <input type="time" value={item.value} onChange={(e) => item.set(e.target.value)}
                    className="w-full text-center text-sm font-bold rounded-xl py-2.5 border outline-none"
                    style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'var(--surface-2)' }} />
                </div>
              ))}
            </div>
            {sleepTime && wakeTime && (
              <div className="rounded-xl p-3 text-center" style={{ background: 'var(--violet-light)' }}>
                <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>Duración estimada</p>
                <p className="text-lg font-bold" style={{ color: 'var(--violet)' }}>{getDuration(sleepTime, wakeTime)}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium mb-2.5" style={{ color: 'var(--text-muted)' }}>¿Cómo te despertaste?</p>
              <div className="flex gap-2">
                {feelings.map((f) => (
                  <button key={f.value} onClick={() => setFeeling(f.value)}
                    className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all"
                    style={feeling === f.value
                      ? { background: 'var(--violet)', color: 'white' }
                      : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                    <span className="text-xl">{f.emoji}</span>
                    <span className="text-xs font-semibold">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-2.5" style={{ color: 'var(--text-muted)' }}>
                Calidad del sueño: {quality}/5
              </p>
              <div className="flex gap-2">
                {([1, 2, 3, 4, 5] as Quality[]).map((q) => (
                  <button key={q} onClick={() => setQuality(q)}
                    className="flex-1 py-3 rounded-2xl text-sm font-bold transition-all"
                    style={quality >= q
                      ? { background: 'var(--violet)', color: 'white' }
                      : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleSave}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white active:scale-98 transition-transform"
              style={{ background: 'var(--violet)' }}>
              Guardar registro
            </button>
          </div>
        </div>
      )}

      <div className="card p-4">
        <p className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Últimos 7 días</p>
        <div className="flex items-end gap-2 h-24">
          {last7Days.map((d, i) => {
            const h = maxHours > 0 ? (d.hours / maxHours) * 100 : 0
            const isToday = i === 6
            const isGood = d.hours >= 7
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px]" style={{ color: 'var(--text-light)' }}>
                  {d.hours > 0 ? `${d.hours.toFixed(1)}h` : '—'}
                </span>
                <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: 56, background: 'var(--surface-2)' }}>
                  <div className="absolute bottom-0 w-full rounded-t-lg transition-all duration-700"
                    style={{ height: `${h}%`, background: isGood ? 'var(--violet)' : isToday ? '#C4B5FD' : '#DDD6FE' }} />
                </div>
                <span className="text-[10px] font-medium capitalize"
                  style={{ color: isToday ? 'var(--violet)' : 'var(--text-light)' }}>
                  {d.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card p-4">
        <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Para dormir mejor</p>
        {[
          { icon: '📱', text: 'Sin pantallas 1h antes de dormir' },
          { icon: '🌡️', text: 'Habitación fresca entre 18–22°C' },
          { icon: '☕', text: 'Evita la cafeína después de las 14h' },
          { icon: '🛏️', text: 'Horario fijo para dormir y despertar' },
        ].map((tip) => (
          <div key={tip.text} className="flex items-center gap-3 py-2.5"
            style={{ borderBottom: '1px solid var(--border-light)' }}>
            <span className="text-lg">{tip.icon}</span>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
