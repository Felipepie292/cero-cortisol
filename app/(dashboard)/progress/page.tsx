'use client'

import { useState, useRef } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface Photo {
  id: string
  date: string
  dataUrl: string
  note: string
  week: string
}

function weekLabel(dateStr: string) {
  const d = new Date(dateStr)
  const start = new Date(d)
  start.setDate(d.getDate() - d.getDay())
  return `Semana del ${start.toLocaleDateString('es-419', { day: 'numeric', month: 'short' })}`
}

export default function ProgressPage() {
  const [photos, setPhotos] = useLocalStorage<Photo[]>('progress_photos', [])
  const [noteMap, setNoteMap] = useState<Record<string, string>>({})
  const [comparing, setComparing] = useState<[string, string] | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dateStr = new Date().toISOString()
      const newPhoto: Photo = {
        id: Date.now().toString(),
        date: dateStr,
        dataUrl: reader.result as string,
        note: '',
        week: weekLabel(dateStr),
      }
      setPhotos((prev) => [newPhoto, ...prev])
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const updateNote = (id: string, note: string) => {
    setPhotos((prev) => prev.map((p) => p.id === id ? { ...p, note } : p))
  }

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  const grouped = photos.reduce<Record<string, Photo[]>>((acc, p) => {
    const wk = p.week
    if (!acc[wk]) acc[wk] = []
    acc[wk].push(p)
    return acc
  }, {})

  const comparePhotos = photos.length >= 2
    ? [photos[photos.length - 1], photos[0]]
    : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-5" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-light)' }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>Evolución</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Registra tu camino de autocuidado semana a semana.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Upload card */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'var(--primary-light)' }}>📸</div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Agregar foto</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Registra tu progreso de esta semana</p>
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handleUpload}
          />

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-4 rounded-2xl border-2 border-dashed text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'var(--primary-light)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Elegir foto
          </button>

          <p className="text-xs text-center mt-3" style={{ color: 'var(--text-light)' }}>
            Las fotos se guardan solo en este dispositivo por ahora.
            <br />Al conectar tu cuenta, se sincronizarán automáticamente.
          </p>
        </div>

        {/* Comparison */}
        {comparePhotos && (
          <div className="card p-4">
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Comparativa</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { photo: comparePhotos[0], label: 'Inicio' },
                { photo: comparePhotos[1], label: 'Actual' },
              ].map(({ photo, label }) => (
                <div key={photo.id} className="rounded-2xl overflow-hidden"
                  style={{ background: 'var(--surface-2)' }}>
                  <img src={photo.dataUrl} alt={label}
                    className="w-full aspect-square object-cover" />
                  <div className="px-2 py-1.5 text-center">
                    <span className="text-xs font-bold"
                      style={{ color: label === 'Actual' ? 'var(--primary)' : 'var(--text-muted)' }}>
                      {label}
                    </span>
                    <p className="text-[10px]" style={{ color: 'var(--text-light)' }}>
                      {new Date(photo.date).toLocaleDateString('es-419', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              ✨ Cada foto es un paso de consistencia y autocuidado. ¡Sigue así!
            </p>
          </div>
        )}

        {/* Empty state */}
        {photos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4"
              style={{ background: 'var(--primary-light)' }}>🌱</div>
            <p className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Comienza tu camino</p>
            <p className="text-sm leading-relaxed mx-4" style={{ color: 'var(--text-muted)' }}>
              Agrega tu primera foto hoy. En unas semanas,
              verás cuánto has avanzado.
            </p>
          </div>
        )}

        {/* Timeline */}
        {Object.entries(grouped).map(([week, weekPhotos]) => (
          <div key={week}>
            <p className="text-xs font-bold px-1 mb-2" style={{ color: 'var(--text-muted)' }}>{week}</p>
            <div className="space-y-3">
              {weekPhotos.map((photo) => (
                <div key={photo.id} className="card overflow-hidden">
                  <img src={photo.dataUrl} alt="progreso"
                    className="w-full aspect-video object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        {new Date(photo.date).toLocaleDateString('es-419', {
                          weekday: 'long', day: 'numeric', month: 'long',
                        })}
                      </p>
                      <button onClick={() => deletePhoto(photo.id)}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--rose-light)', color: 'var(--rose)' }}>
                        eliminar
                      </button>
                    </div>
                    <textarea
                      value={photo.note}
                      onChange={(e) => updateNote(photo.id, e.target.value)}
                      placeholder="Agrega una nota sobre cómo te estás sintiendo..."
                      rows={2}
                      className="w-full text-sm rounded-xl px-3 py-2 resize-none outline-none border"
                      style={{
                        background: 'var(--surface-2)',
                        borderColor: 'var(--border-light)',
                        color: 'var(--text)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
