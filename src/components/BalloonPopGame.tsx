import { useState } from 'react'

interface Balloon {
  id: number
  color: string
  popped: boolean
}

export function BalloonPopGame() {
  const [score, setScore] = useState(0)
  const [balloons, setBalloons] = useState<Balloon[]>([
    { id: 1, color: 'bg-red-400', popped: false },
    { id: 2, color: 'bg-blue-400', popped: false },
    { id: 3, color: 'bg-green-400', popped: false },
    { id: 4, color: 'bg-yellow-400', popped: false },
    { id: 5, color: 'bg-purple-400', popped: false },
    { id: 6, color: 'bg-pink-400', popped: false },
  ])

  const popBalloon = (id: number) => {
    setBalloons(balloons.map(b => b.id === id ? { ...b, popped: true } : b))
    setScore(prev => prev + 1)
  }

  const resetGame = () => {
    setScore(0)
    setBalloons(balloons.map(b => ({ ...b, popped: false })))
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-xl mx-auto text-white text-center space-y-6">
      <h2 className="text-2xl font-bold font-['Baloo_2']">🎈 Birthday Balloon Pop</h2>
      <p className="text-purple-200">Score: {score} / {balloons.length}</p>

      <div className="grid grid-cols-3 gap-6 justify-items-center py-4">
        {balloons.map(b => (
          <button
            key={b.id}
            onClick={() => !b.popped && popBalloon(b.id)}
            className={`w-16 h-20 rounded-full transition-all duration-200 transform hover:scale-110 flex items-center justify-center text-2xl shadow-lg ${
              b.popped ? 'scale-0 opacity-0' : b.color
            }`}
          >
            🎈
          </button>
        ))}
      </div>

      {score === balloons.length && (
        <div className="space-y-3">
          <p className="text-xl font-bold text-yellow-300">🎉 Great job! You popped all the balloons!</p>
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
