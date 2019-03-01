import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

export function login(username, password) {
  return request({
    url: apiPath.login.login,
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
