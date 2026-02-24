const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface AuthUser {
  id: string
  name: string
  email: string
  username: string
  avatar?: string
  role: 'user' | 'seller' | 'admin'
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  user: AuthUser
}

export const authApi = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.message || 'Registration failed')
    return json.data
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.message || 'Login failed')
    return json.data
  },

  me: async (token: string): Promise<AuthUser> => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const json = await res.json()
    if (!json.success) throw new Error('Not authenticated')
    return json.data
  },
}

export const tokenStorage = {
  get: () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('pb_token')
  },
  set: (token: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('pb_token', token)
  },
  remove: () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('pb_token')
  },
}
