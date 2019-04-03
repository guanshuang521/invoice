/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getList(data) {
  return request({
    url: apiPath.system.user.list,
    method: 'post',
    data: data
  })
}
// 新增数据
export function add() {
  return request({
    url: apiPath.system.user.add,
    method: 'post'
  })
}
// 新增数据
export function edit() {
  return request({
    url: apiPath.system.user.edit,
    method: 'post'
  })
}
// 新增数据
export function nodeList(userId) {
  return request({
    url: apiPath.system.user.nodeList,
    method: 'get',
    params: { 'userId': userId }
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
    method: 'post'
  })
}
// 获取用户详情
export function getUserDetail() {
  return request({
    url: apiPath.system.user.detail,
    method: 'get'
  })
}

