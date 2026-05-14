'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { joinWaitlist } from '~/lib/api/waitlist'
import { Button } from '../ui/button'

export const WaitlistForm = () => {
  const [loading, setLoading] = useState(false)
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
      // Sends: { "email": "...", "phone_number": "...", "location": "...", "name": "..." }
      const result = await joinWaitlist(formData)
      toast.success(result.message || 'Successfully joined waitlist')
      setFormData({ name: '', email: '', phone_number: '', location: '' })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputStyles =
    'min-h-12 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-muted outline-none focus:border-primary transition-all'

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-3"
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
        {loading ? 'Submitting...' : 'Join the Waitlist'}
      </Button>
    </form>
  )
}
