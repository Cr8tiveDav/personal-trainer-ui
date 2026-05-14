'use client'

import { useState } from 'react'
import { joinWaitlist } from '@/lib/api/waitlist'
import { Button } from '../ui/button'
import { CheckCircle2, X } from 'lucide-react'

export const WaitlistForm = () => {
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await joinWaitlist(formData)
      setShowPopup(true)
      setFormData({ name: '', email: '', phone_number: '', location: '' })
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyles =
    'min-h-12 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-muted outline-none focus:border-primary transition-all'

  return (
    <div className="relative w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3"
      >
        <input
          required
          name="name"
          type="text"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          className={inputStyles}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="johndoe@example.com"
          value={formData.email}
          onChange={handleChange}
          className={inputStyles}
        />
        <input
          required
          name="phone_number"
          type="tel"
          placeholder="Phone number"
          value={formData.phone_number}
          onChange={handleChange}
          className={inputStyles}
        />
        <input
          required
          name="location"
          type="text"
          placeholder="Location (e.g. Lagos, Nigeria)"
          value={formData.location}
          onChange={handleChange}
          className={inputStyles}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Join the Waitlist'}
        </Button>
      </form>

      {/* Inline Success Popup */}
      {showPopup && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 animate-in fade-in zoom-in duration-300">
          <div className="relative flex flex-col items-center p-8 text-center bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-[90%]">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
            
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={28} />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900">Entry Confirmed</h3>
            <p className="mt-1 text-sm text-gray-500">
              You’ve been added to the elite queue. We’ll be in touch soon.
            </p>
            
            <Button 
              onClick={() => setShowPopup(false)}
              className="mt-6 w-full py-2"
              variant="outline"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}