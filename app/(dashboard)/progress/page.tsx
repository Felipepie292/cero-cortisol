'use client'


const photos = [
  {
    src: '/depois.jpg',
    label: 'Actual',
    date: '8 de mayo, 2026',
    note: 'Me siento con más energía. El vientre está más plano y duermo mucho mejor.',
    tagColor: { bg: 'var(--sage-2)', text: 'var(--sage-11)' },
  },
  {
    src: '/antes.jpg',
    label: 'Inicio',
    date: '1 de abril, 2026',
    note: 'Primer registro. Me sentía muy hinchada y con poca energía durante el día.',
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
            { v: '−1,5', u: 'kg',  l: 'esta semana' },
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
            <div className="flex justify-center" style={{ background: 'var(--surface-2)' }}>
              <img
                src={photo.src}
                alt={photo.label}
                style={{ width: '60%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{photo.date}</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: photo.tagColor.bg, color: photo.tagColor.text }}>{photo.label}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{photo.note}</p>
            </div>
          </div>
        ))}

        <div className="pb-2" />
      </div>
    </div>
  )
}
