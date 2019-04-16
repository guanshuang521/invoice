/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取角色列表
export function getRoleList(data) {
  return request({
    url: apiPath.system.role.selectByRole,
    method: 'post',
    data
  })
}
// 删除角色
export function deleteRole(data) {
  return request({
    url: apiPath.system.role.deleteRole,
    method: 'post',
    data
  })
}
// 新增角色
export function insertRole(data) {
  return request({
    url: apiPath.system.role.insertRole,
    method: 'post',
    data
  })
}
// 编辑角色
export function getRoleDetail(roleId) {
  return request({
    url: apiPath.system.role.detail,
    method: 'get',
    params: {
      roleId
    }
  })
}
// 编辑角色
export function updateRole(data) {
  return request({
    url: apiPath.system.role.updateRole,
    method: 'post',
    data
  })
}
// 获取可以分配的菜单路由
export function getRources() {
  return request({
    url: apiPath.system.role.getRources,
    method: 'get'
  })
}
