'use client'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Toggle text messages
  const messages = ['Welcome Admin!', 'Manage Your Store Efficiently!', 'Track Orders & Inventory!']
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 3000) // Change message every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:8081/auth/signin', {
        email,
        password,
      })

      if (res.data.user.role !== 'Admin') {
        setError('You are not authorized to access the admin panel.')
        return
      }

      localStorage.setItem('token', res.data.jwt)
      localStorage.setItem('role', res.data.user.role)
      localStorage.setItem('Admin', JSON.stringify(res.data.user))

      navigate('/admin/dashboard')
    } catch (err) {
      console.log('Login error:', err)
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Toggle Messages */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="text-xl font-bold text-indigo-700 animate-pulse">{messages[currentMessage]}</h2>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 mt-16">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
