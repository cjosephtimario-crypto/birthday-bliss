import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Memory {
  id: string
  image_url: string
  caption: string | null
  memory_date: string | null
}

export function MemoriesTab() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchMemories()
  }, [])

  const fetchMemories = async () => {
    const { data } = await supabase.from('memories').select('*').order('created_at', { ascending: false })
    if (data) setMemories(data)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return setUploading(false)

    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('memory-photos').upload(filePath, file)

    if (uploadError) {
      alert('Error uploading photo')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('memory-photos').getPublicUrl(filePath)

    const { data, error } = await supabase.from('memories').insert([
      { image_url: publicUrl, caption, user_id: user.id }
    ]).select()

    if (!error && data) {
      setMemories([data[0], ...memories])
      setCaption('')
    }
    setUploading(false)
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-3xl mx-auto text-white space-y-6">
      <h2 className="text-2xl font-bold font-['Baloo_2']">📸 Birthday Photo Album</h2>

      <div className="flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          placeholder="Memory caption..." 
          value={caption} 
          onChange={e => setCaption(e.target.value)}
          className="p-2 rounded-xl bg-black/20 border border-white/20 focus:outline-none flex-1 text-white"
        />
        <label className="bg-purple-600 hover:bg-purple-500 rounded-xl p-2 font-semibold cursor-pointer text-center">
          {uploading ? 'Uploading...' : 'Upload Photo'}
          <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {memories.map(mem => (
          <div key={mem.id} className="bg-black/20 rounded-xl overflow-hidden border border-white/10">
            <img src={mem.image_url} alt={mem.caption || 'Memory'} className="w-full h-36 object-cover" />
            {mem.caption && <p className="p-2 text-xs text-purple-200">{mem.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
