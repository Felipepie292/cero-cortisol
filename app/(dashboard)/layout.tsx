import BottomNav from '@/components/layout/BottomNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
