import Link from 'next/link'
import { SleepLog } from '@/types'

interface Props { log: SleepLog | null }

export default function SleepSummaryCard({ log }: Props) {
  if (!log) {
    return (
      <Link href="/habits?tab=sono" className="card block p-4 active:scale-[0.97] transition-transform">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3" style={{ background: 'var(--violet-light)' }}>🌙</div>
        <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Sueño</p>
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Sin registro</p>
        <p className="text-xs font-semibold" style={{ color: 'var(--violet)' }}>Registrar →</p>
      </Link>
    )
  }

  const [sh, sm] = log.sleepTime.split(':').map(Number)
  const [wh, wm] = log.wakeTime.split(':').map(Number)
  const sleepMin = sh * 60 + sm
  const wakeMin = wh * 60 + wm
  const dur = wakeMin >= sleepMin ? wakeMin - sleepMin : (24 * 60 - sleepMin) + wakeMin
  const hours = Math.floor(dur / 60)
  const minutes = dur % 60
  const feelingEmoji = { bien: '😊', normal: '😐', cansado: '😴' }[log.feeling]

  return (
    <Link href="/habits?tab=sono" className="card block p-4 active:scale-[0.97] transition-transform">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'var(--violet-light)' }}>🌙</div>
        <span className="text-lg">{feelingEmoji}</span>
      </div>
      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Sueño</p>
      <p className="text-xl font-bold mb-0.5" style={{ color: 'var(--text)' }}>
        {hours}h{minutes > 0 ? ` ${minutes}min` : ''}
      </p>
      <p className="text-xs mb-3" style={{ color: 'var(--text-light)' }}>{log.sleepTime} — {log.wakeTime}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full"
            style={{ background: i <= log.quality ? 'var(--violet)' : 'var(--surface-2)' }} />
        ))}
      </div>
    </Link>
  )
}
