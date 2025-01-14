'use client'

import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  FC,
  ReactNode,
} from 'react'

import { User, LoginData } from '@/common/types'

type AuthContextData = {
  isLoggedIn: boolean
  user: User | null
  isLoading: boolean
  signIn(credentials: LoginData): Promise<void>
  signOut(): Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

const useAuth = () => useContext(AuthContext)

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const storagedUser = localStorage.getItem('@dashboard:login')
    const storagedToken = localStorage.getItem('@dashboard:token')

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser))
    }

    setIsLoading(false)
  }, [])

  const signIn = async (credentials: LoginData) => {
    setIsLoading(true)
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    setUser(data.user)

    localStorage.setItem('@dashboard:login', JSON.stringify(data.user))
    localStorage.setItem('@dashboard:token', data.accessToken)

    setIsLoading(false)
  }

  const signOut = async () => {
    localStorage.clear()

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: user !== null, user, signIn, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
