import Link from 'next/link'

interface Props {
  consumedMl: number
  goalMl: number
}

export default function WaterProgressCard({ consumedMl, goalMl }: Props) {
  const percent = Math.min(100, Math.round((consumedMl / goalMl) * 100))
  const remaining = Math.max(0, goalMl - consumedMl)
  const glasses = Math.round(consumedMl / 250)

  return (
    <Link href="/habits" className="card block p-4 active:scale-[0.97] transition-transform">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'var(--blue-light)' }}>💧</div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: percent >= 100 ? 'var(--primary-light)' : 'var(--surface-2)', color: percent >= 100 ? 'var(--primary-dark)' : 'var(--text-muted)' }}>
          {percent}%
        </span>
      </div>
      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Hidratación</p>
      <p className="text-xl font-bold mb-0.5" style={{ color: 'var(--text)' }}>
        {consumedMl >= 1000 ? `${(consumedMl / 1000).toFixed(1)}L` : `${consumedMl}ml`}
      </p>
      <p className="text-xs mb-3" style={{ color: 'var(--text-light)' }}>
        {glasses} vaso{glasses !== 1 ? 's' : ''} de 250ml
      </p>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
        <div className="h-full rounded-full"
          style={{ width: `${percent}%`, background: 'linear-gradient(90deg,#38BDF8,#0EA5E9)', transition: 'width 0.6s ease' }} />
      </div>
      <p className="text-xs mt-2" style={{ color: percent >= 100 ? 'var(--primary)' : 'var(--text-light)' }}>
        {percent >= 100 ? '🎉 ¡Meta alcanzada!' : `Faltan ${remaining >= 1000 ? `${(remaining / 1000).toFixed(1)}L` : `${remaining}ml`}`}
      </p>
    </Link>
  )
}
