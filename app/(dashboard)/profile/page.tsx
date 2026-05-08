'use client'

import { useState } from 'react'
import { useProfile } from '@/hooks/useProfile'

const goals = [
  'Reducir el estrés y mejorar el sueño',
  'Beber más agua e hidratarme mejor',
  'Crear una rutina de alimentación saludable',
  'Practicar movimiento suave en el día a día',
  'Equilibrar trabajo y descanso',
]

export default function ProfilePage() {
  const { profile, update } = useProfile()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ ...profile })

  const field = (key: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [key]: value }))

  const handleSave = () => {
    update(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-5" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#10B981,#34D399)' }}>
            {(form.name || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{form.name || 'Tu perfil'}</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{form.email || 'Configura tu perfil'}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Personal info */}
        <div className="card p-4">
          <p className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Información personal</p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-muted)' }}>Nombre</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => field('name', e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border-light)', color: 'var(--text)' }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-muted)' }}>E-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => field('email', e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border-light)', color: 'var(--text)' }}
              />
            </div>
          </div>
        </div>

        {/* Habits config */}
        <div className="card p-4">
          <p className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Configuración de hábitos</p>

          <div className="space-y-4">
            {/* Water goal */}
            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--text-muted)' }}>
                Meta diaria de agua
              </label>
              <p className="text-xs mb-2" style={{ color: 'var(--text-light)' }}>Recomendado: 2000–2500ml</p>
              <div className="flex gap-2">
                {[1500, 2000, 2500, 3000].map((ml) => (
                  <button
                    key={ml}
                    onClick={() => field('waterGoalMl', String(ml))}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={String(form.waterGoalMl) === String(ml)
                      ? { background: 'var(--blue)', color: 'white' }
                      : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}
                  >
                    {ml < 1000 ? `${ml}ml` : `${ml / 1000}L`}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep times */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  🌙 Hora ideal para dormir
                </label>
                <input
                  type="time"
                  value={form.sleepGoalHour}
                  onChange={(e) => field('sleepGoalHour', e.target.value)}
                  className="w-full px-3 py-3 rounded-2xl text-sm text-center font-bold outline-none border"
                  style={{ background: 'var(--violet-light)', borderColor: 'transparent', color: 'var(--violet)' }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  ☀️ Hora ideal para despertar
                </label>
                <input
                  type="time"
                  value={form.wakeGoalHour}
                  onChange={(e) => field('wakeGoalHour', e.target.value)}
                  className="w-full px-3 py-3 rounded-2xl text-sm text-center font-bold outline-none border"
                  style={{ background: 'var(--orange-light)', borderColor: 'transparent', color: 'var(--orange)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main goal */}
        <div className="card p-4">
          <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Objetivo principal</p>
          <div className="space-y-2">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => field('mainGoal', g)}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm transition-all flex items-center gap-3"
                style={form.mainGoal === g
                  ? { background: 'var(--primary-light)', color: 'var(--primary-dark)', fontWeight: 600 }
                  : { background: 'var(--surface-2)', color: 'var(--text-muted)' }}
              >
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: form.mainGoal === g ? 'var(--primary)' : 'var(--border)' }}>
                  {form.mainGoal === g && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--primary)' }} />
                  )}
                </div>
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl text-sm font-bold text-white active:scale-[0.98] transition-all"
          style={{
            background: saved
              ? 'var(--primary-dark)'
              : 'linear-gradient(135deg, #10B981, #34D399)',
            boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
          }}
        >
          {saved ? '✓ ¡Guardado con éxito!' : 'Guardar cambios'}
        </button>

        {/* App info */}
        <div className="card p-4">
          <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Sobre la app</p>
          <div className="space-y-3">
            {[
              { icon: '🌿', title: 'Índice de equilibrio', desc: 'Estimación basada en tus hábitos — no es una medición médica real.' },
              { icon: '🔒', title: 'Tus datos son tuyos', desc: 'Todo se guarda localmente. Al conectar una cuenta, sincronizamos de forma segura.' },
              { icon: '💬', title: 'Versión MVP 0.1', desc: 'App en desarrollo. ¡Las sugerencias son bienvenidas!' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 py-1">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>{item.title}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout placeholder */}
        <button
          className="w-full py-3.5 rounded-2xl text-sm font-semibold"
          style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}
        >
          Cerrar sesión
        </button>

        <div className="pb-2" />
      </div>
    </div>
  )
}
