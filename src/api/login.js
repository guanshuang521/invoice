import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
import md5 from 'js-md5'

export function login(username, password) {
  return request({
    url: apiPath.login.login,
    method: 'post',
    data: {
      userName: username,
      password: md5(password)
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
// 获取有权限的路由
export function getRoute(id) {
  return request({
    url: '/user/getRoute',
    method: 'post',
    params: { id }
  })
}
