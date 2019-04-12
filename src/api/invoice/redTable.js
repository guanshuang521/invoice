/**
 * @author Linzb
 * @date 2019/4/11
 * @Description: 红字信息表请求接口
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 查询
export function initList(data) {
  return request({
    url: apiPath.invoice.redTable.list,
    method: 'post',
    data
  })
}
// 发票详情
export function detail(data) {
  return request({
    url: apiPath.invoice.redTable.detail,
    method: 'post',
    data
  })
}
// 删除
export function del(data) {
  return request({
    url: apiPath.invoice.redTable.delete,
    method: 'post',
    data
  })
}
// 保存
export function insert(data) {
  return request({
    url: apiPath.invoice.redTable.insert,
    method: 'post',
    data
  })
}
// 申请
export function apply(data) {
  return request({
    url: apiPath.invoice.redTable.apply,
    method: 'post',
    data
  })
}
// 同步
export function sync(data) {
  return request({
    url: apiPath.invoice.redTable.sync,
    method: 'post',
    data
  })
}
