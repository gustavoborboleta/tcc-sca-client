import React from 'react'
import Signin from 'components/Signin'
import defaultPage from '../utils/auth/defaultPage'

function Login() {
  return <Signin />
}

export default defaultPage(Login)
