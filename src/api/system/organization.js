/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getNodeList(data) {
  return request({
    url: apiPath.system.organization.list,
    method: 'post',
    data
  })
}
// 删除节点
export function deleteNode(nodeId) {
  return request({
    url: apiPath.system.organization.deleteNode,
    method: 'post',
    data: {
      id: nodeId
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
// 获取终端列表
export function terminalList(data) {
  return request({
    url: apiPath.system.organization.terminalList,
    method: 'post',
    data: data
  })
}
// 删除终端
export function deleteTerminal(data) {
  return request({
    url: apiPath.system.organization.deleteTerminal,
    method: 'post',
    data: data
  })
}
// 新增终端
export function addTerminal(data) {
  return request({
    url: apiPath.system.organization.addTerminal,
    method: 'post',
    data: data
  })
}
// 修改终端
export function updateTerminal(data) {
  return request({
    url: apiPath.system.organization.updateTerminal,
    method: 'post',
    data: data
  })
}

