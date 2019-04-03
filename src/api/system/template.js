/**
 * @author Linzb
 * @date 2019/4/1
 * @Description: 开票规则模板API
*/
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取模板列表
export function getTable(data) {
  return request({
    url: apiPath.system.template.list,
    method: 'post',
    data: data
  })
}
// 模板新增
export function addTemplate(data) {
  return request({
    url: apiPath.system.template.add,
    method: 'post',
    data: data
  })
}
// 模板删除
export function deleteTemplate(data) {
  return request({
    url: apiPath.system.template.delete,
    method: 'post',
    data: data
  })
}
