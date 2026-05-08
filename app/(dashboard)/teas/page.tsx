const teas = [
  {
    number: 1,
    name: 'Boricha',
    koreanName: '보리차',
    subtitle: 'Té de Cebada Tostada',
    emoji: '🌾',
    color: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
    benefit: 'Elimina toxinas y reduce la hinchazón abdominal. Activa el metabolismo y mejora la digestión desde primera hora.',
    tip: 'Tomar frío en ayunas cada mañana.',
  },
  {
    number: 2,
    name: 'Yulmucha',
    koreanName: '율무차',
    subtitle: 'Té de Semillas de Job',
    emoji: '🌿',
    color: { bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
    benefit: 'Drenante natural. Elimina el exceso de líquidos y reduce la celulitis visible en menos de 2 semanas.',
    tip: 'Beber tibio después del almuerzo.',
  },
  {
    number: 3,
    name: 'Mindeullecha',
    koreanName: '민들레차',
    subtitle: 'Té de Raíz de Diente de León',
    emoji: '🌼',
    color: { bg: '#FEF9C3', text: '#713F12', dot: '#EAB308' },
    benefit: 'Depura el hígado y activa la quema de grasa acumulada. Reduce el vientre inflamado de forma natural.',
    tip: 'Tomar 30 minutos antes de comer.',
  },
  {
    number: 4,
    name: 'Gukhwacha',
    koreanName: '국화차',
    subtitle: 'Té de Crisantemo',
    emoji: '🌸',
    color: { bg: '#FCE7F3', text: '#9D174D', dot: '#EC4899' },
    benefit: 'Reduce el cortisol y el estrés que provoca retención de líquidos. Calma el sistema nervioso y mejora el sueño.',
    tip: 'Beber caliente antes de dormir.',
  },
  {
    number: 5,
    name: 'Ssanghwacha',
    koreanName: '쌍화차',
    subtitle: 'Té de Jengibre y Canela',
    emoji: '🔥',
    color: { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' },
    benefit: 'Termogénico secreto de las abuelas coreanas. Acelera el metabolismo y quema calorías hasta 4 horas después.',
    tip: 'Tomar caliente en las mañanas frías.',
  },
  {
    number: 6,
    name: 'Maesil Cha',
    koreanName: '매실차',
    subtitle: 'Té de Ciruela Verde',
    emoji: '🍈',
    color: { bg: '#ECFCCB', text: '#3F6212', dot: '#84CC16' },
    benefit: 'Regula el tránsito intestinal y elimina gases. Las coreanas lo usan para aplanar el vientre en 3 días.',
    tip: 'Beber frío después de las comidas.',
  },
  {
    number: 7,
    name: 'Daenamu Cha',
    koreanName: '대나무차',
    subtitle: 'Té de Hoja de Bambú',
    emoji: '🎋',
    color: { bg: '#D1FAE5', text: '#064E3B', dot: '#059669' },
    benefit: 'Antioxidante 10 veces más potente que el té verde. Desintoxica las células y activa la lipólisis.',
    tip: 'Tomar tibio en el merienda.',
  },
  {
    number: 8,
    name: 'Sangnyeopcha',
    koreanName: '상엽차',
    subtitle: 'Té de Hoja de Morera',
    emoji: '🍃',
    color: { bg: '#DCFCE7', text: '#14532D', dot: '#22C55E' },
    benefit: 'Bloquea la absorción de azúcares y carbohidratos. Favorito en las clínicas de adelgazamiento de Seúl.',
    tip: 'Beber justo antes de las comidas principales.',
  },
  {
    number: 9,
    name: 'Yeoncha',
    koreanName: '연차',
    subtitle: 'Té de Semilla de Loto',
    emoji: '🪷',
    color: { bg: '#EDE9FE', text: '#4C1D95', dot: '#8B5CF6' },
    benefit: 'Controla el apetito y reduce la ansiedad por dulces. Equilibra las hormonas del hambre de manera natural.',
    tip: 'Tomar caliente a media mañana.',
  },
  {
    number: 10,
    name: 'Ul-geumcha',
    koreanName: '울금차',
    subtitle: 'Té de Cúrcuma Coreana',
    emoji: '✨',
    color: { bg: '#FEF3C7', text: '#78350F', dot: '#D97706' },
    benefit: 'Antiinflamatorio poderoso. Reduce la inflamación sistémica que impide bajar de peso a pesar de la dieta.',
    tip: 'Beber con pimienta negra para mayor absorción.',
  },
  {
    number: 11,
    name: 'Sanyacha',
    koreanName: '산야차',
    subtitle: 'Té de Espino Silvestre',
    emoji: '🫐',
    color: { bg: '#EFF6FF', text: '#1E3A5F', dot: '#3B82F6' },
    benefit: 'Mejora la circulación y elimina la retención en piernas y tobillos. Reduce la grasa visceral abdominal.',
    tip: 'Tomar frío por las tardes.',
  },
  {
    number: 12,
    name: 'Chikcha',
    koreanName: '칡차',
    subtitle: 'Té de Raíz de Kudzu',
    emoji: '🌱',
    color: { bg: '#F0FDF4', text: '#14532D', dot: '#16A34A' },
    benefit: 'Regula los niveles de insulina y evita que los carbohidratos se almacenen como grasa. Secreto milenario.',
    tip: 'Beber caliente después de la cena.',
  },
  {
    number: 13,
    name: 'Gyulpyeoncha',
    koreanName: '귤껍질차',
    subtitle: 'Té de Cáscara de Mandarina',
    emoji: '🍊',
    color: { bg: '#FFF7ED', text: '#7C2D12', dot: '#F97316' },
    benefit: 'Estimula la digestión lenta y activa las enzimas que descomponen la grasa acumulada en el abdomen.',
    tip: 'Tomar caliente después del desayuno.',
  },
  {
    number: 14,
    name: 'Kkaennipcha',
    koreanName: '깻잎차',
    subtitle: 'Té de Hoja de Perilla',
    emoji: '🫚',
    color: { bg: '#F0FDF4', text: '#166534', dot: '#15803D' },
    benefit: 'Rico en Omega-3 vegetal. Reduce la inflamación crónica y acelera el metabolismo de las grasas.',
    tip: 'Beber tibio con limón en ayunas.',
  },
  {
    number: 15,
    name: 'Oksusucha',
    koreanName: '옥수수차',
    subtitle: 'Té de Estigmas de Maíz',
    emoji: '🌽',
    color: { bg: '#FFFBEB', text: '#713F12', dot: '#CA8A04' },
    benefit: 'El más potente diurético natural de Corea. Elimina hasta 500ml de líquido retenido en 24 horas.',
    tip: 'Tomar 3 tazas al día durante 7 días seguidos.',
  },
]

export default function TeasPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-5" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">🍵</span>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Tés Coreanos</h1>
            <p className="text-xs font-medium" style={{ color: 'var(--primary)' }}>Rutina de 15 días · Desinflamar y adelgazar</p>
          </div>
        </div>
        <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Secretos milenarios usados en Corea para desinflamar el cuerpo, eliminar toxinas y acelerar la pérdida de peso de forma natural.
        </p>
      </div>

      <div className="p-4 space-y-3">
        {/* Banner */}
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)' }}>
          <span className="text-2xl">💡</span>
          <p className="text-xs leading-relaxed font-medium" style={{ color: '#065F46' }}>
            <strong>Protocolo:</strong> Un té por día, durante 15 días consecutivos. Combínalo con 2L de agua y verás resultados desde la primera semana.
          </p>
        </div>

        {/* Tea list */}
        {teas.map((tea) => (
          <div key={tea.number} className="card p-4">
            <div className="flex items-start gap-3">
              {/* Number badge */}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                style={{ background: tea.color.dot }}>
                {tea.number}
              </div>
              <div className="flex-1 min-w-0">
                {/* Name row */}
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-lg">{tea.emoji}</span>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>{tea.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: tea.color.bg, color: tea.color.text }}>
                    {tea.koreanName}
                  </span>
                </div>
                {/* Subtitle */}
                <p className="text-xs font-semibold mb-1.5" style={{ color: tea.color.dot }}>{tea.subtitle}</p>
                {/* Benefit */}
                <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>{tea.benefit}</p>
                {/* Tip */}
                <div className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5"
                  style={{ background: tea.color.bg }}>
                  <span className="text-xs">⏰</span>
                  <p className="text-xs font-semibold" style={{ color: tea.color.text }}>{tea.tip}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface)' }}>
          <p className="text-2xl mb-2">🌿</p>
          <p className="text-xs font-bold mb-1" style={{ color: 'var(--text)' }}>Resultados en 15 días</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Estos tés son patrimonio de la medicina tradicional coreana. No reemplazan tratamiento médico. Consulta a tu especialista si tienes condiciones de salud.
          </p>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  )
}
