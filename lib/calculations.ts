import { BalanceScores, BalanceResult, BalanceLevel } from '@/types'

export function calculateBalanceScore(scores: BalanceScores): BalanceResult {
  const score = Math.round(
    scores.hydration * 0.3 +
    scores.sleep * 0.35 +
    scores.routine * 0.2 +
    scores.nutrition * 0.15
  )

  let level: BalanceLevel
  if (score <= 39) level = 'Atención'
  else if (score <= 69) level = 'En progreso'
  else if (score <= 89) level = 'Buen equilibrio'
  else level = 'Excelente'

  return { score, level }
}

export function calculateHydrationScore(consumedMl: number, goalMl: number): number {
  return Math.min(100, Math.round((consumedMl / goalMl) * 100))
}

export function calculateSleepScore(
  hoursSlept: number,
  quality: 1 | 2 | 3 | 4 | 5,
  feeling: 'bien' | 'normal' | 'cansado'
): number {
  const hoursScore = hoursSlept >= 7 && hoursSlept <= 9 ? 100
    : hoursSlept >= 6 || hoursSlept <= 10 ? 70
    : 40

  const qualityScore = (quality / 5) * 100
  const feelingScore = feeling === 'bien' ? 100 : feeling === 'normal' ? 65 : 30

  return Math.round(hoursScore * 0.4 + qualityScore * 0.35 + feelingScore * 0.25)
}

export function getBalanceLevelColor(level: BalanceLevel): string {
  switch (level) {
    case 'Excelente':      return 'text-emerald-400'
    case 'Buen equilibrio': return 'text-green-400'
    case 'En progreso':    return 'text-amber-400'
    case 'Atención':       return 'text-red-400'
  }
}

export function getBalanceLevelBg(level: BalanceLevel): string {
  switch (level) {
    case 'Excelente':      return 'bg-emerald-400/10 border-emerald-400/30'
    case 'Buen equilibrio': return 'bg-green-400/10 border-green-400/30'
    case 'En progreso':    return 'bg-amber-400/10 border-amber-400/30'
    case 'Atención':       return 'bg-red-400/10 border-red-400/30'
  }
}

export function getBalanceMessage(level: BalanceLevel): string {
  switch (level) {
    case 'Excelente':      return '¡Lo estás haciendo increíble! Tus hábitos están muy bien encaminados.'
    case 'Buen equilibrio': return 'Estás construyendo una rutina más liviana. ¡Sigue cuidándote!'
    case 'En progreso':    return 'Buenas señales de avance. Pequeños ajustes hacen toda la diferencia.'
    case 'Atención':       return 'Tu cuerpo está pidiendo atención. Empieza de a un paso a la vez.'
  }
}

export function getTodayRecipeIndex(): number {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return dayOfYear % 30
}

export function getTodayTipIndex(): number {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return (dayOfYear + 7) % 30
}
