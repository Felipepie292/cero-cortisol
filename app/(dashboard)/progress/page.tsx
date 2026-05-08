'use client'

import Image from 'next/image'

const photos = [
  {
    src: '/depois.jpg',
    label: 'Actual',
    date: '8 de mayo, 2025',
    week: 'Semana del 5 de mayo',
    note: 'Me siento con más energía. El vientre está más plano y duermo mucho mejor.',
    tag: 'Después',
    tagColor: { bg: 'var(--sage-2)', text: 'var(--sage-11)' },
  },
  {
    src: '/antes.jpg',
    label: 'Inicio',
    date: '1 de abril, 2025',
    week: 'Semana del 31 de marzo',
    note: 'Primer registro. Me sentía muy hinchada y con poca energía durante el día.',
    tag: 'Antes',
    tagColor: { bg: 'var(--terra-2)', text: 'var(--terra-11)' },
  },
]

export default function ProgressPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="px-4 pt-10 pb-5" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-light)' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--terra-9)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Tu camino</p>
        <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>Evolución</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Registra tu camino de autocuidado semana a semana.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats band */}
        <div className="card p-4 grid grid-cols-3 gap-2 text-center">
          {[
            { v: '6', u: 'semanas', l: 'registrando' },
            { v: '2',  u: 'fotos',   l: 'archivadas' },
            { v: '−1,5', u: 'kg',   l: 'esta semana' },
          ].map((s, i) => (
            <div key={i} style={{ borderRight: i < 2 ? '1px solid var(--border-light)' : 'none' }}>
              <p className="text-lg font-medium" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
                {s.v}<span className="text-xs font-normal ml-0.5" style={{ color: 'var(--text-muted)' }}>{s.u}</span>
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontSize: 10 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Photos — stacked */}
        {photos.map((photo, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover object-top"
                sizes="430px"
              />
              {/* top badge */}
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: photo.tagColor.bg, color: photo.tagColor.text }}>
                  {photo.tag}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{photo.date}</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: photo.tagColor.bg, color: photo.tagColor.text }}>{photo.label}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{photo.note}</p>
            </div>
          </div>
        ))}

        <div className="pb-2" />
      </div>
    </div>
  )
}
