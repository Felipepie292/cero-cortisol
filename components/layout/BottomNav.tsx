'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    label: 'Inicio',
    href: '/home',
    icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={a ? '0' : '1.8'}>
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z" strokeLinejoin="round" />
        <path d="M9 21V13h6v8" strokeLinejoin="round" stroke={a ? 'white' : 'currentColor'} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Hábitos',
    href: '/habits',
    icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" />
        {a && <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />}
      </svg>
    ),
  },
  {
    label: 'Evolución',
    href: '/progress',
    icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 18l4.5-5 4 4 4-7 4.5 4" strokeLinecap="round" strokeLinejoin="round" />
        {a && <path d="M3 18l4.5-5 4 4 4-7 4.5 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />}
      </svg>
    ),
  },
  {
    label: 'Recetas',
    href: '/recipes',
    icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3C8.5 3 6 6 6 9.5c0 3 1.8 5.5 4.5 7v2.5h3V16.5c2.7-1.5 4.5-4 4.5-7C18 6 15.5 3 12 3z" strokeLinejoin="round" />
        <path d="M9.5 21h5" strokeLinecap="round" strokeWidth={a ? '2.4' : '1.8'} />
      </svg>
    ),
  },
  {
    label: 'Tés',
    href: '/teas',
    icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? '2.2' : '1.8'}>
        <path d="M6 2v4M12 2v4M18 2v4" strokeLinecap="round" />
        <path d="M4 8h16l-1.5 10a2 2 0 01-2 1.8H7.5a2 2 0 01-2-1.8L4 8z" strokeLinejoin="round" />
        <path d="M20 10c2 0 3 1 3 2.5S21.5 15 20 15" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Perfil',
    href: '/profile',
    icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={a ? '0' : '1.8'}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" strokeLinecap="round" stroke={a ? 'none' : 'currentColor'} fill={a ? 'currentColor' : 'none'} />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-light)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center justify-around px-0.5 pt-2 pb-1">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-200 min-w-0"
              style={{
                color: active ? 'var(--primary)' : 'var(--text-light)',
                background: active ? 'var(--primary-light)' : 'transparent',
              }}
            >
              {tab.icon(active)}
              <span className="text-[10px] font-semibold tracking-wide whitespace-nowrap">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
