'use client'

import { useLocalStorage } from './useLocalStorage'

interface DayWater {
  date: string
  entries: number[]
  goal: number
}

const today = () => new Date().toISOString().split('T')[0]

const DEFAULT_GOAL = 2000

export function useWaterLog() {
  const [days, setDays] = useLocalStorage<DayWater[]>('water_logs', [])
  const [goal, setGoalState] = useLocalStorage<number>('water_goal', DEFAULT_GOAL)

  const todayData = days.find((d) => d.date === today()) ?? { date: today(), entries: [], goal }
  const consumed = todayData.entries.reduce((s, e) => s + e, 0)

  const addWater = (ml: number) => {
    setDays((prev) => {
      const idx = prev.findIndex((d) => d.date === today())
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], entries: [...updated[idx].entries, ml] }
        return updated
      }
      return [...prev, { date: today(), entries: [ml], goal }]
    })
  }

  const removeLastEntry = () => {
    setDays((prev) => {
      const idx = prev.findIndex((d) => d.date === today())
      if (idx < 0) return prev
      const entries = [...prev[idx].entries]
      entries.pop()
      const updated = [...prev]
      updated[idx] = { ...updated[idx], entries }
      return updated
    })
  }

  const setGoal = (ml: number) => setGoalState(ml)

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    const found = days.find((x) => x.date === dateStr)
    const total = found ? found.entries.reduce((s, e) => s + e, 0) : 0
    return {
      date: dateStr,
      total,
      label: d.toLocaleDateString('es-419', { weekday: 'short' }).replace('.', ''),
    }
  })

  return { consumed, goal, entries: todayData.entries, addWater, removeLastEntry, setGoal, last7Days }
}
