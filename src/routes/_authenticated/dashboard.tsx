import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { WishlistTab } from '../../WishlistTab'
import { MemoriesTab } from '../../MemoriesTab'
import { BalloonPopGame } from '../../BalloonPopGame'
import { InteractiveGarden } from '../../InteractiveGarden'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'memories' | 'game' | 'garden'>('wishlist')
  const [maidSpeaking, setMaidSpeaking] = useState(false)

  const speakGreeting = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1.2
      utterance.onstart = () => setMaidSpeaking(true)
      utterance.onend = () => setMaidSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const triggerCelebration = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-4 md:p-8 space-y-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold font-['Baloo_2']">🎂 Birthday Bliss</h1>
        <button 
          onClick={triggerCelebration}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition shadow-lg font-semibold"
        >
          🎉 Confetti!
        </button>
      </header>

      {/* Maid Virtual Assistant */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-6">
        <div className={`w-20 h-20 rounded-full bg-purple-400 flex items-center justify-center text-4xl border-4 border-purple-200 transition-transform ${maidSpeaking ? 'scale-110 animate-pulse' : ''}`}>
          🧹
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Maid Assistant (Aria)</h2>
          <p className="text-purple-200 text-sm">"Master, all your party modules are loaded and ready!"</p>
          <button 
            onClick={() => speakGreeting("Welcome to your birthday dashboard, Master! Everything is prepared.")}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-semibold transition"
          >
            🔊 Talk
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto flex justify-center gap-2 md:gap-4 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'wishlist' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
        >
          🎁 Wishlist
        </button>
        <button 
          onClick={() => setActiveTab('memories')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'memories' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
        >
          📸 Memories
        </button>
        <button 
          onClick={() => setActiveTab('game')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'game' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
        >
          🎈 Mini-Game
        </button>
        <button 
          onClick={() => setActiveTab('garden')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeTab === 'garden' ? 'bg-purple-600' : 'bg-white/5 hover:bg-white/10'}`}
        >
          🌷 Garden
        </button>
      </div>

      {/* Tab Content Display */}
      <main className="max-w-4xl mx-auto">
        {activeTab === 'wishlist' && <WishlistTab />}
        {activeTab === 'memories' && <MemoriesTab />}
        {activeTab === 'game' && <BalloonPopGame />}
        {activeTab === 'garden' && <InteractiveGarden />}
      </main>
    </div>
  )
}
