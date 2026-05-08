'use client'

import { useLocalStorage } from './useLocalStorage'
import { SleepLog } from '@/types'

const today = () => new Date().toISOString().split('T')[0]

export function useSleepLog() {
  const [logs, setLogs] = useLocalStorage<SleepLog[]>('sleep_logs', [])

  const todayLog = logs.find((l) => l.date === today()) ?? null

  const saveLog = (log: Omit<SleepLog, 'id' | 'date'>) => {
    const entry: SleepLog = { ...log, id: Date.now().toString(), date: today() }
    setLogs((prev) => {
      const filtered = prev.filter((l) => l.date !== today())
      return [...filtered, entry]
    })
  }

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    const found = logs.find((l) => l.date === dateStr)
    if (!found) return {
      date: dateStr,
      hours: 0,
      label: d.toLocaleDateString('es-419', { weekday: 'short' }).replace('.', ''),
    }
    const [sh, sm] = found.sleepTime.split(':').map(Number)
    const [wh, wm] = found.wakeTime.split(':').map(Number)
    const sleepMin = sh * 60 + sm
    const wakeMin = wh * 60 + wm
    const dur = wakeMin >= sleepMin ? wakeMin - sleepMin : (24 * 60 - sleepMin) + wakeMin
    return {
      date: dateStr,
      hours: dur / 60,
      label: d.toLocaleDateString('es-419', { weekday: 'short' }).replace('.', ''),
    }
  })

  return { todayLog, saveLog, logs, last7Days }
}
