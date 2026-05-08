import { recipes } from '@/data/recipes'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const catConfig: Record<string, { emoji: string; gradient: string; badge: string; badgeText: string }> = {
  'Desayuno':          { emoji: '☕', gradient: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', badge: '#FEF3C7', badgeText: '#92400E' },
  'Almuerzo':          { emoji: '🥗', gradient: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)', badge: '#D1FAE5', badgeText: '#065F46' },
  'Cena':              { emoji: '🍽️', gradient: 'linear-gradient(135deg,#E0F2FE,#BAE6FD)', badge: '#E0F2FE', badgeText: '#075985' },
  'Merienda':          { emoji: '🥙', gradient: 'linear-gradient(135deg,#FCE7F3,#FBCFE8)', badge: '#FCE7F3', badgeText: '#9D174D' },
  'Bebidas saludables': { emoji: '🥤', gradient: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)', badge: '#EDE9FE', badgeText: '#5B21B6' },
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params
  const recipe = recipes.find((r) => r.id === id)
  if (!recipe) notFound()

  const c = catConfig[recipe.category]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <div className="relative h-48 flex items-center justify-center text-7xl"
        style={{ background: c.gradient }}>
        {c.emoji}
        <Link href="/recipes"
          className="absolute top-4 left-4 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: 'rgba(255,255,255,0.85)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Title block */}
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: c.badge, color: c.badgeText }}>{recipe.category}</span>
          <h1 className="text-2xl font-bold mt-2 mb-1" style={{ color: 'var(--text)' }}>{recipe.title}</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{recipe.description}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="card flex-1 p-3 text-center">
            <p className="text-xl mb-0.5">🕐</p>
            <p className="text-base font-bold" style={{ color: 'var(--text)' }}>{recipe.prepTimeMin}min</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>preparación</p>
          </div>
          <div className="card flex-1 p-3 text-center">
            <p className="text-xl mb-0.5">🥕</p>
            <p className="text-base font-bold" style={{ color: 'var(--text)' }}>{recipe.ingredients.length}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>ingredientes</p>
          </div>
          <div className="card flex-1 p-3 text-center">
            <p className="text-xl mb-0.5">📋</p>
            <p className="text-base font-bold" style={{ color: 'var(--text)' }}>{recipe.steps.length}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>pasos</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Ingredients */}
        <div className="card p-4">
          <p className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Ingredientes</p>
          <div className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{ing}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="card p-4">
          <p className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Preparación</p>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: 'var(--primary)' }}>
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed pt-0.5" style={{ color: 'var(--text-muted)' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  )
}
