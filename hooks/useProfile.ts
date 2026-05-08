'use client'

import { useLocalStorage } from './useLocalStorage'
import { UserProfile } from '@/types'

const DEFAULT_PROFILE: UserProfile = {
  id: '1',
  name: 'Sofía',
  email: '',
  waterGoalMl: 2000,
  sleepGoalHour: '23:00',
  wakeGoalHour: '07:00',
  mainGoal: 'Reducir el estrés y mejorar el sueño',
}

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('user_profile', DEFAULT_PROFILE)
  const update = (fields: Partial<UserProfile>) => setProfile((p) => ({ ...p, ...fields }))
  return { profile, update }
}
