/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getNodeList(username, password) {
  return request({
    url: apiPath.system.organization.list,
    method: 'post',
    data: {
      username,
      password
    }
  })
}
// 获取节点详情
export function getNodeDetail(nodeId) {
  return request({
    url: apiPath.system.organization.nodeDetail,
    method: 'post',
    data: {
      nodeId
    }
  })
}
// 删除节点
export function deleteNode(nodeId) {
  return request({
    url: apiPath.system.organization.deleteNode,
    method: 'post',
    data: {
      nodeId
    }
  })
}
// 更新节点
export function updateNode(data) {
  return request({
    url: apiPath.system.organization.updateNode,
    method: 'post',
    data: data
  })
}
// 新增子节点
export function addNode(data) {
  return request({
    url: apiPath.system.organization.addNode,
    method: 'post',
    data: data
  })
}
