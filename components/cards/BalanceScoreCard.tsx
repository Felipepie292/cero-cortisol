import { BalanceResult } from '@/types'
import { getBalanceMessage } from '@/lib/calculations'

interface Props {
  result: BalanceResult
  userName: string
}

const levelStyles: Record<string, { badge: string; badgeText: string }> = {
  'Excelente':       { badge: '#D1FAE5', badgeText: '#065F46' },
  'Buen equilibrio': { badge: '#D1FAE5', badgeText: '#065F46' },
  'En progreso':     { badge: '#FEF3C7', badgeText: '#92400E' },
  'Atención':        { badge: '#FFE4E6', badgeText: '#9F1239' },
}

export default function BalanceScoreCard({ result, userName }: Props) {
  const style = levelStyles[result.level] ?? levelStyles['En progreso']
  const message = getBalanceMessage(result.level)
  const circumference = 2 * Math.PI * 46
  const offset = circumference - (result.score / 100) * circumference
  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Buenos días'
    if (h < 18) return 'Buenas tardes'
    return 'Buenas noches'
  })()

  return (
    <div
      className="rounded-3xl p-5 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #10B981 50%, #34D399 100%)',
        boxShadow: '0 8px 32px rgba(16,185,129,0.3)',
      }}
    >
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <div className="absolute -right-4 bottom-4 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="relative flex items-center justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>{greeting} 👋</p>
          <h2 className="text-2xl font-bold text-white mb-3 truncate">{userName}</h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{ background: style.badge, color: style.badgeText }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: style.badgeText }} />
            {result.level}
          </div>
          <p className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>{message}</p>
        </div>

        <div className="relative flex-shrink-0">
          <svg width="104" height="104" className="-rotate-90">
            <circle cx="52" cy="52" r="46" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <circle cx="52" cy="52" r="46" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{result.score}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>puntos</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 flex items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        {[
          { label: 'Hidratación', pct: '30%' },
          { label: 'Sueño', pct: '35%' },
          { label: 'Rutina', pct: '20%' },
          { label: 'Nutrición', pct: '15%' },
        ].map((item, i) => (
          <>
            {i > 0 && <div key={`sep-${i}`} className="w-px h-6 opacity-20" style={{ background: 'white' }} />}
            <div key={item.label} className="text-center">
              <p className="text-xs font-medium text-white opacity-70">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.pct}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
