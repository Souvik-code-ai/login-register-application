import { create } from 'zustand'

const authStore = create((set) => ({
  user: (() => {
    try {
      const user = localStorage.getItem('user')
      return user && user !== 'undefined' ? JSON.parse(user) : null
    } catch {
      return null
    }
  })(),
  token: localStorage.getItem('token') || null,

  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    set({ user, token })
  },

  logout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    set({ user: null, token: null })
  }
}))

export default authStore