import Cookies from 'js-cookie'

/* const TokenKey = 'admin_token'*/
const TokenKey = 'fapiao_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  /* return Cookies.set(TokenKey, token)*/
  return Cookies.set(TokenKey, '1e00be39-9ddb-4673-90e6-1dd1fb8b36f0')
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
