import Link from 'next/link'
import { Recipe } from '@/types'

interface Props { recipe: Recipe }

const catColors: Record<string, { bg: string; text: string; emoji: string }> = {
  'Desayuno':          { bg: '#FEF3C7', text: '#92400E', emoji: '☕' },
  'Almuerzo':          { bg: '#D1FAE5', text: '#065F46', emoji: '🥗' },
  'Cena':              { bg: '#E0F2FE', text: '#075985', emoji: '🍽️' },
  'Merienda':          { bg: '#FCE7F3', text: '#9D174D', emoji: '🥙' },
  'Bebidas saludables': { bg: '#EDE9FE', text: '#5B21B6', emoji: '🥤' },
}

export default function RecipeOfDayCard({ recipe }: Props) {
  const cat = catColors[recipe.category] ?? catColors['Almuerzo']
  return (
    <Link href={`/recipes/${recipe.id}`} className="card block p-4 active:scale-[0.97] transition-transform">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: cat.bg }}>{cat.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: cat.bg, color: cat.text }}>{recipe.category}</span>
            <span className="text-xs" style={{ color: 'var(--text-light)' }}>🕐 {recipe.prepTimeMin}min</span>
          </div>
          <h3 className="text-base font-bold mb-1 truncate" style={{ color: 'var(--text)' }}>{recipe.title}</h3>
          <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>{recipe.description}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="flex gap-1.5 flex-wrap">
          {recipe.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>#{t}</span>
          ))}
        </div>
        <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>Ver receta →</span>
      </div>
    </Link>
  )
}
