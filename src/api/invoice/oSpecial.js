/**
 * @author Linzb
 * @date 2019/4/11
 * @Description: 已开专票
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

// 获取表格列表
export function getList(data) {
  return request({
    url: apiPath.invoice.oSpecial.list,
    method: 'post',
    data: data
  })
}
// 发票找回
export function retrieve(data) {
  return request({
    url: apiPath.invoice.oSpecial.retrieve,
    method: 'post',
    data
  })
}
// 发票作废
export function cancel(data) {
  return request({
    url: apiPath.invoice.oSpecial.cancel,
    method: 'post',
    data
  })
}
// 发票导出
export function exportAll(data) {
  return request({
    url: apiPath.invoice.oSpecial.exportAll,
    method: 'post',
    data
  })
}
// 发票验证
export function validate(data) {
  return request({
    url: apiPath.invoice.oSpecial.validate,
    method: 'post',
    data
  })
}
// 数据回传
export function passBackInvoice(data) {
  return request({
    url: apiPath.invoice.oSpecial.passBackInvoice,
    method: 'post',
    data
  })
}
// 获取发票详情
export function fpDetail(data) {
  return request({
    url: apiPath.invoice.oSpecial.fpDetail,
    method: 'post',
    data
  })
}
// 发票作废重开
export function reInvoice(data) {
  return request({
    url: apiPath.invoice.oSpecial.reInvoice,
    method: 'post',
    data
  })
}
