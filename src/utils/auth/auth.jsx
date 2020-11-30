import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import Strapi from 'strapi-sdk-javascript/build/main'
import Router, { useRouter } from 'next/router'

const apiUrl = process.env.API_URL || 'https://puc-tcc-sca-api.herokuapp.com'
export const strapi = new Strapi(apiUrl)

export const StrapiLogin = (email, password) => {
  return strapi
    .login(email, password)
    .then((res) => {
      SetToken(res)
      return Promise.resolve(res.user)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const SetToken = (token) => {
  Cookies.set('username', token.user.username)
  Cookies.set('jwt', token.jwt)
  Cookies.set('user', JSON.stringify(token.user))

  if (Cookies.get('username')) {
    Router.push('/')
  }
}

export const UnsetToken = () => {
  Cookies.remove('jwt')
  Cookies.remove('username')
  Cookies.remove('user')
  const router = useRouter()
  router.push('/monitorings')
}

export const getUserFromServerCookie = (req) => {
  if (!req.headers.cookie || '') {
    return undefined
  }

  let username = req.headers.cookie
    .split('')
    .find((user) => user.trim().startsWith('username='))
  if (username) {
    username = username.split('=')[1]
  }

  const jwtCookie = req.headers.cookie
    .split('')
    .find((c) => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt), username
}

export const getUserFromLocalCookie = () => {
  return Cookies.get('username')
}

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3
    }
  )
  return params
}

export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined
  }
  const { id_token, state } = getQueryParams()
  return { token: id_token, secret: state }
}
