/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getList() {
  return request({
    url: apiPath.system.user.list,
    method: 'get'
  })
}
// 保存用户
export function saveUser() {
  return request({
    url: apiPath.system.user.save,
    method: 'get'
  })
}
// 删除用户
export function deleteUser() {
  return request({
    url: apiPath.system.user.delete,
    method: 'get'
  })
}
// 获取用户详情
export function getUserDetail() {
  return request({
    url: apiPath.system.user.detail,
    method: 'get'
  })
}

