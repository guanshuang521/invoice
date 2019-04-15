/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 16:50:23
 * @LastEditTime: 2019-03-19 16:55:52
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 服务类订单管理
export function getServiceOrderlist(data) {
  return request({
    url: apiPath.order.list.erpList,
    method: 'post',
    data: data
  })
}
export function generatenIvoices(data) {
  return request({
    url: apiPath.order.list.getInvoices,
    method: 'post',
    data: data
  })
}
export function exportERP(data) {
  return request({
    url: apiPath.order.list.exportErp,
    method: 'post',
    data: data
  })
}
export function exportCommidyErp(data) {
  return request({
    url: apiPath.order.list.exportCommidyErp,
    method: 'post',
    data: data
  })
}
export function buildInvoice(data) {
  return request({
    url: apiPath.order.list.buildInvoice,
    method: 'post',
    data: data
  })
}
export function getPoslist(data) {
  return request({
    url: apiPath.order.pos.findList,
    method: 'post',
    data: data
  })
}
export function delPosList(data) {
  return request({
    url: apiPath.order.pos.delList,
    method: 'post',
    data: data
  })
}
export function downPosOrder(data) {
  return request({
    url: apiPath.order.pos.downPos,
    method: 'post',
    data: data
  })
}
export function buildInvoicePre(data) {
  return request({
    url: apiPath.order.pos.buildInvoicePre,
    method: 'post',
    data: data
  })
}
export function exportPosOrder(data) {
  return request({
    url: apiPath.order.pos.exportPosOrder,
    method: 'post',
    data: data
  })
}
export function dobuildInvoicePre(data) {
  return request({
    url: apiPath.order.pos.dobuildInvoicePre,
    method: 'post',
    data: data
  })
}
export function gfmcPos(data) {
  return request({
    url: apiPath.order.pos.gfmcPos,
    method: 'post',
    data: data
  })
}
export function dobuildInvoiceGmf(data) {
  return request({
    url: apiPath.order.list.dobuildInvoiceGmf,
    method: 'post',
    data: data
  })
}
export function dobuildInvoiceIds(data) {
  return request({
    url: apiPath.order.list.dobuildInvoiceIds,
    method: 'post',
    data: data
  })
}
// 商品订单管理
export function getCommdylist(data) {
  return request({
    url: apiPath.order.list.Commdylist,
    method: 'post',
    data: data
  })
}
