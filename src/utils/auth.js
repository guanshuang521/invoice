import Cookies from 'js-cookie'

/* const TokenKey = 'admin_token'*/
const TokenKey = 'fapiao_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  /* return Cookies.set(TokenKey, token)*/
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
