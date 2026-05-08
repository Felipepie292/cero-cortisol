'use client'

import { useLocalStorage } from './useLocalStorage'

export function useTips() {
  const [completed, setCompleted] = useLocalStorage<string[]>('tips_completed', [])

  const toggle = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const isCompleted = (id: string) => completed.includes(id)

  return { completed, toggle, isCompleted }
}
