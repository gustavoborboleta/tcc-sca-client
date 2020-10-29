import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'

type AuthProps = {
  children: React.ReactNode
}

interface AuthContextData {
  isAuthenticated: boolean
  user: any
  setUser: any
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadUser() {
      const userCookie = await Cookies.get('user')
      if (userCookie) {
        const userJson = JSON.parse(userCookie)
        setUser({ ...userJson })
      }
    }
    loadUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
