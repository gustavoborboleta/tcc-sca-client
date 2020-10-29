import React, { useContext } from 'react'
import Signin from '../../components/Signin'
import { AuthContext } from '../../contexts/auth'

type SecurePageProps = {
  children: React.ReactNode
}

const SecurePageHoc = ({ children }: SecurePageProps) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <>{children}</> : <Signin />
}

export default SecurePageHoc
