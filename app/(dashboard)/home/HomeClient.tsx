'use client'

import Image from 'next/image'
import BalanceScoreCard from '@/components/cards/BalanceScoreCard'
import WaterProgressCard from '@/components/cards/WaterProgressCard'
import SleepSummaryCard from '@/components/cards/SleepSummaryCard'
import RecipeOfDayCard from '@/components/cards/RecipeOfDayCard'
import DailyTipCard from '@/components/cards/DailyTipCard'
import { calculateBalanceScore, calculateHydrationScore, calculateSleepScore, getTodayRecipeIndex, getTodayTipIndex } from '@/lib/calculations'
import { recipes } from '@/data/recipes'
import { tips } from '@/data/tips'
import { useWaterLog } from '@/hooks/useWaterLog'
import { useSleepLog } from '@/hooks/useSleepLog'
import { useProfile } from '@/hooks/useProfile'

export default function HomeClient() {
  const { consumed, goal } = useWaterLog()
  const { todayLog } = useSleepLog()
  const { profile } = useProfile()

  const hydrationScore = calculateHydrationScore(consumed, goal)
  const sleepScore = todayLog
    ? calculateSleepScore(
        (() => {
          const [sh, sm] = todayLog.sleepTime.split(':').map(Number)
          const [wh, wm] = todayLog.wakeTime.split(':').map(Number)
          const sleepMin = sh * 60 + sm
          const wakeMin = wh * 60 + wm
          const dur = wakeMin >= sleepMin ? wakeMin - sleepMin : (24 * 60 - sleepMin) + wakeMin
          return dur / 60
        })(),
        todayLog.quality,
        todayLog.feeling
      )
    : 50

  const balanceResult = calculateBalanceScore({
    hydration: hydrationScore,
    sleep: sleepScore,
    routine: 65,
    nutrition: 70,
  })

  const todayDate = new Date().toLocaleDateString('es-419', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="px-4 space-y-3">
      <div className="pt-10 pb-1 flex items-center justify-between">
        <Image src="/logo.png" alt="Cero Cortisol" width={48} height={48} className="rounded-full" priority />
        <p className="text-xs font-medium capitalize" style={{ color: 'var(--text-muted)' }}>{todayDate}</p>
      </div>
      <BalanceScoreCard result={balanceResult} userName={profile.name} />
      <div className="grid grid-cols-2 gap-3">
        <WaterProgressCard consumedMl={consumed} goalMl={goal} />
        <SleepSummaryCard log={todayLog} />
      </div>
      <div className="pt-1">
        <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Para hoy</p>
      </div>
      <RecipeOfDayCard recipe={recipes[getTodayRecipeIndex()]} />
      <DailyTipCard tip={tips[getTodayTipIndex()]} />
      <div className="pb-2" />
    </div>
  )
}
