import Link from 'next/link'
import { Tip } from '@/types'

interface Props { tip: Tip }

const catStyles: Record<string, { bg: string; text: string; emoji: string }> = {
  'Respiración':          { bg: '#E0F2FE', text: '#0369A1', emoji: '🌬️' },
  'Sueño':                { bg: '#EDE9FE', text: '#5B21B6', emoji: '🌙' },
  'Hidratación':          { bg: '#DBEAFE', text: '#1D4ED8', emoji: '💧' },
  'Alimentación':         { bg: '#D1FAE5', text: '#065F46', emoji: '🥦' },
  'Movimiento suave':     { bg: '#FEF3C7', text: '#92400E', emoji: '🚶' },
  'Organización de rutina': { bg: '#FCE7F3', text: '#9D174D', emoji: '📋' },
}

export default function DailyTipCard({ tip }: Props) {
  const style = catStyles[tip.category] ?? catStyles['Respiración']
  return (
    <Link href="/habits?tab=dicas" className="card block p-4 active:scale-[0.97] transition-transform">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: style.bg }}>{style.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: style.bg, color: style.text }}>{tip.category}</span>
          </div>
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text)' }}>{tip.title}</h3>
          <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{tip.body}</p>
        </div>
      </div>
    </Link>
  )
}
