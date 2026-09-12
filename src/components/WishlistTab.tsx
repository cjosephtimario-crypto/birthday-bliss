import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase' // Adjust path if your supabase client is located elsewhere

interface WishlistItem {
  id: string
  title: string
  price: number | null
  url: string | null
  purchased: boolean
}

export function WishlistTab() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    const { data } = await supabase.from('wishlist_items').select('*').order('created_at', { ascending: false })
    if (data) setItems(data)
  }

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase.from('wishlist_items').insert([
      { title, price: price ? parseFloat(price) : null, url, user_id: user.id }
    ]).select()

    if (!error && data) {
      setItems([data[0], ...items])
      setTitle('')
      setPrice('')
      setUrl('')
    }
  }

  const togglePurchased = async (id: string, currentStatus: boolean) => {
    await supabase.from('wishlist_items').update({ purchased: !currentStatus }).eq('id', id)
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item))
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl mx-auto text-white space-y-6">
      <h2 className="text-2xl font-bold font-['Baloo_2']">🎁 Birthday Wishlist</h2>
      
      <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input 
          type="text" 
          placeholder="Item name..." 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          className="p-2 rounded-xl bg-black/20 border border-white/20 focus:outline-none"
        />
        <input 
          type="number" 
          placeholder="Price ($)..." 
          value={price} 
          onChange={e => setPrice(e.target.value)}
          className="p-2 rounded-xl bg-black/20 border border-white/20 focus:outline-none"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-500 rounded-xl p-2 font-semibold">
          Add Gift
        </button>
      </form>

      <ul className="space-y-3">
        {items.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl">
            <span className={item.purchased ? 'line-through text-gray-400' : ''}>
              {item.title} {item.price ? `($${item.price})` : ''}
            </span>
            <button 
              onClick={() => togglePurchased(item.id, item.purchased)}
              className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg"
            >
              {item.purchased ? '✓ Bought' : 'Mark Bought'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
