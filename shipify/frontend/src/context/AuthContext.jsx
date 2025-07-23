import { createContext, useContext, useState, useEffect } from 'react'
import { getToken, getUser, logout as apiLogout } from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser())
  const [token, setToken] = useState(getToken())

  useEffect(() => {
    setUser(getUser())
    setToken(getToken())
  }, [])

  const logout = () => {
    apiLogout()
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 