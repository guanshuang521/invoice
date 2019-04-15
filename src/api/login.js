import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
import md5 from 'js-md5'

// 登录
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

export function logout(userId) {
  return request({
    url: apiPath.login.logout,
    method: 'get',
    params: { userId }
  })
}
// 获取有权限的路由
export function getRoute(userId) {
  return request({
    url: apiPath.login.userInfo,
    method: 'get',
    params: { userId }
  })
}
