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
// 获取所有角色列表
export function getAllList(data) {
  return request({
    url: apiPath.system.user.AllRolelist,
    method: 'post',
    data
  })
}
// 新增数据
export function add(data) {
  return request({
    url: apiPath.system.user.add,
    method: 'post',
    data: data
  })
}
// 编辑数据
export function edit(data) {
  return request({
    url: apiPath.system.user.edit,
    method: 'post',
    data: data
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
export function deleteUser(data) {
  return request({
    url: apiPath.system.user.delete,
    method: 'get',
    params: data
  })
}
// 获取用户详情
export function getUserDetail() {
  return request({
    url: apiPath.system.user.detail,
    method: 'get'
  })
}
// 用户关联角色
export function assignRoles(data) {
  return request({
    url: apiPath.system.user.assignRole,
    method: 'post',
    data
  })
}
// 获取所有角色
export function getAllRoles(data) {
  return request({
    url: apiPath.system.user.list,
    method: 'post',
    data
  })
}

