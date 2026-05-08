export interface UserProfile {
  id: string
  name: string
  email: string
  waterGoalMl: number
  sleepGoalHour: string
  wakeGoalHour: string
  mainGoal: string
}

export interface WaterLog {
  id: string
  date: string
  amountMl: number
}

export interface SleepLog {
  id: string
  date: string
  bedTime: string
  sleepTime: string
  wakeTime: string
  feeling: 'bien' | 'normal' | 'cansado'
  quality: 1 | 2 | 3 | 4 | 5
}

export interface ProgressPhoto {
  id: string
  date: string
  url: string
  note?: string
}

export type RecipeCategory = 'Desayuno' | 'Almuerzo' | 'Cena' | 'Merienda' | 'Bebidas saludables'

export interface Recipe {
  id: string
  title: string
  category: RecipeCategory
  description: string
  ingredients: string[]
  steps: string[]
  prepTimeMin: number
  tags: string[]
}

export type TipCategory = 'Respiración' | 'Sueño' | 'Hidratación' | 'Alimentación' | 'Movimiento suave' | 'Organización de rutina'

export interface Tip {
  id: string
  title: string
  body: string
  category: TipCategory
  completed?: boolean
}

export interface BalanceScores {
  hydration: number
  sleep: number
  routine: number
  nutrition: number
}

export type BalanceLevel = 'Atención' | 'En progreso' | 'Buen equilibrio' | 'Excelente'

export interface BalanceResult {
  score: number
  level: BalanceLevel
}
