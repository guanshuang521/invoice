import Cookies from 'js-cookie'

/* const TokenKey = 'admin_token'*/
const TokenKey = 'fapiao_token'
const userId = 'userId'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  /* return Cookies.set(TokenKey, token)*/
    return Cookies.set(TokenKey, token)
}

export function getUserId(token) {
  /* return Cookies.set(TokenKey, token)*/
  return Cookies.get(userId, token)
}

export function setUserId(token) {
  /* return Cookies.set(TokenKey, token)*/
  return Cookies.set(userId, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
