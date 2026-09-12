import { useState } from 'react'

interface Tulip {
  id: number
  color: string
  x: number
  y: number
}

export function InteractiveGarden() {
  const [tulips, setTulips] = useState<Tulip[]>([
    { id: 1, color: '#f472b6', x: 20, y: 30 },
    { id: 2, color: '#c084fc', x: 60, y: 50 },
    { id: 3, color: '#fb7185', x: 100, y: 20 },
    { id: 4, color: '#a78bfa', x: 140, y: 60 },
  ])

  const [draggingId, setDraggingId] = useState<number | null>(null)

  const handleMouseDown = (id: number) => {
    setDraggingId(id)
  }

  const handleMouseUp = () => {
    setDraggingId(null)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingId === null) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - 20
    const y = e.clientY - rect.top - 20

    setTulips(tulips.map(t => t.id === draggingId ? { ...t, x, y } : t))
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl mx-auto text-white space-y-4">
      <h2 className="text-2xl font-bold font-['Baloo_2'] text-center">🌷 Tulip Garden</h2>
      <p className="text-sm text-purple-200 text-center">Click and drag the tulips to rearrange your garden!</p>

      <div 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-64 bg-emerald-950/30 rounded-xl border border-emerald-500/20 overflow-hidden cursor-pointer"
      >
        {tulips.map(tulip => (
          <div
            key={tulip.id}
            onMouseDown={() => handleMouseDown(tulip.id)}
            style={{ left: `${tulip.x}px`, top: `${tulip.y}px` }}
            className="absolute select-none transition-transform active:scale-125"
          >
            <svg width="40" height="50" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Stem & Leaves */}
              <path d="M50 60 Q45 90 50 120" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" />
              <path d="M50 90 Q20 80 30 65" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M50 95 Q80 85 70 70" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Flower Petals */}
              <path d="M25 50 Q20 10 50 10 Q80 10 75 50 Q50 65 25 50 Z" fill={tulip.color} />
              <path d="M35 45 Q50 20 65 45 Q50 55 35 45 Z" fill="#ffffff" fillOpacity="0.3" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
